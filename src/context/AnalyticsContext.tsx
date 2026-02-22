import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AnalyticsEvent } from '@/types';
import { useAuth } from './AuthContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AnalyticsContextValue {
  /**
   * Record a discrete analytics event.
   *
   * @param section  App section where the event occurred (e.g., "academics", "facilities").
   * @param action   Specific action taken (e.g., "view", "tap", "favorite").
   * @param metadata Optional key-value pairs with additional event data.
   */
  trackEvent: (
    section: string,
    action: string,
    metadata?: Record<string, string | number | boolean>,
  ) => void;

  /**
   * Begin tracking time spent on a section. Returns a cleanup function
   * suitable for use in a useEffect return.
   *
   * @example
   * ```ts
   * useEffect(() => {
   *   return trackScreenTime('school-profile');
   * }, []);
   * ```
   */
  trackScreenTime: (section: string) => () => void;

  /** The unique session identifier for this app session. */
  getSessionId: () => string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'college_visit_analytics';
const FLUSH_INTERVAL_MS = 10_000; // 10 seconds

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a UUID-like string without external dependencies. */
function generateSessionId(): string {
  const seg = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return `${seg()}${seg()}-${seg()}-${seg()}-${seg()}-${seg()}${seg()}${seg()}`;
}

/** Generate a short unique event ID. */
function generateEventId(): string {
  return `evt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const sessionIdRef = useRef<string>(generateSessionId());
  const eventQueueRef = useRef<AnalyticsEvent[]>([]);
  const flushTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // -----------------------------------------------------------------------
  // Flush Logic
  // -----------------------------------------------------------------------

  const flush = useCallback(async () => {
    if (eventQueueRef.current.length === 0) return;

    const batch = [...eventQueueRef.current];
    eventQueueRef.current = [];

    // Prototype: log to console
    console.log(
      `[Analytics] Flushing ${batch.length} event(s) for session ${sessionIdRef.current}`,
      batch,
    );

    // Prototype: append to AsyncStorage
    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const history: AnalyticsEvent[] = existing ? JSON.parse(existing) : [];
      // Keep a reasonable rolling window (last 500 events)
      const merged = [...history, ...batch].slice(-500);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    } catch (error) {
      console.warn('[Analytics] Failed to persist events:', error);
    }
  }, []);

  // Start and stop the flush interval
  useEffect(() => {
    flushTimerRef.current = setInterval(flush, FLUSH_INTERVAL_MS);

    return () => {
      if (flushTimerRef.current) {
        clearInterval(flushTimerRef.current);
      }
      // Flush remaining events on unmount
      flush();
    };
  }, [flush]);

  // -----------------------------------------------------------------------
  // Public API
  // -----------------------------------------------------------------------

  const trackEvent = useCallback(
    (
      section: string,
      action: string,
      metadata?: Record<string, string | number | boolean>,
    ) => {
      const event: AnalyticsEvent = {
        id: generateEventId(),
        userId: user?.id ?? '',
        userRole: user?.role ?? 'recruit',
        schoolId: (metadata?.schoolId as string) ?? undefined,
        sessionId: sessionIdRef.current,
        section,
        action,
        metadata,
        timestamp: new Date().toISOString(),
      };
      eventQueueRef.current.push(event);
    },
    [user],
  );

  const trackScreenTime = useCallback(
    (section: string): (() => void) => {
      const startTime = Date.now();

      // Track the "enter" event
      const enterId = generateEventId();
      eventQueueRef.current.push({
        id: enterId,
        userId: user?.id ?? '',
        userRole: user?.role ?? 'recruit',
        sessionId: sessionIdRef.current,
        section,
        action: 'screen_enter',
        timestamp: new Date().toISOString(),
      });

      // Return cleanup that tracks the "exit" event with duration
      return () => {
        const duration = Date.now() - startTime;
        eventQueueRef.current.push({
          id: generateEventId(),
          userId: user?.id ?? '',
          userRole: user?.role ?? 'recruit',
          sessionId: sessionIdRef.current,
          section,
          action: 'screen_exit',
          duration,
          timestamp: new Date().toISOString(),
        });
      };
    },
    [user],
  );

  const getSessionId = useCallback(() => sessionIdRef.current, []);

  const value = useMemo<AnalyticsContextValue>(
    () => ({ trackEvent, trackScreenTime, getSessionId }),
    [trackEvent, trackScreenTime, getSessionId],
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access analytics tracking methods.
 * Must be used within an <AnalyticsProvider>.
 */
export function useAnalytics(): AnalyticsContextValue {
  const ctx = useContext(AnalyticsContext);
  if (ctx === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return ctx;
}
