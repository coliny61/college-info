// seed-jerseys.ts — Creates JerseyAssets for UMHB and TAMUCC

export async function seedJerseys(prisma: any, schoolMap: Record<string, any>) {
  const schools = ['umhb', 'tamucc']
  const types = ['helmet', 'jersey', 'pants']
  const colorLabels = ['home', 'away', 'alternate']

  let count = 0
  for (const slug of schools) {
    for (const type of types) {
      for (const colorLabel of colorLabels) {
        await prisma.jerseyAsset.create({
          data: {
            schoolId: schoolMap[slug].id,
            type,
            colorLabel,
            imageUrl: `/images/schools/${slug}/jerseys/${type}-${colorLabel}.png`,
          },
        })
        count++
      }
    }
  }

  console.log(`  Created ${count} JerseyAssets`)
}
