// seed-schools.ts — Creates 4 schools with slug-based IDs

export async function seedSchools(prisma: any) {
  const schools = [
    {
      id: 'texas-tech',
      name: 'Texas Tech University',
      slug: 'texas-tech',
      shortName: 'Texas Tech',
      mascot: 'Red Raiders',
      conference: 'Big 12',
      city: 'Lubbock',
      state: 'TX',
      scorecardId: '229115',
      colorPrimary: '#CC0000',
      colorSecondary: '#000000',
      colorAccent: '#FFFFFF',
      logoUrl: '/logos/texas-tech.svg',
      description:
        'Texas Tech University, founded in 1923, is one of the largest comprehensive higher education institutions in the western two-thirds of Texas. Located in Lubbock, Texas Tech enrolls over 40,000 students and is designated as a Carnegie R1 research university. The Red Raiders compete in the Big 12 Conference and play at Jones AT&T Stadium, where the Fearless Champion statue greets fans. The university is known for strong programs in engineering, business, agriculture, and media & communication.',
    },
    {
      id: 'oklahoma',
      name: 'University of Oklahoma',
      slug: 'oklahoma',
      shortName: 'Oklahoma',
      mascot: 'Sooners',
      conference: 'SEC',
      city: 'Norman',
      state: 'OK',
      scorecardId: '207500',
      colorPrimary: '#841617',
      colorSecondary: '#FDF9D8',
      colorAccent: '#FFFFFF',
      logoUrl: '/logos/oklahoma.svg',
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
