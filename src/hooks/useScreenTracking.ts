import { useEffect, useRef } from 'react';
import { useAnalytics } from '@/context/AnalyticsContext';

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Tracks screen view duration for analytics.
 *
 * On mount, records a `screen_view` event with the given screen name.
 * On unmount, records a `screen_exit` event along with the total
 * duration (in milliseconds) the user spent on the screen.
 *
 * @param screenName - Human-readable name of the screen being tracked.
 */
export function useScreenTracking(screenName: string): void {
  const { trackEvent } = useAnalytics();
  const enterTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Capture the mount timestamp
    enterTimeRef.current = Date.now();

    // Track screen entry
    trackEvent(screenName, 'screen_view', {
      screenName,
    });

    // Track screen exit with duration on unmount
    return () => {
      const duration = Date.now() - enterTimeRef.current;
      trackEvent(screenName, 'screen_exit', {
        screenName,
        duration,
      });
    };
    // Only re-run if the screen name changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenName]);
}
