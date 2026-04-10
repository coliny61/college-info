// seed-schools.ts — Creates UMHB and TAMUCC schools

export async function seedSchools(prisma: any) {
  const schools = [
    {
      id: 'umhb-crusaders-001',
      slug: 'umhb',
      name: 'University of Mary Hardin-Baylor',
      shortName: 'UMHB',
      mascot: 'Crusaders',
      conference: 'American Southwest Conference',
      city: 'Belton',
      state: 'TX',
      colorPrimary: '#492F92',
      colorSecondary: '#FEC324',
      colorAccent: '#FFFFFF',
      logoUrl: '/images/schools/umhb/logo.png',
      heroImageUrl: '/images/schools/umhb/hero.jpg',
      description: `The University of Mary Hardin-Baylor, located in Belton, Texas, is a private Baptist university with a 180-year legacy of academic excellence and championship athletics. Home to the Crusaders, UMHB competes in NCAA Division III as a member of the American Southwest Conference. The football program is one of the most dominant in all of college football — at any level — with two D3 national championships (2018, 2021) and the highest winning percentage of any team in the entire NCAA across all three divisions. Beyond football, the Crusaders field 16 varsity sports and consistently compete for conference titles in basketball, baseball, softball, soccer, volleyball, tennis, and golf. With approximately 3,800 students on a 340-acre campus just 60 miles north of Austin, UMHB offers a tight-knit, Christ-centered community where student-athletes thrive both on the field and in the classroom.`,
      stadiumCapacity: 7671,
      traditions: `Crusader Stadium opened in 2013 and seats 7,671 fans with a home-side grandstand, student union seating, and end zone berms. The Cru Walk pregame tradition brings the entire team through a tunnel of fans before every home game. The bell tower rings after every Crusader victory, and the student section "Purple Rage" is one of the most energetic in D3 football.`,
      gameDayDescription: `Game day in Belton, Texas is an all-day event. Tailgating starts early around Crusader Stadium with BBQ, live music, and Cru merchandise. The team gathers for a chapel service before the Cru Walk, marching from the Cummins Field House through cheering fans into the stadium. The Purple Rage student section brings relentless energy, and the marching band fills halftime with school fight songs. After a win, the bell tower rings across campus.`,
      welcomeVideoUrl: null,
      defaultWelcomeMsg: 'Welcome to the home of the Crusaders! Explore our championship tradition and discover what makes UMHB special.',
      scorecardId: null,
    },
    {
      id: 'tamucc-islanders-001',
      slug: 'tamucc',
      name: 'Texas A&M University-Corpus Christi',
      shortName: 'TAMUCC',
      mascot: 'Islanders',
      conference: 'Southland Conference',
      city: 'Corpus Christi',
      state: 'TX',
      colorPrimary: '#0067C5',
      colorSecondary: '#007F3E',
      colorAccent: '#9EA2A4',
      logoUrl: '/images/schools/tamucc/logo.png',
      heroImageUrl: '/images/schools/tamucc/hero.jpg',
      description: `Texas A&M University-Corpus Christi — "The Island University" — sits on Ward Island overlooking Corpus Christi Bay on the Texas Gulf Coast. As a public research university competing in NCAA Division I as a member of the Southland Conference, TAMUCC fields 14 varsity sports and has built a rapidly rising athletic program. The men's basketball team has captured back-to-back conference tournament championships and NCAA Tournament appearances, while the women's tennis program made the NCAA Championships four consecutive years (2021–2024) — a feat accomplished by only 34 Division I schools. With approximately 11,000 students, TAMUCC is renowned for its marine biology program, nursing school, and stunning island campus. There is no football program — Islanders athletics is powered by basketball, baseball, volleyball, tennis, track & field, soccer, softball, cross country, beach volleyball, and golf.`,
      stadiumCapacity: null,
      traditions: `The Islander Tip-Off tradition opens every basketball season with a beach party rally at the campus bayfront. Izzy the Islander, the blue wave mascot, leads fans in the "Island Stomp" chant during home games at the Hilliard Center Arena. The beach volleyball team plays matches on the island's own sand courts with Corpus Christi Bay as the backdrop — one of the most unique settings in college athletics.`,
      gameDayDescription: `Game day at TAMUCC revolves around the Hilliard Center Arena for basketball and Chapman Field for baseball. The island campus creates a unique atmosphere — fans drive across the JFK Causeway bridge to reach campus, with bay views on both sides. The student section "Izzy's Army" brings island-themed energy with teal and blue body paint, inflatable palm trees, and coordinated chants. Postgame, students and fans head to the campus bayfront for sunset hangouts.`,
      welcomeVideoUrl: null,
      defaultWelcomeMsg: 'Welcome to The Island University! Explore Islanders athletics and discover what makes TAMUCC a destination program.',
      scorecardId: null,
    },
  ]

  const schoolMap: Record<string, any> = {}

  for (const data of schools) {
    const school = await prisma.school.create({ data })
    schoolMap[school.slug] = school
    console.log(`  Created school: ${school.name}`)
  }

  return schoolMap
}
