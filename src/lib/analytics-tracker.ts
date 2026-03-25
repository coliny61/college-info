// Client-side analytics batch tracker with sendBeacon support

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
      // Use sendBeacon for reliable flush on page close
      window.addEventListener('beforeunload', () => this.flushBeacon())
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this.flushBeacon()
        }
      })
    }
  }

  private generateSessionId(): string {
    // Check for existing session in sessionStorage
    if (typeof window !== 'undefined') {
      const existing = sessionStorage.getItem('ovv_session_id')
      if (existing) return existing
      const id = Math.random().toString(36).slice(2) + Date.now().toString(36)
      sessionStorage.setItem('ovv_session_id', id)
      return id
    }
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
      const res = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(events),
      })
      if (!res.ok) {
        // Re-queue on failure
        this.queue.unshift(...events)
      }
    } catch {
      // Re-queue on network failure
      this.queue.unshift(...events)
    }
  }

  // Use sendBeacon for page unload (more reliable than fetch)
  private flushBeacon() {
    if (this.queue.length === 0) return

    const events = [...this.queue]
    this.queue = []

    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(events)], { type: 'application/json' })
      const sent = navigator.sendBeacon('/api/analytics/track', blob)
      if (!sent) {
        // Fallback: re-queue (though page is closing)
        this.queue.unshift(...events)
      }
    } else {
      // Fallback to fetch (may not complete on page close)
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(events),
        keepalive: true,
      }).catch(() => {})
    }
  }

  getSessionId() {
    return this.sessionId
  }

  destroy() {
    if (this.timer) clearInterval(this.timer)
    this.flushBeacon()
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
