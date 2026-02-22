import type { Sport, Coach, Facility, Hotspot } from '@/types';

// -----------------------------------------------------------------------------
// Sports (football programs for each school)
// -----------------------------------------------------------------------------

export const SPORTS: Sport[] = [
  {
    id: 'alabama-football',
    schoolId: 'alabama',
    name: 'Football',
    conference: 'SEC',
    headCoach: 'Kalen DeBoer',
    record: '9-4',
    ranking: undefined,
    facilities: [], // populated below via FACILITIES
  },
  {
    id: 'oregon-football',
    schoolId: 'oregon',
    name: 'Football',
    conference: 'Big Ten',
    headCoach: 'Dan Lanning',
    record: '13-1',
    ranking: 3,
    facilities: [],
  },
  {
    id: 'ohio-state-football',
    schoolId: 'ohio-state',
    name: 'Football',
    conference: 'Big Ten',
    headCoach: 'Ryan Day',
    record: '13-2',
    ranking: 1,
    facilities: [],
  },
  {
    id: 'texas-football',
    schoolId: 'texas',
    name: 'Football',
    conference: 'SEC',
    headCoach: 'Steve Sarkisian',
    record: '12-3',
    ranking: 5,
    facilities: [],
  },
  {
    id: 'lsu-football',
    schoolId: 'lsu',
    name: 'Football',
    conference: 'SEC',
    headCoach: 'Brian Kelly',
    record: '9-4',
    ranking: undefined,
    facilities: [],
  },
];

// -----------------------------------------------------------------------------
// Coaches
// -----------------------------------------------------------------------------

