export const SPORTS = [
  'Football',
  'Basketball',
  'Baseball',
  'Soccer',
  'Softball',
  'Volleyball',
  'Track & Field',
  'Swimming',
  'Tennis',
  'Golf',
  'Wrestling',
  'Lacrosse',
  'Hockey',
  'Gymnastics',
  'Rowing',
] as const

export type Sport = (typeof SPORTS)[number]

export const POSITIONS: Record<string, string[]> = {
  Football: [
    'Quarterback', 'Running Back', 'Wide Receiver', 'Tight End',
    'Offensive Line', 'Defensive Line', 'Linebacker',
    'Cornerback', 'Safety', 'Kicker', 'Punter',
  ],
  Basketball: [
    'Point Guard', 'Shooting Guard', 'Small Forward',
    'Power Forward', 'Center',
  ],
  Baseball: [
    'Pitcher', 'Catcher', 'First Base', 'Second Base',
    'Shortstop', 'Third Base', 'Outfield', 'Designated Hitter',
  ],
  Soccer: [
    'Goalkeeper', 'Defender', 'Midfielder', 'Forward',
  ],
  Softball: [
    'Pitcher', 'Catcher', 'First Base', 'Second Base',
    'Shortstop', 'Third Base', 'Outfield',
  ],
  Volleyball: [
    'Setter', 'Outside Hitter', 'Middle Blocker',
    'Opposite Hitter', 'Libero',
  ],
  'Track & Field': [
    'Sprinter', 'Distance Runner', 'Hurdler', 'Jumper',
    'Thrower', 'Multi-Event',
  ],
  Swimming: [
    'Freestyle', 'Backstroke', 'Breaststroke',
    'Butterfly', 'Individual Medley', 'Diver',
  ],
  Tennis: ['Singles', 'Doubles'],
  Golf: ['Individual'],
  Wrestling: [
    '125 lbs', '133 lbs', '141 lbs', '149 lbs', '157 lbs',
    '165 lbs', '174 lbs', '184 lbs', '197 lbs', '285 lbs',
  ],
  Lacrosse: [
    'Attack', 'Midfield', 'Defense', 'Goalie',
  ],
  Hockey: [
    'Center', 'Left Wing', 'Right Wing', 'Defenseman', 'Goalie',
  ],
  Gymnastics: [
    'All-Around', 'Floor', 'Vault', 'Bars', 'Beam',
  ],
  Rowing: [
    'Coxswain', 'Port', 'Starboard',
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
