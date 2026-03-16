/** Simple in-memory sliding window rate limiter (no Redis needed). */

const store = new Map<string, { count: number; resetAt: number }>()

interface RateLimitConfig {
  windowMs: number
  maxRequests: number
}

export function rateLimit(
  key: string,
  config: RateLimitConfig,
): { success: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  // Periodic cleanup
  if (store.size > 10_000) {
    for (const [k, v] of store) {
      if (v.resetAt < now) store.delete(k)
    }
  }

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + config.windowMs })
    return { success: true, remaining: config.maxRequests - 1 }
  }

  if (entry.count >= config.maxRequests) {
    return { success: false, remaining: 0 }
  }

  entry.count++
  return { success: true, remaining: config.maxRequests - entry.count }
}
