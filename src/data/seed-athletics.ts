// seed-athletics.ts — Creates Sports, Coaches, Facilities, Hotspots

export async function seedAthletics(prisma: any, schoolMap: Record<string, any>) {
  // ─── Sports ─────────────────────────────────────────────────────────────────
  const sportDefinitions = [
    { slug: 'texas-tech', name: 'Football', conference: 'Big 12', headCoach: 'Joey McGuire', record: '8-5', ranking: null },
    { slug: 'usc', name: 'Football', conference: 'Big Ten', headCoach: 'Lincoln Riley', record: '7-6', ranking: null },
    { slug: 'baylor', name: 'Football', conference: 'Big 12', headCoach: 'Dave Aranda', record: '4-8', ranking: null },
    { slug: 'oklahoma', name: 'Football', conference: 'SEC', headCoach: 'Brent Venables', record: '6-7', ranking: null },
  ]

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
    sportMap[def.slug] = sport
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
  ]

  for (const def of coachDefinitions) {
    await prisma.coach.create({
      data: {
        sportId: sportMap[def.slug].id,
        name: def.name,
        title: def.title,
        bio: def.bio,
        yearsAtSchool: def.yearsAtSchool,
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
