interface RecruitData {
  sport?: string | null
  state?: string | null
  gpa?: number | null
  satScore?: number | null
}

interface SchoolData {
  id: string
  slug: string
  name: string
  shortName: string
  mascot: string
  conference: string
  city: string
  state: string
  colorPrimary: string
  colorSecondary: string
  sports: { name: string }[]
  academics: { satAvg: number; admissionRate: number } | null
}

export function getRecommendations(
  recruit: RecruitData,
  schools: SchoolData[],
  favoriteIds: Set<string>,
  limit = 4,
): SchoolData[] {
  const scored = schools
    .filter((s) => !favoriteIds.has(s.id))
    .map((school) => {
      let score = 0

      // Sport match (+30 points)
      if (recruit.sport && school.sports.some((sp) => sp.name.toLowerCase().includes(recruit.sport!.toLowerCase()))) {
        score += 30
      }

      // Same state (+20 points)
      if (recruit.state && school.state === recruit.state) {
        score += 20
      }

      // Academic fit: SAT within 150 points (+15), within 300 (+5)
      if (recruit.satScore && school.academics?.satAvg) {
        const diff = Math.abs(recruit.satScore - school.academics.satAvg)
        if (diff <= 150) score += 15
        else if (diff <= 300) score += 5
      }

      // Higher admission rate = more accessible (+0–10 points)
      if (school.academics?.admissionRate) {
        score += Math.round(school.academics.admissionRate * 10)
      }

      return { school, score }
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((s) => s.school)
}
