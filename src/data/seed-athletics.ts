// seed-athletics.ts — Creates Sports, Coaches, Facilities, Hotspots

export async function seedAthletics(prisma: any, schoolMap: Record<string, any>) {
  // ─── Sports ─────────────────────────────────────────────────────────────────
  const sportDefinitions = [
    { slug: 'alabama', name: 'Football', conference: 'SEC', headCoach: 'Kalen DeBoer', record: '12-2', ranking: 5 },
    { slug: 'oregon', name: 'Football', conference: 'Big Ten', headCoach: 'Dan Lanning', record: '12-1', ranking: 3 },
    { slug: 'ohio-state', name: 'Football', conference: 'Big Ten', headCoach: 'Ryan Day', record: '11-2', ranking: 8 },
    { slug: 'texas', name: 'Football', conference: 'SEC', headCoach: 'Steve Sarkisian', record: '12-2', ranking: 4 },
    { slug: 'lsu', name: 'Football', conference: 'SEC', headCoach: 'Brian Kelly', record: '10-3', ranking: 12 },
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
    // Alabama
    { slug: 'alabama', name: 'Kalen DeBoer', title: 'Head Coach', bio: 'Kalen DeBoer took over as head coach at Alabama in 2024 after a successful tenure at Washington, where he led the Huskies to the College Football Playoff National Championship Game.', yearsAtSchool: 1 },
    { slug: 'alabama', name: 'Robert Gillespie', title: 'Running Backs Coach', bio: 'A veteran coach with over 15 years of experience developing NFL-caliber running backs across the SEC.', yearsAtSchool: 4 },
    { slug: 'alabama', name: 'Coleman Hutzler', title: 'Defensive Coordinator', bio: 'A defensive specialist known for creating aggressive, turnover-forcing schemes.', yearsAtSchool: 1 },
    // Oregon
    { slug: 'oregon', name: 'Dan Lanning', title: 'Head Coach', bio: 'Dan Lanning, the former Georgia defensive coordinator, has quickly built Oregon into a national championship contender with elite recruiting and innovative game planning.', yearsAtSchool: 3 },
    { slug: 'oregon', name: 'Will Stein', title: 'Offensive Coordinator', bio: 'An innovative play-caller who brings a modern spread offense with tempo and creativity.', yearsAtSchool: 2 },
    // Ohio State
    { slug: 'ohio-state', name: 'Ryan Day', title: 'Head Coach', bio: 'Ryan Day has maintained Ohio State as a perennial Big Ten champion and College Football Playoff contender since taking over from Urban Meyer in 2019.', yearsAtSchool: 7 },
    { slug: 'ohio-state', name: 'Chip Kelly', title: 'Offensive Coordinator', bio: 'The legendary offensive mind who revolutionized college football with his spread-option attack at Oregon returns to the college game.', yearsAtSchool: 2 },
    // Texas
    { slug: 'texas', name: 'Steve Sarkisian', title: 'Head Coach', bio: 'Steve Sarkisian has revitalized Texas football, bringing the Longhorns back to national prominence with elite recruiting and a dynamic offensive system.', yearsAtSchool: 4 },
    { slug: 'texas', name: 'Kyle Flood', title: 'Offensive Line Coach', bio: 'A veteran offensive line coach who has developed multiple NFL draft picks during his time in Austin.', yearsAtSchool: 4 },
    { slug: 'texas', name: 'Pete Kwiatkowski', title: 'Defensive Coordinator', bio: 'A proven defensive coordinator who brings a physical, disciplined approach to Texas defense.', yearsAtSchool: 4 },
    // LSU
    { slug: 'lsu', name: 'Brian Kelly', title: 'Head Coach', bio: 'Brian Kelly, the winningest coach in Notre Dame history, brings his championship pedigree to Baton Rouge with a focus on program culture and elite talent development.', yearsAtSchool: 3 },
    { slug: 'lsu', name: 'Joe Sloan', title: 'Offensive Coordinator', bio: 'An up-and-coming offensive mind known for adapting his scheme to player strengths.', yearsAtSchool: 2 },
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
    // Alabama
    { slug: 'alabama', key: 'alabama-stadium', name: 'Bryant-Denny Stadium', type: 'stadium', description: 'The iconic 101,821-seat home of Crimson Tide football. One of the largest stadiums in the country, the atmosphere on game day is unmatched.', panoramaUrl: '/panoramas/alabama-stadium.jpg' },
    { slug: 'alabama', key: 'alabama-practice', name: 'Thomas-Drew Practice Facility', type: 'practice', description: 'A state-of-the-art indoor practice facility with a full-size synthetic turf field, meeting rooms, and recovery pools.', panoramaUrl: '/panoramas/alabama-practice.jpg' },
    { slug: 'alabama', key: 'alabama-weight-room', name: 'Mal Moore Athletic Facility', type: 'weight-room', description: 'A massive training complex featuring Olympic platforms, recovery suites, and nutrition stations.', panoramaUrl: '/panoramas/alabama-weight-room.jpg' },
    { slug: 'alabama', key: 'alabama-locker-room', name: 'Champions Locker Room', type: 'locker-room', description: 'Recently renovated players\' locker room with custom wood lockers, integrated charging stations, and 18 championship banners overhead.', panoramaUrl: '/panoramas/alabama-locker-room.jpg' },
    // Oregon
    { slug: 'oregon', key: 'oregon-stadium', name: 'Autzen Stadium', type: 'stadium', description: 'Known as one of the loudest stadiums in college football, Autzen\'s 54,000 fans create a wall of sound that opposing teams dread.', panoramaUrl: '/panoramas/oregon-stadium.jpg' },
    { slug: 'oregon', key: 'oregon-practice', name: 'Hatfield-Dowlin Complex', type: 'practice', description: 'Nike co-founder Phil Knight helped fund this world-class facility featuring two full practice fields and cutting-edge training technology.', panoramaUrl: '/panoramas/oregon-practice.jpg' },
    { slug: 'oregon', key: 'oregon-weight-room', name: 'Marcus Mariota Performance Center', type: 'weight-room', description: 'Named after the Heisman Trophy winner, this performance center features the latest in sports science and strength training equipment.', panoramaUrl: '/panoramas/oregon-weight-room.jpg' },
    { slug: 'oregon', key: 'oregon-locker-room', name: 'Nike Innovation Locker Room', type: 'locker-room', description: 'A futuristic locker room designed in collaboration with Nike, featuring digital displays and customizable LED lighting.', panoramaUrl: '/panoramas/oregon-locker-room.jpg' },
    // Ohio State
    { slug: 'ohio-state', key: 'ohio-state-stadium', name: 'Ohio Stadium', type: 'stadium', description: 'The legendary "Horseshoe" — a 102,780-seat cathedral of college football that has been the home of the Buckeyes since 1922.', panoramaUrl: '/panoramas/ohio-state-stadium.jpg' },
    { slug: 'ohio-state', key: 'ohio-state-practice', name: 'Woody Hayes Athletic Center', type: 'practice', description: 'An elite practice facility named after the legendary coach, featuring indoor and outdoor practice fields.', panoramaUrl: '/panoramas/ohio-state-practice.jpg' },
    { slug: 'ohio-state', key: 'ohio-state-weight-room', name: 'Buckeye Performance Center', type: 'weight-room', description: 'A comprehensive strength and conditioning facility with cutting-edge equipment and sport science labs.', panoramaUrl: '/panoramas/ohio-state-weight-room.jpg' },
    { slug: 'ohio-state', key: 'ohio-state-locker-room', name: 'Scarlet & Gray Locker Room', type: 'locker-room', description: 'A cathedral-like players\' locker room with vaulted ceilings, custom Ohio State branding, and Buckeye leaf history displays.', panoramaUrl: '/panoramas/ohio-state-locker-room.jpg' },
    // Texas
    { slug: 'texas', key: 'texas-stadium', name: 'Darrell K Royal–Texas Memorial Stadium', type: 'stadium', description: 'A 100,119-seat stadium in the heart of Austin. The south end zone features the iconic "TEXAS" scoreboard and Bevo\'s corral.', panoramaUrl: '/panoramas/texas-stadium.jpg' },
    { slug: 'texas', key: 'texas-practice', name: 'Frank Denius Fields', type: 'practice', description: 'Outdoor practice fields with a state-of-the-art video tower for film study and drone-compatible airspace.', panoramaUrl: '/panoramas/texas-practice.jpg' },
    { slug: 'texas', key: 'texas-weight-room', name: 'Longhorn Strength Center', type: 'weight-room', description: 'A recently renovated, 30,000 sq ft training facility with a Longhorn silhouette floor and burnt orange accents throughout.', panoramaUrl: '/panoramas/texas-weight-room.jpg' },
    { slug: 'texas', key: 'texas-locker-room', name: 'Moncrief-Neuhaus Athletic Center', type: 'locker-room', description: 'The Longhorns\' home base with luxurious player amenities, a team auditorium, and a tunnel walk leading to the stadium.', panoramaUrl: '/panoramas/texas-locker-room.jpg' },
    // LSU
    { slug: 'lsu', key: 'lsu-stadium', name: 'Tiger Stadium (Death Valley)', type: 'stadium', description: 'The 102,321-seat "Death Valley" is the loudest stadium in America. Saturday Night in Death Valley is college football\'s greatest tradition.', panoramaUrl: '/panoramas/lsu-stadium.jpg' },
    { slug: 'lsu', key: 'lsu-practice', name: 'Charles McClendon Practice Facility', type: 'practice', description: 'A fully enclosed indoor practice facility essential for year-round preparation in Louisiana\'s subtropical climate.', panoramaUrl: '/panoramas/lsu-practice.jpg' },
    { slug: 'lsu', key: 'lsu-weight-room', name: 'Tiger Training Facility', type: 'weight-room', description: 'A modern strength and conditioning center with custom Tiger branding and recovery amenities.', panoramaUrl: '/panoramas/lsu-weight-room.jpg' },
    { slug: 'lsu', key: 'lsu-locker-room', name: 'Champions Locker Room', type: 'locker-room', description: 'A showcase of LSU\'s four national championship seasons with custom lockers and a purple-and-gold LED ceiling.', panoramaUrl: '/panoramas/lsu-locker-room.jpg' },
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
    // Alabama Stadium
    { facilityKey: 'alabama-stadium', x: 0.3, y: 0.6, label: 'Walk of Champions', description: 'The iconic pregame walk where the team enters through fans lining the path from the bus to the locker room.' },
    { facilityKey: 'alabama-stadium', x: 0.7, y: 0.3, label: 'National Championship Displays', description: 'Bronze plaques and displays commemorating each of Alabama\'s 18 national championships.' },
    // Alabama Practice
    { facilityKey: 'alabama-practice', x: 0.5, y: 0.5, label: 'Indoor Turf Field', description: 'Full-size synthetic turf field for practice in all weather conditions.' },
    // Alabama Weight Room
    { facilityKey: 'alabama-weight-room', x: 0.4, y: 0.4, label: 'Olympic Platforms', description: 'Custom-built Olympic lifting platforms with Alabama branding and competition-grade equipment.' },
    // Alabama Locker Room
    { facilityKey: 'alabama-locker-room', x: 0.5, y: 0.5, label: 'Championship Banners', description: 'Eighteen championship banners hang overhead, a constant reminder of the standard at Alabama.' },
    // Oregon Stadium
    { facilityKey: 'oregon-stadium', x: 0.5, y: 0.7, label: 'The O', description: 'The massive illuminated Oregon "O" logo at midfield that glows during night games.' },
    { facilityKey: 'oregon-stadium', x: 0.2, y: 0.4, label: 'Nike Skybox', description: 'Phil Knight\'s personal skybox featuring cutting-edge Nike displays and memorabilia.' },
    // Oregon Practice
    { facilityKey: 'oregon-practice', x: 0.5, y: 0.5, label: 'Film Tower', description: 'A state-of-the-art video tower for coaching analysis during outdoor practice sessions.' },
    // Oregon Weight Room
    { facilityKey: 'oregon-weight-room', x: 0.5, y: 0.5, label: 'Recovery Pods', description: 'Cryotherapy chambers, cold plunge pools, and compression boots for elite recovery.' },
    // Oregon Locker Room
    { facilityKey: 'oregon-locker-room', x: 0.5, y: 0.5, label: 'Digital Lockers', description: 'Each player\'s locker features an integrated digital display showing their stats, schedule, and personalized Nike gear.' },
    // Ohio State Stadium
    { facilityKey: 'ohio-state-stadium', x: 0.6, y: 0.5, label: 'Block O Section', description: 'The famous student section that creates the iconic card displays during big moments.' },
    { facilityKey: 'ohio-state-stadium', x: 0.3, y: 0.3, label: 'Rotunda', description: 'The entrance rotunda featuring statues of Buckeye legends and Heisman Trophy winners.' },
    // Ohio State Practice
    { facilityKey: 'ohio-state-practice', x: 0.5, y: 0.5, label: 'Indoor Field', description: 'Climate-controlled indoor practice field with Ohio Stadium\'s exact dimensions.' },
    // Ohio State Weight Room
    { facilityKey: 'ohio-state-weight-room', x: 0.5, y: 0.5, label: 'Sport Science Lab', description: 'GPS tracking, force plates, and motion capture for performance analytics.' },
    // Ohio State Locker Room
    { facilityKey: 'ohio-state-locker-room', x: 0.5, y: 0.5, label: 'Buckeye Leaf Wall', description: 'A wall tracking every Buckeye leaf sticker earned during the season — a tradition dating back to Woody Hayes.' },
    // Texas Stadium
    { facilityKey: 'texas-stadium', x: 0.5, y: 0.8, label: 'Bevo\'s Corral', description: 'The home of Bevo, the live Longhorn steer mascot who presides over the south end zone.' },
    { facilityKey: 'texas-stadium', x: 0.5, y: 0.2, label: 'TEXAS Scoreboard', description: 'The iconic giant TEXAS letters that light up orange after every Longhorn score.' },
    // Texas Practice
    { facilityKey: 'texas-practice', x: 0.5, y: 0.5, label: 'Video Tower', description: 'High-definition filming platform for practice analysis with drone-compatible airspace.' },
    // Texas Weight Room
    { facilityKey: 'texas-weight-room', x: 0.5, y: 0.5, label: 'Longhorn Floor', description: 'A massive burnt orange Longhorn silhouette embedded in the weight room floor.' },
    // Texas Locker Room
    { facilityKey: 'texas-locker-room', x: 0.5, y: 0.5, label: 'Eyes of Texas Mural', description: 'The iconic mural above the tunnel exit where players touch a Longhorn symbol before taking the field.' },
    // LSU Stadium
    { facilityKey: 'lsu-stadium', x: 0.4, y: 0.6, label: 'Mike the Tiger Habitat', description: 'The live tiger habitat right outside the stadium where Mike VII greets fans on game day.' },
    { facilityKey: 'lsu-stadium', x: 0.8, y: 0.4, label: 'Championship Plaza', description: 'An outdoor display celebrating LSU\'s four national championships with bronze statues.' },
    // LSU Practice
    { facilityKey: 'lsu-practice', x: 0.5, y: 0.5, label: 'Indoor Turf', description: 'A fully enclosed indoor practice field for year-round preparation in Louisiana\'s humid climate.' },
    // LSU Weight Room
    { facilityKey: 'lsu-weight-room', x: 0.5, y: 0.5, label: 'Tiger Den', description: 'The central gathering area of the weight room with motivational displays and team records.' },
    // LSU Locker Room
    { facilityKey: 'lsu-locker-room', x: 0.5, y: 0.5, label: 'Championship Display', description: 'A floor-to-ceiling display showcasing game balls, trophies, and memorabilia from LSU\'s four championship seasons.' },
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
