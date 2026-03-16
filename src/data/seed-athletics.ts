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
      slug: 'oklahoma', name: 'Football', conference: 'SEC', headCoach: 'Brent Venables', record: '10-3', ranking: null,
      offensiveScheme: 'Air Raid / Tempo',
      defensiveScheme: '4-3 Multiple',
      offenseDescription: 'OC Ben Arbuckle installed his Washington State Air Raid system in 2025, and the results were immediate — OU ranked top-25 nationally in scoring (34.2 PPG) and passing efficiency. The scheme uses four-wide sets extensively with RPO concepts, quick game, and explosive shot plays. Transfer QB John Mateer became one of the SEC\'s most dynamic dual-threat quarterbacks in the system.',
      defenseDescription: 'Brent Venables personally calls the defensive plays, running his trademark 4-3 multiple defense built on man-coverage principles, aggressive pass rushing, and disciplined gap control. The system won two national championships at Clemson and features complex pre-snap movement to confuse offensive lines. In 2025, OU ranked top-20 nationally in total defense and 4th in the SEC in passing defense (195.2 YPG).',
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

    // ─── Oklahoma (2025-26 Staff) ────────────────────────────────────────────────
    { slug: 'oklahoma', name: 'Brent Venables', title: 'Head Coach', bio: 'Returned to his alma mater in 2022 after a legendary run as Clemson\'s defensive coordinator (2012-21), where he won two national championships and the 2016 Broyles Award. A Kansas native who played LB at OU under Bob Stoops, Venables served as OU\'s co-DC from 1999-2011 (2000 national title). Led OU to the 2025 College Football Playoff (10-3, lost to Alabama in first round) after a difficult SEC transition. His defense ranked top-20 nationally in 2025 and 4th in the SEC in passing defense. 63 defensive players drafted under his guidance, including 12 first-rounders and three Butkus Award winners.', yearsAtSchool: 4 },
    { slug: 'oklahoma', name: 'Ben Arbuckle', title: 'Offensive Coordinator / Quarterbacks', bio: 'One of the fastest-rising offensive minds in college football. As Washington State\'s OC (2023-24), led the Cougars to rank 11th nationally in scoring and developed John Mateer into an All-Pac-12 QB. Previously OC at Western Kentucky, where he worked with Cam Ward. Installed his Air Raid system at OU in 2025, and the offense averaged 34.2 PPG — a massive leap from 2024. The Mateer-Arbuckle reunion was the key to OU\'s CFP run. Hired December 2024.', yearsAtSchool: 2 },
    { slug: 'oklahoma', name: 'Kevin Wilson', title: 'Assistant Head Coach for Offense', bio: 'A veteran offensive mind with head coaching experience at Indiana (2011-16) and coordinator experience at Ohio State (2017-21), where he helped the Buckeyes reach two CFP National Championships. Wilson adds SEC-level experience and offensive line development expertise to Arbuckle\'s staff. His presence stabilizes the offensive coaching structure.', yearsAtSchool: 1 },
    { slug: 'oklahoma', name: 'Todd Bates', title: 'Associate Head Coach / Co-DC / Run Defense / Defensive Tackles', bio: 'Followed Venables from Clemson to OU in 2022. At Clemson, helped develop multiple first-round DL picks including Christian Wilkins, Dexter Lawrence, and Clelin Ferrell. Coaches defensive tackles and coordinates run defense. One of the most respected DL developers in the country. Extended through 2027 with a total compensation package exceeding $2 million.', yearsAtSchool: 4 },
    { slug: 'oklahoma', name: 'Miguel Chavis', title: 'Defensive Ends', bio: 'Arrived with Venables from Clemson in 2022. Has built OU\'s defensive end room into one of the SEC\'s best through elite retention — keeping top talent like R Mason Thomas and Marvin Jones Jr. out of the transfer portal. His DL unit produced double-digit sacks in 2025. Known for NFL-level hand technique drills. Contract extended through 2027 after the 2025 CFP run.', yearsAtSchool: 4 },
    { slug: 'oklahoma', name: 'Nate Dreiling', title: 'Inside Linebackers', bio: 'Hired in February 2025 from New Mexico State, where he served as head coach (2024) after a breakout season as defensive coordinator. Under Dreiling, NMSU ranked top-5 nationally in sacks and turnovers forced. His aggressive linebacker coaching helped Kip Lewis and Kobie McKinzie become one of the SEC\'s best inside linebacker duos in 2025.', yearsAtSchool: 1 },
    { slug: 'oklahoma', name: 'Wes Goodwin', title: 'Outside Linebackers', bio: 'Former Clemson defensive coordinator (2022-23), where he succeeded Venables. Coached under Venables at Clemson for nearly a decade, serving as linebackers coach and co-DC. Brings deep familiarity with Venables\' system and elite pass-rusher development experience. Helped develop multiple NFL defensive players at Clemson.', yearsAtSchool: 1 },
    { slug: 'oklahoma', name: 'Brandon Hall', title: 'Safeties', bio: 'Experienced SEC defensive backs coach who has coached at multiple Power 5 programs. Developed Peyton Bowen into one of the SEC\'s top safeties and helped Kendal Daniels become a projected first-round NFL Draft pick. His secondary unit ranked 4th in the SEC in passing defense in 2025 (195.2 YPG).', yearsAtSchool: 4 },
    { slug: 'oklahoma', name: 'LaMar Morgan', title: 'Cornerbacks', bio: 'Hired in February 2026 to replace Jay Valai, who departed for the Buffalo Bills. Morgan brings SEC experience and has a strong track record of developing NFL-caliber cornerbacks. He inherits a talented room led by Gentry Williams and Courtland Guillory, who helped OU finish 32nd nationally in passing defense.', yearsAtSchool: 1 },
    { slug: 'oklahoma', name: 'Emmett Jones', title: 'Passing Game Coordinator / Wide Receivers', bio: 'An elite WR technician and one of the top recruiters in the Big 12/SEC. Walk-on QB at Texas Tech before transferring to North Texas. Coached at Kansas (WR/passing game coordinator, interim HC in 2021), Texas Tech (2021-22 under McGuire), and joined OU in 2023. Assembled an elite five-man WR signing class in 2025 including three four-stars. His receivers were instrumental in the Air Raid\'s success.', yearsAtSchool: 3 },
    { slug: 'oklahoma', name: 'John Kuceyeski', title: 'Quarterbacks Coach', bio: 'Ben Arbuckle\'s right-hand man, known as "Coach Kuz." Followed Arbuckle from Western Kentucky to Washington State to Oklahoma. Previously OC at Eastern Illinois (2019-21) and coached at Cornell, Toledo, and Northwestern. Penn State graduate (Finance, 2009). Elevated to full QB coach after the 2025 season. Instrumental in developing John Mateer\'s game at both WSU and OU.', yearsAtSchool: 2 },
    { slug: 'oklahoma', name: 'Deland McCullough', title: 'Running Backs', bio: 'Hired in March 2026 to replace DeMarco Murray, who departed for the Kansas City Chiefs. McCullough brings extensive NFL coaching experience, having served as RB coach for the Kansas City Chiefs, Cleveland Browns, and Indiana Colts. Also coached at USC, Indiana, and Pittsburgh. Played at Miami (OH). Known as an elite developer of running backs at every level.', yearsAtSchool: 1 },
    { slug: 'oklahoma', name: 'Bill Bedenbaugh', title: 'Offensive Line', bio: 'The longest-tenured assistant on the OU staff, hired by Bob Stoops in 2013. Named co-OC under Lincoln Riley (2017). In 2025, became the first non-coordinator in Sooner history to earn $1 million annually. Played OL at Iowa Wesleyan under Hal Mumme and Mike Leach (1991-94). Signed the best OL recruiting class in OU history for 2025, headlined by five-star Michael Fasusi. Has produced multiple NFL offensive linemen including Orlando Brown Jr. and Creed Humphrey.', yearsAtSchool: 13 },
    { slug: 'oklahoma', name: 'Jason Witten', title: 'Tight Ends', bio: 'NFL legend who played 17 seasons with the Dallas Cowboys (2003-2020), earning 11 Pro Bowl selections and retiring as the Cowboys\' all-time receptions leader (1,228). One of the greatest tight ends in NFL history. Transitioned to coaching and joined OU to develop the next generation of pass-catching tight ends in Arbuckle\'s Air Raid system. His NFL pedigree is a powerful recruiting tool.', yearsAtSchool: 1 },
    { slug: 'oklahoma', name: 'Doug Deakin', title: 'Special Teams Coordinator', bio: 'Spent 17 consecutive seasons at San Diego State before joining OU in 2024 to replace Jay Nunez (departed for Alabama). In his second year, special teams became a "competitive advantage" during OU\'s 2025 CFP campaign. Venables called him the coach who\'s "had the biggest impact" on the program recently. Developed kicker Tate Sandell and punter Jacob Ulrich into reliable weapons. Built a culture of buy-in that made special teams a point of pride.', yearsAtSchool: 2 },
    { slug: 'oklahoma', name: 'Xavier Brewer', title: 'Assistant Secondary Coach', bio: 'Former Clemson DB (2008-12) who signed with the Dallas Cowboys as a UDFA in 2013. Played in the Arena Football League before transitioning to coaching. GA at Clemson under Venables (2019-20), then CB coach at Louisiana-Monroe (2021). Joined OU as a senior defensive analyst in 2022 and was promoted to on-field assistant secondary coach. Comes from a football family — father Chris played for the Denver Broncos.', yearsAtSchool: 4 },
    { slug: 'oklahoma', name: 'Jerry Schmidt', title: 'Director of Strength & Conditioning', bio: 'The legendary "Big Schmitty" returned to OU with Venables in 2022 after spending 2018-21 at Texas A&M. Previously served as OU\'s S&C director from 1999-2017 under Bob Stoops, building the physical foundation for seven Big 12 titles and the 2000 national championship. One of the most feared and respected strength coaches in college football history. His offseason program is synonymous with championship-level physical toughness.', yearsAtSchool: 4 },
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
      careerRecord: '36-27',
      championships: ['2000 National Championship (as OU DC)', '2016 National Championship (as Clemson DC)', '2018 National Championship (as Clemson DC)'],
      previousRoles: ['Defensive Coordinator, Clemson (2012-2021) — 2 national titles, 6 CFP appearances', 'Co-Defensive Coordinator / LB Coach, Oklahoma (1999-2011) — 2000 national title', 'Graduate Assistant, Kansas State (1993-95)'],
      awards: ['2016 Broyles Award (Top Assistant Coach in America)', '3x National Championship coach (1x OU DC, 2x Clemson DC)', '2025 College Football Playoff appearance', 'Produced 63 NFL Draft picks including 12 first-rounders', '3 Butkus Award winners coached (Calmus, Lehman, Simmons)'],
      playersInNfl: 63,
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
