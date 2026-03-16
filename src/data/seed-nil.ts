// seed-nil.ts — Creates NilProgram records with real collective data

export async function seedNil(prisma: any, schoolMap: Record<string, any>) {
  const nilPrograms = [
    {
      slug: 'texas-tech',
      collectiveName: 'The Matador Club',
      totalBudget: 55000000,
      footballSpend: 35000000,
      allSportsSpend: 20000000,
      founded: 2022,
      description: 'The Matador Club merged with the Red Raider Club in 2024 to create a unified NIL and athletics fundraising operation. Led by energy executive Cody Campbell and supported by over 3,500 donors, the collective raised $63.3 million total since inception. The FY2026 annual fund goal is $36.25 million, combining $35 million in direct NIL deals with $20.5 million in revenue sharing under the new NCAA settlement framework. Texas Tech\'s NIL program is among the strongest in the Big 12, fueled by passionate West Texas alumni and the Permian Basin energy industry donor base.',
      notableDeals: [
        { athlete: 'Behren Morton', sport: 'Football', description: 'Starting QB and 2025 Big 12 Championship game MVP, multi-year NIL commitment as the face of Red Raider football' },
        { athlete: 'Jacob Rodriguez', sport: 'Football', description: '2025 Big 12 Defensive Player of the Year, one of the highest-paid defenders in the conference' },
        { athlete: 'Tahj Brooks', sport: 'Football', description: 'All-American RB who was the program\'s NIL centerpiece before the 2025 NFL Draft (Cincinnati Bengals)' },
        { athlete: 'David Bailey', sport: 'Football', description: 'Big 12 sack leader (13.5) with significant NIL deal after breakout 2025 season' },
        { athlete: 'Josh Kelly', sport: 'Football', description: 'Biletnikoff Award finalist WR who secured major NIL deals before going to the Houston Texans' },
      ],
    },
    {
      slug: 'oklahoma',
      collectiveName: '1Oklahoma',
      totalBudget: 9700000,
      footballSpend: 7000000,
      allSportsSpend: 2700000,
      founded: 2022,
      description: '1Oklahoma consolidated three former NIL collectives (Crimson and Cream, Sooner Nation Collective, and the original 1Oklahoma) into a single entity for OU\'s transition to the SEC. Partners with Sooner Sports Properties as the exclusive NIL marketing partner, connecting athletes with Oklahoma\'s passionate booster network.',
      notableDeals: [
        { athlete: 'Jackson Arnold', sport: 'Football', description: 'Starting QB, key NIL commitment for SEC debut season' },
        { athlete: 'Billy Bowman Jr.', sport: 'Football', description: 'All-American safety with multi-year NIL deal' },
        { athlete: 'Jeremiah Jean-Baptiste', sport: 'Football', description: 'Defensive leader secured through competitive NIL offer' },
      ],
    },
  ]

  for (const nil of nilPrograms) {
    const { slug, ...data } = nil
    await prisma.nilProgram.create({
      data: {
        schoolId: schoolMap[slug].id,
        ...data,
      },
    })
  }
  console.log(`  Created ${nilPrograms.length} NIL Programs`)
}
