// seed-athletics.ts — Creates Sports, Coaches, Facilities, Hotspots

export async function seedAthletics(prisma: any, schoolMap: Record<string, any>) {
  // ─── Sports ─────────────────────────────────────────────────────────────────
  const sportDefinitions = [
    // Football
    { slug: 'texas-tech', name: 'Football', conference: 'Big 12', headCoach: 'Joey McGuire', record: '8-5', ranking: null },
    { slug: 'usc', name: 'Football', conference: 'Big Ten', headCoach: 'Lincoln Riley', record: '7-6', ranking: null },
    { slug: 'baylor', name: 'Football', conference: 'Big 12', headCoach: 'Dave Aranda', record: '4-8', ranking: null },
    { slug: 'oklahoma', name: 'Football', conference: 'SEC', headCoach: 'Brent Venables', record: '6-7', ranking: null },
    // Basketball
    { slug: 'texas-tech', name: 'Basketball', conference: 'Big 12', headCoach: 'Grant McCasland', record: '23-11', ranking: 18 },
    { slug: 'usc', name: 'Basketball', conference: 'Big Ten', headCoach: 'Eric Musselman', record: '20-14', ranking: null },
    { slug: 'baylor', name: 'Basketball', conference: 'Big 12', headCoach: 'Scott Drew', record: '24-10', ranking: 12 },
    { slug: 'oklahoma', name: 'Basketball', conference: 'SEC', headCoach: 'Porter Moser', record: '18-15', ranking: null },
    // Baseball
    { slug: 'texas-tech', name: 'Baseball', conference: 'Big 12', headCoach: 'Tim Tadlock', record: '39-22', ranking: 15 },
    { slug: 'usc', name: 'Baseball', conference: 'Big Ten', headCoach: 'Jason Gill', record: '32-26', ranking: null },
    { slug: 'baylor', name: 'Baseball', conference: 'Big 12', headCoach: 'Mitch Thompson', record: '35-23', ranking: 20 },
    { slug: 'oklahoma', name: 'Baseball', conference: 'SEC', headCoach: 'Skip Johnson', record: '37-21', ranking: 10 },
    // Soccer
    { slug: 'texas-tech', name: 'Soccer', conference: 'Big 12', headCoach: 'Tom Stone', record: '14-5-2', ranking: null },
    { slug: 'usc', name: 'Soccer', conference: 'Big Ten', headCoach: 'Keidane McAlpine', record: '18-3-1', ranking: 5 },
    { slug: 'baylor', name: 'Soccer', conference: 'Big 12', headCoach: 'Michelle Lenard', record: '12-7-3', ranking: null },
    { slug: 'oklahoma', name: 'Soccer', conference: 'SEC', headCoach: 'Mark Carr', record: '13-6-2', ranking: null },
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
    // Texas Tech
    { slug: 'texas-tech', name: 'Joey McGuire', title: 'Head Coach', bio: 'Joey McGuire, a former Texas high school coaching legend, took over at Texas Tech in 2022 and has quickly elevated the program\'s recruiting and culture. Known for his infectious energy and deep Texas recruiting ties, McGuire has brought new excitement to Red Raider football.', yearsAtSchool: 3 },
    { slug: 'texas-tech', name: 'Zach Kittley', title: 'Offensive Coordinator', bio: 'A Texas Tech alum and the architect of the Air Raid 2.0, Kittley runs one of the most explosive passing offenses in college football with an emphasis on tempo and RPO concepts.', yearsAtSchool: 3 },
    { slug: 'texas-tech', name: 'Tim DeRuyter', title: 'Defensive Coordinator', bio: 'A veteran defensive coordinator with head coaching experience at Fresno State, DeRuyter brings a multiple-front defense that emphasizes disruption and takeaways.', yearsAtSchool: 3 },
    // USC
    { slug: 'usc', name: 'Lincoln Riley', title: 'Head Coach', bio: 'Lincoln Riley, one of the most innovative offensive minds in football, left Oklahoma to lead USC in 2022. A proven quarterback developer who mentored two Heisman Trophy winners (Baker Mayfield and Kyler Murray), Riley is building the Trojans into a national championship contender in the Big Ten.', yearsAtSchool: 3 },
    { slug: 'usc', name: 'Kirk Ciarrocca', title: 'Offensive Coordinator', bio: 'A veteran play-caller with experience at Penn State and Minnesota, Ciarrocca helps refine USC\'s West Coast passing attack with a physical running game complement.', yearsAtSchool: 1 },
    { slug: 'usc', name: 'D\'Anton Lynn', title: 'Defensive Coordinator', bio: 'A rising star in the coaching world, Lynn transformed USC\'s defense with an aggressive, turnover-focused scheme that helped the Trojans compete in the Big Ten.', yearsAtSchool: 2 },
    // Baylor
    { slug: 'baylor', name: 'Dave Aranda', title: 'Head Coach', bio: 'Dave Aranda, one of the most respected defensive minds in college football, became Baylor\'s head coach in 2020. He led the Bears to a Big 12 Championship in 2021 and a Sugar Bowl victory, establishing Baylor as a consistent contender.', yearsAtSchool: 5 },
    { slug: 'baylor', name: 'Jake Spavital', title: 'Offensive Coordinator', bio: 'A former head coach at Texas State and offensive coordinator at West Virginia, Spavital brings a creative spread offense that maximizes playmaker touches.', yearsAtSchool: 2 },
    { slug: 'baylor', name: 'Matt Powledge', title: 'Defensive Coordinator', bio: 'A protégé of the Aranda defensive system, Powledge runs an aggressive 3-3-5 scheme that has become a signature of Baylor football.', yearsAtSchool: 4 },
    // Oklahoma
    { slug: 'oklahoma', name: 'Brent Venables', title: 'Head Coach', bio: 'Brent Venables, a two-time national championship-winning defensive coordinator at Clemson, returned to his alma mater as head coach in 2022. Now navigating OU\'s transition to the SEC, Venables is building a program rooted in defensive toughness and championship culture.', yearsAtSchool: 3 },
    { slug: 'oklahoma', name: 'Ben Arbuckle', title: 'Offensive Coordinator', bio: 'The young play-caller from Washington State brings an innovative Air Raid system to Norman, giving the Sooners a high-tempo, explosive passing attack.', yearsAtSchool: 1 },
    { slug: 'oklahoma', name: 'Zac Alley', title: 'Defensive Coordinator', bio: 'A defensive specialist who worked under Venables at Clemson, Alley runs a physical, multiple-front defense designed to compete in the SEC.', yearsAtSchool: 3 },
    // Basketball Coaches
    { slug: 'texas-tech', name: 'Grant McCasland', title: 'Head Coach', bio: 'Took over the Red Raiders in 2023 after a successful run at North Texas. Known for developing guards and running a disciplined defensive system.', yearsAtSchool: 2, sport: 'Basketball' },
    { slug: 'texas-tech', name: 'Brennan Shingleton', title: 'Assistant Coach', bio: 'A key recruiter and player development coach who helps run the Red Raiders\' offensive sets.', yearsAtSchool: 2, sport: 'Basketball' },
    { slug: 'usc', name: 'Eric Musselman', title: 'Head Coach', bio: 'A former NBA head coach who built Arkansas into a tournament contender before bringing his high-energy style to USC and the Big Ten.', yearsAtSchool: 1, sport: 'Basketball' },
    { slug: 'usc', name: 'Danny Manning', title: 'Assistant Coach', bio: 'A college basketball legend and former national champion at Kansas, Manning brings decades of coaching and playing experience.', yearsAtSchool: 1, sport: 'Basketball' },
    { slug: 'baylor', name: 'Scott Drew', title: 'Head Coach', bio: 'Led Baylor to its first national championship in 2021. Drew has transformed the Bears into a perennial contender through elite recruiting and player development.', yearsAtSchool: 22, sport: 'Basketball' },
    { slug: 'baylor', name: 'Jerome Tang (former)', title: 'Assistant Coach', bio: 'A longtime Drew assistant who helped build the championship program, known for his offensive system design and player mentorship.', yearsAtSchool: 5, sport: 'Basketball' },
    { slug: 'oklahoma', name: 'Porter Moser', title: 'Head Coach', bio: 'Famous for leading Loyola Chicago on a Cinderella Final Four run, Moser now builds the Sooners for SEC competition with his motion offense.', yearsAtSchool: 4, sport: 'Basketball' },
    { slug: 'oklahoma', name: 'Kevin Kruger', title: 'Assistant Coach', bio: 'A former head coach at UNLV and son of coaching legend Lon Kruger, he brings deep knowledge of Big 12 and SEC basketball.', yearsAtSchool: 2, sport: 'Basketball' },
    // Baseball Coaches
    { slug: 'texas-tech', name: 'Tim Tadlock', title: 'Head Coach', bio: 'Has built Texas Tech baseball into a national power, reaching multiple College World Series. Known for developing pitching and a blue-collar mentality.', yearsAtSchool: 12, sport: 'Baseball' },
    { slug: 'texas-tech', name: 'J-Bob Thomas', title: 'Pitching Coach', bio: 'One of the top pitching coaches in college baseball, Thomas has developed multiple MLB draft picks at Texas Tech.', yearsAtSchool: 10, sport: 'Baseball' },
    { slug: 'usc', name: 'Jason Gill', title: 'Head Coach', bio: 'Building the Trojans back into a Pac-12 and Big Ten baseball power with strong SoCal recruiting pipelines.', yearsAtSchool: 4, sport: 'Baseball' },
    { slug: 'usc', name: 'Ted Silva', title: 'Hitting Coach', bio: 'A veteran hitting instructor who has coached at multiple Division I programs and developed dozens of pro prospects.', yearsAtSchool: 3, sport: 'Baseball' },
    { slug: 'baylor', name: 'Mitch Thompson', title: 'Head Coach', bio: 'Took over the Bears program and has built competitive Big 12 teams with a focus on pitching and defense.', yearsAtSchool: 5, sport: 'Baseball' },
    { slug: 'baylor', name: 'Jon Strauss', title: 'Pitching Coach', bio: 'A proven pitching developer who has helped Baylor produce consistent arms for the MLB Draft.', yearsAtSchool: 4, sport: 'Baseball' },
    { slug: 'oklahoma', name: 'Skip Johnson', title: 'Head Coach', bio: 'Has elevated Oklahoma baseball to national prominence, reaching the College World Series. A master recruiter in the Texas and SEC talent pipelines.', yearsAtSchool: 6, sport: 'Baseball' },
    { slug: 'oklahoma', name: 'Clay Overcash', title: 'Hitting Coach', bio: 'Develops powerful Sooner lineups through data-driven approach and mechanical adjustments.', yearsAtSchool: 4, sport: 'Baseball' },
    // Soccer Coaches
    { slug: 'texas-tech', name: 'Tom Stone', title: 'Head Coach', bio: 'Has led Texas Tech women\'s soccer for over two decades, consistently competing in the Big 12 and earning NCAA tournament bids.', yearsAtSchool: 23, sport: 'Soccer' },
    { slug: 'texas-tech', name: 'Shannon Simes', title: 'Assistant Coach', bio: 'A former professional player who focuses on attacking development and set piece strategy.', yearsAtSchool: 5, sport: 'Soccer' },
    { slug: 'usc', name: 'Keidane McAlpine', title: 'Head Coach', bio: 'Led USC to a national championship and multiple Pac-12 titles. One of the top recruiters in women\'s college soccer.', yearsAtSchool: 10, sport: 'Soccer' },
    { slug: 'usc', name: 'Regan Dougherty', title: 'Assistant Coach', bio: 'A former USC standout who returned to coach, specializing in goalkeeper training and defensive organization.', yearsAtSchool: 4, sport: 'Soccer' },
    { slug: 'baylor', name: 'Michelle Lenard', title: 'Head Coach', bio: 'Building Baylor\'s soccer program into a consistent Big 12 competitor with a focus on technical skill development.', yearsAtSchool: 6, sport: 'Soccer' },
    { slug: 'baylor', name: 'Ashley Harrington', title: 'Assistant Coach', bio: 'A skilled tactician who oversees defensive shape and player fitness programs for the Bears.', yearsAtSchool: 3, sport: 'Soccer' },
    { slug: 'oklahoma', name: 'Mark Carr', title: 'Head Coach', bio: 'Has steadily improved Oklahoma\'s soccer program, bringing in strong recruiting classes as the Sooners transition to SEC play.', yearsAtSchool: 5, sport: 'Soccer' },
    { slug: 'oklahoma', name: 'Lindsey Moore', title: 'Assistant Coach', bio: 'Focuses on midfield play and possession-based tactics, bringing international playing experience to the coaching staff.', yearsAtSchool: 3, sport: 'Soccer' },
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
    'Scott Drew': {
      careerRecord: '411-222',
      championships: ['2021 NCAA National Championship', '2021 Big 12 Tournament Champion', '2023 Big 12 Regular Season Champion'],
      previousRoles: ['Head Coach, Valparaiso (2000-2003)'],
      awards: ['2021 Naismith Coach of the Year', '2021 AP Coach of the Year', 'Rebuilt Baylor from NCAA sanctions to national champion'],
      playersInNfl: 0,
    },
    'Grant McCasland': {
      careerRecord: '192-120',
      championships: ['2021 C-USA Regular Season Champion', '2021 NIT Champion (North Texas)'],
      previousRoles: ['Head Coach, North Texas (2017-2023)', 'Assistant Coach, Baylor (2008-2011)'],
      awards: ['2021 C-USA Coach of the Year', '2023 Joe B. Hall Award'],
      playersInNfl: 0,
    },
    'Eric Musselman': {
      careerRecord: '218-98 (college)',
      championships: ['3x NCAA Elite Eight appearances (Nevada, Arkansas)'],
      previousRoles: ['Head Coach, Arkansas (2019-2024)', 'Head Coach, Nevada (2015-2019)', 'Head Coach, Sacramento Kings (2006-2007)', 'Head Coach, Golden State Warriors (2002-2004)'],
      awards: ['2x SEC Coach of the Year Finalist', 'Former NBA Head Coach'],
      playersInNfl: 0,
    },
    'Tim Tadlock': {
      careerRecord: '530-280',
      championships: ['3x Big 12 Regular Season Champion', '5x College World Series appearances'],
      previousRoles: ['Assistant Coach, Texas Tech (2004-2012)'],
      awards: ['3x Big 12 Coach of the Year', 'Built Texas Tech into a national baseball power'],
      playersInNfl: 0,
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