export const COACHES: Coach[] = [
  // Alabama
  {
    id: 'coach-deboer',
    sportId: 'alabama-football',
    name: 'Kalen DeBoer',
    title: 'Head Coach',
    imageUrl: 'https://placeholder.com/alabama-coach-deboer.jpg',
    bio: 'Kalen DeBoer took over as Alabama\'s head coach in 2024 after the retirement of Nick Saban. Previously led Washington to the College Football Playoff national championship game. Known for his innovative passing offense and strong recruiting ability.',
    yearsAtSchool: 1,
  },
  {
    id: 'coach-golding',
    sportId: 'alabama-football',
    name: 'Pete Golding',
    title: 'Defensive Coordinator',
    imageUrl: 'https://placeholder.com/alabama-coach-golding.jpg',
    bio: 'Experienced defensive coordinator who has coached at multiple SEC programs, bringing a physical and aggressive defensive scheme.',
    yearsAtSchool: 1,
  },

  // Oregon
  {
    id: 'coach-lanning',
    sportId: 'oregon-football',
    name: 'Dan Lanning',
    title: 'Head Coach',
    imageUrl: 'https://placeholder.com/oregon-coach-lanning.jpg',
    bio: 'Dan Lanning became Oregon\'s head coach in 2022 after serving as Georgia\'s defensive coordinator during their national championship run. Led the Ducks to the Big Ten championship and College Football Playoff in his third season.',
    yearsAtSchool: 3,
  },
  {
    id: 'coach-dillingham',
    sportId: 'oregon-football',
    name: 'Will Stein',
    title: 'Offensive Coordinator',
    imageUrl: 'https://placeholder.com/oregon-coach-stein.jpg',
    bio: 'Rising offensive mind who has helped Oregon develop one of the most explosive passing attacks in the nation.',
    yearsAtSchool: 2,
  },

  // Ohio State
  {
    id: 'coach-day',
    sportId: 'ohio-state-football',
    name: 'Ryan Day',
    title: 'Head Coach',
    imageUrl: 'https://placeholder.com/ohio-state-coach-day.jpg',
    bio: 'Ryan Day succeeded Urban Meyer in 2019 and has maintained Ohio State as a perennial College Football Playoff contender. Led the Buckeyes to the 2024 national championship. Known for developing elite quarterbacks and offensive systems.',
    yearsAtSchool: 8,
  },
  {
    id: 'coach-knowles',
    sportId: 'ohio-state-football',
    name: 'Jim Knowles',
    title: 'Defensive Coordinator',
    imageUrl: 'https://placeholder.com/ohio-state-coach-knowles.jpg',
    bio: 'Veteran defensive coordinator who transformed Ohio State\'s defense into one of the nation\'s best, featuring a versatile 4-2-5 scheme.',
    yearsAtSchool: 3,
  },

  // Texas
  {
    id: 'coach-sarkisian',
    sportId: 'texas-football',
    name: 'Steve Sarkisian',
    title: 'Head Coach',
    imageUrl: 'https://placeholder.com/texas-coach-sarkisian.jpg',
    bio: 'Steve Sarkisian took over at Texas in 2021 and has rapidly elevated the program into SEC title contention. Former Alabama offensive coordinator under Nick Saban, Sarkisian is known for his creative play-calling and elite quarterback development.',
    yearsAtSchool: 4,
  },
  {
    id: 'coach-robinson',
    sportId: 'texas-football',
    name: 'Kyle Flood',
    title: 'Offensive Coordinator',
    imageUrl: 'https://placeholder.com/texas-coach-flood.jpg',
    bio: 'Experienced offensive line coach and coordinator who has been instrumental in building one of the most physical offensive fronts in college football.',
    yearsAtSchool: 4,
  },

  // LSU
  {
    id: 'coach-kelly',
    sportId: 'lsu-football',
    name: 'Brian Kelly',
    title: 'Head Coach',
    imageUrl: 'https://placeholder.com/lsu-coach-kelly.jpg',
    bio: 'Brian Kelly joined LSU in 2022 after a historic tenure at Notre Dame where he became the program\'s all-time winningest coach. In his third season at LSU, Kelly has rebuilt the roster through the transfer portal and recruiting, aiming to return the Tigers to national prominence.',
    yearsAtSchool: 3,
  },
  {
    id: 'coach-navarrete',
    sportId: 'lsu-football',
    name: 'Joe Sloan',
    title: 'Offensive Coordinator',
    imageUrl: 'https://placeholder.com/lsu-coach-sloan.jpg',
    bio: 'Young offensive coordinator who runs a high-tempo, spread-based attack that leverages LSU\'s elite skill position talent.',
    yearsAtSchool: 2,
  },
];

// -----------------------------------------------------------------------------
// Hotspots
// -----------------------------------------------------------------------------

