import { useState, useEffect, useMemo } from 'react';
import type {
  School,
  AcademicData,
  College,
  Major,
  Sport,
  Coach,
  Facility,
  JerseyAsset,
} from '@/types';
import { SCHOOLS } from '@/data/schools';
import { ACADEMICS_DATA, COLLEGES, MAJORS } from '@/data/academics';
import { SPORTS, COACHES, FACILITIES } from '@/data/athletics';
import { JERSEY_ASSETS } from '@/data/jerseyAssets';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UseSchoolResult {
  school: School | null;
  academicData: AcademicData | null;
  colleges: College[];
  majors: Major[];
  sport: Sport | null;
  coaches: Coach[];
  facilities: Facility[];
  jerseyAssets: JerseyAsset[];
  loading: boolean;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Loads all data associated with a school by its ID.
 *
 * Aggregates school metadata, academics, athletics, coaching staff,
 * facilities, and jersey assets into a single reactive return value.
 *
 * @param schoolId - The unique school identifier (e.g., "alabama", "ohio-state").
 */
export function useSchool(schoolId: string): UseSchoolResult {
  const [loading, setLoading] = useState(true);

  // Simulate an async data load so consumers can show a loading state
  useEffect(() => {
    setLoading(true);
    // Small delay to mimic network/database fetch
    const timer = setTimeout(() => setLoading(false), 0);
    return () => clearTimeout(timer);
  }, [schoolId]);

  const school = useMemo(
    () => SCHOOLS.find((s) => s.id === schoolId) ?? null,
    [schoolId],
  );

  const academicData = useMemo(
    () => ACADEMICS_DATA[schoolId] ?? null,
    [schoolId],
  );

  const colleges = useMemo(
    () => COLLEGES.filter((c) => c.schoolId === schoolId),
    [schoolId],
  );

  // Collect all major IDs for the school's colleges, then filter majors
  const majors = useMemo(() => {
    const collegeIds = new Set(colleges.map((c) => c.id));
    return MAJORS.filter((m) => collegeIds.has(m.collegeId));
  }, [colleges]);

  const sport = useMemo(
    () => SPORTS.find((s) => s.schoolId === schoolId) ?? null,
    [schoolId],
  );

  const coaches = useMemo(() => {
    if (!sport) return [];
    return COACHES.filter((c) => c.sportId === sport.id);
  }, [sport]);

  const facilities = useMemo(() => {
    if (!sport) return [];
    return FACILITIES.filter((f) => f.sportId === sport.id);
  }, [sport]);

  const jerseyAssets = useMemo(
    () => JERSEY_ASSETS.filter((j) => j.schoolId === schoolId),
    [schoolId],
  );

  return {
    school,
    academicData,
    colleges,
    majors,
    sport,
    coaches,
    facilities,
    jerseyAssets,
    loading,
  };
}
