// =============================================================================
// College Scorecard API Service
// College Visit Platform
// =============================================================================
// Fetches real academic data from the U.S. Department of Education's
// College Scorecard API. Results are cached in-memory with a 1-hour TTL.
// =============================================================================

import type { AcademicData } from '@/types';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const BASE_URL =
  'https://api.data.gov/ed/collegescorecard/v1/schools';

const API_KEY = 'DEMO_KEY';

/** Fields requested from the Scorecard API. */
const FIELDS = [
  'school.name',
  'latest.student.enrollment.all',
  'latest.admissions.admission_rate.overall',
  'latest.admissions.sat_scores.average.overall',
  'latest.admissions.act_scores.midpoint.cumulative',
  'latest.cost.tuition.in_state',
  'latest.cost.tuition.out_of_state',
  'latest.completion.rate_suppressed.overall',
  'latest.earnings.10_yrs_after_entry.median',
].join(',');

/** Known Scorecard IDs for featured schools. */
export const SCORECARD_IDS: Record<string, number> = {
  alabama: 100751,
  oregon: 209551,
  ohioState: 204796,
  texas: 228778,
  lsu: 159391,
};

// -----------------------------------------------------------------------------
// Cache
// -----------------------------------------------------------------------------

interface CacheEntry {
  data: AcademicData;
  expiresAt: number;
}

/** One hour in milliseconds. */
const CACHE_TTL = 60 * 60 * 1000;

const cache = new Map<string, CacheEntry>();

/** Return cached data if the entry exists and has not expired. */
function getFromCache(key: string): AcademicData | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

/** Write data into the cache with a TTL. */
function setCache(key: string, data: AcademicData): void {
  cache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL,
  });
}

// -----------------------------------------------------------------------------
// API Response Types
// -----------------------------------------------------------------------------

interface ScorecardResult {
  'school.name': string;
  'latest.student.enrollment.all': number | null;
  'latest.admissions.admission_rate.overall': number | null;
  'latest.admissions.sat_scores.average.overall': number | null;
  'latest.admissions.act_scores.midpoint.cumulative': number | null;
  'latest.cost.tuition.in_state': number | null;
  'latest.cost.tuition.out_of_state': number | null;
  'latest.completion.rate_suppressed.overall': number | null;
  'latest.earnings.10_yrs_after_entry.median': number | null;
  id: number;
}

interface ScorecardResponse {
  metadata: { total: number; page: number; per_page: number };
  results: ScorecardResult[];
}

// -----------------------------------------------------------------------------
// Transform
// -----------------------------------------------------------------------------

/**
 * Transform a raw Scorecard API result into the app's AcademicData type.
 *
 * @param result  Raw result object from the API.
 * @param schoolId  The internal school ID to attach (may differ from Scorecard ID).
 */
function transformToAcademicData(
  result: ScorecardResult,
  schoolId: string,
): AcademicData {
  return {
    schoolId,
    enrollment: result['latest.student.enrollment.all'] ?? 0,
    admissionRate:
      result['latest.admissions.admission_rate.overall'] ?? 0,
    satAvg:
      result['latest.admissions.sat_scores.average.overall'] ?? 0,
    actAvg:
      result['latest.admissions.act_scores.midpoint.cumulative'] ?? 0,
    tuitionInState: result['latest.cost.tuition.in_state'] ?? 0,
    tuitionOutOfState: result['latest.cost.tuition.out_of_state'] ?? 0,
    graduationRate:
      result['latest.completion.rate_suppressed.overall'] ?? 0,
    medianEarnings:
      result['latest.earnings.10_yrs_after_entry.median'] ?? 0,
    // Retention rate is not included in the selected fields;
    // default to 0 until a separate fetch or data source is added.
    retentionRate: 0,
  };
}

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

/**
 * Search schools by name using the College Scorecard API.
 *
 * Returns an array of AcademicData objects for matching schools.
 * Results are cached per query string.
 */
export async function searchSchools(
  query: string,
): Promise<AcademicData[]> {
  if (!query.trim()) return [];

  const cacheKey = `search:${query.toLowerCase()}`;
  const cached = getFromCache(cacheKey);
  if (cached) return [cached];

  const url = new URL(BASE_URL);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('school.name', query);
  url.searchParams.set('fields', FIELDS);
  url.searchParams.set('per_page', '10');

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Scorecard API error: ${response.status} ${response.statusText}`,
      );
    }

    const json: ScorecardResponse = await response.json();

    return json.results.map((result) => {
      const schoolId = String(result.id);
      const data = transformToAcademicData(result, schoolId);
      setCache(`id:${schoolId}`, data);
      return data;
    });
  } catch (error) {
    console.warn('[CollegeScorecard] searchSchools failed:', error);
    return [];
  }
}

/**
 * Get academic data for a specific school by its Scorecard ID.
 *
 * @param scorecardId  The numeric Scorecard identifier (e.g., 100751 for Alabama).
 * @param schoolId     Optional internal school ID to attach to the result. Defaults
 *                     to the stringified scorecardId.
 */
export async function getSchoolById(
  scorecardId: number,
  schoolId?: string,
): Promise<AcademicData | null> {
  const resolvedSchoolId = schoolId ?? String(scorecardId);
  const cacheKey = `id:${scorecardId}`;

  const cached = getFromCache(cacheKey);
  if (cached) return { ...cached, schoolId: resolvedSchoolId };

  const url = new URL(BASE_URL);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('id', String(scorecardId));
  url.searchParams.set('fields', FIELDS);

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Scorecard API error: ${response.status} ${response.statusText}`,
      );
    }

    const json: ScorecardResponse = await response.json();

    if (json.results.length === 0) return null;

    const data = transformToAcademicData(
      json.results[0],
      resolvedSchoolId,
    );
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.warn('[CollegeScorecard] getSchoolById failed:', error);
    return null;
  }
}
