import { useState, useEffect, useCallback, useRef } from 'react';
import type { AcademicData } from '@/types';
import { getSchoolById } from '@/services/collegeScorecardApi';
import { ACADEMICS_DATA } from '@/data/academics';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

interface UseAcademicDataResult {
  academicData: AcademicData | null;
  loading: boolean;
  error: string | null;
  /** Re-fetch from the College Scorecard API. */
  refresh: () => void;
}

// -----------------------------------------------------------------------------
// Hook
// -----------------------------------------------------------------------------

/**
 * Fetches academic data from the College Scorecard API for a given school.
 *
 * On success the live API data is returned. On failure (network error, rate
 * limit, etc.) the hook falls back to the local mock data from
 * `ACADEMICS_DATA[schoolId]`.
 *
 * @param schoolId     Internal school identifier (e.g. "alabama").
 * @param scorecardId  The numeric College Scorecard identifier as a string
 *                     (e.g. "100751").
 */
export function useAcademicData(
  schoolId: string,
  scorecardId: string,
): UseAcademicDataResult {
  const [academicData, setAcademicData] = useState<AcademicData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Track whether the component is still mounted to avoid state updates after
  // unmount (e.g. when navigating away mid-fetch).
  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const numericId = Number(scorecardId);
      if (Number.isNaN(numericId)) {
        throw new Error('Invalid scorecard ID');
      }

      const result = await getSchoolById(numericId, schoolId);

      if (!mountedRef.current) return;

      if (result) {
        setAcademicData(result);
        setError(null);
      } else {
        // API returned no results -- fall back to mock data.
        const fallback = ACADEMICS_DATA[schoolId] ?? null;
        setAcademicData(fallback);
        setError('No data returned from College Scorecard API');
      }
    } catch (err) {
      if (!mountedRef.current) return;

      const message =
        err instanceof Error ? err.message : 'Failed to fetch academic data';
      setError(message);

      // Fall back to mock data on any error.
      const fallback = ACADEMICS_DATA[schoolId] ?? null;
      setAcademicData(fallback);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [schoolId, scorecardId]);

  // Fetch on mount and whenever schoolId / scorecardId change.
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { academicData, loading, error, refresh: fetchData };
}
