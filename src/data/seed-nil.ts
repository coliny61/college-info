// seed-nil.ts — Creates NilProgram records and SportNilBreakdown entries for UMHB and TAMUCC

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

  // Create NilPrograms and store references
  const nilMap: Record<string, any> = {}
  for (const nil of nilPrograms) {
    const { slug, ...data } = nil
    const created = await prisma.nilProgram.create({
      data: {
        schoolId: schoolMap[slug].id,
        ...data,
      },
    })
    nilMap[slug] = created
  }
  console.log(`  Created ${nilPrograms.length} NIL Programs`)

  // ─── Per-Sport NIL Breakdowns ────────────────────────────────────────────

  // Helper to look up sportId by school slug and sport name
  async function getSportId(schoolSlug: string, sportName: string): Promise<string> {
    const sport = await prisma.sport.findFirst({
      where: { schoolId: schoolMap[schoolSlug].id, name: sportName },
      select: { id: true },
    })
    if (!sport) throw new Error(`Sport "${sportName}" not found for ${schoolSlug}`)
    return sport.id
  }

  // UMHB breakdowns
  const umhbBreakdowns = [
    {
      sportName: 'Football',
      budget: 25000,
      averageDealSize: 500,
      athleteCount: 8,
      topDealValue: null,
      description: 'Football drives the majority of UMHB\'s NIL activity. Local car dealerships, restaurants, and fitness centers in the Belton-Temple corridor partner with Crusader football players for social media content, game-day appearances, and community events. As D3 athletes, deals focus on personal branding rather than pay-for-play.',
      notableDeals: [
        { athlete: 'Jaxon Williams (QB)', description: 'Brand ambassador for Belton Auto Group — social media posts, autograph events, and youth football camp appearances ($1,200/year).' },
        { athlete: 'Marcus Thompson (RB)', description: 'Partnership with Temple BBQ restaurant chain for social media content and game-day promotions ($800/year).' },
        { athlete: 'Derek Sullivan (LB)', description: 'Local fitness center partnership — personal training content and facility ambassador ($600/year).' },
      ],
    },
    {
      sportName: 'Men\'s Basketball',
      budget: 8000,
      averageDealSize: 400,
      athleteCount: 4,
      topDealValue: null,
      description: 'Basketball players partner with Temple-area fitness centers and youth organizations for clinic instruction, social media promotion, and community outreach events.',
      notableDeals: [
        { athlete: 'Starting Guards', description: 'Youth basketball camp instruction deal with Belton YMCA ($500/season each).' },
      ],
    },
    {
      sportName: 'Women\'s Basketball',
      budget: 4000,
      averageDealSize: 350,
      athleteCount: 3,
      topDealValue: null,
      description: 'Women\'s basketball players engage in social media partnerships with local businesses and youth clinic instruction.',
      notableDeals: null,
    },
    {
      sportName: 'Baseball',
      budget: 5000,
      averageDealSize: 400,
      athleteCount: 3,
      topDealValue: null,
      description: 'Baseball players partner with local sports equipment stores and batting cage facilities in the Belton-Temple area for product promotions and youth instruction.',
      notableDeals: [
        { athlete: 'Top Pitcher', description: 'Equipment endorsement with local sporting goods store ($500/year plus gear).' },
      ],
    },
    {
      sportName: 'Softball',
      budget: 3000,
      averageDealSize: 300,
      athleteCount: 2,
      topDealValue: null,
      description: 'Softball players participate in social media partnerships and youth clinic instruction with area softball organizations.',
      notableDeals: null,
    },
    {
      sportName: 'Volleyball',
      budget: 2500,
      averageDealSize: 300,
      athleteCount: 2,
      topDealValue: null,
      description: 'Volleyball players engage in social media content creation and local business partnerships.',
      notableDeals: null,
    },
    {
      sportName: 'Men\'s Soccer',
      budget: 1500,
      averageDealSize: 250,
      athleteCount: 1,
      topDealValue: null,
      description: 'Emerging NIL activity with local soccer academies and sports apparel shops.',
      notableDeals: null,
    },
    {
      sportName: 'Women\'s Soccer',
      budget: 1000,
      averageDealSize: 250,
      athleteCount: 1,
      topDealValue: null,
      description: 'Growing NIL engagement through social media partnerships and community soccer events.',
      notableDeals: null,
    },
  ]

  // TAMUCC breakdowns
  const tamuccBreakdowns = [
    {
      sportName: 'Men\'s Basketball',
      budget: 150000,
      averageDealSize: 15000,
      athleteCount: 10,
      topDealValue: 40000,
      description: 'Men\'s basketball is the engine of TAMUCC\'s NIL ecosystem. The back-to-back Southland Conference championships and NCAA Tournament appearances triggered a surge in NIL activity. Trevian Tennyson\'s landmark auto group deal set the standard, and the collective now actively markets all starters to Corpus Christi businesses in tourism, hospitality, and automotive industries.',
      notableDeals: [
        { athlete: 'Trevian Tennyson (PG)', description: 'Multi-year brand ambassador for Corpus Christi Auto Group — the largest NIL deal in TAMUCC history at $40,000/year. Includes TV commercials, social media, and community appearances.' },
        { athlete: 'Starting SG', description: 'Coastal tourism partnership with Visit Corpus Christi — social media content and promotional appearances ($20,000/year).' },
        { athlete: '6th Man', description: 'Restaurant chain ambassador for a Corpus Christi seafood franchise — social media posts and in-store appearances ($12,000/year).' },
      ],
    },
    {
      sportName: 'Women\'s Basketball',
      budget: 40000,
      averageDealSize: 5000,
      athleteCount: 6,
      topDealValue: null,
      description: 'Women\'s basketball NIL grew significantly after the program\'s historic 2023 Southland Conference Championship and first-ever NCAA Tournament appearance. Players partner with local fitness brands and coastal lifestyle companies.',
      notableDeals: [
        { athlete: 'Conference Tournament MVP', description: 'Fitness apparel partnership with a Corpus Christi activewear brand ($8,000/year).' },
      ],
    },
    {
      sportName: 'Volleyball',
      budget: 35000,
      averageDealSize: 4000,
      athleteCount: 7,
      topDealValue: 15000,
      description: 'Volleyball NIL is the second-largest program at TAMUCC. Five NCAA Tournament appearances and eight conference titles make this one of the most marketable programs in the Southland. Players leverage large social media followings for beachwear, fitness, and lifestyle brand deals.',
      notableDeals: [
        { athlete: 'Kennedy Wright (OH)', description: 'Beachwear brand ambassador — social media content with Corpus Christi Bay backdrops, plus product line collaboration ($15,000/year).' },
        { athlete: 'Starting Libero', description: 'Fitness supplement brand deal — content creation and product endorsement ($6,000/year).' },
      ],
    },
    {
      sportName: 'Women\'s Tennis',
      budget: 25000,
      averageDealSize: 3500,
      athleteCount: 6,
      topDealValue: null,
      description: 'The women\'s tennis program\'s unprecedented four consecutive NCAA Championships appearances (2021-2024) attracted a national racquet brand team deal. Individual players also secure international brand partnerships through their global networks.',
      notableDeals: [
        { athlete: 'Full Team', description: 'National racquet brand team sponsorship — equipment, apparel, and content creation fees split across the roster ($25,000 total).' },
      ],
    },
    {
      sportName: 'Baseball',
      budget: 20000,
      averageDealSize: 3000,
      athleteCount: 5,
      topDealValue: null,
      description: 'Baseball players leverage Corpus Christi\'s strong baseball culture and the program\'s MLB draft history. Deals center on equipment endorsements, local restaurant partnerships, and youth instruction.',
      notableDeals: [
        { athlete: 'Top Pitcher', description: 'Equipment deal with a baseball gear company plus youth pitching clinic partnerships ($5,000/year).' },
      ],
    },
    {
      sportName: 'Softball',
      budget: 10000,
      averageDealSize: 2000,
      athleteCount: 3,
      topDealValue: null,
      description: 'Softball NIL is growing with social media-focused partnerships and local business deals in the Corpus Christi area.',
      notableDeals: null,
    },
    {
      sportName: 'Women\'s Soccer',
      budget: 8000,
      averageDealSize: 2000,
      athleteCount: 3,
      topDealValue: null,
      description: 'Women\'s soccer players engage with fitness and lifestyle brands, leveraging the scenic island campus for social media content.',
      notableDeals: null,
    },
    {
      sportName: 'Men\'s Tennis',
      budget: 6000,
      averageDealSize: 2000,
      athleteCount: 2,
      topDealValue: null,
      description: 'Men\'s tennis players benefit from the program\'s strong conference reputation. International players bring global brand connections.',
      notableDeals: null,
    },
    {
      sportName: 'Beach Volleyball',
      budget: 4000,
      averageDealSize: 1500,
      athleteCount: 2,
      topDealValue: null,
      description: 'Beach volleyball\'s unique island setting creates natural brand partnership opportunities with beachwear, sunscreen, and coastal lifestyle companies. The bay-side courts provide an unbeatable content backdrop.',
      notableDeals: [
        { athlete: 'Top Pair', description: 'Beachwear brand social media content partnership ($2,000/year).' },
      ],
    },
    {
      sportName: 'Track & Field',
      budget: 1500,
      averageDealSize: 500,
      athleteCount: 1,
      topDealValue: null,
      description: 'Emerging NIL activity with running shoe and fitness apparel brands.',
      notableDeals: null,
    },
    {
      sportName: 'Women\'s Golf',
      budget: 500,
      averageDealSize: 500,
      athleteCount: 1,
      topDealValue: null,
      description: 'Early-stage NIL with local golf course partnerships and equipment deals.',
      notableDeals: null,
    },
  ]

  let breakdownCount = 0

  for (const bd of umhbBreakdowns) {
    const sportId = await getSportId('umhb', bd.sportName)
    await prisma.sportNilBreakdown.create({
      data: {
        nilProgramId: nilMap['umhb'].id,
        sportId,
        budget: bd.budget,
        averageDealSize: bd.averageDealSize,
        athleteCount: bd.athleteCount,
        topDealValue: bd.topDealValue,
        description: bd.description,
        notableDeals: bd.notableDeals,
      },
    })
    breakdownCount++
  }

  for (const bd of tamuccBreakdowns) {
    const sportId = await getSportId('tamucc', bd.sportName)
    await prisma.sportNilBreakdown.create({
      data: {
        nilProgramId: nilMap['tamucc'].id,
        sportId,
        budget: bd.budget,
        averageDealSize: bd.averageDealSize,
        athleteCount: bd.athleteCount,
        topDealValue: bd.topDealValue,
        description: bd.description,
        notableDeals: bd.notableDeals,
      },
    })
    breakdownCount++
  }

  console.log(`  Created ${breakdownCount} Sport NIL Breakdowns`)
}
