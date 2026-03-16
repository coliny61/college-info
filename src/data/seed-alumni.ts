// seed-alumni.ts — Creates NotableAlumni with real NFL draft data

export async function seedAlumni(prisma: any, schoolMap: Record<string, any>) {
  const alumni = [
    // Texas Tech
    { slug: 'texas-tech', name: 'Patrick Mahomes II', position: 'QB', draftYear: 2017, draftRound: 1, draftPick: 10, nflTeam: 'Kansas City Chiefs', careerHighlights: '3x Super Bowl Champion, 2x NFL MVP, 3x Super Bowl MVP. The most dominant quarterback of his generation.', isFirstRound: true, isActive: true },
    { slug: 'texas-tech', name: 'Michael Crabtree', position: 'WR', draftYear: 2009, draftRound: 1, draftPick: 10, nflTeam: 'San Francisco 49ers', careerHighlights: '2x Pro Bowl, 54 career TDs, 6,025 receiving yards. Biletnikoff Award winner at Texas Tech.', isFirstRound: true, isActive: false },
    { slug: 'texas-tech', name: 'Tyree Wilson', position: 'DE', draftYear: 2023, draftRound: 1, draftPick: 7, nflTeam: 'Las Vegas Raiders', careerHighlights: 'First-team All-Big 12. Top defensive prospect from Texas Tech in program history.', isFirstRound: true, isActive: true },
    { slug: 'texas-tech', name: 'Wes Welker', position: 'WR', draftYear: 2004, draftRound: 0, draftPick: 0, nflTeam: 'San Diego Chargers', careerHighlights: '5x Pro Bowl, 9,924 career receiving yards. Undrafted to NFL legend with New England Patriots.', isFirstRound: false, isActive: false },
    { slug: 'texas-tech', name: 'Zach Thomas', position: 'LB', draftYear: 1996, draftRound: 5, draftPick: 154, nflTeam: 'Miami Dolphins', careerHighlights: '7x Pro Bowl, 5x First-team All-Pro, Pro Football Hall of Fame (2023).', isFirstRound: false, isActive: false },
    { slug: 'texas-tech', name: 'Jordyn Brooks', position: 'LB', draftYear: 2020, draftRound: 1, draftPick: 27, nflTeam: 'Miami Dolphins', careerHighlights: 'Led Seahawks in tackles 3 consecutive seasons before signing with Miami. First-team All-Big 12 at Texas Tech.', isFirstRound: true, isActive: true },
    { slug: 'texas-tech', name: 'Terence Steele', position: 'OT', draftYear: 2020, draftRound: 0, draftPick: 0, nflTeam: 'Dallas Cowboys', careerHighlights: 'Undrafted to full-time starter at right tackle for the Cowboys. Started 50+ games in first four NFL seasons.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Broderick Washington Jr.', position: 'DT', draftYear: 2020, draftRound: 5, draftPick: 170, nflTeam: 'Baltimore Ravens', careerHighlights: 'Key interior defensive lineman for the Ravens. Part of a consistently top-ranked Baltimore run defense.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Dadrion Taylor-Demerson', position: 'S', draftYear: 2024, draftRound: 4, draftPick: 104, nflTeam: 'Arizona Cardinals', careerHighlights: 'Immediate contributor as a rookie. Two-time All-Big 12 selection at Texas Tech.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Tahj Brooks', position: 'RB', draftYear: 2025, draftRound: 6, draftPick: 193, nflTeam: 'Cincinnati Bengals', careerHighlights: 'Texas Tech all-time leading rusher with 4,338 career yards. Two-time First-team All-Big 12.', isFirstRound: false, isActive: true },

    // Oklahoma
    { slug: 'oklahoma', name: 'Baker Mayfield', position: 'QB', draftYear: 2018, draftRound: 1, draftPick: 1, nflTeam: 'Cleveland Browns', careerHighlights: '2017 Heisman Trophy winner. No. 1 overall pick. Most prolific passer in Big 12 history.', isFirstRound: true, isActive: true },
    { slug: 'oklahoma', name: 'Kyler Murray', position: 'QB', draftYear: 2019, draftRound: 1, draftPick: 1, nflTeam: 'Arizona Cardinals', careerHighlights: '2018 Heisman Trophy winner. No. 1 overall pick. NFL Offensive Rookie of the Year.', isFirstRound: true, isActive: true },
    { slug: 'oklahoma', name: 'Adrian Peterson', position: 'RB', draftYear: 2007, draftRound: 1, draftPick: 7, nflTeam: 'Minnesota Vikings', careerHighlights: '7x Pro Bowl, 2012 NFL MVP, 14,918 career rushing yards. Pro Football Hall of Fame (2026).', isFirstRound: true, isActive: false },
    { slug: 'oklahoma', name: 'Sam Bradford', position: 'QB', draftYear: 2010, draftRound: 1, draftPick: 1, nflTeam: 'St. Louis Rams', careerHighlights: '2008 Heisman Trophy winner. No. 1 overall pick. NFL Offensive Rookie of the Year.', isFirstRound: true, isActive: false },
    { slug: 'oklahoma', name: 'Lee Roy Selmon', position: 'DE', draftYear: 1976, draftRound: 1, draftPick: 1, nflTeam: 'Tampa Bay Buccaneers', careerHighlights: 'No. 1 overall pick, 1979 NFL DPOY, 6x Pro Bowl. Pro Football Hall of Fame (1995).', isFirstRound: true, isActive: false },
    { slug: 'oklahoma', name: 'CeeDee Lamb', position: 'WR', draftYear: 2020, draftRound: 1, draftPick: 17, nflTeam: 'Dallas Cowboys', careerHighlights: '3x Pro Bowl, 2023 NFL receiving yards leader. Elite route runner and playmaker.', isFirstRound: true, isActive: true },
  ]

  for (const alum of alumni) {
    const { slug, ...data } = alum
    await prisma.notableAlumni.create({
      data: {
        schoolId: schoolMap[slug].id,
        ...data,
      },
    })
  }
  console.log(`  Created ${alumni.length} Notable Alumni`)
}
