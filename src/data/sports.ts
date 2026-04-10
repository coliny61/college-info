export const SPORTS = [
  'Football',
  'Men\'s Basketball',
  'Women\'s Basketball',
  'Baseball',
  'Softball',
  'Men\'s Soccer',
  'Women\'s Soccer',
  'Volleyball',
  'Men\'s Tennis',
  'Women\'s Tennis',
  'Track & Field',
  'Cross Country',
  'Golf',
  'Beach Volleyball',
  'Swimming & Diving',
  'Wrestling',
  'Lacrosse',
  'Field Hockey',
  'Other',
] as const

export type Sport = (typeof SPORTS)[number]

export const POSITIONS: Record<string, string[]> = {
  'Football': [
    'Quarterback', 'Running Back', 'Wide Receiver', 'Tight End',
    'Offensive Line', 'Defensive Line', 'Linebacker',
    'Cornerback', 'Safety', 'Kicker', 'Punter',
  ],
  'Men\'s Basketball': [
    'Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center',
  ],
  'Women\'s Basketball': [
    'Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center',
  ],
  'Baseball': [
    'Pitcher', 'Catcher', 'First Base', 'Second Base', 'Shortstop',
    'Third Base', 'Outfield', 'Designated Hitter', 'Utility',
  ],
  'Softball': [
    'Pitcher', 'Catcher', 'First Base', 'Second Base', 'Shortstop',
    'Third Base', 'Outfield', 'Utility',
  ],
  'Men\'s Soccer': [
    'Goalkeeper', 'Defender', 'Midfielder', 'Forward',
  ],
  'Women\'s Soccer': [
    'Goalkeeper', 'Defender', 'Midfielder', 'Forward',
  ],
  'Volleyball': [
    'Setter', 'Outside Hitter', 'Middle Blocker', 'Right Side', 'Libero', 'Defensive Specialist',
  ],
  'Men\'s Tennis': [
    'Singles', 'Doubles',
  ],
  'Women\'s Tennis': [
    'Singles', 'Doubles',
  ],
  'Track & Field': [
    'Sprinter', 'Distance', 'Jumper', 'Thrower', 'Hurdler', 'Multi-Event',
  ],
  'Cross Country': [
    'Runner',
  ],
  'Golf': [
    'Golfer',
  ],
  'Beach Volleyball': [
    'Beach Volleyball',
  ],
  'Swimming & Diving': [
    'Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'IM', 'Diver',
  ],
  'Wrestling': [
    '125 lbs', '133 lbs', '141 lbs', '149 lbs', '157 lbs',
    '165 lbs', '174 lbs', '184 lbs', '197 lbs', '285 lbs',
  ],
  'Lacrosse': [
    'Attack', 'Midfield', 'Defense', 'Goalie',
  ],
  'Field Hockey': [
    'Forward', 'Midfielder', 'Defender', 'Goalkeeper',
  ],
}

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL',
  'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME',
  'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const

export const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
  CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
  DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
  ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine',
  MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska',
  NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico',
  NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island',
  SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas',
  UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
}

export const GRADUATION_YEARS = [2025, 2026, 2027, 2028, 2029, 2030] as const

export const HEIGHT_FEET = [4, 5, 6, 7] as const
export const HEIGHT_INCHES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const
