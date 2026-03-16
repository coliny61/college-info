// seed-roster.ts — Creates RosterPlayer entries for all 4 schools (2025 season)

export async function seedRoster(prisma: any, schoolMap: Record<string, any>) {
  const players = [
    // ─── Texas Tech Red Raiders ──────────────────────────────────────────────────
    // Offense
    { slug: 'texas-tech', name: 'Behren Morton', number: 2, position: 'QB', height: '6-2', weight: 220, year: 'SR', hometown: 'Eastland', state: 'TX', highSchool: 'Eastland HS', isStarter: true },
    { slug: 'texas-tech', name: 'J\'Koby Williams', number: 28, position: 'RB', height: '5-10', weight: 185, year: 'SO', hometown: 'Beckville', state: 'TX', highSchool: 'Beckville HS', isStarter: true },
    { slug: 'texas-tech', name: 'Quinten Joyner', number: 0, position: 'RB', height: '5-11', weight: 215, year: 'SO', hometown: 'Manor', state: 'TX', highSchool: 'Manor HS', isStarter: false },
    { slug: 'texas-tech', name: 'Cam\'Ron Valdez', number: 22, position: 'RB', height: '5-9', weight: 200, year: 'JR', hometown: 'Rockdale', state: 'TX', highSchool: 'Rockdale HS', isStarter: false },
    { slug: 'texas-tech', name: 'Caleb Douglas', number: 5, position: 'WR', height: '6-4', weight: 205, year: 'SR', hometown: 'Missouri City', state: 'TX', highSchool: 'Hightower HS', isStarter: true },
    { slug: 'texas-tech', name: 'Micah Hudson', number: 14, position: 'WR', height: '6-0', weight: 200, year: 'SO', hometown: 'Temple', state: 'TX', highSchool: 'Lake Belton HS', isStarter: true },
    { slug: 'texas-tech', name: 'Coy Eakin', number: 3, position: 'WR', height: '6-2', weight: 185, year: 'JR', hometown: 'Stephenville', state: 'TX', highSchool: 'Stephenville HS', isStarter: true },
    { slug: 'texas-tech', name: 'Reggie Virgil', number: 11, position: 'WR', height: '6-4', weight: 210, year: 'SR', hometown: 'Apopka', state: 'FL', highSchool: 'Mount Dora Christian Academy', isStarter: false },
    { slug: 'texas-tech', name: 'Kelby Valsin', number: 6, position: 'WR', height: '6-1', weight: 185, year: 'SO', hometown: 'Houston', state: 'TX', highSchool: 'Westfield HS', isStarter: false },
    { slug: 'texas-tech', name: 'Howard Sampson', number: 79, position: 'OT', height: '6-8', weight: 340, year: 'SR', hometown: 'Humble', state: 'TX', highSchool: 'Atascocita HS', isStarter: true },
    { slug: 'texas-tech', name: 'Will Jados', number: 76, position: 'OG', height: '6-7', weight: 310, year: 'SR', hometown: 'Westerville', state: 'OH', highSchool: 'Westerville Central HS', isStarter: true },
    { slug: 'texas-tech', name: 'Sheridan Wilson', number: 72, position: 'C', height: '6-5', weight: 300, year: 'JR', hometown: 'Argyle', state: 'TX', highSchool: 'Argyle HS', isStarter: true },
    { slug: 'texas-tech', name: 'Davion Carter', number: 56, position: 'OG', height: '6-0', weight: 295, year: 'SR', hometown: 'Pearl', state: 'MS', highSchool: 'Pearl HS', isStarter: true },
    { slug: 'texas-tech', name: 'Jacob Ponton', number: 70, position: 'OT', height: '6-8', weight: 305, year: 'FR', hometown: 'Dripping Springs', state: 'TX', highSchool: 'Dripping Springs HS', isStarter: true },
    // Defense
    { slug: 'texas-tech', name: 'Jacob Rodriguez', number: 10, position: 'LB', height: '6-1', weight: 230, year: 'SR', hometown: 'Wichita Falls', state: 'TX', highSchool: 'S.H. Rider HS', isStarter: true },
    { slug: 'texas-tech', name: 'Ben Roberts', number: 13, position: 'LB', height: '6-3', weight: 235, year: 'JR', hometown: 'Haslet', state: 'TX', highSchool: 'V.R. Eaton HS', isStarter: true },
    { slug: 'texas-tech', name: 'John Curry', number: 4, position: 'LB', height: '6-2', weight: 235, year: 'SO', hometown: 'Dallas', state: 'TX', highSchool: 'South Oak Cliff HS', isStarter: false },
    { slug: 'texas-tech', name: 'Bryce Ramirez', number: 33, position: 'LB', height: '6-2', weight: 235, year: 'GR', hometown: 'Richmond', state: 'TX', highSchool: 'George Ranch HS', isStarter: false },
    { slug: 'texas-tech', name: 'Lee Hunter', number: 92, position: 'DT', height: '6-4', weight: 325, year: 'SR', hometown: 'Eight Mile', state: 'AL', highSchool: 'Vigor HS', isStarter: true },
    { slug: 'texas-tech', name: 'Romello Height', number: 9, position: 'DE', height: '6-3', weight: 235, year: 'SR', hometown: 'Dublin', state: 'GA', highSchool: 'Dublin HS', isStarter: true },
    { slug: 'texas-tech', name: 'E\'Maurion Banks', number: 8, position: 'DT', height: '6-5', weight: 300, year: 'SR', hometown: 'Wichita Falls', state: 'TX', highSchool: 'Rider HS', isStarter: true },
    { slug: 'texas-tech', name: 'Amier Boyd', number: 27, position: 'CB', height: '6-2', weight: 190, year: 'JR', hometown: 'Phoenix', state: 'AZ', highSchool: 'Mountain Pointe HS', isStarter: true },
    { slug: 'texas-tech', name: 'Maurion Horn', number: 15, position: 'CB', height: '5-11', weight: 190, year: 'JR', hometown: 'Broken Arrow', state: 'OK', highSchool: 'Broken Arrow HS', isStarter: true },
    { slug: 'texas-tech', name: 'A.J. McCarty', number: 1, position: 'S', height: '5-11', weight: 180, year: 'SR', hometown: 'Brownwood', state: 'TX', highSchool: 'Brownwood HS', isStarter: true },
    { slug: 'texas-tech', name: 'Miquel Dingle Jr.', number: 23, position: 'S', height: '6-2', weight: 220, year: 'SO', hometown: 'Charleston', state: 'SC', highSchool: 'Fort Dorchester HS', isStarter: true },
    // Special Teams
    { slug: 'texas-tech', name: 'Upton Bellenfant', number: 97, position: 'K', height: '6-1', weight: 190, year: 'JR', hometown: 'Ashburn', state: 'VA', highSchool: 'Briar Woods HS', isStarter: true },
    { slug: 'texas-tech', name: 'Jack Burgess', number: 41, position: 'P', height: '6-2', weight: 215, year: 'SO', hometown: 'Bacchus Marsh', state: 'VIC', highSchool: 'Bacchus Marsh Grammar', isStarter: true },

    // ─── Oklahoma Sooners ────────────────────────────────────────────────────────
    // Offense
    { slug: 'oklahoma', name: 'John Mateer', number: 10, position: 'QB', height: '6-1', weight: 224, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Cornerstone Christian', isStarter: true },
    { slug: 'oklahoma', name: 'Michael Hawkins Jr.', number: 3, position: 'QB', height: '6-1', weight: 206, year: 'SO', hometown: 'Dallas', state: 'TX', highSchool: 'Emerson HS', isStarter: false },
    { slug: 'oklahoma', name: 'Jaydn Ott', number: 0, position: 'RB', height: '5-11', weight: 208, year: 'SR', hometown: 'Chino', state: 'CA', highSchool: 'Norco HS', isStarter: true },
    { slug: 'oklahoma', name: 'Jovantae Barnes', number: 2, position: 'RB', height: '6-0', weight: 211, year: 'SR', hometown: 'Las Vegas', state: 'NV', highSchool: 'Desert Pines HS', isStarter: false },
    { slug: 'oklahoma', name: 'Deion Burks', number: 4, position: 'WR', height: '5-9', weight: 188, year: 'SR', hometown: 'Inkster', state: 'MI', highSchool: 'Belleville HS', isStarter: true },
    { slug: 'oklahoma', name: 'Isaiah Sategna III', number: 5, position: 'WR', height: '5-10', weight: 182, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Fayetteville HS (AR)', isStarter: true },
    { slug: 'oklahoma', name: 'Keontez Lewis', number: 9, position: 'WR', height: '6-2', weight: 197, year: 'SR', hometown: 'East St. Louis', state: 'IL', highSchool: 'East St. Louis HS', isStarter: true },
    { slug: 'oklahoma', name: 'Jaren Kanak', number: 12, position: 'TE', height: '6-2', weight: 233, year: 'SR', hometown: 'Hays', state: 'KS', highSchool: 'Hays HS', isStarter: true },
    { slug: 'oklahoma', name: 'Kaden Helms', number: 18, position: 'TE', height: '6-5', weight: 238, year: 'JR', hometown: 'Bellevue', state: 'NE', highSchool: 'Bellevue West HS', isStarter: false },
    { slug: 'oklahoma', name: 'Michael Fasusi', number: 56, position: 'OT', height: '6-5', weight: 309, year: 'FR', hometown: 'Lewisville', state: 'TX', highSchool: 'Lewisville HS', isStarter: true },
    { slug: 'oklahoma', name: 'Jacob Sexton', number: 76, position: 'OT', height: '6-6', weight: 330, year: 'SR', hometown: 'Edmond', state: 'OK', highSchool: 'Deer Creek HS', isStarter: true },
    { slug: 'oklahoma', name: 'Febechi Nwaiwu', number: 54, position: 'OG', height: '6-4', weight: 323, year: 'SR', hometown: 'Coppell', state: 'TX', highSchool: 'Coppell HS', isStarter: true },
    { slug: 'oklahoma', name: 'Heath Ozaeta', number: 77, position: 'OG', height: '6-5', weight: 311, year: 'SO', hometown: 'Snoqualmie', state: 'WA', highSchool: 'Mount Si HS', isStarter: true },
    { slug: 'oklahoma', name: 'Troy Everett', number: 52, position: 'C', height: '6-3', weight: 315, year: 'SR', hometown: 'Roanoke', state: 'VA', highSchool: 'Lord Botetourt HS', isStarter: true },
    // Defense
    { slug: 'oklahoma', name: 'R Mason Thomas', number: 32, position: 'EDGE', height: '6-2', weight: 249, year: 'SR', hometown: 'Fort Lauderdale', state: 'FL', highSchool: 'Cardinal Gibbons HS', isStarter: true },
    { slug: 'oklahoma', name: 'Damonic Williams', number: 52, position: 'DT', height: '6-1', weight: 323, year: 'SR', hometown: 'Torrance', state: 'CA', highSchool: 'West Torrance HS', isStarter: true },
    { slug: 'oklahoma', name: 'David Stone', number: 0, position: 'DT', height: '6-3', weight: 310, year: 'SO', hometown: 'Del City', state: 'OK', highSchool: 'Del City HS', isStarter: true },
    { slug: 'oklahoma', name: 'Marvin Jones Jr.', number: 97, position: 'DE', height: '6-5', weight: 262, year: 'JR', hometown: 'Sunrise', state: 'FL', highSchool: 'American Heritage HS', isStarter: true },
    { slug: 'oklahoma', name: 'Kip Lewis', number: 10, position: 'LB', height: '6-1', weight: 227, year: 'JR', hometown: 'Carthage', state: 'TX', highSchool: 'Carthage HS', isStarter: true },
    { slug: 'oklahoma', name: 'Kobie McKinzie', number: 11, position: 'LB', height: '6-2', weight: 236, year: 'JR', hometown: 'Lubbock', state: 'TX', highSchool: 'Lubbock-Cooper HS', isStarter: true },
    { slug: 'oklahoma', name: 'Sammy Omosigho', number: 7, position: 'LB', height: '6-1', weight: 235, year: 'JR', hometown: 'Heartland', state: 'TX', highSchool: 'Crandall HS', isStarter: false },
    { slug: 'oklahoma', name: 'Gentry Williams', number: 9, position: 'CB', height: '5-11', weight: 187, year: 'JR', hometown: 'Tulsa', state: 'OK', highSchool: 'Booker T. Washington HS', isStarter: true },
    { slug: 'oklahoma', name: 'Robert Spears-Jennings', number: 3, position: 'CB', height: '6-1', weight: 192, year: 'SR', hometown: 'Broken Arrow', state: 'OK', highSchool: 'Broken Arrow HS', isStarter: true },
    { slug: 'oklahoma', name: 'Peyton Bowen', number: 22, position: 'S', height: '6-0', weight: 201, year: 'JR', hometown: 'Corinth', state: 'TX', highSchool: 'Guyer HS', isStarter: true },
    { slug: 'oklahoma', name: 'Kendal Daniels', number: 5, position: 'S', height: '6-4', weight: 195, year: 'JR', hometown: 'Beggs', state: 'OK', highSchool: 'Beggs HS', isStarter: true },
    // Special Teams
    { slug: 'oklahoma', name: 'Tate Sandell', number: 29, position: 'K', height: '5-9', weight: 182, year: 'SR', hometown: 'Port Neches', state: 'TX', highSchool: 'Port Neches-Groves HS', isStarter: true },
    { slug: 'oklahoma', name: 'Jacob Ulrich', number: 87, position: 'P', height: '6-5', weight: 206, year: 'SO', hometown: 'Dacula', state: 'GA', highSchool: 'Mill Creek HS', isStarter: true },
  ]

  for (const player of players) {
    const { slug, ...data } = player
    await prisma.rosterPlayer.create({
      data: {
        schoolId: schoolMap[slug].id,
        ...data,
      },
    })
  }
  console.log(`  Created ${players.length} Roster Players`)
}
