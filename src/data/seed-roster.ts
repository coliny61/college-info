export async function seedRoster(prisma: any, schoolMap: Record<string, any>) {
  const players = [
    // ============================================================
    // UMHB FOOTBALL (55 players)
    // ============================================================
    { slug: 'umhb', sportId: 'umhb-football', name: 'Marcus Thompson', number: 7, position: 'QB', height: '6-2', weight: 205, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Jake Hernandez', number: 12, position: 'QB', height: '6-1', weight: 198, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Dylan Porter', number: 3, position: 'QB', height: '6-0', weight: 192, year: 'FR', hometown: 'Killeen', state: 'TX', highSchool: 'Killeen High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Jaylen Washington', number: 22, position: 'RB', height: '5-10', weight: 195, year: 'SR', hometown: 'Waco', state: 'TX', highSchool: 'Waco Midway High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Carlos Reyes', number: 28, position: 'RB', height: '5-9', weight: 188, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Austin Westlake', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Terrence Davis', number: 34, position: 'RB', height: '5-11', weight: 210, year: 'SO', hometown: 'Round Rock', state: 'TX', highSchool: 'Round Rock High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Micah Green', number: 4, position: 'RB', height: '5-8', weight: 185, year: 'FR', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'DeAndre Mitchell', number: 1, position: 'WR', height: '6-1', weight: 185, year: 'SR', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Tyler Scott', number: 11, position: 'WR', height: '6-0', weight: 178, year: 'JR', hometown: 'Pflugerville', state: 'TX', highSchool: 'Pflugerville Hendrickson', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Brandon Lee', number: 6, position: 'WR', height: '5-11', weight: 175, year: 'JR', hometown: 'Cedar Park', state: 'TX', highSchool: 'Cedar Park Vista Ridge', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Elijah James', number: 14, position: 'WR', height: '6-3', weight: 195, year: 'SO', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Nate Collins', number: 19, position: 'WR', height: '5-10', weight: 172, year: 'SR', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Jordan Parker', number: 88, position: 'WR', height: '6-2', weight: 190, year: 'FR', hometown: 'Troy', state: 'TX', highSchool: 'Troy High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Quincy Adams', number: 15, position: 'WR', height: '5-9', weight: 168, year: 'SO', hometown: 'Rogers', state: 'TX', highSchool: 'Rogers High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Isaiah Brooks', number: 81, position: 'WR', height: '6-0', weight: 182, year: 'JR', hometown: 'Holland', state: 'TX', highSchool: 'Holland High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Colton Wright', number: 85, position: 'TE', height: '6-4', weight: 238, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Ryan Morales', number: 87, position: 'TE', height: '6-3', weight: 230, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Chase Henderson', number: 80, position: 'TE', height: '6-5', weight: 245, year: 'SO', hometown: 'Killeen', state: 'TX', highSchool: 'Shoemaker High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Austin Martinez', number: 72, position: 'OL', height: '6-3', weight: 290, year: 'SR', hometown: 'Waco', state: 'TX', highSchool: 'University High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Trevor Nguyen', number: 74, position: 'OL', height: '6-4', weight: 305, year: 'SR', hometown: 'Austin', state: 'TX', highSchool: 'Austin Bowie', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Derek Okafor', number: 76, position: 'OL', height: '6-5', weight: 310, year: 'JR', hometown: 'Round Rock', state: 'TX', highSchool: 'Stony Point High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Brayden Clark', number: 66, position: 'OL', height: '6-2', weight: 285, year: 'JR', hometown: 'Georgetown', state: 'TX', highSchool: 'East View High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Liam Foster', number: 68, position: 'OL', height: '6-4', weight: 298, year: 'SO', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Marcus Bell', number: 70, position: 'OL', height: '6-3', weight: 295, year: 'SO', hometown: 'Pflugerville', state: 'TX', highSchool: 'Connally High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Ethan Ramirez', number: 64, position: 'OL', height: '6-5', weight: 315, year: 'FR', hometown: 'Cedar Park', state: 'TX', highSchool: 'Cedar Park High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Patrick O\'Brien', number: 62, position: 'OL', height: '6-2', weight: 288, year: 'FR', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Darius King', number: 90, position: 'DL', height: '6-3', weight: 268, year: 'SR', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Xavier Hall', number: 92, position: 'DL', height: '6-4', weight: 280, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Josiah Turner', number: 94, position: 'DL', height: '6-2', weight: 260, year: 'JR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Miguel Sanchez', number: 96, position: 'DL', height: '6-5', weight: 275, year: 'SO', hometown: 'Killeen', state: 'TX', highSchool: 'Ellison High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Noah Butler', number: 91, position: 'DL', height: '6-1', weight: 252, year: 'SO', hometown: 'Waco', state: 'TX', highSchool: 'Waco High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Andre Phillips', number: 98, position: 'DL', height: '6-3', weight: 270, year: 'FR', hometown: 'Troy', state: 'TX', highSchool: 'Troy High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Malik Robinson', number: 44, position: 'LB', height: '6-1', weight: 225, year: 'SR', hometown: 'Austin', state: 'TX', highSchool: 'Austin LBJ', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Cameron Ward', number: 52, position: 'LB', height: '6-2', weight: 230, year: 'JR', hometown: 'Round Rock', state: 'TX', highSchool: 'McNeil High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Bryce Thomas', number: 48, position: 'LB', height: '6-0', weight: 218, year: 'JR', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Jalen Morris', number: 54, position: 'LB', height: '6-1', weight: 222, year: 'SO', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Luke Patterson', number: 42, position: 'LB', height: '6-3', weight: 235, year: 'SO', hometown: 'Pflugerville', state: 'TX', highSchool: 'Weiss High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Chris Evans', number: 50, position: 'LB', height: '6-0', weight: 215, year: 'FR', hometown: 'Cedar Park', state: 'TX', highSchool: 'Leander High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Trevon Harris', number: 2, position: 'CB', height: '5-11', weight: 180, year: 'SR', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Kevin Tran', number: 5, position: 'CB', height: '5-10', weight: 175, year: 'JR', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Damian Cruz', number: 24, position: 'CB', height: '6-0', weight: 182, year: 'SO', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Ahmad Jackson', number: 26, position: 'CB', height: '5-11', weight: 178, year: 'FR', hometown: 'Killeen', state: 'TX', highSchool: 'Killeen High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Deon Williams', number: 8, position: 'S', height: '6-1', weight: 200, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Rashad Moore', number: 21, position: 'S', height: '6-0', weight: 195, year: 'JR', hometown: 'Waco', state: 'TX', highSchool: 'La Vega High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Justin Peters', number: 23, position: 'S', height: '5-11', weight: 190, year: 'SO', hometown: 'Rogers', state: 'TX', highSchool: 'Rogers High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Caleb Long', number: 27, position: 'S', height: '6-2', weight: 202, year: 'FR', hometown: 'Holland', state: 'TX', highSchool: 'Holland High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Diego Luna', number: 97, position: 'K', height: '5-10', weight: 175, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Austin Anderson', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Brett Simmons', number: 17, position: 'P', height: '6-1', weight: 185, year: 'SO', hometown: 'Round Rock', state: 'TX', highSchool: 'Westwood High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Aiden Cooper', number: 9, position: 'WR', height: '5-10', weight: 170, year: 'FR', hometown: 'Belton', state: 'TX', highSchool: 'Belton New Tech', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Omar Hussain', number: 35, position: 'RB', height: '5-11', weight: 200, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Shane McAllister', number: 56, position: 'LB', height: '6-2', weight: 228, year: 'FR', hometown: 'Waco', state: 'TX', highSchool: 'Reicher Catholic', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Kendrick Odom', number: 31, position: 'CB', height: '5-10', weight: 176, year: 'JR', hometown: 'Killeen', state: 'TX', highSchool: 'Ellison High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Victor Garza', number: 78, position: 'OL', height: '6-4', weight: 302, year: 'JR', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Zane Whitfield', number: 45, position: 'DL', height: '6-3', weight: 265, year: 'SR', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-football', name: 'Preston Yates', number: 16, position: 'S', height: '6-0', weight: 192, year: 'SO', hometown: 'Pflugerville', state: 'TX', highSchool: 'Pflugerville High School', isStarter: false },

    // ============================================================
    // UMHB MEN'S BASKETBALL (15 players)
    // ============================================================
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Jayden Carter', number: 1, position: 'PG', height: '6-0', weight: 175, year: 'SR', hometown: 'Austin', state: 'TX', highSchool: 'Austin Westlake', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Marcus Allen', number: 3, position: 'PG', height: '5-10', weight: 165, year: 'SO', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Devonte Harris', number: 5, position: 'SG', height: '6-3', weight: 190, year: 'SR', hometown: 'Waco', state: 'TX', highSchool: 'Waco Midway High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Trey Richardson', number: 11, position: 'SG', height: '6-2', weight: 185, year: 'JR', hometown: 'Killeen', state: 'TX', highSchool: 'Killeen High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Nico Alvarez', number: 13, position: 'SG', height: '6-1', weight: 180, year: 'FR', hometown: 'Round Rock', state: 'TX', highSchool: 'Round Rock High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Kobe Jenkins', number: 15, position: 'SF', height: '6-5', weight: 205, year: 'JR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Andre Wallace', number: 21, position: 'SF', height: '6-4', weight: 200, year: 'SO', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Lamar Dixon', number: 23, position: 'SF', height: '6-6', weight: 210, year: 'FR', hometown: 'Cedar Park', state: 'TX', highSchool: 'Cedar Park High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Christian Powell', number: 32, position: 'PF', height: '6-7', weight: 225, year: 'SR', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'TJ Monroe', number: 33, position: 'PF', height: '6-6', weight: 220, year: 'JR', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Darren Obi', number: 35, position: 'PF', height: '6-8', weight: 230, year: 'SO', hometown: 'Pflugerville', state: 'TX', highSchool: 'Hendrickson High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Elijah Grant', number: 42, position: 'C', height: '6-9', weight: 240, year: 'JR', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Brian Kuznetsov', number: 44, position: 'C', height: '6-8', weight: 235, year: 'FR', hometown: 'Austin', state: 'TX', highSchool: 'Austin Anderson', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'DeShawn Pratt', number: 10, position: 'G/F', height: '6-4', weight: 195, year: 'JR', hometown: 'Troy', state: 'TX', highSchool: 'Troy High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-basketball', name: 'Jaxon Reed', number: 24, position: 'G/F', height: '6-3', weight: 192, year: 'SO', hometown: 'Rogers', state: 'TX', highSchool: 'Rogers High School', isStarter: false },

    // ============================================================
    // UMHB WOMEN'S BASKETBALL (15 players)
    // ============================================================
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Aaliyah Brown', number: 2, position: 'PG', height: '5-6', weight: 135, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Maya Chen', number: 4, position: 'PG', height: '5-5', weight: 128, year: 'SO', hometown: 'Austin', state: 'TX', highSchool: 'Austin Bowie', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Kayla Williams', number: 10, position: 'SG', height: '5-8', weight: 145, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Destiny Flores', number: 12, position: 'SG', height: '5-7', weight: 140, year: 'JR', hometown: 'Waco', state: 'TX', highSchool: 'Waco High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Brianna Scott', number: 14, position: 'SG', height: '5-9', weight: 148, year: 'FR', hometown: 'Killeen', state: 'TX', highSchool: 'Killeen High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Jasmine Thomas', number: 20, position: 'SF', height: '5-10', weight: 155, year: 'SR', hometown: 'Round Rock', state: 'TX', highSchool: 'Round Rock High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Taylor Griffin', number: 22, position: 'SF', height: '5-11', weight: 158, year: 'SO', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Nia Jackson', number: 24, position: 'SF', height: '5-9', weight: 150, year: 'FR', hometown: 'Cedar Park', state: 'TX', highSchool: 'Cedar Park High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Sasha Coleman', number: 30, position: 'PF', height: '6-0', weight: 165, year: 'JR', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Paige Anderson', number: 32, position: 'PF', height: '6-1', weight: 170, year: 'SO', hometown: 'Pflugerville', state: 'TX', highSchool: 'Weiss High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Imani Davis', number: 34, position: 'PF', height: '5-11', weight: 162, year: 'FR', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Morgan Hughes', number: 40, position: 'C', height: '6-3', weight: 180, year: 'SR', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Alexis Rivera', number: 42, position: 'C', height: '6-2', weight: 175, year: 'JR', hometown: 'Troy', state: 'TX', highSchool: 'Troy High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Jordan Lee', number: 11, position: 'G/F', height: '5-8', weight: 142, year: 'SO', hometown: 'Rogers', state: 'TX', highSchool: 'Rogers High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-basketball', name: 'Kennedy White', number: 15, position: 'G/F', height: '5-9', weight: 148, year: 'FR', hometown: 'Holland', state: 'TX', highSchool: 'Holland High School', isStarter: false },

    // ============================================================
    // UMHB BASEBALL (20 players)
    // ============================================================
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Ryan Mitchell', number: 18, position: 'P', height: '6-2', weight: 195, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Trevor Saenz', number: 31, position: 'P', height: '6-3', weight: 200, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Brett Lawson', number: 22, position: 'P', height: '6-1', weight: 190, year: 'JR', hometown: 'Killeen', state: 'TX', highSchool: 'Killeen High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Danny Ochoa', number: 40, position: 'P', height: '6-0', weight: 185, year: 'SO', hometown: 'Waco', state: 'TX', highSchool: 'Midway High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Kyle Franco', number: 37, position: 'P', height: '6-4', weight: 210, year: 'SO', hometown: 'Austin', state: 'TX', highSchool: 'Austin High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Sam Keller', number: 45, position: 'P', height: '5-11', weight: 182, year: 'FR', hometown: 'Round Rock', state: 'TX', highSchool: 'Round Rock High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Jake Montoya', number: 12, position: 'C', height: '5-11', weight: 195, year: 'SR', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Will Dunlap', number: 7, position: 'C', height: '6-0', weight: 200, year: 'SO', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Nathan Park', number: 25, position: '1B', height: '6-3', weight: 215, year: 'JR', hometown: 'Pflugerville', state: 'TX', highSchool: 'Connally High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Cole Bridges', number: 33, position: '1B', height: '6-2', weight: 210, year: 'FR', hometown: 'Cedar Park', state: 'TX', highSchool: 'Cedar Park High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Tyler Vega', number: 4, position: '2B', height: '5-10', weight: 175, year: 'SR', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Chase Wu', number: 6, position: '2B', height: '5-11', weight: 170, year: 'FR', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Luis Delgado', number: 2, position: 'SS', height: '6-0', weight: 180, year: 'JR', hometown: 'Troy', state: 'TX', highSchool: 'Troy High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Derek Shin', number: 10, position: 'SS', height: '5-10', weight: 172, year: 'SO', hometown: 'Rogers', state: 'TX', highSchool: 'Rogers High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Grant Perkins', number: 5, position: '3B', height: '6-1', weight: 200, year: 'SR', hometown: 'Holland', state: 'TX', highSchool: 'Holland High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Mason Holt', number: 13, position: '3B', height: '6-0', weight: 195, year: 'SO', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Jared Kimble', number: 8, position: 'OF', height: '6-1', weight: 185, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Angel Rojas', number: 3, position: 'OF', height: '5-11', weight: 178, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Del Valle High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Zach Norton', number: 9, position: 'OF', height: '6-0', weight: 180, year: 'SO', hometown: 'Killeen', state: 'TX', highSchool: 'Shoemaker High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-baseball', name: 'Cody Strickland', number: 15, position: 'OF', height: '6-2', weight: 190, year: 'FR', hometown: 'Waco', state: 'TX', highSchool: 'University High School', isStarter: false },

    // ============================================================
    // UMHB SOFTBALL (18 players)
    // ============================================================
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Mia Torres', number: 1, position: 'P', height: '5-9', weight: 155, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Shelby Kramer', number: 14, position: 'P', height: '5-8', weight: 150, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Riley Adams', number: 21, position: 'P', height: '5-10', weight: 158, year: 'SO', hometown: 'Killeen', state: 'TX', highSchool: 'Killeen High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Hannah Olson', number: 33, position: 'P', height: '5-7', weight: 145, year: 'FR', hometown: 'Waco', state: 'TX', highSchool: 'Midway High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Brooke Nguyen', number: 7, position: 'C', height: '5-6', weight: 148, year: 'SR', hometown: 'Austin', state: 'TX', highSchool: 'Austin Bowie', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Chloe Barnes', number: 24, position: 'C', height: '5-7', weight: 152, year: 'SO', hometown: 'Round Rock', state: 'TX', highSchool: 'Stony Point High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Samantha Reese', number: 3, position: 'IF', height: '5-5', weight: 135, year: 'SR', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Alexis Grant', number: 5, position: 'IF', height: '5-4', weight: 130, year: 'JR', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Gabriela Medina', number: 11, position: 'IF', height: '5-6', weight: 140, year: 'JR', hometown: 'Pflugerville', state: 'TX', highSchool: 'Pflugerville High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Kylie Foster', number: 13, position: 'IF', height: '5-3', weight: 128, year: 'SO', hometown: 'Cedar Park', state: 'TX', highSchool: 'Vista Ridge High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Haley Morgan', number: 16, position: 'IF', height: '5-7', weight: 142, year: 'SO', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Natalie Cruz', number: 22, position: 'IF', height: '5-2', weight: 125, year: 'FR', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Jordan Bell', number: 8, position: 'OF', height: '5-8', weight: 145, year: 'JR', hometown: 'Troy', state: 'TX', highSchool: 'Troy High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Diamond Hayes', number: 10, position: 'OF', height: '5-6', weight: 138, year: 'SO', hometown: 'Rogers', state: 'TX', highSchool: 'Rogers High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Piper Lawson', number: 19, position: 'OF', height: '5-11', weight: 155, year: 'FR', hometown: 'Holland', state: 'TX', highSchool: 'Holland High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Rachel Kim', number: 25, position: 'OF', height: '5-5', weight: 132, year: 'FR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Taylor Dunn', number: 9, position: 'UT', height: '5-7', weight: 145, year: 'SR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-softball', name: 'Alyssa Perez', number: 17, position: 'UT', height: '5-6', weight: 140, year: 'JR', hometown: 'Killeen', state: 'TX', highSchool: 'Ellison High School', isStarter: false },

    // ============================================================
    // UMHB MEN'S SOCCER (14 players)
    // ============================================================
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Daniel Vargas', number: 1, position: 'GK', height: '6-2', weight: 185, year: 'SR', hometown: 'Austin', state: 'TX', highSchool: 'Austin High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Ethan Moore', number: 23, position: 'GK', height: '6-1', weight: 180, year: 'SO', hometown: 'Round Rock', state: 'TX', highSchool: 'Round Rock High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Ricardo Silva', number: 4, position: 'D', height: '6-0', weight: 175, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Owen Kelly', number: 5, position: 'D', height: '5-11', weight: 170, year: 'JR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Marco Gutierrez', number: 2, position: 'D', height: '5-10', weight: 168, year: 'SO', hometown: 'Killeen', state: 'TX', highSchool: 'Killeen High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Tyler Nash', number: 15, position: 'D', height: '6-0', weight: 172, year: 'FR', hometown: 'Waco', state: 'TX', highSchool: 'Waco High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Sebastian Reyes', number: 8, position: 'M', height: '5-9', weight: 162, year: 'SR', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Brandon Wu', number: 10, position: 'M', height: '5-10', weight: 158, year: 'JR', hometown: 'Cedar Park', state: 'TX', highSchool: 'Cedar Park High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Luca Fernandez', number: 6, position: 'M', height: '5-8', weight: 155, year: 'SO', hometown: 'Pflugerville', state: 'TX', highSchool: 'Pflugerville High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Alex Rivera', number: 14, position: 'M', height: '5-11', weight: 165, year: 'FR', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Diego Torres', number: 9, position: 'F', height: '5-10', weight: 168, year: 'SR', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Omar Castillo', number: 11, position: 'F', height: '5-11', weight: 170, year: 'JR', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Kai Nakamura', number: 7, position: 'F', height: '5-9', weight: 160, year: 'SO', hometown: 'Troy', state: 'TX', highSchool: 'Troy High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-mens-soccer', name: 'Noah Becker', number: 17, position: 'F', height: '6-0', weight: 172, year: 'FR', hometown: 'Rogers', state: 'TX', highSchool: 'Rogers High School', isStarter: false },

    // ============================================================
    // UMHB WOMEN'S SOCCER (14 players)
    // ============================================================
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Sofia Martinez', number: 1, position: 'GK', height: '5-8', weight: 148, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Emma Larsen', number: 30, position: 'GK', height: '5-9', weight: 152, year: 'FR', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Megan Park', number: 4, position: 'D', height: '5-7', weight: 138, year: 'SR', hometown: 'Killeen', state: 'TX', highSchool: 'Killeen High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Isabela Rocha', number: 3, position: 'D', height: '5-6', weight: 135, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Austin Westlake', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Bailey Adams', number: 5, position: 'D', height: '5-8', weight: 142, year: 'SO', hometown: 'Round Rock', state: 'TX', highSchool: 'Round Rock High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Caitlyn Monroe', number: 15, position: 'D', height: '5-5', weight: 130, year: 'FR', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Valeria Salazar', number: 8, position: 'M', height: '5-4', weight: 125, year: 'JR', hometown: 'Waco', state: 'TX', highSchool: 'Midway High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Hannah Foster', number: 10, position: 'M', height: '5-6', weight: 132, year: 'JR', hometown: 'Cedar Park', state: 'TX', highSchool: 'Cedar Park High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Lily Tran', number: 6, position: 'M', height: '5-3', weight: 120, year: 'SO', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Grace Chen', number: 14, position: 'M', height: '5-5', weight: 128, year: 'FR', hometown: 'Pflugerville', state: 'TX', highSchool: 'Hendrickson High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Avery James', number: 9, position: 'F', height: '5-7', weight: 138, year: 'SR', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Camila Diaz', number: 11, position: 'F', height: '5-6', weight: 132, year: 'JR', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Zoe Patel', number: 7, position: 'F', height: '5-10', weight: 145, year: 'SO', hometown: 'Troy', state: 'TX', highSchool: 'Troy High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-womens-soccer', name: 'Claire Robinson', number: 17, position: 'F', height: '5-2', weight: 118, year: 'FR', hometown: 'Holland', state: 'TX', highSchool: 'Holland High School', isStarter: false },

    // ============================================================
    // UMHB VOLLEYBALL (14 players)
    // ============================================================
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Lexi Stone', number: 1, position: 'S', height: '5-9', weight: 142, year: 'SR', hometown: 'Belton', state: 'TX', highSchool: 'Belton High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Megan O\'Brien', number: 2, position: 'S', height: '5-8', weight: 138, year: 'SO', hometown: 'Temple', state: 'TX', highSchool: 'Temple High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Deja Williams', number: 4, position: 'OH', height: '6-0', weight: 155, year: 'SR', hometown: 'Killeen', state: 'TX', highSchool: 'Killeen High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Peyton Clark', number: 8, position: 'OH', height: '5-11', weight: 150, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Austin Bowie', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Sarah Kim', number: 10, position: 'OH', height: '5-10', weight: 148, year: 'FR', hometown: 'Round Rock', state: 'TX', highSchool: 'Westwood High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Tori Banks', number: 12, position: 'MB', height: '6-2', weight: 162, year: 'SR', hometown: 'Georgetown', state: 'TX', highSchool: 'Georgetown High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Kendall Hayes', number: 14, position: 'MB', height: '6-1', weight: 158, year: 'JR', hometown: 'Waco', state: 'TX', highSchool: 'Waco Midway High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Maya Washington', number: 15, position: 'MB', height: '6-0', weight: 155, year: 'SO', hometown: 'Cedar Park', state: 'TX', highSchool: 'Cedar Park High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Jenna Reeves', number: 6, position: 'RS', height: '6-1', weight: 160, year: 'JR', hometown: 'Copperas Cove', state: 'TX', highSchool: 'Copperas Cove High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Autumn Shaw', number: 7, position: 'RS', height: '5-11', weight: 152, year: 'FR', hometown: 'Pflugerville', state: 'TX', highSchool: 'Pflugerville High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Nicole Tran', number: 3, position: 'L', height: '5-6', weight: 130, year: 'SR', hometown: 'Harker Heights', state: 'TX', highSchool: 'Harker Heights High School', isStarter: true },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Ashley Barnes', number: 5, position: 'L', height: '5-7', weight: 132, year: 'SO', hometown: 'Salado', state: 'TX', highSchool: 'Salado High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Brianna Cole', number: 9, position: 'DS', height: '5-6', weight: 128, year: 'JR', hometown: 'Troy', state: 'TX', highSchool: 'Troy High School', isStarter: false },
    { slug: 'umhb', sportId: 'umhb-volleyball', name: 'Katie Morgan', number: 11, position: 'DS', height: '5-7', weight: 135, year: 'FR', hometown: 'Rogers', state: 'TX', highSchool: 'Rogers High School', isStarter: false },

    // ============================================================
    // TAMUCC MEN'S BASKETBALL (15 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Jamal Cooper', number: 0, position: 'PG', height: '6-1', weight: 180, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Westside High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'RJ Santos', number: 3, position: 'PG', height: '5-11', weight: 172, year: 'SO', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Ray High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Tyrese Franklin', number: 5, position: 'SG', height: '6-4', weight: 195, year: 'SR', hometown: 'Dallas', state: 'TX', highSchool: 'Duncanville High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Chris Okafor', number: 11, position: 'SG', height: '6-3', weight: 188, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Wagner High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Jordan Mays', number: 13, position: 'SG', height: '6-2', weight: 182, year: 'FR', hometown: 'Laredo', state: 'TX', highSchool: 'United High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'DeMarco Jones', number: 15, position: 'SF', height: '6-6', weight: 210, year: 'JR', hometown: 'Houston', state: 'TX', highSchool: 'Yates High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Aiden Brooks', number: 21, position: 'SF', height: '6-5', weight: 205, year: 'SO', hometown: 'McAllen', state: 'TX', highSchool: 'McAllen Memorial', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Isaiah Hart', number: 23, position: 'SF', height: '6-7', weight: 215, year: 'FR', hometown: 'Fort Worth', state: 'TX', highSchool: 'Dunbar High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Marcus West', number: 32, position: 'PF', height: '6-8', weight: 230, year: 'SR', hometown: 'San Antonio', state: 'TX', highSchool: 'Clark High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Trevon Baker', number: 33, position: 'PF', height: '6-7', weight: 225, year: 'JR', hometown: 'Dallas', state: 'TX', highSchool: 'South Oak Cliff', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Kofi Mensah', number: 35, position: 'PF', height: '6-8', weight: 228, year: 'SO', hometown: 'Arlington', state: 'TX', highSchool: 'Arlington Martin', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Donte Williams', number: 42, position: 'C', height: '6-10', weight: 245, year: 'JR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Moody High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Sam Adebayo', number: 44, position: 'C', height: '6-9', weight: 240, year: 'FR', hometown: 'Houston', state: 'TX', highSchool: 'Cypress Falls', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Nate Rodriguez', number: 10, position: 'G/F', height: '6-4', weight: 198, year: 'JR', hometown: 'Brownsville', state: 'TX', highSchool: 'Rivera High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-basketball', name: 'Elijah Price', number: 24, position: 'G/F', height: '6-5', weight: 202, year: 'SO', hometown: 'Beaumont', state: 'TX', highSchool: 'West Brook High School', isStarter: false },

    // ============================================================
    // TAMUCC WOMEN'S BASKETBALL (15 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Kiara Johnson', number: 1, position: 'PG', height: '5-6', weight: 138, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Cypress Woods', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Daniella Reyes', number: 3, position: 'PG', height: '5-5', weight: 130, year: 'SO', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Carroll High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Tamara Green', number: 5, position: 'SG', height: '5-8', weight: 145, year: 'SR', hometown: 'Dallas', state: 'TX', highSchool: 'DeSoto High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Priya Sharma', number: 10, position: 'SG', height: '5-7', weight: 140, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Reagan High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Amber Collins', number: 12, position: 'SG', height: '5-9', weight: 148, year: 'FR', hometown: 'Austin', state: 'TX', highSchool: 'Austin Westlake', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Monique Davis', number: 14, position: 'SF', height: '5-10', weight: 155, year: 'JR', hometown: 'Fort Worth', state: 'TX', highSchool: 'Trimble Tech', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Jade Mitchell', number: 20, position: 'SF', height: '5-11', weight: 158, year: 'SO', hometown: 'Laredo', state: 'TX', highSchool: 'United South', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Alicia Moreno', number: 22, position: 'SF', height: '5-9', weight: 150, year: 'FR', hometown: 'McAllen', state: 'TX', highSchool: 'McAllen High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Tiara Black', number: 30, position: 'PF', height: '6-1', weight: 168, year: 'SR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'King High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Brooke Patterson', number: 32, position: 'PF', height: '6-0', weight: 162, year: 'JR', hometown: 'Houston', state: 'TX', highSchool: 'Clear Lake High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Destiny Howard', number: 34, position: 'PF', height: '5-11', weight: 160, year: 'SO', hometown: 'San Antonio', state: 'TX', highSchool: 'Stevens High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Nyah Wilson', number: 40, position: 'C', height: '6-3', weight: 178, year: 'JR', hometown: 'Dallas', state: 'TX', highSchool: 'Skyline High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Elise Gonzalez', number: 42, position: 'C', height: '6-2', weight: 175, year: 'FR', hometown: 'Brownsville', state: 'TX', highSchool: 'Lopez High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Maya Thompson', number: 11, position: 'G/F', height: '5-8', weight: 142, year: 'JR', hometown: 'El Paso', state: 'TX', highSchool: 'Franklin High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-basketball', name: 'Adriana Lopez', number: 15, position: 'G/F', height: '5-9', weight: 148, year: 'SO', hometown: 'Harlingen', state: 'TX', highSchool: 'Harlingen High School', isStarter: false },

    // ============================================================
    // TAMUCC BASEBALL (20 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Jason Herrera', number: 18, position: 'P', height: '6-3', weight: 200, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Strake Jesuit', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Garrett Mills', number: 31, position: 'P', height: '6-4', weight: 210, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Johnson High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Ricky Zamora', number: 22, position: 'P', height: '6-1', weight: 192, year: 'JR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Calallen High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Tanner Rhodes', number: 40, position: 'P', height: '6-2', weight: 198, year: 'SO', hometown: 'Dallas', state: 'TX', highSchool: 'Highland Park', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Jalen Cross', number: 37, position: 'P', height: '6-0', weight: 188, year: 'SO', hometown: 'Fort Worth', state: 'TX', highSchool: 'Paschal High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Miguel Fuentes', number: 45, position: 'P', height: '5-11', weight: 185, year: 'FR', hometown: 'Laredo', state: 'TX', highSchool: 'Alexander High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Blake Shelton', number: 12, position: 'C', height: '6-0', weight: 200, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Klein Oak', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Drew Bennett', number: 7, position: 'C', height: '5-11', weight: 195, year: 'SO', hometown: 'Beaumont', state: 'TX', highSchool: 'West Brook High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Marcus Byrd', number: 25, position: '1B', height: '6-3', weight: 218, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Reagan High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Connor Walsh', number: 33, position: '1B', height: '6-2', weight: 212, year: 'FR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Veterans Memorial', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Eric Tran', number: 4, position: '2B', height: '5-10', weight: 172, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Bellaire High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Jesse Garza', number: 6, position: '2B', height: '5-9', weight: 168, year: 'FR', hometown: 'McAllen', state: 'TX', highSchool: 'McAllen Memorial', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Noah Kim', number: 2, position: 'SS', height: '6-0', weight: 178, year: 'JR', hometown: 'Dallas', state: 'TX', highSchool: 'Jesuit Prep', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Mateo Rios', number: 10, position: 'SS', height: '5-11', weight: 175, year: 'SO', hometown: 'Brownsville', state: 'TX', highSchool: 'Rivera High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Colby Hughes', number: 5, position: '3B', height: '6-1', weight: 202, year: 'SR', hometown: 'Austin', state: 'TX', highSchool: 'Westlake High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Dylan Ross', number: 13, position: '3B', height: '6-0', weight: 198, year: 'SO', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Ray High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Andre Washington', number: 8, position: 'OF', height: '6-1', weight: 188, year: 'JR', hometown: 'Houston', state: 'TX', highSchool: 'North Shore High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Chris Nunez', number: 3, position: 'OF', height: '5-11', weight: 182, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Brandeis High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Jake Thornton', number: 9, position: 'OF', height: '6-2', weight: 190, year: 'SO', hometown: 'Arlington', state: 'TX', highSchool: 'Arlington Lamar', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-baseball', name: 'Devin Patel', number: 15, position: 'OF', height: '5-10', weight: 175, year: 'FR', hometown: 'El Paso', state: 'TX', highSchool: 'Coronado High School', isStarter: false },

    // ============================================================
    // TAMUCC SOFTBALL (18 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Makayla Adams', number: 1, position: 'P', height: '5-9', weight: 155, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Pearland High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Cassidy Ramos', number: 14, position: 'P', height: '5-8', weight: 148, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'O\'Connor High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Brooklyn Lewis', number: 21, position: 'P', height: '5-10', weight: 158, year: 'SO', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Flour Bluff High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Aaliyah Green', number: 33, position: 'P', height: '5-7', weight: 145, year: 'FR', hometown: 'Dallas', state: 'TX', highSchool: 'Duncanville High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Marissa Chang', number: 7, position: 'C', height: '5-6', weight: 150, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Memorial High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Jocelyn Torres', number: 24, position: 'C', height: '5-7', weight: 152, year: 'SO', hometown: 'McAllen', state: 'TX', highSchool: 'McAllen Rowe', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Sierra Martinez', number: 3, position: 'IF', height: '5-5', weight: 135, year: 'SR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Veterans Memorial', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Kenzie Brooks', number: 5, position: 'IF', height: '5-4', weight: 128, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Lake Travis High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Fernanda Solis', number: 11, position: 'IF', height: '5-6', weight: 140, year: 'JR', hometown: 'Laredo', state: 'TX', highSchool: 'United High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Hailey Jensen', number: 13, position: 'IF', height: '5-3', weight: 125, year: 'SO', hometown: 'San Antonio', state: 'TX', highSchool: 'Churchill High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Renee Washington', number: 16, position: 'IF', height: '5-7', weight: 142, year: 'SO', hometown: 'Fort Worth', state: 'TX', highSchool: 'Boswell High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Angie Delgado', number: 22, position: 'IF', height: '5-2', weight: 122, year: 'FR', hometown: 'Brownsville', state: 'TX', highSchool: 'Hanna High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Jasmine White', number: 8, position: 'OF', height: '5-8', weight: 145, year: 'JR', hometown: 'Houston', state: 'TX', highSchool: 'Katy High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Destiny Navarro', number: 10, position: 'OF', height: '5-6', weight: 138, year: 'SO', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Calallen High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Morgan Hill', number: 19, position: 'OF', height: '5-10', weight: 155, year: 'FR', hometown: 'Dallas', state: 'TX', highSchool: 'Allen High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Alyssa Chen', number: 25, position: 'OF', height: '5-5', weight: 132, year: 'FR', hometown: 'Plano', state: 'TX', highSchool: 'Plano West', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Skylar James', number: 9, position: 'UT', height: '5-7', weight: 145, year: 'SR', hometown: 'San Antonio', state: 'TX', highSchool: 'Brennan High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-softball', name: 'Bianca Ruiz', number: 17, position: 'UT', height: '5-6', weight: 140, year: 'JR', hometown: 'El Paso', state: 'TX', highSchool: 'Montwood High School', isStarter: false },

    // ============================================================
    // TAMUCC VOLLEYBALL (15 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Kylie Foster', number: 1, position: 'S', height: '5-10', weight: 145, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Cinco Ranch', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Ana Gonzalez', number: 2, position: 'S', height: '5-9', weight: 140, year: 'SO', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Carroll High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Simone Taylor', number: 4, position: 'OH', height: '6-1', weight: 158, year: 'SR', hometown: 'Dallas', state: 'TX', highSchool: 'Hebron High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Haley Carter', number: 8, position: 'OH', height: '6-0', weight: 155, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'LEE High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Reagan Wells', number: 10, position: 'OH', height: '5-11', weight: 150, year: 'FR', hometown: 'Austin', state: 'TX', highSchool: 'Vandegrift High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Zaria Brown', number: 12, position: 'MB', height: '6-2', weight: 165, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Ridge Point', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Mia Nguyen', number: 14, position: 'MB', height: '6-1', weight: 160, year: 'JR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Flour Bluff High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Paige Anderson', number: 15, position: 'MB', height: '6-0', weight: 158, year: 'SO', hometown: 'Fort Worth', state: 'TX', highSchool: 'Byron Nelson', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'London Hayes', number: 6, position: 'RS', height: '6-1', weight: 162, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Taft High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Savannah Price', number: 7, position: 'RS', height: '5-11', weight: 155, year: 'FR', hometown: 'Laredo', state: 'TX', highSchool: 'United South', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Trinity Lopez', number: 3, position: 'L', height: '5-6', weight: 132, year: 'SR', hometown: 'McAllen', state: 'TX', highSchool: 'McAllen High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Avery Chen', number: 5, position: 'L', height: '5-7', weight: 135, year: 'SO', hometown: 'Dallas', state: 'TX', highSchool: 'Plano East', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Emma Davis', number: 9, position: 'DS', height: '5-7', weight: 130, year: 'JR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'King High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Kaitlyn Morris', number: 11, position: 'DS', height: '5-8', weight: 135, year: 'FR', hometown: 'Houston', state: 'TX', highSchool: 'Tompkins High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-volleyball', name: 'Isabella Ruiz', number: 13, position: 'OH', height: '5-10', weight: 148, year: 'SO', hometown: 'Brownsville', state: 'TX', highSchool: 'Lopez High School', isStarter: false },

    // ============================================================
    // TAMUCC WOMEN'S SOCCER (14 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Samantha Clarke', number: 1, position: 'GK', height: '5-9', weight: 152, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'St. Agnes Academy', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Lauren Fisher', number: 30, position: 'GK', height: '5-8', weight: 148, year: 'FR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Incarnate Word Academy', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Elena Vasquez', number: 4, position: 'D', height: '5-7', weight: 138, year: 'SR', hometown: 'San Antonio', state: 'TX', highSchool: 'Reagan High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Natalie Cooper', number: 3, position: 'D', height: '5-6', weight: 135, year: 'JR', hometown: 'Dallas', state: 'TX', highSchool: 'Highland Park', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Rachel Green', number: 5, position: 'D', height: '5-8', weight: 142, year: 'SO', hometown: 'Austin', state: 'TX', highSchool: 'Dripping Springs', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Sofia Herrera', number: 15, position: 'D', height: '5-5', weight: 130, year: 'FR', hometown: 'Laredo', state: 'TX', highSchool: 'United High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Madison Lee', number: 8, position: 'M', height: '5-6', weight: 132, year: 'JR', hometown: 'Houston', state: 'TX', highSchool: 'Clear Springs', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Alexis Rivera', number: 10, position: 'M', height: '5-7', weight: 138, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Johnson High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Jade Patterson', number: 6, position: 'M', height: '5-4', weight: 125, year: 'SO', hometown: 'Fort Worth', state: 'TX', highSchool: 'Aledo High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Isabela Santos', number: 14, position: 'M', height: '5-5', weight: 128, year: 'FR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Ray High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Kayla Thomas', number: 9, position: 'F', height: '5-7', weight: 140, year: 'SR', hometown: 'Dallas', state: 'TX', highSchool: 'Southlake Carroll', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Olivia Nelson', number: 11, position: 'F', height: '5-6', weight: 135, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Round Rock Westwood', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Aisha Mohammed', number: 7, position: 'F', height: '5-8', weight: 142, year: 'SO', hometown: 'Houston', state: 'TX', highSchool: 'Cy-Fair High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-soccer', name: 'Lily Tran', number: 17, position: 'F', height: '5-3', weight: 118, year: 'FR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Carroll High School', isStarter: false },

    // ============================================================
    // TAMUCC WOMEN'S TENNIS (8 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-womens-tennis', name: 'Valentina Romero', number: 1, position: 'Singles 1', height: '5-8', weight: 138, year: 'SR', hometown: 'Madrid', state: 'Spain', highSchool: null, isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-tennis', name: 'Luisa Schneider', number: 2, position: 'Singles 2', height: '5-9', weight: 142, year: 'JR', hometown: 'Munich', state: 'Germany', highSchool: null, isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-tennis', name: 'Carolina Souza', number: 3, position: 'Singles 3', height: '5-7', weight: 132, year: 'JR', hometown: 'Sao Paulo', state: 'Brazil', highSchool: null, isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-tennis', name: 'Megan Brooks', number: 4, position: 'Singles 4', height: '5-6', weight: 128, year: 'SO', hometown: 'Houston', state: 'TX', highSchool: 'The Woodlands High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-tennis', name: 'Ana Garcia', number: 5, position: 'Singles 5', height: '5-7', weight: 135, year: 'SO', hometown: 'Barcelona', state: 'Spain', highSchool: null, isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-tennis', name: 'Katarina Muller', number: 6, position: 'Singles 6', height: '5-10', weight: 145, year: 'FR', hometown: 'Berlin', state: 'Germany', highSchool: null, isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-tennis', name: 'Julia Ferreira', number: 7, position: 'Doubles', height: '5-5', weight: 125, year: 'FR', hometown: 'Rio de Janeiro', state: 'Brazil', highSchool: null, isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-tennis', name: 'Ashley Pham', number: 8, position: 'Doubles', height: '5-4', weight: 120, year: 'FR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Carroll High School', isStarter: false },

    // ============================================================
    // TAMUCC MEN'S TENNIS (8 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-mens-tennis', name: 'Pablo Martinez', number: 1, position: 'Singles 1', height: '6-0', weight: 170, year: 'SR', hometown: 'Sevilla', state: 'Spain', highSchool: null, isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-mens-tennis', name: 'Lukas Weber', number: 2, position: 'Singles 2', height: '6-1', weight: 175, year: 'JR', hometown: 'Frankfurt', state: 'Germany', highSchool: null, isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-mens-tennis', name: 'Rafael Costa', number: 3, position: 'Singles 3', height: '5-11', weight: 168, year: 'JR', hometown: 'Brasilia', state: 'Brazil', highSchool: null, isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-mens-tennis', name: 'Jason Park', number: 4, position: 'Singles 4', height: '5-10', weight: 162, year: 'SO', hometown: 'Dallas', state: 'TX', highSchool: 'Plano West High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-tennis', name: 'Matteo Rossi', number: 5, position: 'Singles 5', height: '6-0', weight: 172, year: 'SO', hometown: 'Rome', state: 'Italy', highSchool: null, isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-tennis', name: 'Diego Alvarez', number: 6, position: 'Singles 6', height: '5-11', weight: 165, year: 'FR', hometown: 'Mexico City', state: 'Mexico', highSchool: null, isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-tennis', name: 'Henri Dubois', number: 7, position: 'Doubles', height: '6-1', weight: 170, year: 'FR', hometown: 'Lyon', state: 'France', highSchool: null, isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-mens-tennis', name: 'Ethan Torres', number: 8, position: 'Doubles', height: '5-10', weight: 160, year: 'FR', hometown: 'San Antonio', state: 'TX', highSchool: 'Alamo Heights', isStarter: false },

    // ============================================================
    // TAMUCC BEACH VOLLEYBALL (12 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Sophia Reed', number: 1, position: 'Pair 1', height: '5-10', weight: 152, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Clear Falls High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Camille Jackson', number: 2, position: 'Pair 1', height: '5-11', weight: 155, year: 'SR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Flour Bluff High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Ava Martinez', number: 3, position: 'Pair 2', height: '6-0', weight: 158, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Antonian Prep', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Mia Thompson', number: 4, position: 'Pair 2', height: '5-9', weight: 148, year: 'JR', hometown: 'Dallas', state: 'TX', highSchool: 'Lovejoy High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Taylor Williams', number: 5, position: 'Pair 3', height: '6-1', weight: 160, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Westlake High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Jordan Clark', number: 6, position: 'Pair 3', height: '5-10', weight: 152, year: 'SO', hometown: 'Galveston', state: 'TX', highSchool: 'Ball High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Hailey Brown', number: 7, position: 'Pair 4', height: '5-8', weight: 145, year: 'SO', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Carroll High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Chloe Nguyen', number: 8, position: 'Pair 4', height: '5-9', weight: 148, year: 'SO', hometown: 'Houston', state: 'TX', highSchool: 'Pearland Dawson', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Brianna Scott', number: 9, position: 'Pair 5', height: '5-7', weight: 140, year: 'FR', hometown: 'Fort Worth', state: 'TX', highSchool: 'Colleyville Heritage', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Kennedy Moore', number: 10, position: 'Pair 5', height: '5-10', weight: 150, year: 'FR', hometown: 'San Antonio', state: 'TX', highSchool: 'Madison High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Destiny Torres', number: 11, position: 'Pair 6', height: '5-8', weight: 142, year: 'FR', hometown: 'McAllen', state: 'TX', highSchool: 'McAllen Memorial', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-beach-volleyball', name: 'Nadia Flores', number: 12, position: 'Pair 6', height: '5-9', weight: 148, year: 'FR', hometown: 'Brownsville', state: 'TX', highSchool: 'Rivera High School', isStarter: false },

    // ============================================================
    // TAMUCC TRACK & FIELD (15 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Jaylen Harris', number: 1, position: 'Sprinter', height: '5-10', weight: 168, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Fort Bend Travis', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Amara Osei', number: 2, position: 'Sprinter', height: '5-7', weight: 135, year: 'JR', hometown: 'Dallas', state: 'TX', highSchool: 'Lancaster High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Carlos Mendoza', number: 3, position: 'Sprinter', height: '5-9', weight: 162, year: 'SO', hometown: 'San Antonio', state: 'TX', highSchool: 'Judson High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Maria Santos', number: 4, position: 'Distance', height: '5-5', weight: 118, year: 'SR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Ray High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Daniel Okafor', number: 5, position: 'Distance', height: '5-11', weight: 148, year: 'JR', hometown: 'Houston', state: 'TX', highSchool: 'Strake Jesuit', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Emily Chen', number: 6, position: 'Distance', height: '5-4', weight: 112, year: 'SO', hometown: 'Austin', state: 'TX', highSchool: 'Westlake High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Terrence Washington', number: 7, position: 'Jumper', height: '6-2', weight: 178, year: 'JR', hometown: 'Fort Worth', state: 'TX', highSchool: 'Dunbar High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Aliyah Brown', number: 8, position: 'Jumper', height: '5-8', weight: 135, year: 'SO', hometown: 'Dallas', state: 'TX', highSchool: 'DeSoto High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Marcus Freeman', number: 9, position: 'Thrower', height: '6-3', weight: 235, year: 'SR', hometown: 'San Antonio', state: 'TX', highSchool: 'Wagner High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Hannah Mueller', number: 10, position: 'Thrower', height: '5-10', weight: 172, year: 'JR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Flour Bluff High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'DeShawn Lewis', number: 11, position: 'Thrower', height: '6-1', weight: 225, year: 'SO', hometown: 'Houston', state: 'TX', highSchool: 'North Shore High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Jordan Williams', number: 12, position: 'Hurdler', height: '6-0', weight: 170, year: 'JR', hometown: 'Austin', state: 'TX', highSchool: 'Bowie High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Kiara Jackson', number: 13, position: 'Hurdler', height: '5-9', weight: 142, year: 'SO', hometown: 'Dallas', state: 'TX', highSchool: 'Mansfield High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Ryan Patel', number: 14, position: 'Multi-Event', height: '6-0', weight: 175, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Cy-Creek High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-track-field', name: 'Sophia Torres', number: 15, position: 'Multi-Event', height: '5-7', weight: 138, year: 'FR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Veterans Memorial', isStarter: false },

    // ============================================================
    // TAMUCC WOMEN'S GOLF (6 players)
    // ============================================================
    { slug: 'tamucc', sportId: 'tamucc-womens-golf', name: 'Emma Richardson', number: 1, position: 'Golfer', height: '5-7', weight: 135, year: 'SR', hometown: 'Houston', state: 'TX', highSchool: 'Memorial High School', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-golf', name: 'Catalina Vega', number: 2, position: 'Golfer', height: '5-6', weight: 128, year: 'JR', hometown: 'San Antonio', state: 'TX', highSchool: 'Alamo Heights', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-golf', name: 'Hana Kim', number: 3, position: 'Golfer', height: '5-5', weight: 122, year: 'JR', hometown: 'Dallas', state: 'TX', highSchool: 'Highland Park', isStarter: true },
    { slug: 'tamucc', sportId: 'tamucc-womens-golf', name: 'Brooke Taylor', number: 4, position: 'Golfer', height: '5-8', weight: 138, year: 'SO', hometown: 'Austin', state: 'TX', highSchool: 'Westlake High School', isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-golf', name: 'Sofia Lindberg', number: 5, position: 'Golfer', height: '5-9', weight: 140, year: 'FR', hometown: 'Stockholm', state: 'Sweden', highSchool: null, isStarter: false },
    { slug: 'tamucc', sportId: 'tamucc-womens-golf', name: 'Rachel Nguyen', number: 6, position: 'Golfer', height: '5-4', weight: 118, year: 'FR', hometown: 'Corpus Christi', state: 'TX', highSchool: 'Carroll High School', isStarter: false },
  ]

  for (const player of players) {
    const { slug, ...data } = player
    await prisma.rosterPlayer.create({
      data: { schoolId: schoolMap[slug].id, ...data, imageUrl: null },
    })
  }
  console.log(`  Created ${players.length} Roster Players`)
}
