// seed-nil-visibility.ts — Creates NilFieldVisibility records

export async function seedNilVisibility(prisma: any, schoolMap: Record<string, any>) {
  const entries = [
    {
      slug: 'texas-tech',
      totalBudget: 'public',
      footballSpend: 'public',
      allSportsSpend: 'hidden',
      averageDealSize: 'invite_only',
      notableDeals: 'invite_only',
    },
    {
      slug: 'oklahoma',
      totalBudget: 'public',
      footballSpend: 'public',
      allSportsSpend: 'hidden',
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
