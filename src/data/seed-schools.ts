// seed-schools.ts — Creates schools with slug-based IDs and full product spec fields

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
      stadiumCapacity: 60454,
      traditions: 'The Masked Rider charges across the field on a black quarter horse before every home game — one of the most iconic traditions in college football. The Saddle Tramps ring the Victory Bells after every win. "Raider Red" (the costumed mascot) fires dual shotguns after every touchdown. The Goin\' Band from Raiderland is one of the largest college marching bands in the country. Fans throw tortillas onto the field before kickoff — a beloved (if unofficial) tradition.',
      gameDayDescription: 'Game days in Lubbock are an all-day affair. Tailgating fills the lots around Jones AT&T Stadium by 8 AM. The Masked Rider leads the team out of the tunnel as the crowd erupts. The student section (Saddle Tramps) stays standing the entire game. Night games under the West Texas sky are electric — the stadium glows red and the energy is deafening.',
      welcomeVideoUrl: null,
      defaultWelcomeMsg: 'Welcome to Texas Tech Football! We\'re excited to show you what it means to be a Red Raider. Explore our facilities, meet our coaching staff, and see why Lubbock is one of the best college towns in America. Wreck \'Em Tech!',
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
      stadiumCapacity: 80126,
      traditions: 'The Sooner Schooner — a Conestoga wagon pulled by twin ponies Boomer and Sooner — charges across the field after every score. "Boomer Sooner" is one of the most recognizable fight songs in college football, played after every first down. The Pride of Oklahoma marching band performs elaborate halftime shows. Fans link arms and sway during "Oklahoma!" the Rodgers & Hammerstein classic. The Sooner Walk through Championship Alley lets fans greet the team before every home game.',
      gameDayDescription: 'Norman transforms on game days. The Campus Corner district fills with crimson-clad fans hours before kickoff. The Sooner Walk through Championship Alley is a must-see tradition as players walk past seven national championship trophies. Inside "The Palace on the Prairie," 80,000 fans create a wall of sound. The Sooner Schooner races across the field after every score while the band plays "Boomer Sooner" on repeat.',
      welcomeVideoUrl: null,
      defaultWelcomeMsg: 'Welcome to the University of Oklahoma Football! We\'re thrilled you\'re exploring our program. From our world-class facilities to our championship tradition, we want you to experience what makes OU special. Boomer Sooner!',
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
