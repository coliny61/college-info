// Client-side analytics batch tracker

interface AnalyticsEvent {
  schoolId?: string
  sessionId: string
  section: string
  action: string
  metadata?: Record<string, unknown>
  duration?: number
}

const BATCH_SIZE = 50
const FLUSH_INTERVAL = 30_000 // 30 seconds

class AnalyticsTracker {
  private queue: AnalyticsEvent[] = []
  private timer: ReturnType<typeof setInterval> | null = null
  private sessionId: string

  constructor() {
    this.sessionId = this.generateSessionId()
    if (typeof window !== 'undefined') {
      this.startTimer()
      window.addEventListener('beforeunload', () => this.flush())
    }
  }

  private generateSessionId(): string {
    return Math.random().toString(36).slice(2) + Date.now().toString(36)
  }

  private startTimer() {
    this.timer = setInterval(() => this.flush(), FLUSH_INTERVAL)
  }

  track(event: Omit<AnalyticsEvent, 'sessionId'>) {
    this.queue.push({ ...event, sessionId: this.sessionId })
    if (this.queue.length >= BATCH_SIZE) {
      this.flush()
    }
  }

  async flush() {
    if (this.queue.length === 0) return

    const events = [...this.queue]
    this.queue = []

    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(events),
      })
    } catch {
      // Re-queue on failure
      this.queue.unshift(...events)
    }
  }

  getSessionId() {
    return this.sessionId
  }

  destroy() {
    if (this.timer) clearInterval(this.timer)
    this.flush()
  }
}

// Singleton
let tracker: AnalyticsTracker | null = null

export function getTracker(): AnalyticsTracker {
  if (!tracker) {
    tracker = new AnalyticsTracker()
  }
  return tracker
}
