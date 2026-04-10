// seed-nil.ts — Creates NilProgram records for UMHB and TAMUCC

export async function seedNil(prisma: any, schoolMap: Record<string, any>) {
  const nilPrograms = [
    {
      slug: 'umhb',
      collectiveName: 'Crusader Champions Collective',
      totalBudget: 50000,
      footballSpend: 25000,
      allSportsSpend: 25000,
      founded: 2023,
      description: 'The Crusader Champions Collective is a modest but growing NIL initiative supporting UMHB student-athletes. As a Division III institution, UMHB operates under different NIL guidelines than D1 programs — D3 athletes cannot receive pay-for-play deals, but can monetize their name, image, and likeness through personal brand deals, social media partnerships, and local business collaborations. The collective connects athletes with Belton and Temple area businesses for appearances, social media content, and community engagement opportunities.',
      averageDealSize: 500,
      howToGetInvolved: 'Contact the UMHB Athletics Department to learn about NIL opportunities. Local businesses in the Belton-Temple area can partner with Crusader athletes for social media promotions, in-store appearances, youth camp instruction, and community events. All deals are structured as personal brand partnerships in compliance with NCAA D3 regulations.',
      notableDeals: [
        { athlete: 'Various Football Players', sport: 'Football', description: 'Local car dealerships and restaurants in Belton partner with football players for social media content and game-day appearances.' },
        { athlete: 'Basketball Team', sport: 'Basketball', description: 'Temple-area fitness centers sponsor basketball players for youth clinic instruction and social media promotion.' },
      ],
      primarySportSpend: null,
      primarySportName: null,
    },
    {
      slug: 'tamucc',
      collectiveName: 'Island Fund Collective',
      totalBudget: 300000,
      footballSpend: 0,
      allSportsSpend: 300000,
      founded: 2022,
      description: 'The Island Fund Collective is TAMUCC\'s primary NIL collective, focused on supporting Islanders student-athletes across all sports. With no football program, the collective channels its resources primarily into basketball — the flagship sport — along with volleyball, tennis, baseball, and other programs. Backed by Corpus Christi business leaders and alumni donors, the Island Fund has grown rapidly since the 2023 basketball NCAA Tournament run. The collective emphasizes connecting athletes with coastal tourism, hospitality, and food industry brands that align with the island lifestyle brand.',
      averageDealSize: 8000,
      howToGetInvolved: 'Visit the Island Fund website or contact TAMUCC Athletics to explore NIL partnerships. Corpus Christi businesses can sponsor athletes for social media content, restaurant appearances, tourism promotions, and community events. The collective prioritizes long-term brand ambassador relationships over one-time deals.',
      notableDeals: [
        { athlete: 'Trevian Tennyson', sport: 'Basketball', description: 'Starting point guard and two-time Southland POY with the largest NIL deal in TAMUCC history — multi-year brand ambassador for a Corpus Christi auto group.' },
        { athlete: 'Kennedy Wright', sport: 'Volleyball', description: 'Southland POY volleyball star with social media partnerships reaching 50K+ followers and deals with local beachwear brands.' },
        { athlete: 'Women\'s Tennis Team', sport: 'Tennis', description: 'Group deal with a national racquet brand for the four-time NCAA Championship qualifying team — equipment and apparel provided plus content creation fees.' },
      ],
      primarySportSpend: 150000,
      primarySportName: 'Basketball',
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