export const HOTSPOTS: Hotspot[] = [
  // Alabama - Bryant-Denny Stadium
  {
    id: 'bds-50-yard',
    x: 0.5,
    y: 0.3,
    z: 0,
    label: '50 Yard Line View',
    description: 'Center field view from the press level, overlooking the full 101,821-seat stadium.',
  },
  {
    id: 'bds-tunnel',
    x: 0.2,
    y: 0.6,
    z: 0,
    label: 'Player Tunnel',
    description: 'Where the Crimson Tide emerges onto the field, walking past the iconic \"Walk of Champions\" display.',
    linkedFacilityId: 'alabama-locker-room',
  },
  {
    id: 'bds-scoreboard',
    x: 0.8,
    y: 0.2,
    z: 0,
    label: 'Jumbotron',
    description: 'The massive 57-by-26-foot HD video board at the south end zone.',
  },

  // Alabama - Practice Facility
  {
    id: 'alabama-practice-turf',
    x: 0.5,
    y: 0.5,
    z: 0,
    label: 'Indoor Turf Field',
    description: 'Full-size indoor practice field with FieldTurf surface, allowing year-round training regardless of weather.',
  },
  {
    id: 'alabama-practice-film',
    x: 0.15,
    y: 0.4,
    z: 0,
    label: 'Film Review Room',
    description: 'State-of-the-art film room with individual player stations for game preparation and self-evaluation.',
    linkedFacilityId: 'alabama-weight-room',
  },

  // Alabama - Weight Room
  {
    id: 'alabama-weight-platforms',
    x: 0.5,
    y: 0.5,
    z: 0,
    label: 'Olympic Lifting Platforms',
    description: '24 custom Olympic lifting platforms with Crimson Tide branding and competition-grade Eleiko equipment.',
  },

  // Alabama - Locker Room
  {
    id: 'alabama-locker-display',
    x: 0.5,
    y: 0.3,
    z: 0,
    label: 'Championship Display',
    description: 'Showcases all 18 national championship trophies and rings in an illuminated glass case.',
  },
  {
    id: 'alabama-locker-stations',
    x: 0.3,
    y: 0.6,
    z: 0,
    label: 'Player Lockers',
    description: 'Custom-built wooden lockers with integrated charging stations, ventilation, and digital nameplates.',
  },

  // Oregon - Autzen Stadium
  {
    id: 'autzen-50-yard',
    x: 0.5,
    y: 0.3,
    z: 0,
    label: '50 Yard Line View',
    description: 'The heart of Autzen Stadium, where 54,000 fans create one of the loudest environments per-capita in college football.',
  },
  {
    id: 'autzen-tunnel',
    x: 0.2,
    y: 0.6,
    z: 0,
    label: 'Duck Tunnel',
    description: 'The dramatic tunnel entrance where players emerge to \"Shout\" by the Isley Brothers.',
    linkedFacilityId: 'oregon-locker-room',
  },

  // Oregon - Hatfield-Dowlin Complex
  {
    id: 'oregon-hdc-lobby',
    x: 0.5,
    y: 0.3,
    z: 0,
    label: 'Nike Lobby',
    description: 'A stunning Nike-designed entrance showcasing Oregon\'s uniform history and the program\'s connection to Phil Knight.',
  },
  {
    id: 'oregon-hdc-barber',
    x: 0.8,
    y: 0.5,
    z: 0,
    label: 'Player Barber Shop',
    description: 'An in-house barbershop available exclusively for student-athletes, a signature Oregon amenity.',
  },

  // Oregon - Weight Room
  {
    id: 'oregon-weight-center',
    x: 0.5,
    y: 0.5,
    z: 0,
    label: 'Performance Center',
    description: 'Nike-designed 25,000 sq ft weight room with cutting-edge equipment and custom Oregon branding throughout.',
  },

  // Ohio State - Ohio Stadium
  {
    id: 'horseshoe-50-yard',
    x: 0.5,
    y: 0.3,
    z: 0,
    label: '50 Yard Line View',
    description: 'The iconic Horseshoe view from midfield, looking out at 102,780 seats in the nation\'s fourth-largest stadium.',
  },
  {
    id: 'horseshoe-rotunda',
    x: 0.2,
    y: 0.5,
    z: 0,
    label: 'Rotunda Entrance',
    description: 'The historic rotunda at the open end of the Horseshoe, featuring the Buckeye Grove tradition.',
    linkedFacilityId: 'ohio-state-locker-room',
  },
  {
    id: 'horseshoe-block-o',
    x: 0.7,
    y: 0.2,
    z: 0,
    label: 'Block O Student Section',
    description: 'The famously rowdy Block O student section behind the south end zone.',
  },

  // Ohio State - Woody Hayes Athletic Center
  {
    id: 'whac-lobby',
    x: 0.5,
    y: 0.3,
    z: 0,
    label: 'Trophy Lobby',
    description: 'The entrance hall displays eight national championship trophies and seven Heisman Trophy replicas.',
  },
  {
    id: 'whac-meeting',
    x: 0.3,
    y: 0.6,
    z: 0,
    label: 'Position Meeting Rooms',
    description: 'State-of-the-art meeting rooms with theater-style seating and 4K projection for film review.',
  },

  // Texas - DKR Memorial Stadium
  {
    id: 'dkr-50-yard',
    x: 0.5,
    y: 0.3,
    z: 0,
    label: '50 Yard Line View',
    description: 'Center field in the 100,119-seat Darrell K Royal-Texas Memorial Stadium, the largest stadium in the SEC.',
  },
  {
    id: 'dkr-bevo-blvd',
    x: 0.2,
    y: 0.6,
    z: 0,
    label: 'Bevo Boulevard',
    description: 'The premier tailgating destination on the south end, featuring live music, food, and Bevo the longhorn steer.',
  },
  {
    id: 'dkr-godzillatron',
    x: 0.8,
    y: 0.2,
    z: 0,
    label: 'Godzillatron',
    description: 'The massive LED video display at the south end zone, one of the largest in collegiate athletics.',
  },

  // Texas - Practice Facility
  {
    id: 'texas-practice-indoor',
    x: 0.5,
    y: 0.5,
    z: 0,
    label: 'Indoor Practice Fields',
    description: 'Two full-size indoor fields in the Frank Denius Practice Facility, a $175M state-of-the-art complex completed in 2023.',
  },

  // LSU - Tiger Stadium
  {
    id: 'death-valley-50',
    x: 0.5,
    y: 0.3,
    z: 0,
    label: '50 Yard Line View',
    description: 'The view from midfield in Death Valley, where 102,321 fans create the most intimidating atmosphere in college football, especially under the Saturday night lights.',
  },
  {
    id: 'death-valley-eye',
    x: 0.2,
    y: 0.2,
    z: 0,
    label: 'Eye of the Tiger',
    description: 'The iconic painted eye of the tiger on the field at midfield, a symbol of LSU football.',
  },
  {
    id: 'death-valley-tunnel',
    x: 0.15,
    y: 0.6,
    z: 0,
    label: 'Tiger Tunnel',
    description: 'The tunnel where players touch the \"Win\" bar and charge onto the field to the roar of Death Valley.',
    linkedFacilityId: 'lsu-locker-room',
  },

  // LSU - Football Operations Center
  {
    id: 'lsu-ops-lobby',
    x: 0.5,
    y: 0.3,
    z: 0,
    label: 'Championship Lobby',
    description: 'A grand lobby featuring the four national championship trophies, including the 2019 crystal football.',
  },

  // LSU - Weight Room
  {
    id: 'lsu-weight-floor',
    x: 0.5,
    y: 0.5,
    z: 0,
    label: 'Main Training Floor',
    description: '20,000 sq ft of training space with custom purple and gold equipment, GPS tracking systems, and force plate technology.',
  },
];

