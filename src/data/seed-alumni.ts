// seed-alumni.ts — Creates NotableAlumni with real NFL draft data

export async function seedAlumni(prisma: any, schoolMap: Record<string, any>) {
  const alumni = [
    // Texas Tech
    { slug: 'texas-tech', name: 'Patrick Mahomes II', position: 'QB', draftYear: 2017, draftRound: 1, draftPick: 10, nflTeam: 'Kansas City Chiefs', careerHighlights: '3x Super Bowl Champion, 2x NFL MVP, 3x Super Bowl MVP. The most dominant quarterback of his generation.', isFirstRound: true, isActive: true },
    { slug: 'texas-tech', name: 'Michael Crabtree', position: 'WR', draftYear: 2009, draftRound: 1, draftPick: 10, nflTeam: 'San Francisco 49ers', careerHighlights: '2x Pro Bowl, 54 career TDs, 6,025 receiving yards. Biletnikoff Award winner at Texas Tech.', isFirstRound: true, isActive: false },
    { slug: 'texas-tech', name: 'Tyree Wilson', position: 'DE', draftYear: 2023, draftRound: 1, draftPick: 7, nflTeam: 'Las Vegas Raiders', careerHighlights: 'First-team All-Big 12. Top defensive prospect from Texas Tech in program history.', isFirstRound: true, isActive: true },
    { slug: 'texas-tech', name: 'Wes Welker', position: 'WR', draftYear: 2004, draftRound: 0, draftPick: 0, nflTeam: 'San Diego Chargers', careerHighlights: '5x Pro Bowl, 9,924 career receiving yards. Undrafted to NFL legend with New England Patriots.', isFirstRound: false, isActive: false },
    { slug: 'texas-tech', name: 'Zach Thomas', position: 'LB', draftYear: 1996, draftRound: 5, draftPick: 154, nflTeam: 'Miami Dolphins', careerHighlights: '7x Pro Bowl, 5x First-team All-Pro, Pro Football Hall of Fame (2023).', isFirstRound: false, isActive: false },
    { slug: 'texas-tech', name: 'Jordyn Brooks', position: 'LB', draftYear: 2020, draftRound: 1, draftPick: 27, nflTeam: 'Seattle Seahawks', careerHighlights: 'Led Seahawks in tackles 3 consecutive seasons. First-team All-Big 12 at Texas Tech.', isFirstRound: true, isActive: true },

    // USC
    { slug: 'usc', name: 'Caleb Williams', position: 'QB', draftYear: 2024, draftRound: 1, draftPick: 1, nflTeam: 'Chicago Bears', careerHighlights: '2022 Heisman Trophy winner. No. 1 overall pick. Electric playmaker and franchise quarterback.', isFirstRound: true, isActive: true },
    { slug: 'usc', name: 'Carson Palmer', position: 'QB', draftYear: 2003, draftRound: 1, draftPick: 1, nflTeam: 'Cincinnati Bengals', careerHighlights: '3x Pro Bowl, 2002 Heisman Trophy winner. No. 1 overall pick.', isFirstRound: true, isActive: false },
    { slug: 'usc', name: 'Troy Polamalu', position: 'S', draftYear: 2003, draftRound: 1, draftPick: 16, nflTeam: 'Pittsburgh Steelers', careerHighlights: '2x Super Bowl Champion, 2010 NFL DPOY, 8x Pro Bowl. Pro Football Hall of Fame (2020).', isFirstRound: true, isActive: false },
    { slug: 'usc', name: 'Ronnie Lott', position: 'S', draftYear: 1981, draftRound: 1, draftPick: 8, nflTeam: 'San Francisco 49ers', careerHighlights: '4x Super Bowl Champion, 10x Pro Bowl. Pro Football Hall of Fame. Greatest safety of all time.', isFirstRound: true, isActive: false },
    { slug: 'usc', name: 'Clay Matthews III', position: 'LB', draftYear: 2009, draftRound: 1, draftPick: 26, nflTeam: 'Green Bay Packers', careerHighlights: '6x Pro Bowl, Super Bowl XLV Champion. One of the most feared pass rushers of his era.', isFirstRound: true, isActive: false },
    { slug: 'usc', name: 'Sam Darnold', position: 'QB', draftYear: 2018, draftRound: 1, draftPick: 3, nflTeam: 'New York Jets', careerHighlights: 'No. 3 overall pick. Led Minnesota Vikings to 14-3 season in 2024.', isFirstRound: true, isActive: true },

    // Baylor
    { slug: 'baylor', name: 'Robert Griffin III', position: 'QB', draftYear: 2012, draftRound: 1, draftPick: 2, nflTeam: 'Washington Redskins', careerHighlights: '2011 Heisman Trophy winner, NFL Offensive Rookie of the Year. Electrifying dual-threat QB.', isFirstRound: true, isActive: false },
    { slug: 'baylor', name: 'Mike Singletary', position: 'LB', draftYear: 1981, draftRound: 2, draftPick: 38, nflTeam: 'Chicago Bears', careerHighlights: '10x Pro Bowl, 2x NFL DPOY, Super Bowl XX Champion. Pro Football Hall of Fame (1998).', isFirstRound: false, isActive: false },
    { slug: 'baylor', name: 'Xavien Howard', position: 'CB', draftYear: 2016, draftRound: 2, draftPick: 38, nflTeam: 'Miami Dolphins', careerHighlights: '4x Pro Bowl, 2x First-team All-Pro, 2020 NFL interception leader.', isFirstRound: false, isActive: true },
    { slug: 'baylor', name: 'Corey Coleman', position: 'WR', draftYear: 2016, draftRound: 1, draftPick: 15, nflTeam: 'Cleveland Browns', careerHighlights: '2015 Biletnikoff Award winner, Big 12 Offensive Player of the Year.', isFirstRound: true, isActive: false },
    { slug: 'baylor', name: 'Jalen Pitre', position: 'S', draftYear: 2022, draftRound: 2, draftPick: 37, nflTeam: 'Houston Texans', careerHighlights: 'NFL All-Rookie Team. Big 12 Defensive Player of the Year at Baylor.', isFirstRound: false, isActive: true },
    { slug: 'baylor', name: 'Thomas Everett', position: 'S', draftYear: 1987, draftRound: 4, draftPick: 99, nflTeam: 'Pittsburgh Steelers', careerHighlights: '2x Super Bowl Champion (with Dallas Cowboys), 19 career interceptions.', isFirstRound: false, isActive: false },

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
