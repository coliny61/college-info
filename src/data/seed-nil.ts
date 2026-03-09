// seed-nil.ts — Creates NilProgram records with real collective data

export async function seedNil(prisma: any, schoolMap: Record<string, any>) {
  const nilPrograms = [
    {
      slug: 'texas-tech',
      collectiveName: 'The Matador Club',
      totalBudget: 28000000,
      footballSpend: 20000000,
      allSportsSpend: 8000000,
      founded: 2022,
      description: 'The Matador Club is an NIL collective organized by Texas Tech alumni, boosters, and former athletes. It operates as the philanthropic arm of the Red Raider Club, with over 3,500 donors including five mega-donors with seven-figure pledges. The collective provides NIL opportunities through brand partnerships, community appearances, and social media campaigns.',
      notableDeals: [
        { athlete: 'Behren Morton', sport: 'Football', description: 'Starting QB, key portal acquisition with multi-year NIL commitment' },
        { athlete: 'Dadrion Taylor-Demerson', sport: 'Football', description: 'All-Big 12 safety, secured significant NIL deal before 2024 NFL Draft' },
        { athlete: 'Pop Isaacs', sport: 'Basketball', description: 'Dynamic guard who transferred in with competitive NIL package' },
      ],
    },
    {
      slug: 'usc',
      collectiveName: 'House of Victory',
      totalBudget: 20500000,
      footballSpend: 14000000,
      allSportsSpend: 6500000,
      founded: 2022,
      description: 'House of Victory is a nonprofit, alumni-led NIL collective and the Official NIL Sponsor of USC Athletics through a partnership with PlayFly Sports. Leveraging USC\'s location in Los Angeles, the collective connects athletes with entertainment, tech, and brand opportunities unique to the LA market. Athletes benefit from proximity to major media companies and agencies.',
      notableDeals: [
        { athlete: 'Caleb Williams', sport: 'Football', description: '2022 Heisman Trophy winner, extensive NIL portfolio before 2024 NFL Draft' },
        { athlete: 'Miller Moss', sport: 'Football', description: 'Starting QB with multi-platform NIL presence' },
        { athlete: 'JuJu Watkins', sport: 'Basketball', description: 'Women\'s basketball phenom with national NIL profile and Gatorade deal' },
      ],
    },
    {
      slug: 'baylor',
      collectiveName: 'GXG (Green & Gold Collective)',
      totalBudget: 4200000,
      footballSpend: 2800000,
      allSportsSpend: 1400000,
      founded: 2022,
      description: 'GXG (Green & Gold) Collective was formed in partnership with Startup Waco. It connects student-athletes with NIL opportunities and helps them treat NIL as their own startup business. The Waco NIL Club provides additional support through local business partnerships and community engagement opportunities.',
      notableDeals: [
        { athlete: 'Sawyer Robertson', sport: 'Football', description: 'Transfer QB from Texas Tech with competitive NIL package' },
        { athlete: 'Darianna Littlepage-Buggs', sport: 'Basketball', description: 'Women\'s basketball standout with national NIL profile' },
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
