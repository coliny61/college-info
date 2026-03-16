// seed-athletics.ts — Creates Sports, Coaches, Facilities, Hotspots

export async function seedAthletics(prisma: any, schoolMap: Record<string, any>) {
  // ─── Sports ─────────────────────────────────────────────────────────────────
  const sportDefinitions = [
    // Football
    {
      slug: 'texas-tech', name: 'Football', conference: 'Big 12', headCoach: 'Joey McGuire', record: '8-5', ranking: null,
      offensiveScheme: 'Spread RPO',
      defensiveScheme: '4-2-5 Multiple',
      offenseDescription: 'An up-tempo spread system built around run-pass options and tempo. OC Mack Leftwich averaged 41.8 ppg at his previous stops. The scheme features heavy pre-snap motion, zone-read concepts, and explosive play-action shots off run-game success. Quarterbacks are asked to make quick decisions in a one-read RPO structure.',
      defenseDescription: 'A 4-2-5 multiple front that plays fast and aggressive. DC Shiel Wood brings a pressure-heavy philosophy with pattern-matching coverage behind it. The extra defensive back replaces a linebacker to defend the spread-heavy Big 12, while still maintaining gap integrity against the run.',
    },
    {
      slug: 'oklahoma', name: 'Football', conference: 'SEC', headCoach: 'Brent Venables', record: '6-7', ranking: null,
      offensiveScheme: 'Air Raid / Tempo',
      defensiveScheme: '4-3 Multiple',
      offenseDescription: 'OC Ben Arbuckle brings an Air Raid system from Washington State that emphasizes tempo, quick passing concepts, and efficient use of short-to-intermediate routes. The scheme uses four-wide sets extensively and relies on the quarterback making fast, decisive reads.',
      defenseDescription: 'Brent Venables\' 4-3 multiple defense is built on man-coverage principles, aggressive pass rushing, and disciplined gap control. The system won two national championships at Clemson and features complex pre-snap movement to confuse offensive lines and quarterbacks.',
    },
  ]

  // sportMap keyed by "slug-sportName" to handle multiple sports per school
  const sportMap: Record<string, any> = {}
  for (const def of sportDefinitions) {
    const sport = await prisma.sport.create({
      data: {
        schoolId: schoolMap[def.slug].id,
        name: def.name,
        conference: def.conference,
        headCoach: def.headCoach,
        record: def.record,
        ranking: def.ranking,
        offensiveScheme: def.offensiveScheme,
        defensiveScheme: def.defensiveScheme,
        offenseDescription: def.offenseDescription,
        defenseDescription: def.defenseDescription,
      },
    })
    sportMap[`${def.slug}-${def.name}`] = sport
    // Keep backward compat for Football references
    if (def.name === 'Football') {
      sportMap[def.slug] = sport
    }
  }
  console.log(`  Created ${sportDefinitions.length} Sports`)

  // ─── Coaches ────────────────────────────────────────────────────────────────
  const coachDefinitions = [
    // ─── Texas Tech ──────────────────────────────────────────────────────────────
    { slug: 'texas-tech', name: 'Joey McGuire', title: 'Head Coach', bio: 'Joey McGuire, a former Texas high school coaching legend, took over at Texas Tech in 2022 and has quickly elevated the program\'s recruiting and culture. Known for his infectious energy and deep Texas recruiting ties, McGuire has brought new excitement to Red Raider football.', yearsAtSchool: 3 },
    { slug: 'texas-tech', name: 'Mack Leftwich', title: 'Offensive Coordinator / Quarterbacks', bio: 'A rising offensive mind whose up-tempo systems averaged 41.8 points per game at UIW and Texas State. Leftwich was hired by Joey McGuire in December 2024 and signed a contract extension through 2028 after a strong first season.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Shiel Wood', title: 'Defensive Coordinator', bio: 'Hired from Houston in December 2024, Wood has a reputation for immediately improving defenses at every stop including Troy, Tulane, and Houston. Extended through 2028 alongside Leftwich.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Emmett Jones', title: 'Wide Receivers / Passing Game Coordinator', bio: 'Returned to Texas Tech after a stint as interim head coach at Kansas. One of the top wide receiver developers in the Big 12 and a key recruiter in the Dallas-Fort Worth metroplex.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Clay McGuire', title: 'Offensive Line', bio: 'A former Red Raider offensive lineman who played in the NFL. Brings NFL-level technique coaching and a deep understanding of Texas Tech\'s blocking schemes.', yearsAtSchool: 3 },
    { slug: 'texas-tech', name: 'DeAndre Smith', title: 'Running Backs', bio: 'High-energy running backs coach known for developing explosive, versatile backs. Recruits heavily in the state of Texas.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Josh Bookbinder', title: 'Tight Ends / Special Teams Coordinator', bio: 'A McGuire hire from the high school ranks who has quickly adapted to college coaching. Coordinates all special teams units.', yearsAtSchool: 3 },
    { slug: 'texas-tech', name: 'Marcel Yates', title: 'Cornerbacks', bio: 'Experienced defensive backs coach with coordinator experience at Boise State. Known for developing NFL-caliber cornerbacks.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Kenny Perry', title: 'Safeties', bio: 'Former Texas Tech player who returned to coach. Deep knowledge of the program\'s culture and traditions.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Jeremiah Washington', title: 'Defensive Line', bio: 'A rising defensive line coach who has developed multiple NFL draft picks. Focuses on hand technique and pass-rush development.', yearsAtSchool: 1 },
    { slug: 'texas-tech', name: 'Matt Linehan', title: 'Linebackers', bio: 'Former college quarterback turned defensive coach. Brings an offensive perspective to linebacker play, particularly in pass coverage.', yearsAtSchool: 1 },
    { slug: 'texas-tech', name: 'Rusty Whitt', title: 'Director of Strength & Conditioning', bio: 'Oversees the physical development of all football student-athletes. Has built one of the most intense offseason programs in the Big 12.', yearsAtSchool: 3 },

    // ─── Oklahoma ────────────────────────────────────────────────────────────────
    { slug: 'oklahoma', name: 'Brent Venables', title: 'Head Coach', bio: 'Brent Venables, a two-time national championship-winning defensive coordinator at Clemson, returned to his alma mater as head coach in 2022. Now navigating OU\'s transition to the SEC, Venables is building a program rooted in defensive toughness and championship culture.', yearsAtSchool: 3 },
    { slug: 'oklahoma', name: 'Ben Arbuckle', title: 'Offensive Coordinator', bio: 'The young play-caller from Washington State brings an innovative Air Raid system to Norman, giving the Sooners a high-tempo, explosive passing attack.', yearsAtSchool: 1 },
    { slug: 'oklahoma', name: 'Todd Bates', title: 'Associate Head Coach / Co-Defensive Coordinator', bio: 'A longtime Venables lieutenant who followed him from Clemson to Oklahoma. Bates coaches the defensive tackles and was elevated to co-defensive coordinator, helping anchor the Sooners\' physical SEC defense.', yearsAtSchool: 3 },
    { slug: 'oklahoma', name: 'Miguel Chavis', title: 'Defensive Line / Co-Defensive Coordinator', bio: 'Co-defensive coordinator who works closely with Venables and Bates. Develops explosive pass rushers using NFL-level hand technique drills.', yearsAtSchool: 2 },
    { slug: 'oklahoma', name: 'Jay Valai', title: 'Cornerbacks', bio: 'Former NFL defensive back who brings professional playing experience to his coaching. One of the top cornerback developers and recruiters in the country.', yearsAtSchool: 2 },
    { slug: 'oklahoma', name: 'Brandon Hall', title: 'Safeties', bio: 'An experienced defensive backs coach who emphasizes film study, positioning, and instincts. Has coached at multiple SEC programs.', yearsAtSchool: 2 },
    { slug: 'oklahoma', name: 'Joe Jon Finley', title: 'Tight Ends / Special Teams Coordinator', bio: 'A former Oklahoma and NFL tight end who returned to his alma mater. Coordinates special teams and develops athletic tight ends for the Air Raid system.', yearsAtSchool: 3 },
    { slug: 'oklahoma', name: 'DeMarco Murray', title: 'Running Backs', bio: 'The former Oklahoma All-American and 2014 NFL rushing champion returned to Norman to coach. Brings elite NFL experience and is a powerful recruiter for the Sooner brand.', yearsAtSchool: 2 },
    { slug: 'oklahoma', name: 'Emmett Jones', title: 'Wide Receivers', bio: 'An elite wide receiver technician and one of the top recruiters in the Big 12. Previously coached at Kansas and Texas Tech.', yearsAtSchool: 1 },
    { slug: 'oklahoma', name: 'Bill Bedenbaugh', title: 'Offensive Line', bio: 'A longtime Oklahoma offensive line coach who has been with the program for over a decade. Has produced multiple NFL offensive linemen and is a cornerstone of OU recruiting.', yearsAtSchool: 11 },
    { slug: 'oklahoma', name: 'Jerry Schmidt', title: 'Director of Strength & Conditioning', bio: 'The legendary "Big Schmitty" has been one of the most feared strength coaches in college football. His offseason program is known for building elite physical toughness.', yearsAtSchool: 3 },
  ]

  // Coaching history for head football coaches
  const coachingHistory: Record<string, { careerRecord: string; championships: string[]; previousRoles: string[]; awards: string[]; playersInNfl: number }> = {
    'Joey McGuire': {
      careerRecord: '36-18',
      championships: ['2025 Big 12 Championship'],
      previousRoles: ['Head Coach, Cedar Hill HS (2003-2016)', 'Associate HC / DL Coach, Baylor (2017-2021)'],
      awards: ['2025 Big 12 Coach of the Year', 'Built Texas Tech into a Big 12 contender in 3 seasons'],
      playersInNfl: 12,
    },
    'Brent Venables': {
      careerRecord: '22-17',
      championships: ['2000 National Championship (as OU DC)', '2016 National Championship (as Clemson DC)', '2018 National Championship (as Clemson DC)'],
      previousRoles: ['Defensive Coordinator, Clemson (2012-2021)', 'Co-Defensive Coordinator, Oklahoma (1999-2011)'],
      awards: ['2016 Broyles Award (Top Assistant Coach in America)', '2x National Championship DC'],
      playersInNfl: 55,
    },
  }

  for (const def of coachDefinitions) {
    const sportKey = (def as any).sport ? `${def.slug}-${(def as any).sport}` : def.slug
    const history = coachingHistory[def.name]
    await prisma.coach.create({
      data: {
        sportId: sportMap[sportKey].id,
        name: def.name,
        title: def.title,
        bio: def.bio,
        yearsAtSchool: def.yearsAtSchool,
        ...(history ? {
          careerRecord: history.careerRecord,
          championships: history.championships,
          previousRoles: history.previousRoles,
          awards: history.awards,
          playersInNfl: history.playersInNfl,
        } : {}),
      },
    })
  }
  console.log(`  Created ${coachDefinitions.length} Coaches`)

  // ─── Facilities ─────────────────────────────────────────────────────────────
  const facilityDefinitions = [
    // Texas Tech
    { slug: 'texas-tech', key: 'texas-tech-stadium', name: 'Jones AT&T Stadium', type: 'stadium', description: 'A 60,454-seat stadium in the heart of Lubbock, known for its electric game-day atmosphere and the iconic Fearless Champion statue. The Double T scoreboard lights up red after every Red Raider victory.', panoramaUrl: '/panoramas/texas-tech-stadium.jpg' },
    { slug: 'texas-tech', key: 'texas-tech-practice', name: 'Sports Performance Center', type: 'practice', description: 'A $46 million state-of-the-art indoor practice facility with a full-size synthetic turf field, coaches\' offices, meeting rooms, and sports science labs.', panoramaUrl: '/panoramas/texas-tech-practice.jpg' },
    { slug: 'texas-tech', key: 'texas-tech-weight-room', name: 'Strength & Conditioning Center', type: 'weight-room', description: 'A massive 25,000 sq ft training facility with Olympic platforms, custom Red Raider branding, and comprehensive recovery amenities including cold plunge pools and cryotherapy chambers.', panoramaUrl: '/panoramas/texas-tech-weight-room.jpg' },
    { slug: 'texas-tech', key: 'texas-tech-locker-room', name: 'Red Raider Locker Room', type: 'locker-room', description: 'A recently renovated players\' locker room with custom wood-and-leather lockers, LED lighting in scarlet and black, and displays honoring Red Raider legends.', panoramaUrl: '/panoramas/texas-tech-locker-room.jpg' },
    // Oklahoma
    { slug: 'oklahoma', key: 'oklahoma-stadium', name: 'Gaylord Family Oklahoma Memorial Stadium', type: 'stadium', description: 'Known as "The Palace on the Prairie," this 80,126-seat stadium has been the home of Sooner football since 1923. The Sooner Schooner charges across the field after every OU score, one of college football\'s most beloved traditions.', panoramaUrl: '/panoramas/oklahoma-stadium.jpg' },
    { slug: 'oklahoma', key: 'oklahoma-practice', name: 'Everest Training Center', type: 'practice', description: 'A world-class indoor practice facility with a full-size synthetic field, connected to the Switzer Center for seamless player preparation and game-planning.', panoramaUrl: '/panoramas/oklahoma-practice.jpg' },
    { slug: 'oklahoma', key: 'oklahoma-weight-room', name: 'Headington Family Fitness Center', type: 'weight-room', description: 'A state-of-the-art 20,000 sq ft strength and conditioning facility with custom equipment, GPS performance tracking, and comprehensive recovery amenities.', panoramaUrl: '/panoramas/oklahoma-weight-room.jpg' },
    { slug: 'oklahoma', key: 'oklahoma-locker-room', name: 'Sooner Legends Locker Room', type: 'locker-room', description: 'A cathedral-like players\' locker room with custom crimson-and-cream lockers, seven national championship displays, and a tunnel walk through the Barry Switzer Center to the field.', panoramaUrl: '/panoramas/oklahoma-locker-room.jpg' },
  ]

  const facilityMap: Record<string, any> = {}
  for (const def of facilityDefinitions) {
    const facility = await prisma.facility.create({
      data: {
        schoolId: schoolMap[def.slug].id,
        sportId: sportMap[def.slug].id,
        name: def.name,
        type: def.type,
        description: def.description,
        panoramaUrl: def.panoramaUrl,
      },
    })
    facilityMap[def.key] = facility
  }
  console.log(`  Created ${facilityDefinitions.length} Facilities`)

  // ─── Hotspots ───────────────────────────────────────────────────────────────
  const hotspotDefinitions = [
    // Texas Tech Stadium
    { facilityKey: 'texas-tech-stadium', x: 0.5, y: 0.8, label: 'Fearless Champion', description: 'The iconic masked rider statue — a symbol of Texas Tech\'s fearless spirit — stands guard at the stadium entrance.' },
    { facilityKey: 'texas-tech-stadium', x: 0.7, y: 0.3, label: 'Double T Scoreboard', description: 'The massive Double T LED scoreboard lights up scarlet red after every Red Raider touchdown.' },
    { facilityKey: 'texas-tech-stadium', x: 0.3, y: 0.5, label: 'Saddle Tramps Section', description: 'The rowdy student section where Texas Tech\'s Saddle Tramps spirit organization leads the crowd in cheers.' },
    // Texas Tech Practice
    { facilityKey: 'texas-tech-practice', x: 0.5, y: 0.5, label: 'Indoor Turf Field', description: 'A full-size synthetic turf field for year-round practice in Lubbock\'s variable weather conditions.' },
    { facilityKey: 'texas-tech-practice', x: 0.2, y: 0.3, label: 'Sports Science Lab', description: 'GPS tracking, motion capture, and performance analytics for player development optimization.' },
    // Texas Tech Weight Room
    { facilityKey: 'texas-tech-weight-room', x: 0.4, y: 0.4, label: 'Olympic Platforms', description: 'Custom-built Olympic lifting platforms with Red Raider branding and competition-grade equipment.' },
    { facilityKey: 'texas-tech-weight-room', x: 0.7, y: 0.6, label: 'Recovery Suite', description: 'Cold plunge pools, cryotherapy chambers, and NormaTec compression boots for elite recovery.' },
    // Texas Tech Locker Room
    { facilityKey: 'texas-tech-locker-room', x: 0.5, y: 0.5, label: 'Red Raider Legacy Wall', description: 'A wall honoring Texas Tech football legends with career highlights and NFL achievements.' },

    // Oklahoma Stadium
    { facilityKey: 'oklahoma-stadium', x: 0.4, y: 0.7, label: 'Sooner Schooner', description: 'The iconic covered wagon pulled by ponies Boomer and Sooner, which charges across the field after every Oklahoma score.' },
    { facilityKey: 'oklahoma-stadium', x: 0.7, y: 0.3, label: 'Barry Switzer Center', description: 'The state-of-the-art team facility named after legendary coach Barry Switzer, featuring a tunnel walk to the field.' },
    { facilityKey: 'oklahoma-stadium', x: 0.2, y: 0.5, label: 'Championship Alley', description: 'A walkway displaying all seven of Oklahoma\'s national championship trophies and Heisman winners.' },
    // Oklahoma Practice
    { facilityKey: 'oklahoma-practice', x: 0.5, y: 0.5, label: 'Indoor Field', description: 'A full-size indoor synthetic turf field for all-weather practice with climate control.' },
    { facilityKey: 'oklahoma-practice', x: 0.2, y: 0.3, label: 'QB Development Lab', description: 'A dedicated quarterback training area with video analysis stations and throwing lanes.' },
    // Oklahoma Weight Room
    { facilityKey: 'oklahoma-weight-room', x: 0.5, y: 0.5, label: 'Sooner Power', description: 'Custom Oklahoma-branded Olympic platforms and power racks in a 20,000 sq ft facility.' },
    // Oklahoma Locker Room
    { facilityKey: 'oklahoma-locker-room', x: 0.5, y: 0.5, label: 'Legends Gallery', description: 'A gallery honoring OU\'s football legends including Billy Sims, Adrian Peterson, and Baker Mayfield with jerseys and memorabilia.' },
  ]

  let hotspotCount = 0
  for (const def of hotspotDefinitions) {
    const facility = facilityMap[def.facilityKey]
    if (!facility) {
      console.warn(`  Warning: Facility not found for key "${def.facilityKey}"`)
      continue
    }
    await prisma.hotspot.create({
      data: {
        facilityId: facility.id,
        x: def.x,
        y: def.y,
        z: 0,
        label: def.label,
        description: def.description,
      },
    })
    hotspotCount++
  }
  console.log(`  Created ${hotspotCount} Hotspots`)
}
