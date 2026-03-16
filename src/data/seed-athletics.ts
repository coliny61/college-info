// seed-athletics.ts — Creates Sports, Coaches, Facilities, Hotspots

export async function seedAthletics(prisma: any, schoolMap: Record<string, any>) {
  // ─── Sports ─────────────────────────────────────────────────────────────────
  const sportDefinitions = [
    // Football
    {
      slug: 'texas-tech', name: 'Football', conference: 'Big 12', headCoach: 'Joey McGuire', record: '35-18', ranking: null,
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
    { slug: 'texas-tech', name: 'Joey McGuire', title: 'Head Coach', bio: 'Joey McGuire led Texas Tech to the 2025 Big 12 Championship — the program\'s first conference title since 1955 — with a 12-2 record and CFP quarterfinal appearance. A legendary Texas high school coach at Cedar Hill (141-42, three state titles), McGuire was hired in 2021 and has compiled a 35-18 record (.660) while transforming Red Raider recruiting and culture. Texas High School Football Hall of Fame inductee. Contract extended through 2028.', yearsAtSchool: 5 },
    { slug: 'texas-tech', name: 'Kenny Perry', title: 'Associate Head Coach / Special Teams Coordinator', bio: 'One of McGuire\'s original hires and the 2025 FootballScoop Special Teams Coordinator of the Year. Perry developed Austin McNamara into the all-time Big 12 punting average leader (45.91 career avg) and kicker Gino Garcia to a 95% FG rate in 2024 (school record). Also coached RBs and helped develop Tahj Brooks into TTU\'s all-time leading rusher. Former Arlington Bowie HC (67-22, Dallas Morning News Coach of the Year). Four-year letterman DB at Houston. Contract extended through 2028.', yearsAtSchool: 5 },
    { slug: 'texas-tech', name: 'Mack Leftwich', title: 'Offensive Coordinator / Quarterbacks', bio: 'One of the top young offensive minds in the country. At Texas State (2023-24), raised scoring from 21.1 to 36.7 PPG, ranking top-15 nationally in total offense. Previously OC at Incarnate Word (2022), where he coached Cameron Ward and Lindsey Scott Jr. (Walter Payton Award winner) — UIW averaged 51.1 PPG, second-highest in FCS history. Two-time Broyles Award nominee by age 30. Former QB at UTEP. Hired December 2024; contract extended through 2028.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Shiel Wood', title: 'Defensive Coordinator / Inside Linebackers', bio: 'Transformed every defense he\'s led: Houston (2024, reduced scoring from 31.5 to 22.9 PPG), Tulane (2023, 11-1 and AAC Championship), Troy (2022, Sun Belt title with 12 wins), Army (2021, 9-4 with bowl win). Defenses have ranked top-35 nationally in total defense in all four seasons as coordinator. His units averaged 22.3 turnovers per season. Played WR at Wofford. Hired December 2024; contract extended through 2028.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Rob Greene', title: 'Co-Defensive Coordinator / Safeties', bio: 'Promoted to co-DC in January 2026 after a standout first season. Selected to the AFCA 35 Under 35 Coaches Leadership Institute. Previously coached alongside Shiel Wood at Tulane (2023), where the defense led the AAC with 27 turnovers and 17 INTs. Part of 32 wins over three seasons between Tulane and Texas Tech, including a 23-2 regular-season conference record. Played WR at Wofford (three FCS playoff appearances, two SoCon titles). Graduated magna cum laude in Mathematics from Wofford.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Justin Johnson', title: 'Assistant Head Coach / Passing Game Coordinator / Wide Receivers', bio: 'Known as "Juice." Followed Joey McGuire from Baylor. Coached Josh Kelly to 89 catches and 1,023 receiving yards in 2024 — Texas Tech\'s first 1,000-yard WR since 2018. At Baylor, developed Abram Smith (1,601 rush yards) and Trestan Ebner (first Bear with 1,000+ career rush and receiving yards, drafted by Bears). Four-year letterman WR at Houston; first-team All-CUSA in 2011 (87 catches, 1,229 yards, 12 TDs).', yearsAtSchool: 4 },
    { slug: 'texas-tech', name: 'Josh Cochran', title: 'Run Game Coordinator / Tight Ends', bio: 'Among college football\'s top young coaches. His run schemes made Tahj Brooks Texas Tech\'s all-time leading rusher (4,557 career yards). Coached three TEs to NFL signings: Baylor Cupp (Chiefs), Jalin Conyers (Dolphins), Mason Tharp (Texans). Named to 247Sports 30-Under-30 and AFCA 35 Under 35. Three-year letterman OL at Texas; Yahoo Sports Freshman All-American (2011). Promoted to RGC in February 2024.', yearsAtSchool: 4 },
    { slug: 'texas-tech', name: 'Clay McGuire', title: 'Offensive Line', bio: 'A Texas Tech legacy in his third stint on the TTU staff — believed to be only the second assistant in school history to serve three stints. Played H-Back for the Red Raiders (2000-04, 45 games, 32 catches). Previously coached OL at Washington State (2012-17 under Mike Leach), East Carolina, Texas State, and USC. Brings decades of offensive line experience and is deeply connected to the Red Raider program. Native of Crane, TX.', yearsAtSchool: 3 },
    { slug: 'texas-tech', name: 'Garret McGuire', title: 'Running Backs', bio: 'Joey McGuire\'s son and one of the youngest FBS assistants in the country. Named to 2024 AFCA 35 Under 35 and 247Sports 30-Under-30. Previously WR coach at Nebraska (2023-24), helping the Huskers return to bowl eligibility; developed freshman Jacory Barnet Jr. to a Nebraska freshman receiving record (55 catches). Before that, coaching assistant with the Carolina Panthers (2021-22) under Matt Rhule. Played QB at Baylor; two-time Academic All-Big 12 and team captain.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Darcel McBath', title: 'Cornerbacks', bio: 'Texas Tech legend. Four-year letterman DB (2004-08) who led the nation with 7 INTs as a senior on an 11-2 team that reached No. 2 in the rankings. First-team All-Big 12. 2nd-round NFL Draft pick (2009, Denver Broncos); played 5 NFL seasons with the Broncos, Jaguars, and 49ers (Super Bowl XLVII roster). Coached under Mike Leach at WSU and Mississippi State. Developed three NFL CBs at MSU including Emmanuel Forbes (No. 16 overall pick, 2023, NCAA record for INT return TDs). Promoted to on-field staff January 2025.', yearsAtSchool: 2 },
    { slug: 'texas-tech', name: 'Imarjaye Albury Sr.', title: 'Defensive Line', bio: 'Spent six seasons with the Minnesota Vikings in rising roles from pro scout to assistant DL coach. During his tenure, the Vikings made two playoff appearances (14-3 in 2024, 13-4 in 2022). In 2025, Minnesota tied for 4th in NFL sacks (49.0); his DL unit contributed 15.0 sacks. Helped develop Pro Bowlers Jonathan Greenard and Andrew Van Ginkel. Previously GA at Arkansas. Played DL at West Virginia and FIU (3-year starter, team captain, Defensive MVP). Hired February 2026.', yearsAtSchool: 1 },
    { slug: 'texas-tech', name: 'Jacquies Smith', title: 'Outside Linebackers', bio: 'Previously OLB coach with the Atlanta Falcons (2024-25), where he helped set a franchise record with 57 sacks in 2025. Developed rookie James Pearce Jr. to 10.5 sacks — most by an NFL rookie since Micah Parsons in 2021. Before the NFL, was a GA at Texas in 2023 (Longhorns ranked 2nd in Big 12 with 32 sacks, reached CFP). Five NFL seasons as a player (2014-18) with the Buccaneers, Lions, Cardinals, and Raiders — 43 tackles, 13.5 sacks. Two-time All-Big 12 at Missouri. Native of Dallas (South Oak Cliff HS). Hired February 2026.', yearsAtSchool: 1 },

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
      careerRecord: '35-18',
      championships: ['2025 Big 12 Championship'],
      previousRoles: ['Head Coach, Cedar Hill HS (2003-2016) — 141-42, 3 state titles', 'Associate HC / DL Coach, Baylor (2017-2021)'],
      awards: ['2025 AFCA Region 4 Coach of the Year', '2025 Big 12 Coach of the Year', 'Texas High School Football Hall of Fame (2022)', 'Most Big 12 wins of any active conference coach during tenure'],
      playersInNfl: 16,
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
