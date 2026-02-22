// =============================================================================
// Analytics Service
// College Visit Platform
// =============================================================================
// Event tracking service that batches analytics events and flushes them
// to AsyncStorage (prototype) or Firestore (MVP).
// =============================================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AnalyticsEvent, UserRole } from '@/types';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const ANALYTICS_STORAGE_KEY = 'college_visit_analytics';

/** Interval in milliseconds between automatic flushes (30 seconds). */
const AUTO_FLUSH_INTERVAL = 30_000;

/** Maximum events to hold before forcing a flush. */
const MAX_BATCH_SIZE = 50;

// -----------------------------------------------------------------------------
// Internal State
// -----------------------------------------------------------------------------

/** In-memory batch queue of events awaiting persistence. */
let batchQueue: AnalyticsEvent[] = [];

/** Reference to the auto-flush interval timer. */
let flushTimer: ReturnType<typeof setInterval> | null = null;

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

/** Generate a unique event ID. */
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/** Generate a unique session ID. */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Create and enqueue an analytics event.
 *
 * The event is added to the in-memory batch queue and will be persisted on the
 * next flush (automatic or manual). If the queue reaches MAX_BATCH_SIZE the
 * events are flushed immediately.
 *
 * @returns The created AnalyticsEvent object.
 */
export function createEvent(
  userId: string,
  userRole: UserRole,
  section: string,
  action: string,
  metadata?: Record<string, string | number | boolean>,
): AnalyticsEvent {
  const event: AnalyticsEvent = {
    id: generateEventId(),
    userId,
    userRole,
    sessionId: currentSessionId,
    section,
    action,
    metadata,
    timestamp: new Date().toISOString(),
  };

  batchQueue.push(event);

  // Force flush if the batch is full
  if (batchQueue.length >= MAX_BATCH_SIZE) {
    flushEvents();
  }

  return event;
}

/**
 * Flush all queued events to persistent storage.
 *
 * In the prototype this writes to AsyncStorage. In MVP this will batch-write
 * to the Firestore `analytics` collection.
 */
export async function flushEvents(): Promise<void> {
  if (batchQueue.length === 0) return;

  // Grab the current batch and reset the queue
  const eventsToFlush = [...batchQueue];
  batchQueue = [];

  try {
    // Read existing persisted events
    const raw = await AsyncStorage.getItem(ANALYTICS_STORAGE_KEY);
    let existing: AnalyticsEvent[] = [];

    if (raw) {
      try {
        existing = JSON.parse(raw) as AnalyticsEvent[];
      } catch {
        existing = [];
      }
    }

    // Append new events and persist
    const merged = [...existing, ...eventsToFlush];
    await AsyncStorage.setItem(
      ANALYTICS_STORAGE_KEY,
      JSON.stringify(merged),
    );
  } catch (error) {
    // If persistence fails, push the events back onto the queue so they
    // are retried on the next flush cycle.
    console.warn('[Analytics] flushEvents failed, re-queuing:', error);
    batchQueue = [...eventsToFlush, ...batchQueue];
  }
}

// -----------------------------------------------------------------------------
// Session Management
// -----------------------------------------------------------------------------

/** The current active session ID. */
let currentSessionId: string = generateSessionId();

/**
 * Start a new analytics session.
 *
 * Creates a fresh session ID and sets up the auto-flush timer. Call this when
 * the app enters the foreground or when a user signs in.
 *
 * @returns The new session ID.
 */
export function startSession(): string {
  currentSessionId = generateSessionId();
  setupAutoFlush();
  return currentSessionId;
}

/**
 * End the current analytics session.
 *
 * Flushes any pending events and tears down the auto-flush timer. Call this
 * when the app backgrounds or when a user signs out.
 */
export async function endSession(): Promise<void> {
  teardownAutoFlush();
  await flushEvents();
}

// -----------------------------------------------------------------------------
// Auto-flush Timer
// -----------------------------------------------------------------------------

/**
 * Start the periodic auto-flush timer.
 *
 * Idempotent: calling this when a timer is already running is a no-op.
 */
export function setupAutoFlush(): void {
  if (flushTimer !== null) return;

  flushTimer = setInterval(() => {
    flushEvents();
  }, AUTO_FLUSH_INTERVAL);
}

/**
 * Stop the periodic auto-flush timer.
 */
export function teardownAutoFlush(): void {
  if (flushTimer !== null) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
}

/**
 * Get the number of events currently queued in memory.
 * Useful for debugging and status displays.
 */
export function getPendingEventCount(): number {
  return batchQueue.length;
}
