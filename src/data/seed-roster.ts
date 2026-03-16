// seed-roster.ts — Creates RosterPlayer entries for all 4 schools (2025 season)

export async function seedRoster(prisma: any, schoolMap: Record<string, any>) {
  const players = [
    // ─── Texas Tech Red Raiders (2025 — 12-1, Big 12 Champions, CFP #4 Seed) ────
    // Quarterbacks
    { slug: 'texas-tech', name: 'Behren Morton', number: 2, position: 'QB', height: '6-2', weight: 220, year: 'SR', hometown: 'Eastland', state: 'TX', highSchool: 'Eastland HS', isStarter: true },
    { slug: 'texas-tech', name: 'Will Hammond', number: 15, position: 'QB', height: '6-2', weight: 205, year: 'SO', hometown: 'Austin', state: 'TX', highSchool: 'Hutto HS', isStarter: false },
    { slug: 'texas-tech', name: 'Kirk Francis', number: 18, position: 'QB', height: '6-2', weight: 200, year: 'JR', hometown: 'Tulsa', state: 'OK', highSchool: 'Metro Christian Academy', isStarter: false },
    { slug: 'texas-tech', name: 'Lloyd Jones III', number: 10, position: 'QB', height: '6-4', weight: 210, year: 'FR', hometown: 'Hitchcock', state: 'TX', highSchool: 'Hitchcock HS', isStarter: false },
    // Running Backs
    { slug: 'texas-tech', name: 'Cameron Dickey', number: 8, position: 'RB', height: '5-10', weight: 215, year: 'SO', hometown: 'Austin', state: 'TX', highSchool: 'Crockett HS', isStarter: true },
    { slug: 'texas-tech', name: 'J\'Koby Williams', number: 20, position: 'RB', height: '5-10', weight: 185, year: 'SO', hometown: 'Beckville', state: 'TX', highSchool: 'Beckville HS', isStarter: true },
    { slug: 'texas-tech', name: 'Quinten Joyner', number: 0, position: 'RB', height: '5-11', weight: 205, year: 'SO', hometown: 'Austin', state: 'TX', highSchool: 'Manor HS', isStarter: false },
    { slug: 'texas-tech', name: 'Adam Hill', number: 23, position: 'RB', height: '6-1', weight: 225, year: 'FR', hometown: 'Albany', state: 'TX', highSchool: 'Albany HS', isStarter: false },
    { slug: 'texas-tech', name: 'Loic Tshibangu', number: 33, position: 'RB', height: '6-0', weight: 215, year: 'JR', hometown: 'Uccle', state: 'Belgium', highSchool: 'International', isStarter: false },
    // Wide Receivers
    { slug: 'texas-tech', name: 'Micah Hudson', number: 14, position: 'WR', height: '6-0', weight: 195, year: 'SO', hometown: 'Temple', state: 'TX', highSchool: 'Lake Belton HS', isStarter: true },
    { slug: 'texas-tech', name: 'Caleb Douglas', number: 5, position: 'WR', height: '6-4', weight: 210, year: 'SR', hometown: 'Missouri City', state: 'TX', highSchool: 'Hightower HS', isStarter: true },
    { slug: 'texas-tech', name: 'Coy Eakin', number: 3, position: 'WR', height: '6-2', weight: 210, year: 'JR', hometown: 'Stephenville', state: 'TX', highSchool: 'Stephenville HS', isStarter: true },
    { slug: 'texas-tech', name: 'Reggie Virgil', number: 1, position: 'WR', height: '6-3', weight: 190, year: 'SR', hometown: 'Apopka', state: 'FL', highSchool: 'Mount Dora Christian Academy', isStarter: false },
    { slug: 'texas-tech', name: 'Kelby Valsin', number: 6, position: 'WR', height: '6-1', weight: 195, year: 'SO', hometown: 'Arlington', state: 'TX', highSchool: 'Westfield HS', isStarter: false },
    { slug: 'texas-tech', name: 'Leyton Stone', number: 17, position: 'WR', height: '6-3', weight: 195, year: 'FR', hometown: 'Lubbock', state: 'TX', highSchool: 'Frenship HS', isStarter: false },
    { slug: 'texas-tech', name: 'Bryson Jones', number: 85, position: 'WR', height: '6-3', weight: 180, year: 'FR', hometown: 'Frisco', state: 'TX', highSchool: 'Lone Star HS', isStarter: false },
    { slug: 'texas-tech', name: 'Roy Alexander', number: 18, position: 'WR', height: '5-11', weight: 205, year: 'SR', hometown: 'Fort Myers', state: 'FL', highSchool: 'Incarnate Word', isStarter: false },
    { slug: 'texas-tech', name: 'Tristian Gentry', number: 21, position: 'WR', height: '6-0', weight: 170, year: 'FR', hometown: 'Stephenville', state: 'TX', highSchool: 'Stephenville HS', isStarter: false },
    { slug: 'texas-tech', name: 'Michael Dever', number: 84, position: 'WR', height: '6-1', weight: 190, year: 'FR', hometown: 'Lubbock', state: 'TX', highSchool: 'Lubbock-Cooper HS', isStarter: false },
    { slug: 'texas-tech', name: 'T.J. West', number: 4, position: 'WR', height: '6-1', weight: 200, year: 'SO', hometown: 'Houston', state: 'TX', highSchool: 'Westfield HS', isStarter: false },
    { slug: 'texas-tech', name: 'Kai Powell', number: 80, position: 'WR', height: '5-11', weight: 180, year: 'SO', hometown: 'Spring', state: 'TX', highSchool: 'Klein Collins HS', isStarter: false },
    { slug: 'texas-tech', name: 'Preztynn Harrison', number: 87, position: 'WR', height: '6-5', weight: 210, year: 'FR', hometown: 'Mineral Wells', state: 'TX', highSchool: 'Mineral Wells HS', isStarter: false },
    // Tight Ends
    { slug: 'texas-tech', name: 'Johncarlos Miller II', number: 9, position: 'TE', height: '6-5', weight: 245, year: 'SR', hometown: 'Greensboro', state: 'NC', highSchool: 'Dudley HS', isStarter: true },
    { slug: 'texas-tech', name: 'Terrance Carter Jr.', number: 7, position: 'TE', height: '6-2', weight: 245, year: 'JR', hometown: 'Killeen', state: 'TX', highSchool: 'Harker Heights HS', isStarter: false },
    { slug: 'texas-tech', name: 'Jason Llewellyn', number: 89, position: 'TE', height: '6-5', weight: 265, year: 'JR', hometown: 'Aledo', state: 'TX', highSchool: 'Aledo HS', isStarter: false },
    { slug: 'texas-tech', name: 'Jack Esparza', number: 83, position: 'TE', height: '6-4', weight: 250, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Lake Travis HS', isStarter: false },
    { slug: 'texas-tech', name: 'Sean Robinson', number: 86, position: 'TE', height: '6-5', weight: 200, year: 'FR', hometown: 'Greenbrae', state: 'CA', highSchool: 'Redwood HS', isStarter: false },
    // Offensive Line
    { slug: 'texas-tech', name: 'Howard Sampson', number: 79, position: 'OT', height: '6-8', weight: 340, year: 'JR', hometown: 'Houston', state: 'TX', highSchool: 'Atascocita HS', isStarter: true },
    { slug: 'texas-tech', name: 'Will Jados', number: 76, position: 'OT', height: '6-7', weight: 310, year: 'SR', hometown: 'Westerville', state: 'OH', highSchool: 'Westerville Central HS', isStarter: true },
    { slug: 'texas-tech', name: 'Sheridan Wilson', number: 72, position: 'C', height: '6-5', weight: 300, year: 'JR', hometown: 'Argyle', state: 'TX', highSchool: 'Argyle HS', isStarter: true },
    { slug: 'texas-tech', name: 'Davion Carter', number: 56, position: 'OG', height: '6-0', weight: 295, year: 'SR', hometown: 'Pearl', state: 'MS', highSchool: 'Pearl HS', isStarter: true },
    { slug: 'texas-tech', name: 'Jacob Ponton', number: 70, position: 'OT', height: '6-8', weight: 305, year: 'FR', hometown: 'Dripping Springs', state: 'TX', highSchool: 'Dripping Springs HS', isStarter: true },
    { slug: 'texas-tech', name: 'Hunter Zambrano', number: 57, position: 'OT', height: '6-5', weight: 305, year: 'SR', hometown: 'Weston', state: 'FL', highSchool: 'Cypress Bay HS', isStarter: false },
    { slug: 'texas-tech', name: 'Vinny Sciury', number: 71, position: 'OG', height: '6-4', weight: 305, year: 'SR', hometown: 'Massillon', state: 'OH', highSchool: 'Washington HS', isStarter: false },
    { slug: 'texas-tech', name: 'Cash Cleveland', number: 52, position: 'OG', height: '6-2', weight: 295, year: 'SO', hometown: 'Rockwall', state: 'TX', highSchool: 'Rockwall HS', isStarter: false },
    { slug: 'texas-tech', name: 'Daniel Sill', number: 74, position: 'OT', height: '6-5', weight: 310, year: 'SO', hometown: 'College Station', state: 'TX', highSchool: 'A&M Consolidated HS', isStarter: false },
    { slug: 'texas-tech', name: 'Holton Hendrix', number: 53, position: 'OG', height: '6-4', weight: 300, year: 'FR', hometown: 'Lubbock', state: 'TX', highSchool: 'Monterey HS', isStarter: false },
    { slug: 'texas-tech', name: 'Ellis Davis', number: 78, position: 'OT', height: '6-7', weight: 295, year: 'FR', hometown: 'Prosper', state: 'TX', highSchool: 'Prosper HS', isStarter: false },
    { slug: 'texas-tech', name: 'Jackson Hildebrand', number: 66, position: 'OG', height: '6-2', weight: 295, year: 'FR', hometown: 'San Antonio', state: 'TX', highSchool: 'Johnson HS', isStarter: false },
    { slug: 'texas-tech', name: 'Jurrien Loftin', number: 64, position: 'OG', height: '6-5', weight: 315, year: 'JR', hometown: 'Aledo', state: 'TX', highSchool: 'Aledo HS', isStarter: false },
    { slug: 'texas-tech', name: 'Patrick McMath', number: 50, position: 'C', height: '6-4', weight: 265, year: 'FR', hometown: 'Katy', state: 'TX', highSchool: 'Katy HS', isStarter: false },
    // Defensive Line
    { slug: 'texas-tech', name: 'Lee Hunter', number: 2, position: 'DT', height: '6-4', weight: 325, year: 'SR', hometown: 'Mobile', state: 'AL', highSchool: 'Vigor HS', isStarter: true },
    { slug: 'texas-tech', name: 'E\'Maurion Banks', number: 8, position: 'DT', height: '6-5', weight: 300, year: 'SR', hometown: 'Wichita Falls', state: 'TX', highSchool: 'Rider HS', isStarter: true },
    { slug: 'texas-tech', name: 'Jayden Cofield', number: 51, position: 'DT', height: '6-2', weight: 315, year: 'SO', hometown: 'Austin', state: 'TX', highSchool: 'Westlake HS', isStarter: false },
    { slug: 'texas-tech', name: 'Skyler Gill-Howard', number: 0, position: 'DT', height: '6-1', weight: 290, year: 'SR', hometown: 'Milwaukee', state: 'WI', highSchool: 'Northern Illinois', isStarter: false },
    { slug: 'texas-tech', name: 'A.J. Holmes Jr.', number: 33, position: 'DT', height: '6-3', weight: 300, year: 'JR', hometown: 'Houston', state: 'TX', highSchool: 'Westfield HS', isStarter: false },
    { slug: 'texas-tech', name: 'Dylan Singleton', number: 93, position: 'DT', height: '6-5', weight: 280, year: 'FR', hometown: 'New Iberia', state: 'LA', highSchool: 'Westgate HS', isStarter: false },
    { slug: 'texas-tech', name: 'Tanner Allen', number: 58, position: 'DT', height: '6-3', weight: 285, year: 'JR', hometown: 'Bryan', state: 'TX', highSchool: 'Rudder HS', isStarter: false },
    // Edge Rushers
    { slug: 'texas-tech', name: 'Romello Height', number: 9, position: 'EDGE', height: '6-3', weight: 235, year: 'SR', hometown: 'Dublin', state: 'GA', highSchool: 'Dublin HS', isStarter: true },
    { slug: 'texas-tech', name: 'Charles Esters III', number: 11, position: 'EDGE', height: '6-3', weight: 270, year: 'SR', hometown: 'Cedar Hill', state: 'TX', highSchool: 'Cedar Hill HS', isStarter: true },
    { slug: 'texas-tech', name: 'Ansel Nedore', number: 90, position: 'EDGE', height: '6-3', weight: 275, year: 'SO', hometown: 'Round Rock', state: 'TX', highSchool: 'Stony Point HS', isStarter: false },
    { slug: 'texas-tech', name: 'David Bailey', number: 31, position: 'EDGE', height: '6-3', weight: 250, year: 'SR', hometown: 'Irvine', state: 'CA', highSchool: 'Stanford', isStarter: false },
    { slug: 'texas-tech', name: 'Terrell Tilmon', number: 18, position: 'EDGE', height: '6-5', weight: 235, year: 'SR', hometown: 'Arlington', state: 'TX', highSchool: 'Martin HS', isStarter: false },
    { slug: 'texas-tech', name: 'Charles Anderson Jr.', number: 97, position: 'EDGE', height: '6-6', weight: 275, year: 'FR', hometown: 'Houston', state: 'TX', highSchool: 'Westfield HS', isStarter: false },
    { slug: 'texas-tech', name: 'Braylon Rigsby', number: 94, position: 'EDGE', height: '6-2', weight: 275, year: 'SO', hometown: 'Woodville', state: 'TX', highSchool: 'Woodville HS', isStarter: false },
    // Linebackers
    { slug: 'texas-tech', name: 'Ben Roberts', number: 13, position: 'LB', height: '6-3', weight: 235, year: 'JR', hometown: 'Haslet', state: 'TX', highSchool: 'V.R. Eaton HS', isStarter: true },
    { slug: 'texas-tech', name: 'Jacob Rodriguez', number: 10, position: 'LB', height: '6-1', weight: 230, year: 'SR', hometown: 'Wichita Falls', state: 'TX', highSchool: 'S.H. Rider HS', isStarter: true },
    { slug: 'texas-tech', name: 'John Curry', number: 6, position: 'LB', height: '6-2', weight: 230, year: 'SO', hometown: 'Lubbock', state: 'TX', highSchool: 'Coronado HS', isStarter: true },
    { slug: 'texas-tech', name: 'Bryce Ramirez', number: 3, position: 'LB', height: '6-2', weight: 235, year: 'SR', hometown: 'Missouri City', state: 'TX', highSchool: 'Hightower HS', isStarter: false },
    { slug: 'texas-tech', name: 'Brock Golwas', number: 41, position: 'LB', height: '6-1', weight: 230, year: 'FR', hometown: 'Flower Mound', state: 'TX', highSchool: 'Marcus HS', isStarter: false },
    { slug: 'texas-tech', name: 'Wesley Smith', number: 40, position: 'LB', height: '5-10', weight: 220, year: 'JR', hometown: 'Midland', state: 'TX', highSchool: 'Legacy HS', isStarter: false },
    { slug: 'texas-tech', name: 'Trent Low', number: 34, position: 'LB', height: '6-1', weight: 225, year: 'SR', hometown: 'Midland', state: 'TX', highSchool: 'Midland HS', isStarter: false },
    { slug: 'texas-tech', name: 'Chris Lemons', number: 43, position: 'LB', height: '6-2', weight: 220, year: 'SO', hometown: 'Prosper', state: 'TX', highSchool: 'Prosper HS', isStarter: false },
    // Cornerbacks
    { slug: 'texas-tech', name: 'Maurion Horn', number: 4, position: 'CB', height: '5-11', weight: 190, year: 'JR', hometown: 'Broken Arrow', state: 'OK', highSchool: 'Broken Arrow HS', isStarter: true },
    { slug: 'texas-tech', name: 'Amier Boyd', number: 27, position: 'CB', height: '6-2', weight: 190, year: 'JR', hometown: 'Phoenix', state: 'AZ', highSchool: 'Mountain Pointe HS', isStarter: true },
    { slug: 'texas-tech', name: 'Brice Pollock', number: 14, position: 'CB', height: '6-0', weight: 195, year: 'JR', hometown: 'Snellville', state: 'GA', highSchool: 'Mississippi State', isStarter: false },
    { slug: 'texas-tech', name: 'Dontae Balfour', number: 20, position: 'CB', height: '6-1', weight: 185, year: 'SR', hometown: 'Starke', state: 'FL', highSchool: 'Charlotte', isStarter: false },
    { slug: 'texas-tech', name: 'Tarrion Grant', number: 23, position: 'CB', height: '6-2', weight: 200, year: 'SO', hometown: 'Sumter', state: 'SC', highSchool: 'Purdue', isStarter: false },
    { slug: 'texas-tech', name: 'Ashton Hampton', number: 16, position: 'CB', height: '6-0', weight: 170, year: 'FR', hometown: 'Pearland', state: 'TX', highSchool: 'Pearland HS', isStarter: false },
    // Safeties
    { slug: 'texas-tech', name: 'A.J. McCarty', number: 1, position: 'S', height: '6-0', weight: 195, year: 'SR', hometown: 'Brownwood', state: 'TX', highSchool: 'Brownwood HS', isStarter: true },
    { slug: 'texas-tech', name: 'Miquel Dingle Jr.', number: 21, position: 'S', height: '6-2', weight: 220, year: 'SO', hometown: 'Charleston', state: 'SC', highSchool: 'Fort Dorchester HS', isStarter: true },
    { slug: 'texas-tech', name: 'Brenden Jordan', number: 7, position: 'S', height: '6-0', weight: 210, year: 'JR', hometown: 'Mansfield', state: 'TX', highSchool: 'Mansfield HS', isStarter: false },
    { slug: 'texas-tech', name: 'Cole Wisniewski', number: 5, position: 'S', height: '6-4', weight: 220, year: 'SR', hometown: 'Sparta', state: 'WI', highSchool: 'North Dakota State', isStarter: false },
    { slug: 'texas-tech', name: 'Mikal Harrison-Pilot', number: 30, position: 'S', height: '6-0', weight: 210, year: 'SO', hometown: 'Temple', state: 'TX', highSchool: 'Temple HS', isStarter: false },
    { slug: 'texas-tech', name: 'Marcus Ramon-Edwards', number: 22, position: 'S', height: '6-3', weight: 220, year: 'SO', hometown: 'Lubbock', state: 'TX', highSchool: 'Trinity Christian HS', isStarter: false },
    { slug: 'texas-tech', name: 'Oliver Miles III', number: 15, position: 'S', height: '6-2', weight: 190, year: 'FR', hometown: 'El Campo', state: 'TX', highSchool: 'El Campo HS', isStarter: false },
    { slug: 'texas-tech', name: 'Malik Esquerra', number: 24, position: 'S', height: '6-3', weight: 205, year: 'FR', hometown: 'Killeen', state: 'TX', highSchool: 'Shoemaker HS', isStarter: false },
    { slug: 'texas-tech', name: 'Peyton Morgan', number: 17, position: 'S', height: '6-0', weight: 180, year: 'FR', hometown: 'Round Rock', state: 'TX', highSchool: 'Pflugerville Weiss HS', isStarter: false },
    { slug: 'texas-tech', name: 'Chapman Lewis', number: 25, position: 'S', height: '6-1', weight: 180, year: 'JR', hometown: 'Burleson', state: 'TX', highSchool: 'Burleson Centennial HS', isStarter: false },
    // Special Teams
    { slug: 'texas-tech', name: 'Stone Harrington', number: 48, position: 'K', height: '6-3', weight: 200, year: 'JR', hometown: 'Colleyville', state: 'TX', highSchool: 'Colleyville Heritage HS', isStarter: true },
    { slug: 'texas-tech', name: 'Upton Bellenfant', number: 27, position: 'K', height: '6-1', weight: 185, year: 'JR', hometown: 'Murfreesboro', state: 'TN', highSchool: 'Buffalo', isStarter: false },
    { slug: 'texas-tech', name: 'Jack Burgess', number: 41, position: 'P', height: '6-3', weight: 215, year: 'SR', hometown: 'Bacchus Marsh', state: 'VIC', highSchool: 'Bacchus Marsh Grammar', isStarter: true },
    { slug: 'texas-tech', name: 'Ian Hershey', number: 37, position: 'P', height: '5-11', weight: 185, year: 'JR', hometown: 'Pocatello', state: 'ID', highSchool: 'Pocatello HS', isStarter: false },
    { slug: 'texas-tech', name: 'Rylan Vagana', number: 47, position: 'LS', height: '6-0', weight: 210, year: 'FR', hometown: 'Huntington Beach', state: 'CA', highSchool: 'Huntington Beach HS', isStarter: true },

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
