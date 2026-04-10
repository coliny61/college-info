// seed-nil-visibility.ts — Creates NilFieldVisibility records

export async function seedNilVisibility(prisma: any, schoolMap: Record<string, any>) {
  const entries = [
    {
      slug: 'umhb',
      totalBudget: 'public',
      footballSpend: 'public',
      allSportsSpend: 'public',
      averageDealSize: 'public',
      notableDeals: 'public',
    },
    {
      slug: 'tamucc',
      totalBudget: 'public',
      footballSpend: 'hidden',
      allSportsSpend: 'public',
      averageDealSize: 'invite_only',
      notableDeals: 'public',
    },
  ]

  for (const entry of entries) {
    const { slug, ...data } = entry
    await prisma.nilFieldVisibility.create({
      data: {
        schoolId: schoolMap[slug].id,
        ...data,
      },
    })
  }
  console.log(`  Created ${entries.length} NIL Field Visibility configs`)
}
