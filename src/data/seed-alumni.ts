// seed-alumni.ts — Creates NotableAlumni with real NFL draft data

export async function seedAlumni(prisma: any, schoolMap: Record<string, any>) {
  const alumni = [
    // Texas Tech — Hall of Famers & All-Time Greats
    { slug: 'texas-tech', name: 'Patrick Mahomes II', position: 'QB', draftYear: 2017, draftRound: 1, draftPick: 10, nflTeam: 'Kansas City Chiefs', careerHighlights: '3x Super Bowl Champion, 3x Super Bowl MVP, 2x NFL MVP. The most dominant quarterback of his generation and greatest Red Raider in NFL history.', isFirstRound: true, isActive: true },
    { slug: 'texas-tech', name: 'Zach Thomas', position: 'LB', draftYear: 1996, draftRound: 5, draftPick: 154, nflTeam: 'Miami Dolphins', careerHighlights: 'Pro Football Hall of Fame (2023). 7x Pro Bowl, 5x First-team All-Pro. One of the greatest linebackers in NFL history despite being a 5th-round pick.', isFirstRound: false, isActive: false },
    { slug: 'texas-tech', name: 'Wes Welker', position: 'WR', draftYear: 2004, draftRound: 0, draftPick: 0, nflTeam: 'San Diego Chargers', careerHighlights: '5x Pro Bowl, 9,924 career receiving yards. Went undrafted out of Texas Tech to become one of the most prolific slot receivers in NFL history with the New England Patriots.', isFirstRound: false, isActive: false },
    { slug: 'texas-tech', name: 'Michael Crabtree', position: 'WR', draftYear: 2009, draftRound: 1, draftPick: 10, nflTeam: 'San Francisco 49ers', careerHighlights: '2x Biletnikoff Award winner (first ever), consensus All-American. 54 NFL TDs, 6,025 receiving yards. Iconic catch vs. UT in 2008.', isFirstRound: true, isActive: false },
    { slug: 'texas-tech', name: 'Dave Parks', position: 'WR', draftYear: 1964, draftRound: 1, draftPick: 1, nflTeam: 'San Francisco 49ers', careerHighlights: 'No. 1 overall pick in the 1964 NFL Draft. Led the NFL in receiving yards (1,344) as a rookie. Only No. 1 overall pick in Texas Tech history.', isFirstRound: true, isActive: false },
    { slug: 'texas-tech', name: 'E.J. Holub', position: 'LB/C', draftYear: 1961, draftRound: 1, draftPick: 1, nflTeam: 'Dallas Texans/Kansas City Chiefs', careerHighlights: 'No. 1 overall pick in the 1961 AFL Draft. 2x AFL All-Star, 2x Super Bowl champion with the Chiefs. Played both linebacker and center.', isFirstRound: true, isActive: false },
    { slug: 'texas-tech', name: 'Donny Anderson', position: 'RB', draftYear: 1966, draftRound: 1, draftPick: 7, nflTeam: 'Green Bay Packers', careerHighlights: 'First-round pick who played in Super Bowls I and II with Vince Lombardi\'s Packers. Versatile runner and receiver.', isFirstRound: true, isActive: false },

    // Texas Tech — Recent NFL Draft Picks
    { slug: 'texas-tech', name: 'Tyree Wilson', position: 'EDGE', draftYear: 2023, draftRound: 1, draftPick: 7, nflTeam: 'Las Vegas Raiders', careerHighlights: 'No. 7 overall pick — highest TTU draft pick since 1964. First-team All-Big 12 with 7 sacks in 2022.', isFirstRound: true, isActive: true },
    { slug: 'texas-tech', name: 'Jordyn Brooks', position: 'LB', draftYear: 2020, draftRound: 1, draftPick: 27, nflTeam: 'Miami Dolphins', careerHighlights: 'Led Seahawks in tackles 3 consecutive seasons (2020-22). First-team All-Big 12 at Texas Tech. Signed with Miami in 2024.', isFirstRound: true, isActive: true },
    { slug: 'texas-tech', name: 'Dadrion Taylor-Demerson', position: 'S', draftYear: 2024, draftRound: 4, draftPick: 104, nflTeam: 'Arizona Cardinals', careerHighlights: 'Immediate starter as a rookie. Two-time All-Big 12 selection and ball-hawk safety at Texas Tech.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Tahj Brooks', position: 'RB', draftYear: 2025, draftRound: 6, draftPick: 193, nflTeam: 'Cincinnati Bengals', careerHighlights: 'Texas Tech all-time leading rusher (4,338 career yards). Two-time First-team All-Big 12. Key contributor to 2025 Big 12 Championship team.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Josh Kelly', position: 'WR', draftYear: 2025, draftRound: 0, draftPick: 0, nflTeam: 'Houston Texans', careerHighlights: 'Biletnikoff Award finalist with 1,200+ receiving yards in 2025. Signed as UDFA with the Texans. Key weapon in TTU\'s Big 12 Championship season.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Jalin Conyers', position: 'TE', draftYear: 2025, draftRound: 5, draftPick: 160, nflTeam: 'Miami Dolphins', careerHighlights: 'Elite pass-catching tight end who transferred from Arizona State. All-Big 12 selection in 2025.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Caleb Rogers', position: 'OL', draftYear: 2025, draftRound: 4, draftPick: 125, nflTeam: 'Las Vegas Raiders', careerHighlights: 'Four-year starter and anchor of the offensive line. All-Big 12 selection who protected Behren Morton.', isFirstRound: false, isActive: true },

    // Texas Tech — Other Active NFL Players
    { slug: 'texas-tech', name: 'Terence Steele', position: 'OT', draftYear: 2020, draftRound: 0, draftPick: 0, nflTeam: 'Dallas Cowboys', careerHighlights: 'Undrafted to full-time starter at right tackle. Started 50+ games for the Cowboys. Remarkable development story.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Broderick Washington Jr.', position: 'DT', draftYear: 2020, draftRound: 5, draftPick: 170, nflTeam: 'Baltimore Ravens', careerHighlights: 'Key rotational interior defensive lineman. Part of consistently top-ranked Baltimore run defense.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Austin McNamara', position: 'P', draftYear: 2024, draftRound: 7, draftPick: 245, nflTeam: 'Dallas Cowboys', careerHighlights: 'Ray Guy Award finalist at TTU. One of the best punters in Big 12 history with 46.5 career average.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Gino Garcia', position: 'K', draftYear: 2024, draftRound: 0, draftPick: 0, nflTeam: 'New York Jets', careerHighlights: 'All-Big 12 kicker who converted 90% of field goals in his final TTU season. Signed as UDFA.', isFirstRound: false, isActive: true },
    { slug: 'texas-tech', name: 'Krishon Merriweather', position: 'LB', draftYear: 2023, draftRound: 0, draftPick: 0, nflTeam: 'Chicago Bears', careerHighlights: 'Big 12 Defensive Player of the Year (2022). Led nation in tackles with 151. Undrafted but earned roster spot.', isFirstRound: false, isActive: true },

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
