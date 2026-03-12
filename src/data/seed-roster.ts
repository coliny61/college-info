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

    // ─── USC Trojans ─────────────────────────────────────────────────────────────
    // Offense
    { slug: 'usc', name: 'Jayden Maiava', number: 14, position: 'QB', height: '6-4', weight: 220, year: 'JR', hometown: 'Honolulu', state: 'HI', highSchool: 'Liberty HS (NV)', isStarter: true },
    { slug: 'usc', name: 'King Miller', number: 30, position: 'RB', height: '6-0', weight: 210, year: 'FR', hometown: 'Miami', state: 'FL', highSchool: 'Northwestern HS', isStarter: true },
    { slug: 'usc', name: 'Ja\'Kobi Lane', number: 8, position: 'WR', height: '6-4', weight: 200, year: 'JR', hometown: 'Mesa', state: 'AZ', highSchool: 'Red Mountain HS', isStarter: true },
    { slug: 'usc', name: 'Makai Lemon', number: 6, position: 'WR', height: '5-11', weight: 195, year: 'JR', hometown: 'Los Alamitos', state: 'CA', highSchool: 'Los Alamitos HS', isStarter: true },
    { slug: 'usc', name: 'Tanook Hines', number: 16, position: 'WR', height: '6-0', weight: 195, year: 'FR', hometown: 'Los Angeles', state: 'CA', highSchool: 'Loyola HS', isStarter: true },
    { slug: 'usc', name: 'Lake McRee', number: 87, position: 'TE', height: '6-4', weight: 250, year: 'SR', hometown: 'San Clemente', state: 'CA', highSchool: 'San Clemente HS', isStarter: true },
    { slug: 'usc', name: 'Elijah Paige', number: 72, position: 'OT', height: '6-7', weight: 325, year: 'SO', hometown: 'Pasadena', state: 'CA', highSchool: 'Muir HS', isStarter: true },
    { slug: 'usc', name: 'Tobias Raymond', number: 73, position: 'OG', height: '6-6', weight: 315, year: 'SO', hometown: 'Portland', state: 'OR', highSchool: 'Central Catholic HS', isStarter: true },
    { slug: 'usc', name: 'J\'Onre Reed', number: 50, position: 'C', height: '6-3', weight: 320, year: 'SR', hometown: 'Atlanta', state: 'GA', highSchool: 'Westlake HS', isStarter: true },
    { slug: 'usc', name: 'Alani Noa', number: 77, position: 'OG', height: '6-3', weight: 315, year: 'JR', hometown: 'Oceanside', state: 'CA', highSchool: 'El Camino HS', isStarter: true },
    { slug: 'usc', name: 'Justin Tauanuu', number: 74, position: 'OT', height: '6-6', weight: 315, year: 'FR', hometown: 'Provo', state: 'UT', highSchool: 'Timpview HS', isStarter: true },
    // Defense
    { slug: 'usc', name: 'Anthony Lucas', number: 6, position: 'DE', height: '6-5', weight: 285, year: 'SR', hometown: 'Scottsdale', state: 'AZ', highSchool: 'Chaparral HS', isStarter: true },
    { slug: 'usc', name: 'Kameryn Crawford', number: 1, position: 'DE', height: '6-5', weight: 265, year: 'SO', hometown: 'McKinney', state: 'TX', highSchool: 'McKinney HS', isStarter: true },
    { slug: 'usc', name: 'Devan Thompkins', number: 8, position: 'DT', height: '6-5', weight: 290, year: 'JR', hometown: 'Shreveport', state: 'LA', highSchool: 'Captain Shreve HS', isStarter: true },
    { slug: 'usc', name: 'Jide Abasiri', number: 97, position: 'DT', height: '6-5', weight: 295, year: 'SO', hometown: 'Houston', state: 'TX', highSchool: 'Westfield HS', isStarter: true },
    { slug: 'usc', name: 'Eric Gentry', number: 18, position: 'LB', height: '6-6', weight: 225, year: 'SR', hometown: 'Philadelphia', state: 'PA', highSchool: 'Neumann Goretti HS', isStarter: true },
    { slug: 'usc', name: 'Desman Stephens II', number: 23, position: 'LB', height: '6-3', weight: 235, year: 'SO', hometown: 'Fontana', state: 'CA', highSchool: 'Summit HS', isStarter: true },
    { slug: 'usc', name: 'Marcelles Williams', number: 25, position: 'CB', height: '5-11', weight: 185, year: 'FR', hometown: 'Long Beach', state: 'CA', highSchool: 'Long Beach Poly HS', isStarter: true },
    { slug: 'usc', name: 'DeCarlos Nicholson', number: 17, position: 'CB', height: '6-3', weight: 200, year: 'SR', hometown: 'Mobile', state: 'AL', highSchool: 'Davidson HS', isStarter: true },
    { slug: 'usc', name: 'Kamari Ramsey', number: 7, position: 'S', height: '6-0', weight: 205, year: 'JR', hometown: 'Long Beach', state: 'CA', highSchool: 'St. John Bosco HS', isStarter: true },
    { slug: 'usc', name: 'Bishop Fitzgerald', number: 19, position: 'S', height: '5-11', weight: 205, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Cy-Fair HS', isStarter: true },
    // Special Teams
    { slug: 'usc', name: 'Ryon Sayeri', number: 48, position: 'K', height: '5-11', weight: 180, year: 'FR', hometown: 'Encino', state: 'CA', highSchool: 'Crespi HS', isStarter: true },
    { slug: 'usc', name: 'Sam Johnson', number: 80, position: 'P', height: '6-3', weight: 225, year: 'SR', hometown: 'Brisbane', state: 'QLD', highSchool: 'ProKick Australia', isStarter: true },

    // ─── Baylor Bears ────────────────────────────────────────────────────────────
    // Offense
    { slug: 'baylor', name: 'Sawyer Robertson', number: 12, position: 'QB', height: '6-3', weight: 215, year: 'JR', hometown: 'Lubbock', state: 'TX', highSchool: 'Coronado HS', isStarter: true },
    { slug: 'baylor', name: 'Dominic Richardson', number: 20, position: 'RB', height: '5-11', weight: 205, year: 'SR', hometown: 'Oklahoma City', state: 'OK', highSchool: 'Bishop McGuinness HS', isStarter: true },
    { slug: 'baylor', name: 'Bryson Washington', number: 3, position: 'RB', height: '5-10', weight: 195, year: 'SO', hometown: 'Waco', state: 'TX', highSchool: 'La Vega HS', isStarter: false },
    { slug: 'baylor', name: 'Josh Cameron', number: 8, position: 'WR', height: '6-0', weight: 185, year: 'JR', hometown: 'Waco', state: 'TX', highSchool: 'Connally HS', isStarter: true },
    { slug: 'baylor', name: 'Ashtyn Hawkins', number: 5, position: 'WR', height: '6-3', weight: 200, year: 'SO', hometown: 'Denton', state: 'TX', highSchool: 'Ryan HS', isStarter: true },
    { slug: 'baylor', name: 'Monaray Baldwin', number: 1, position: 'WR', height: '5-11', weight: 175, year: 'JR', hometown: 'Los Angeles', state: 'CA', highSchool: 'St. John Bosco HS', isStarter: true },
    { slug: 'baylor', name: 'Kelsey Johnson', number: 7, position: 'TE', height: '6-5', weight: 245, year: 'JR', hometown: 'Garland', state: 'TX', highSchool: 'Lakeview Centennial HS', isStarter: true },
    { slug: 'baylor', name: 'Tate Williams', number: 74, position: 'OT', height: '6-5', weight: 305, year: 'SR', hometown: 'Allen', state: 'TX', highSchool: 'Allen HS', isStarter: true },
    { slug: 'baylor', name: 'Corey Robinson', number: 55, position: 'C', height: '6-4', weight: 305, year: 'SR', hometown: 'Cedar Hill', state: 'TX', highSchool: 'Cedar Hill HS', isStarter: true },
    { slug: 'baylor', name: 'Micah Mazzccua', number: 64, position: 'OG', height: '6-4', weight: 310, year: 'JR', hometown: 'Houston', state: 'TX', highSchool: 'Cy-Fair HS', isStarter: true },
    { slug: 'baylor', name: 'Kaden Sieracki', number: 73, position: 'OG', height: '6-5', weight: 315, year: 'SR', hometown: 'Round Rock', state: 'TX', highSchool: 'Stony Point HS', isStarter: true },
    { slug: 'baylor', name: 'Campbell Barrington', number: 78, position: 'OT', height: '6-6', weight: 310, year: 'JR', hometown: 'Southlake', state: 'TX', highSchool: 'Carroll HS', isStarter: true },
    // Defense
    { slug: 'baylor', name: 'Garmon Randolph', number: 90, position: 'DT', height: '6-3', weight: 295, year: 'SR', hometown: 'Temple', state: 'TX', highSchool: 'Temple HS', isStarter: true },
    { slug: 'baylor', name: 'TJ Franklin', number: 9, position: 'DE', height: '6-4', weight: 260, year: 'JR', hometown: 'DeSoto', state: 'TX', highSchool: 'DeSoto HS', isStarter: true },
    { slug: 'baylor', name: 'Isaiah Robinson', number: 95, position: 'DE', height: '6-5', weight: 255, year: 'SO', hometown: 'Arlington', state: 'TX', highSchool: 'Martin HS', isStarter: true },
    { slug: 'baylor', name: 'Matt Jones', number: 44, position: 'LB', height: '6-2', weight: 230, year: 'SR', hometown: 'McKinney', state: 'TX', highSchool: 'McKinney Boyd HS', isStarter: true },
    { slug: 'baylor', name: 'Jackie Marshall', number: 35, position: 'LB', height: '6-1', weight: 225, year: 'JR', hometown: 'Fort Worth', state: 'TX', highSchool: 'Nolan Catholic HS', isStarter: true },
    { slug: 'baylor', name: 'Devyn Bobby', number: 19, position: 'CB', height: '6-0', weight: 180, year: 'SO', hometown: 'New Orleans', state: 'LA', highSchool: 'St. Augustine HS', isStarter: true },
    { slug: 'baylor', name: 'Chateau Reed', number: 2, position: 'CB', height: '5-11', weight: 185, year: 'JR', hometown: 'Dallas', state: 'TX', highSchool: 'South Oak Cliff HS', isStarter: true },
    { slug: 'baylor', name: 'Devin Lemear', number: 6, position: 'S', height: '6-1', weight: 195, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'North Shore HS', isStarter: true },
    { slug: 'baylor', name: 'Corey Gordon', number: 23, position: 'S', height: '6-0', weight: 200, year: 'JR', hometown: 'Midland', state: 'TX', highSchool: 'Midland Lee HS', isStarter: true },
    // Special Teams
    { slug: 'baylor', name: 'John Mayers', number: 96, position: 'K', height: '6-0', weight: 185, year: 'GR', hometown: 'Austin', state: 'TX', highSchool: 'Westlake HS', isStarter: true },
    { slug: 'baylor', name: 'Jack Dawson', number: 47, position: 'P', height: '6-3', weight: 205, year: 'JR', hometown: 'Melbourne', state: 'VIC', highSchool: 'ProKick Australia', isStarter: true },

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
