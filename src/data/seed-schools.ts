// seed-schools.ts — Creates 4 schools with slug-based IDs

export async function seedSchools(prisma: any) {
  const schools = [
    {
      id: 'texas-tech',
      name: 'Texas Tech University',
      slug: 'texas-tech',
      shortName: 'TTU',
      mascot: 'Red Raiders',
      conference: 'Big 12',
      city: 'Lubbock',
      state: 'TX',
      scorecardId: '229115',
      colorPrimary: '#CC0000',
      colorSecondary: '#000000',
      colorAccent: '#FFFFFF',
      description:
        'Texas Tech University, founded in 1923, is one of the largest comprehensive higher education institutions in the western two-thirds of Texas. Located in Lubbock, Texas Tech enrolls over 40,000 students and is designated as a Carnegie R1 research university. The Red Raiders compete in the Big 12 Conference and play at Jones AT&T Stadium, where the Fearless Champion statue greets fans. The university is known for strong programs in engineering, business, agriculture, and media & communication.',
    },
    {
      id: 'usc',
      name: 'University of Southern California',
      slug: 'usc',
      shortName: 'USC',
      mascot: 'Trojans',
      conference: 'Big Ten',
      city: 'Los Angeles',
      state: 'CA',
      scorecardId: '123961',
      colorPrimary: '#990000',
      colorSecondary: '#FFC72C',
      colorAccent: '#FFFFFF',
      description:
        'The University of Southern California, founded in 1880, is one of the world\'s leading private research universities located in the heart of Los Angeles. USC enrolls nearly 49,000 students and is recognized globally for its programs in film, engineering, business, and the arts. The Trojans are one of the most storied programs in college football history, claiming 11 national championships. USC joined the Big Ten Conference in 2024 and plays at the iconic Los Angeles Memorial Coliseum, which has hosted two Olympic Games.',
    },
    {
      id: 'baylor',
      name: 'Baylor University',
      slug: 'baylor',
      shortName: 'BU',
      mascot: 'Bears',
      conference: 'Big 12',
      city: 'Waco',
      state: 'TX',
      scorecardId: '223232',
      colorPrimary: '#003015',
      colorSecondary: '#FFB81C',
      colorAccent: '#FFFFFF',
      description:
        'Baylor University, founded in 1845, is the oldest continuously operating university in Texas and one of the oldest west of the Mississippi River. A private Christian university in Waco, Texas, Baylor enrolls over 20,000 students and is classified as an R1 research university. The Bears compete in the Big 12 Conference and play at McLane Stadium, a striking 45,000-seat venue on the banks of the Brazos River. Baylor is known for strong programs in business, engineering, nursing, and pre-med.',
    },
    {
      id: 'oklahoma',
      name: 'University of Oklahoma',
      slug: 'oklahoma',
      shortName: 'OU',
      mascot: 'Sooners',
      conference: 'SEC',
      city: 'Norman',
      state: 'OK',
      scorecardId: '207500',
      colorPrimary: '#841617',
      colorSecondary: '#FDF9D8',
      colorAccent: '#FFFFFF',
      description:
        'The University of Oklahoma, founded in 1890, is the flagship public research university of the state of Oklahoma. Located in Norman, OU enrolls over 32,000 students and is recognized for its programs in meteorology, petroleum engineering, and business. The Sooners are one of the most accomplished programs in college football history with 7 national championships and have joined the SEC as of 2024. Gaylord Family Oklahoma Memorial Stadium, known as "The Palace on the Prairie," seats over 80,000 fans.',
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
