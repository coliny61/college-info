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
      slug: 'usc', name: 'Football', conference: 'Big Ten', headCoach: 'Lincoln Riley', record: '7-6', ranking: null,
      offensiveScheme: 'Air Raid / Spread',
      defensiveScheme: '4-2-5 (Patterson)',
      offenseDescription: 'Lincoln Riley\'s Air Raid system is a quarterback-centric attack built on quick-game passing, mesh concepts, and explosive deep shots. The offense uses condensed splits, bunch formations, and tempo to create mismatches. Riley has produced three Heisman-winning QBs in this system.',
      defenseDescription: 'Gary Patterson\'s 4-2-5 scheme is a proven system that dominated the Big 12 for two decades at TCU. It uses a "robber" safety to disguise coverages, plays sound gap-assignment run defense, and generates pressure through creative blitz packages rather than relying on raw talent alone.',
    },
    {
      slug: 'baylor', name: 'Football', conference: 'Big 12', headCoach: 'Dave Aranda', record: '4-8', ranking: null,
      offensiveScheme: 'Spread Multiple',
      defensiveScheme: '3-3-5 Stack',
      offenseDescription: 'A versatile spread attack that blends West Coast passing concepts with inside-zone and power run schemes. OC Jake Spavital uses multiple formations and personnel groupings to create favorable matchups and get playmakers in space.',
      defenseDescription: 'Dave Aranda\'s signature 3-3-5 stack defense is one of the most complex and well-coached schemes in college football. It features stacked linebackers behind the defensive line, pattern-match coverage, and the ability to show multiple fronts out of the same personnel. Aranda ran this system as DC at Wisconsin and LSU\'s 2019 national championship team.',
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

    // ─── USC ─────────────────────────────────────────────────────────────────────
    { slug: 'usc', name: 'Lincoln Riley', title: 'Head Coach', bio: 'Lincoln Riley, one of the most innovative offensive minds in football, left Oklahoma to lead USC in 2022. A proven quarterback developer who mentored two Heisman Trophy winners (Baker Mayfield and Kyler Murray), Riley is building the Trojans into a national championship contender in the Big Ten.', yearsAtSchool: 3 },
    { slug: 'usc', name: 'Luke Huard', title: 'Offensive Coordinator / Quarterbacks', bio: 'Promoted to offensive coordinator ahead of the 2026 season, Huard works closely with Lincoln Riley to run one of the most explosive passing attacks in the Big Ten.', yearsAtSchool: 2 },
    { slug: 'usc', name: 'Gary Patterson', title: 'Defensive Coordinator', bio: 'A 2026 College Football Hall of Fame electee and legendary former TCU head coach (2001-2021), Patterson was hired in January 2026 to overhaul the Trojans\' defense with his renowned 4-2-5 scheme.', yearsAtSchool: 1 },
    { slug: 'usc', name: 'Dennis Simmons', title: 'Wide Receivers / Passing Game Coordinator', bio: 'Followed Lincoln Riley from Oklahoma. One of the best wide receiver coaches in the country with a track record of producing NFL pass catchers.', yearsAtSchool: 3 },
    { slug: 'usc', name: 'Josh Henson', title: 'Offensive Line / Run Game Coordinator', bio: 'A veteran offensive line coach who has coached at Texas A&M and Missouri. Focuses on run-game physicality to complement Riley\'s passing attack.', yearsAtSchool: 3 },
    { slug: 'usc', name: 'Shaun Nua', title: 'Defensive Line', bio: 'Hired from Michigan where he helped develop multiple first-round NFL draft picks along the defensive line. Brings a blue-collar, technique-first approach.', yearsAtSchool: 1 },
    { slug: 'usc', name: 'Brian Odom', title: 'Linebackers', bio: 'Experienced linebackers coach with stops at multiple Power Five programs. Known for developing instinctive, physical linebackers.', yearsAtSchool: 2 },
    { slug: 'usc', name: 'Donte Williams', title: 'Cornerbacks', bio: 'One of the premier cornerback coaches and recruiters on the West Coast. Has produced multiple NFL draft picks and is a dominant recruiter in Southern California.', yearsAtSchool: 4 },
    { slug: 'usc', name: 'Craig Naivar', title: 'Safeties / Special Teams Coordinator', bio: 'A veteran coach who coordinates special teams while coaching safeties. Known for attention to detail and situational football.', yearsAtSchool: 2 },
    { slug: 'usc', name: 'Kiel McDonald', title: 'Running Backs', bio: 'Develops versatile running backs who can catch passes out of the backfield — a key component of Riley\'s Air Raid system.', yearsAtSchool: 3 },
    { slug: 'usc', name: 'Ben Sowders', title: 'Director of Strength & Conditioning', bio: 'Followed Riley from Oklahoma. Runs a program focused on explosive power and football-specific conditioning.', yearsAtSchool: 3 },

    // ─── Baylor ──────────────────────────────────────────────────────────────────
    { slug: 'baylor', name: 'Dave Aranda', title: 'Head Coach', bio: 'Dave Aranda, one of the most respected defensive minds in college football, became Baylor\'s head coach in 2020. He led the Bears to a Big 12 Championship in 2021 and a Sugar Bowl victory, establishing Baylor as a consistent contender.', yearsAtSchool: 5 },
    { slug: 'baylor', name: 'Jake Spavital', title: 'Offensive Coordinator', bio: 'A former head coach at Texas State and offensive coordinator at West Virginia, Spavital brings a creative spread offense that maximizes playmaker touches.', yearsAtSchool: 2 },
    { slug: 'baylor', name: 'Joe Klanderman', title: 'Defensive Coordinator / Safeties', bio: 'Hired from Kansas State where he spent seven years, including six as defensive coordinator. Klanderman brings a proven track record of building top-tier Big 12 defenses to Waco.', yearsAtSchool: 1 },
    { slug: 'baylor', name: 'AJ Blazek', title: 'Offensive Line / Run Game Coordinator', bio: 'A veteran offensive line coach who emphasizes physicality and run-game toughness. Has coached at multiple Power Five programs.', yearsAtSchool: 3 },
    { slug: 'baylor', name: 'Levi Draper', title: 'Linebackers', bio: 'Former Oklahoma linebacker who transitioned into coaching. Brings Big 12 playing experience and a physical, downhill approach to linebacker play.', yearsAtSchool: 2 },
    { slug: 'baylor', name: 'Vic Shealy', title: 'Cornerbacks', bio: 'Experienced secondary coach with deep roots in Texas recruiting. Has developed multiple NFL defensive backs throughout his career.', yearsAtSchool: 2 },
    { slug: 'baylor', name: 'Tony Roberts', title: 'Wide Receivers', bio: 'A dynamic recruiter and wide receiver technician who focuses on route-running precision and contested-catch ability.', yearsAtSchool: 2 },
    { slug: 'baylor', name: 'Mike Siravo', title: 'Defensive Line', bio: 'Former linebackers coach who moved to the defensive line. Known for developing versatile defensive linemen who can play multiple techniques.', yearsAtSchool: 3 },
    { slug: 'baylor', name: 'David Wetzel', title: 'Director of Strength & Conditioning', bio: 'Runs Baylor\'s strength program with an emphasis on injury prevention and functional football movements.', yearsAtSchool: 4 },

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
    'Lincoln Riley': {
      careerRecord: '78-22',
      championships: ['2017 Big 12 Championship', '2018 Big 12 Championship', '2019 Big 12 Championship', '2020 Big 12 Championship'],
      previousRoles: ['Offensive Coordinator, Oklahoma (2015-2016)', 'Head Coach, Oklahoma (2017-2021)'],
      awards: ['Mentored 3 Heisman Trophy winners (Mayfield, Murray, Williams)', '2x AP Coach of the Year Finalist'],
      playersInNfl: 45,
    },
    'Dave Aranda': {
      careerRecord: '30-27',
      championships: ['2021 Big 12 Championship', '2022 Sugar Bowl Champion'],
      previousRoles: ['Defensive Coordinator, LSU (2016-2019)', 'Defensive Coordinator, Wisconsin (2013-2015)', 'Defensive Coordinator, Utah State (2012)'],
      awards: ['2021 AP Big 12 Coach of the Year', '2021 George Munger Coach of the Year Award'],
      playersInNfl: 15,
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
    // USC
    { slug: 'usc', key: 'usc-stadium', name: 'Los Angeles Memorial Coliseum', type: 'stadium', description: 'The iconic 77,500-seat Coliseum, which has hosted two Olympic Games (1932, 1984) and two Super Bowls. The peristyle end and Olympic torch are among the most recognizable landmarks in sports.', panoramaUrl: '/panoramas/usc-stadium.jpg' },
    { slug: 'usc', key: 'usc-practice', name: 'Howard Jones Field', type: 'practice', description: 'An outdoor practice complex adjacent to the Coliseum with natural grass and synthetic fields, overlooking the LA skyline. Named after USC\'s legendary 1920s-30s era coach.', panoramaUrl: '/panoramas/usc-practice.jpg' },
    { slug: 'usc', key: 'usc-weight-room', name: 'McKay Center', type: 'weight-room', description: 'A $70 million athletics facility named after coaching legend John McKay, featuring a 30,000 sq ft strength center, hydrotherapy pools, a nutrition bar, and sport science labs.', panoramaUrl: '/panoramas/usc-weight-room.jpg' },
    { slug: 'usc', key: 'usc-locker-room', name: 'Heritage Hall Locker Room', type: 'locker-room', description: 'The Trojans\' home base inside the renovated Heritage Hall, featuring 11 national championship trophies, seven Heisman Trophy displays, and custom cardinal-and-gold lockers for every player.', panoramaUrl: '/panoramas/usc-locker-room.jpg' },
    // Baylor
    { slug: 'baylor', key: 'baylor-stadium', name: 'McLane Stadium', type: 'stadium', description: 'A stunning 45,140-seat stadium opened in 2014 on the banks of the Brazos River. Its distinctive design features a boat dock for tailgating, a 125-foot video board, and panoramic views of the Waco skyline.', panoramaUrl: '/panoramas/baylor-stadium.jpg' },
    { slug: 'baylor', key: 'baylor-practice', name: 'Allnex Indoor Practice Facility', type: 'practice', description: 'A 90,000 sq ft indoor practice facility with a full-size synthetic turf field, coaches\' viewing deck, and climate control for year-round preparation.', panoramaUrl: '/panoramas/baylor-practice.jpg' },
    { slug: 'baylor', key: 'baylor-weight-room', name: 'Hurd Performance Center', type: 'weight-room', description: 'A comprehensive strength and conditioning center with custom Baylor branding, Olympic platforms, nutrition stations, and recovery suites for student-athletes.', panoramaUrl: '/panoramas/baylor-weight-room.jpg' },
    { slug: 'baylor', key: 'baylor-locker-room', name: 'Bears Championship Locker Room', type: 'locker-room', description: 'A recently upgraded locker room featuring custom green-and-gold lockers, a team meeting area, and displays celebrating Baylor\'s 2021 Big 12 Championship and Sugar Bowl victory.', panoramaUrl: '/panoramas/baylor-locker-room.jpg' },
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

    // USC Stadium
    { facilityKey: 'usc-stadium', x: 0.5, y: 0.2, label: 'Olympic Torch', description: 'The iconic Olympic torch from the 1932 and 1984 Games towers above the peristyle end of the Coliseum.' },
    { facilityKey: 'usc-stadium', x: 0.3, y: 0.5, label: 'Peristyle', description: 'The famous columned peristyle with the Olympic rings, one of the most recognizable landmarks in American sports.' },
    { facilityKey: 'usc-stadium', x: 0.7, y: 0.7, label: 'Trojan Tunnel', description: 'Where the team enters to "Conquest" — the iconic fight song — as Traveler the white horse leads them onto the field.' },
    // USC Practice
    { facilityKey: 'usc-practice', x: 0.5, y: 0.5, label: 'Practice Fields', description: 'Natural grass and synthetic practice fields with the LA skyline as a dramatic backdrop.' },
    { facilityKey: 'usc-practice', x: 0.8, y: 0.3, label: 'Film Tower', description: 'A state-of-the-art video tower for coaching analysis with drone-compatible airspace.' },
    // USC Weight Room
    { facilityKey: 'usc-weight-room', x: 0.5, y: 0.5, label: 'Trojan Performance Center', description: 'The centerpiece of the McKay Center, with 30,000 sq ft of cutting-edge strength and conditioning equipment.' },
    { facilityKey: 'usc-weight-room', x: 0.3, y: 0.7, label: 'Hydrotherapy Pools', description: 'Hot and cold therapy pools for recovery, plus an underwater treadmill for low-impact conditioning.' },
    // USC Locker Room
    { facilityKey: 'usc-locker-room', x: 0.5, y: 0.3, label: 'Heisman Trophy Display', description: 'Seven Heisman Trophy replicas on display — more than any other program in history.' },
    { facilityKey: 'usc-locker-room', x: 0.5, y: 0.7, label: 'Championship Wall', description: 'Eleven national championship trophies and decades of Trojan football history.' },

    // Baylor Stadium
    { facilityKey: 'baylor-stadium', x: 0.5, y: 0.8, label: 'Brazos River Docks', description: 'McLane Stadium is one of the only stadiums in the country accessible by boat — fans dock on the Brazos River and walk straight to their seats.' },
    { facilityKey: 'baylor-stadium', x: 0.7, y: 0.3, label: 'Brazos Video Board', description: 'A 125-foot-wide high-definition video board that dominates the south end zone.' },
    { facilityKey: 'baylor-stadium', x: 0.3, y: 0.5, label: 'Bear Habitat', description: 'Joy and Lady, Baylor\'s live bear mascots, reside in a state-of-the-art habitat adjacent to the stadium.' },
    // Baylor Practice
    { facilityKey: 'baylor-practice', x: 0.5, y: 0.5, label: 'Indoor Turf Field', description: 'A 90,000 sq ft climate-controlled practice facility for year-round preparation in Central Texas heat.' },
    // Baylor Weight Room
    { facilityKey: 'baylor-weight-room', x: 0.5, y: 0.5, label: 'Nutrition Station', description: 'A fueling station with prepared meals, smoothie bar, and sports dietitian consultations for peak performance.' },
    // Baylor Locker Room
    { facilityKey: 'baylor-locker-room', x: 0.5, y: 0.5, label: 'Championship Display', description: 'Displays celebrating Baylor\'s 2021 Big 12 Championship season and Sugar Bowl victory over Ole Miss.' },

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
