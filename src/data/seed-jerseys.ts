// seed-jerseys.ts — Creates 45 JerseyAssets (5 schools x 3 types x 3 colors)

export async function seedJerseys(prisma: any, schoolMap: Record<string, any>) {
  const schools = ['alabama', 'oregon', 'ohio-state', 'texas', 'lsu']
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
            imageUrl: `/jersey/${slug}/${type}-${colorLabel}.png`,
          },
        })
        count++
      }
    }
  }

  console.log(`  Created ${count} JerseyAssets`)
}