// -----------------------------------------------------------------------------
// Facilities
// -----------------------------------------------------------------------------

export const FACILITIES: Facility[] = [
  // Alabama
  {
    id: 'alabama-stadium',
    sportId: 'alabama-football',
    name: 'Bryant-Denny Stadium',
    type: 'stadium',
    description:
      'Home of Alabama football since 1929, Bryant-Denny Stadium seats 101,821 fans and has hosted some of the most memorable games in SEC and NCAA history. Named after legendary coach Paul \"Bear\" Bryant and former university president George H. Denny.',
    imageUrl: 'https://placeholder.com/alabama-bryant-denny.jpg',
    panoramaUrl: 'https://placeholder.com/alabama-bryant-denny-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'bds-50-yard')!,
      HOTSPOTS.find((h) => h.id === 'bds-tunnel')!,
      HOTSPOTS.find((h) => h.id === 'bds-scoreboard')!,
    ],
  },
  {
    id: 'alabama-practice',
    sportId: 'alabama-football',
    name: 'Hank Crisp Indoor Practice Facility',
    type: 'practice',
    description:
      'A world-class indoor practice facility featuring a full-size turf field, position meeting rooms, and film review stations. Allows Alabama to train year-round in any weather condition.',
    imageUrl: 'https://placeholder.com/alabama-practice.jpg',
    panoramaUrl: 'https://placeholder.com/alabama-practice-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'alabama-practice-turf')!,
      HOTSPOTS.find((h) => h.id === 'alabama-practice-film')!,
    ],
  },
  {
    id: 'alabama-weight-room',
    sportId: 'alabama-football',
    name: 'Alabama Football Weight Room',
    type: 'weight-room',
    description:
      'The 37,000-square-foot strength and conditioning facility is equipped with custom platforms, state-of-the-art machines, and recovery pools to support peak athletic performance.',
    imageUrl: 'https://placeholder.com/alabama-weight-room.jpg',
    panoramaUrl: 'https://placeholder.com/alabama-weight-room-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'alabama-weight-platforms')!,
    ],
  },
  {
    id: 'alabama-locker-room',
    sportId: 'alabama-football',
    name: 'Alabama Football Locker Room',
    type: 'locker-room',
    description:
      'A recently renovated locker room featuring custom-built lockers for each player, a championship trophy display, team meeting areas, and a players-only lounge with gaming and relaxation amenities.',
    imageUrl: 'https://placeholder.com/alabama-locker-room.jpg',
    panoramaUrl: 'https://placeholder.com/alabama-locker-room-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'alabama-locker-display')!,
      HOTSPOTS.find((h) => h.id === 'alabama-locker-stations')!,
    ],
  },

  // Oregon
  {
    id: 'oregon-stadium',
    sportId: 'oregon-football',
    name: 'Autzen Stadium',
    type: 'stadium',
    description:
      'Autzen Stadium seats 54,000 but is considered one of the loudest venues in college football. The intimate bowl design amplifies crowd noise to levels rivaling stadiums twice its size. Surrounded by the natural beauty of the Willamette Valley.',
    imageUrl: 'https://placeholder.com/oregon-autzen.jpg',
    panoramaUrl: 'https://placeholder.com/oregon-autzen-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'autzen-50-yard')!,
      HOTSPOTS.find((h) => h.id === 'autzen-tunnel')!,
    ],
  },
  {
    id: 'oregon-practice',
    sportId: 'oregon-football',
    name: 'Hatfield-Dowlin Complex',
    type: 'practice',
    description:
      'The Hatfield-Dowlin Complex is Oregon\'s football operations center, funded by Phil Knight and designed by Nike. Features indoor and outdoor practice fields, coaches\' offices, a players\' lounge, and the famous barbershop.',
    imageUrl: 'https://placeholder.com/oregon-hdc.jpg',
    panoramaUrl: 'https://placeholder.com/oregon-hdc-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'oregon-hdc-lobby')!,
      HOTSPOTS.find((h) => h.id === 'oregon-hdc-barber')!,
    ],
  },
  {
    id: 'oregon-weight-room',
    sportId: 'oregon-football',
    name: 'Oregon Football Performance Center',
    type: 'weight-room',
    description:
      'A 25,000-square-foot Nike-designed performance center that is widely regarded as one of the finest weight rooms in college athletics. Features custom equipment, recovery pools, and advanced biomechanical analysis technology.',
    imageUrl: 'https://placeholder.com/oregon-weight-room.jpg',
    panoramaUrl: 'https://placeholder.com/oregon-weight-room-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'oregon-weight-center')!,
    ],
  },
  {
    id: 'oregon-locker-room',
    sportId: 'oregon-football',
    name: 'Oregon Football Locker Room',
    type: 'locker-room',
    description:
      'The Oregon locker room, designed in collaboration with Nike, features illuminated lockers, custom LED displays for each player, and a sleek modern aesthetic that embodies the Oregon brand.',
    imageUrl: 'https://placeholder.com/oregon-locker-room.jpg',
    panoramaUrl: 'https://placeholder.com/oregon-locker-room-pano.jpg',
    hotspots: [],
  },

  // Ohio State
  {
    id: 'ohio-state-stadium',
    sportId: 'ohio-state-football',
    name: 'Ohio Stadium (The Horseshoe)',
    type: 'stadium',
    description:
      'Ohio Stadium, affectionately known as \"The Horseshoe\" or \"The Shoe,\" seats 102,780 and has been the home of Buckeye football since 1922. The iconic horseshoe shape and the traditions of \"Script Ohio\" and \"Dotting the I\" make it one of the most recognizable venues in sports.',
    imageUrl: 'https://placeholder.com/ohio-state-stadium.jpg',
    panoramaUrl: 'https://placeholder.com/ohio-state-stadium-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'horseshoe-50-yard')!,
      HOTSPOTS.find((h) => h.id === 'horseshoe-rotunda')!,
      HOTSPOTS.find((h) => h.id === 'horseshoe-block-o')!,
    ],
  },
  {
    id: 'ohio-state-practice',
    sportId: 'ohio-state-football',
    name: 'Woody Hayes Athletic Center',
    type: 'practice',
    description:
      'The Woody Hayes Athletic Center, named after the legendary coach, serves as the football program\'s headquarters. Features a recently renovated indoor practice facility, meeting rooms, a nutrition center, and the Football Hall of Fame.',
    imageUrl: 'https://placeholder.com/ohio-state-whac.jpg',
    panoramaUrl: 'https://placeholder.com/ohio-state-whac-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'whac-lobby')!,
      HOTSPOTS.find((h) => h.id === 'whac-meeting')!,
    ],
  },
  {
    id: 'ohio-state-weight-room',
    sportId: 'ohio-state-football',
    name: 'Ohio State Football Weight Room',
    type: 'weight-room',
    description:
      'A 22,000-square-foot strength and conditioning facility exclusively for football, featuring Hammer Strength equipment, Tendo units for velocity tracking, and a dedicated sports science staff.',
    imageUrl: 'https://placeholder.com/ohio-state-weight-room.jpg',
    panoramaUrl: 'https://placeholder.com/ohio-state-weight-room-pano.jpg',
    hotspots: [],
  },
  {
    id: 'ohio-state-locker-room',
    sportId: 'ohio-state-football',
    name: 'Ohio State Football Locker Room',
    type: 'locker-room',
    description:
      'The Buckeyes\' locker room underwent a $7.2M renovation featuring scarlet and gray custom lockers, a hydration station, a Heisman Trophy display, and a motivational \"Chase\" wall honoring program legends.',
    imageUrl: 'https://placeholder.com/ohio-state-locker-room.jpg',
    panoramaUrl: 'https://placeholder.com/ohio-state-locker-room-pano.jpg',
    hotspots: [],
  },

  // Texas
  {
    id: 'texas-stadium',
    sportId: 'texas-football',
    name: 'Darrell K Royal-Texas Memorial Stadium',
    type: 'stadium',
    description:
      'DKR Memorial Stadium seats 100,119 fans, making it one of the largest venues in college football. Named after coaching legend Darrell K Royal, the stadium is known for its south end zone expansion, Bevo Boulevard, and the tradition of \"The Eyes of Texas.\"',
    imageUrl: 'https://placeholder.com/texas-dkr.jpg',
    panoramaUrl: 'https://placeholder.com/texas-dkr-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'dkr-50-yard')!,
      HOTSPOTS.find((h) => h.id === 'dkr-bevo-blvd')!,
      HOTSPOTS.find((h) => h.id === 'dkr-godzillatron')!,
    ],
  },
  {
    id: 'texas-practice',
    sportId: 'texas-football',
    name: 'Frank Denius Practice Facility',
    type: 'practice',
    description:
      'The $175 million Frank Denius Practice Facility, completed in 2023, features two full-size indoor fields, a 20,000-square-foot weight room, sports medicine suites, nutrition stations, and a players\' lounge.',
    imageUrl: 'https://placeholder.com/texas-denius.jpg',
    panoramaUrl: 'https://placeholder.com/texas-denius-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'texas-practice-indoor')!,
    ],
  },
  {
    id: 'texas-weight-room',
    sportId: 'texas-football',
    name: 'Texas Football Weight Room',
    type: 'weight-room',
    description:
      'A 20,000-square-foot, purpose-built strength facility inside the Denius complex with 30 squat racks, an Olympic platform area, and a recovery pool with cold and hot plunge tubs.',
    imageUrl: 'https://placeholder.com/texas-weight-room.jpg',
    panoramaUrl: 'https://placeholder.com/texas-weight-room-pano.jpg',
    hotspots: [],
  },
  {
    id: 'texas-locker-room',
    sportId: 'texas-football',
    name: 'Texas Football Locker Room',
    type: 'locker-room',
    description:
      'The Longhorns\' locker room features burnt orange custom lockers, a Longhorn Network studio backdrop, digital displays for each player, and direct tunnel access to DKR Memorial Stadium.',
    imageUrl: 'https://placeholder.com/texas-locker-room.jpg',
    panoramaUrl: 'https://placeholder.com/texas-locker-room-pano.jpg',
    hotspots: [],
  },

  // LSU
  {
    id: 'lsu-stadium',
    sportId: 'lsu-football',
    name: 'Tiger Stadium (Death Valley)',
    type: 'stadium',
    description:
      'Tiger Stadium, known as Death Valley, seats 102,321 and is widely considered the most intimidating venue in college football. Saturday night games under the lights in Death Valley are a bucket-list experience for any football fan, with a tradition dating back to 1924.',
    imageUrl: 'https://placeholder.com/lsu-tiger-stadium.jpg',
    panoramaUrl: 'https://placeholder.com/lsu-tiger-stadium-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'death-valley-50')!,
      HOTSPOTS.find((h) => h.id === 'death-valley-eye')!,
      HOTSPOTS.find((h) => h.id === 'death-valley-tunnel')!,
    ],
  },
  {
    id: 'lsu-practice',
    sportId: 'lsu-football',
    name: 'LSU Football Operations Center',
    type: 'practice',
    description:
      'The Football Operations Center houses coaches\' offices, meeting rooms, a sports medicine facility, a nutrition center, and connects directly to the indoor and outdoor practice fields.',
    imageUrl: 'https://placeholder.com/lsu-ops-center.jpg',
    panoramaUrl: 'https://placeholder.com/lsu-ops-center-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'lsu-ops-lobby')!,
    ],
  },
  {
    id: 'lsu-weight-room',
    sportId: 'lsu-football',
    name: 'LSU Football Weight Room',
    type: 'weight-room',
    description:
      'A 20,000-square-foot strength and conditioning facility with custom purple and gold equipment, Catapult GPS tracking systems, force plates, and a dedicated recovery area.',
    imageUrl: 'https://placeholder.com/lsu-weight-room.jpg',
    panoramaUrl: 'https://placeholder.com/lsu-weight-room-pano.jpg',
    hotspots: [
      HOTSPOTS.find((h) => h.id === 'lsu-weight-floor')!,
    ],
  },
  {
    id: 'lsu-locker-room',
    sportId: 'lsu-football',
    name: 'LSU Football Locker Room',
    type: 'locker-room',
    description:
      'The LSU locker room features custom-built lockers in purple and gold, a central gathering area for pregame speeches, championship displays, and direct tunnel access to Tiger Stadium.',
    imageUrl: 'https://placeholder.com/lsu-locker-room.jpg',
    panoramaUrl: 'https://placeholder.com/lsu-locker-room-pano.jpg',
    hotspots: [],
  },
];

// Wire up facilities into their respective Sport objects
SPORTS.forEach((sport) => {
  sport.facilities = FACILITIES.filter((f) => f.sportId === sport.id);
});
