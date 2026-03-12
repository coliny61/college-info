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
    { slug: 'usc', name: 'Jayden Maiava', number: 1, position: 'QB', height: '6-1', weight: 220, year: 'JR', hometown: 'Las Vegas', state: 'NV', highSchool: 'King HS', isStarter: true },
    { slug: 'usc', name: 'Woody Marks', number: 0, position: 'RB', height: '5-11', weight: 210, year: 'SR', hometown: 'Bellflower', state: 'CA', highSchool: 'St. John Bosco HS', isStarter: true },
    { slug: 'usc', name: 'Quinten Joyner', number: 5, position: 'RB', height: '5-11', weight: 205, year: 'SO', hometown: 'Clayton', state: 'NC', highSchool: 'Clayton HS', isStarter: false },
    { slug: 'usc', name: 'Zachariah Branch', number: 9, position: 'WR', height: '5-10', weight: 178, year: 'JR', hometown: 'Las Vegas', state: 'NV', highSchool: 'Bishop Gorman HS', isStarter: true },
    { slug: 'usc', name: 'Duce Robinson', number: 6, position: 'TE', height: '6-6', weight: 240, year: 'JR', hometown: 'Phoenix', state: 'AZ', highSchool: 'Pinnacle HS', isStarter: true },
    { slug: 'usc', name: 'Makai Lemon', number: 18, position: 'WR', height: '5-10', weight: 180, year: 'SO', hometown: 'Los Alamitos', state: 'CA', highSchool: 'Los Alamitos HS', isStarter: true },
    { slug: 'usc', name: 'Ja\'Kobi Lane', number: 7, position: 'WR', height: '6-3', weight: 200, year: 'SO', hometown: 'Dallas', state: 'TX', highSchool: 'Lancaster HS', isStarter: true },
    { slug: 'usc', name: 'Elijah Paige', number: 12, position: 'WR', height: '6-2', weight: 195, year: 'SO', hometown: 'San Diego', state: 'CA', highSchool: 'Cathedral Catholic HS', isStarter: false },
    { slug: 'usc', name: 'Jonah Monheim', number: 71, position: 'C', height: '6-4', weight: 300, year: 'SR', hometown: 'Moorpark', state: 'CA', highSchool: 'Moorpark HS', isStarter: true },
    { slug: 'usc', name: 'Mason Murphy', number: 76, position: 'OT', height: '6-6', weight: 310, year: 'JR', hometown: 'Laguna Hills', state: 'CA', highSchool: 'Santa Margarita HS', isStarter: true },
    { slug: 'usc', name: 'Emmanuel Pregnon', number: 73, position: 'OG', height: '6-6', weight: 320, year: 'JR', hometown: 'Seattle', state: 'WA', highSchool: 'Rainier Beach HS', isStarter: true },
    { slug: 'usc', name: 'Justin Dedich', number: 56, position: 'OG', height: '6-4', weight: 310, year: 'GR', hometown: 'Mission Viejo', state: 'CA', highSchool: 'Mission Viejo HS', isStarter: true },
    { slug: 'usc', name: 'Amos Paul', number: 72, position: 'OT', height: '6-6', weight: 315, year: 'SR', hometown: 'Chatsworth', state: 'CA', highSchool: 'Sierra Canyon HS', isStarter: true },
    // Defense
    { slug: 'usc', name: 'Eric Gentry', number: 18, position: 'LB', height: '6-6', weight: 225, year: 'SR', hometown: 'Indianapolis', state: 'IN', highSchool: 'Pike HS', isStarter: true },
    { slug: 'usc', name: 'Mason Cobb', number: 28, position: 'LB', height: '6-2', weight: 230, year: 'JR', hometown: 'Duncanville', state: 'TX', highSchool: 'Duncanville HS', isStarter: true },
    { slug: 'usc', name: 'Bear Alexander', number: 90, position: 'DT', height: '6-3', weight: 310, year: 'JR', hometown: 'Fort Worth', state: 'TX', highSchool: 'All Saints Episcopal', isStarter: true },
    { slug: 'usc', name: 'Anthony Lucas', number: 99, position: 'DE', height: '6-5', weight: 265, year: 'SO', hometown: 'Scottsdale', state: 'AZ', highSchool: 'Saguaro HS', isStarter: true },
    { slug: 'usc', name: 'Braylan Shelby', number: 91, position: 'DE', height: '6-4', weight: 250, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'North Shore HS', isStarter: true },
    { slug: 'usc', name: 'Jaylin Smith', number: 4, position: 'CB', height: '6-0', weight: 185, year: 'JR', hometown: 'Gardena', state: 'CA', highSchool: 'Serra HS', isStarter: true },
    { slug: 'usc', name: 'John Humphrey', number: 2, position: 'CB', height: '5-11', weight: 190, year: 'SO', hometown: 'Anaheim', state: 'CA', highSchool: 'Mater Dei HS', isStarter: true },
    { slug: 'usc', name: 'Kamari Ramsey', number: 3, position: 'S', height: '6-1', weight: 205, year: 'JR', hometown: 'Long Beach', state: 'CA', highSchool: 'St. John Bosco HS', isStarter: true },
    { slug: 'usc', name: 'Akili Arnold', number: 22, position: 'S', height: '6-2', weight: 200, year: 'SO', hometown: 'Lakewood', state: 'CA', highSchool: 'Lakewood HS', isStarter: true },
    // Special Teams
    { slug: 'usc', name: 'Michael Lantz', number: 39, position: 'K', height: '6-1', weight: 185, year: 'SR', hometown: 'Brentwood', state: 'TN', highSchool: 'Ravenwood HS', isStarter: true },
    { slug: 'usc', name: 'Eddie Czaplicki', number: 14, position: 'P', height: '6-2', weight: 215, year: 'SR', hometown: 'Phoenix', state: 'AZ', highSchool: 'Saguaro HS', isStarter: true },

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
    { slug: 'oklahoma', name: 'Jackson Arnold', number: 12, position: 'QB', height: '6-1', weight: 210, year: 'SO', hometown: 'Denton', state: 'TX', highSchool: 'Guyer HS', isStarter: true },
    { slug: 'oklahoma', name: 'Gavin Sawchuk', number: 27, position: 'RB', height: '6-0', weight: 200, year: 'JR', hometown: 'Littleton', state: 'CO', highSchool: 'Valor Christian HS', isStarter: true },
    { slug: 'oklahoma', name: 'Taylor Tatum', number: 23, position: 'RB', height: '6-0', weight: 210, year: 'FR', hometown: 'Longview', state: 'TX', highSchool: 'Longview HS', isStarter: false },
    { slug: 'oklahoma', name: 'Nic Anderson', number: 4, position: 'WR', height: '6-4', weight: 210, year: 'JR', hometown: 'Katy', state: 'TX', highSchool: 'Katy HS', isStarter: true },
    { slug: 'oklahoma', name: 'Deion Burks', number: 7, position: 'WR', height: '5-11', weight: 195, year: 'SR', hometown: 'West Lafayette', state: 'IN', highSchool: 'Harrison HS', isStarter: true },
    { slug: 'oklahoma', name: 'Jalil Farooq', number: 3, position: 'WR', height: '6-1', weight: 195, year: 'SR', hometown: 'Bradenton', state: 'FL', highSchool: 'IMG Academy', isStarter: true },
    { slug: 'oklahoma', name: 'Bauer Sharp', number: 81, position: 'TE', height: '6-5', weight: 240, year: 'JR', hometown: 'Little Elm', state: 'TX', highSchool: 'Little Elm HS', isStarter: true },
    { slug: 'oklahoma', name: 'Jake Taylor', number: 75, position: 'OT', height: '6-6', weight: 310, year: 'SR', hometown: 'Bishop', state: 'TX', highSchool: 'Bishop HS', isStarter: true },
    { slug: 'oklahoma', name: 'Branson Hickman', number: 60, position: 'C', height: '6-3', weight: 290, year: 'JR', hometown: 'Mustang', state: 'OK', highSchool: 'Mustang HS', isStarter: true },
    { slug: 'oklahoma', name: 'Cayden Green', number: 68, position: 'OG', height: '6-5', weight: 310, year: 'SO', hometown: 'Lee\'s Summit', state: 'MO', highSchool: 'Lee\'s Summit North HS', isStarter: true },
    { slug: 'oklahoma', name: 'Heath Ozaeta', number: 73, position: 'OG', height: '6-5', weight: 300, year: 'SR', hometown: 'Mansfield', state: 'TX', highSchool: 'Legacy HS', isStarter: true },
    { slug: 'oklahoma', name: 'Troy Everett', number: 74, position: 'OT', height: '6-6', weight: 320, year: 'JR', hometown: 'Beggs', state: 'OK', highSchool: 'Beggs HS', isStarter: true },
    // Defense
    { slug: 'oklahoma', name: 'R Mason Thomas', number: 8, position: 'EDGE', height: '6-3', weight: 250, year: 'SO', hometown: 'Fort Lauderdale', state: 'FL', highSchool: 'St. Thomas Aquinas HS', isStarter: true },
    { slug: 'oklahoma', name: 'Damonic Williams', number: 52, position: 'DT', height: '6-3', weight: 290, year: 'JR', hometown: 'Oklahoma City', state: 'OK', highSchool: 'Carl Albert HS', isStarter: true },
    { slug: 'oklahoma', name: 'Gracen Halton', number: 95, position: 'DT', height: '6-3', weight: 300, year: 'JR', hometown: 'Santa Ana', state: 'CA', highSchool: 'Mater Dei HS', isStarter: true },
    { slug: 'oklahoma', name: 'PJ Adebawore', number: 11, position: 'EDGE', height: '6-4', weight: 250, year: 'SR', hometown: 'Kansas City', state: 'MO', highSchool: 'North Kansas City HS', isStarter: true },
    { slug: 'oklahoma', name: 'Danny Stutsman', number: 28, position: 'LB', height: '6-3', weight: 236, year: 'SR', hometown: 'Windermere', state: 'FL', highSchool: 'Windermere HS', isStarter: true },
    { slug: 'oklahoma', name: 'Kip Lewis', number: 10, position: 'LB', height: '6-0', weight: 225, year: 'JR', hometown: 'Pflugerville', state: 'TX', highSchool: 'Hendrickson HS', isStarter: true },
    { slug: 'oklahoma', name: 'Woodi Washington', number: 5, position: 'CB', height: '6-1', weight: 190, year: 'GR', hometown: 'Richmond', state: 'TX', highSchool: 'Foster HS', isStarter: true },
    { slug: 'oklahoma', name: 'Gentry Williams', number: 9, position: 'CB', height: '6-0', weight: 185, year: 'JR', hometown: 'Tulsa', state: 'OK', highSchool: 'Booker T. Washington HS', isStarter: true },
    { slug: 'oklahoma', name: 'Billy Bowman Jr.', number: 2, position: 'S', height: '5-10', weight: 190, year: 'SR', hometown: 'Denton', state: 'TX', highSchool: 'Ryan HS', isStarter: true },
    { slug: 'oklahoma', name: 'Key Lawrence', number: 14, position: 'S', height: '6-1', weight: 205, year: 'SR', hometown: 'Tulsa', state: 'OK', highSchool: 'Union HS', isStarter: true },
    // Special Teams
    { slug: 'oklahoma', name: 'Zach Schmit', number: 44, position: 'K', height: '6-0', weight: 190, year: 'SR', hometown: 'Fort Worth', state: 'TX', highSchool: 'All Saints Episcopal', isStarter: true },
    { slug: 'oklahoma', name: 'Luke Elzinga', number: 37, position: 'P', height: '6-4', weight: 215, year: 'JR', hometown: 'Melbourne', state: 'VIC', highSchool: 'ProKick Australia', isStarter: true },
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
