import { useState, useMemo, useCallback } from 'react';
import type { JerseyAsset } from '@/types';
import { JERSEY_ASSETS } from '@/data/jerseyAssets';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface JerseyCombo {
  helmet: JerseyAsset | null;
  jersey: JerseyAsset | null;
  pants: JerseyAsset | null;
}

interface UseJerseyBuilderResult {
  /** All helmet assets for this school. */
  helmets: JerseyAsset[];
  /** All jersey assets for this school. */
  jerseys: JerseyAsset[];
  /** All pants assets for this school. */
  pants: JerseyAsset[];
  /** Currently selected helmet. */
  selectedHelmet: JerseyAsset | null;
  /** Currently selected jersey. */
  selectedJersey: JerseyAsset | null;
  /** Currently selected pants. */
  selectedPants: JerseyAsset | null;
  /** Set the selected helmet by asset reference. */
  setSelectedHelmet: (asset: JerseyAsset) => void;
  /** Set the selected jersey by asset reference. */
  setSelectedJersey: (asset: JerseyAsset) => void;
  /** Set the selected pants by asset reference. */
  setSelectedPants: (asset: JerseyAsset) => void;
  /** The current combination of helmet + jersey + pants. */
  currentCombo: JerseyCombo;
  /** Reset all selections back to the Home variant defaults. */
  resetSelection: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Manages jersey/uniform builder state for a given school.
 *
 * Filters `JERSEY_ASSETS` by school and type, defaults to the first
 * "Home" variant for each piece, and exposes selection state plus
 * a reset action.
 *
 * @param schoolId - The school whose uniform assets to load.
 */
export function useJerseyBuilder(schoolId: string): UseJerseyBuilderResult {
  // Filter assets by school and type
  const helmets = useMemo(
    () => JERSEY_ASSETS.filter((a) => a.schoolId === schoolId && a.type === 'helmet'),
    [schoolId],
  );

  const jerseys = useMemo(
    () => JERSEY_ASSETS.filter((a) => a.schoolId === schoolId && a.type === 'jersey'),
    [schoolId],
  );

  const pantsList = useMemo(
    () => JERSEY_ASSETS.filter((a) => a.schoolId === schoolId && a.type === 'pants'),
    [schoolId],
  );

  // Default selections: first of each type (Home variant)
  const defaultHelmet = helmets[0] ?? null;
  const defaultJersey = jerseys[0] ?? null;
  const defaultPants = pantsList[0] ?? null;

  const [selectedHelmet, setSelectedHelmet] = useState<JerseyAsset | null>(defaultHelmet);
  const [selectedJersey, setSelectedJersey] = useState<JerseyAsset | null>(defaultJersey);
  const [selectedPants, setSelectedPants] = useState<JerseyAsset | null>(defaultPants);

  // Re-initialize when schoolId changes (and thus assets change)
  useMemo(() => {
    setSelectedHelmet(helmets[0] ?? null);
    setSelectedJersey(jerseys[0] ?? null);
    setSelectedPants(pantsList[0] ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolId]);

  const currentCombo: JerseyCombo = useMemo(
    () => ({
      helmet: selectedHelmet,
      jersey: selectedJersey,
      pants: selectedPants,
    }),
    [selectedHelmet, selectedJersey, selectedPants],
  );

  const resetSelection = useCallback(() => {
    setSelectedHelmet(helmets[0] ?? null);
    setSelectedJersey(jerseys[0] ?? null);
    setSelectedPants(pantsList[0] ?? null);
  }, [helmets, jerseys, pantsList]);

  return {
    helmets,
    jerseys,
    pants: pantsList,
    selectedHelmet,
    selectedJersey,
    selectedPants,
    setSelectedHelmet,
    setSelectedJersey,
    setSelectedPants,
    currentCombo,
    resetSelection,
  };
}
