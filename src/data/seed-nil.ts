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
      averageDealSize: 85000,
      howToGetInvolved: 'Visit matadorclub.com to learn about NIL opportunities. The Matador Club connects athletes with local and national brands through social media partnerships, appearances, autograph sessions, and brand ambassador programs. All Texas Tech athletes are eligible — contact the NIL office at nil@texastech.edu.',
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
      totalBudget: 32000000,
      footballSpend: 23000000,
      allSportsSpend: 9000000,
      founded: 2022,
      description: '1Oklahoma is the University of Oklahoma\'s exclusive market-based NIL collective, formed from the 2024 merger of three prior collectives (Crimson and Cream, Sooner Nation Collective, and the original 1Oklahoma) under CEO Jeff Weber. Founded in April 2022 by Hall of Fame coach Barry Switzer and Oklahoma business leaders, the collective distributed $32 million to athletes in FY2025-26. In July 2025, 1Oklahoma merged operations with Learfield\'s Sooner Sports Properties under VP/GM Kelly Collyar, integrating brand partnerships with student-athlete storytelling. Combined with OU\'s $20.5 million in NCAA revenue sharing across six sports, Oklahoma athletes have access to approximately $52.5 million in total compensation — competitive with the top tier of the SEC.',
      averageDealSize: 120000,
      howToGetInvolved: 'Visit 1oklahoma.com to explore NIL opportunities. 1Oklahoma connects athletes with national brands, local businesses, and donor-funded deals. Programs include social media partnerships, autograph sessions, youth camps, community appearances, and brand ambassador roles. Contact the NIL office for personalized opportunities.',
      notableDeals: [
        { athlete: 'John Mateer', sport: 'Football', description: 'Starting QB and WSU transfer commanded an estimated $2.5-3.0 million NIL deal — the highest in Oklahoma football history. Brand deals include Beats by Dre, Raising Cane\'s, and ONIT Athlete. Used his Beats deal to secure headphones for the entire OU roster.' },
        { athlete: 'Jaydn Ott', sport: 'Football', description: 'All-American RB transfer from Cal with an estimated $800K-$1M NIL package. His departure from Cal reportedly freed up nearly $1 million in NIL money at his former program.' },
        { athlete: 'Michael Fasusi', sport: 'Football', description: 'Consensus 5-star, No. 1 OT nationally in the 2025 class. Estimated $400K+ NIL deal, though Fasusi publicly stated NIL was not his deciding factor, citing coach Bedenbaugh and program culture.' },
        { athlete: 'David Stone', sport: 'Football', description: '5-star DT who briefly entered the transfer portal in April 2025 after a NIL renegotiation dispute, then returned within 48 hours after terms were adjusted. Had a breakout season: 42 tackles, 8.0 TFL, 1.5 sacks.' },
        { athlete: 'Kendal Daniels', sport: 'Football', description: 'Elite safety transfer from Oklahoma State (240 career tackles, 7.5 sacks, 5 INTs) secured with a top-tier NIL commitment in the heated Bedlam rivalry recruiting battle.' },
        { athlete: 'Deion Burks', sport: 'Football', description: 'Dynamic WR transfer from Purdue who posted 57 receptions, 620 yards, and 4 TDs in 2025 including 107 yards vs. Alabama in the CFP. Strong 2026 NFL Draft prospect.' },
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
