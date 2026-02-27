// seed-schools.ts — Creates 5 schools with slug-based IDs

export async function seedSchools(prisma: any) {
  const schools = [
    {
      id: 'alabama',
      name: 'University of Alabama',
      slug: 'alabama',
      shortName: 'BAMA',
      mascot: 'Crimson Tide',
      conference: 'SEC',
      city: 'Tuscaloosa',
      state: 'AL',
      scorecardId: '100751',
      colorPrimary: '#9E1B32',
      colorSecondary: '#828A8F',
      colorAccent: '#FFFFFF',
      description:
        'The University of Alabama, founded in 1831, is the flagship of the University of Alabama System. Located in Tuscaloosa, Alabama has a storied tradition of academic excellence and is home to one of the most dominant football programs in college history. The Crimson Tide have won 18 national championships and the campus offers over 200 degree programs to nearly 40,000 students.',
    },
    {
      id: 'oregon',
      name: 'University of Oregon',
      slug: 'oregon',
      shortName: 'UO',
      mascot: 'Ducks',
      conference: 'Big Ten',
      city: 'Eugene',
      state: 'OR',
      scorecardId: '209551',
      colorPrimary: '#154733',
      colorSecondary: '#FEE123',
      colorAccent: '#000000',
      description:
        'The University of Oregon, founded in 1876, is a public research university in Eugene, Oregon. Known for its innovative spirit and close ties to Nike, the Ducks compete at the highest level in athletics while offering world-class programs in journalism, business, and the sciences. The campus sits along the Willamette River with the Cascade Range as a backdrop, serving over 23,000 students.',
    },
    {
      id: 'ohio-state',
      name: 'The Ohio State University',
      slug: 'ohio-state',
      shortName: 'OSU',
      mascot: 'Buckeyes',
      conference: 'Big Ten',
      city: 'Columbus',
      state: 'OH',
      scorecardId: '204796',
      colorPrimary: '#BB0000',
      colorSecondary: '#666666',
      colorAccent: '#FFFFFF',
      description:
        'The Ohio State University, founded in 1870, is one of the largest universities in the United States with over 61,000 students on its Columbus campus. A top-tier public research institution, Ohio State is known for engineering, medicine, and business programs. The Buckeyes are a perennial powerhouse in college football, playing in the iconic 100,000-seat Ohio Stadium — "The Horseshoe."',
    },
    {
      id: 'texas',
      name: 'University of Texas at Austin',
      slug: 'texas',
      shortName: 'UT',
      mascot: 'Longhorns',
      conference: 'SEC',
      city: 'Austin',
      state: 'TX',
      scorecardId: '228778',
      colorPrimary: '#BF5700',
      colorSecondary: '#333F48',
      colorAccent: '#FFFFFF',
      description:
        'The University of Texas at Austin, founded in 1883, is a world-renowned public research university and the flagship of the UT System. With over 52,000 students, UT Austin is recognized for top-ranked programs in engineering, business, law, and computer science. The Longhorns compete in the SEC and play at Darrell K Royal-Texas Memorial Stadium, one of the largest in the country.',
    },
    {
      id: 'lsu',
      name: 'Louisiana State University',
      slug: 'lsu',
      shortName: 'LSU',
      mascot: 'Tigers',
      conference: 'SEC',
      city: 'Baton Rouge',
      state: 'LA',
      scorecardId: '159391',
      colorPrimary: '#461D7C',
      colorSecondary: '#FDD023',
      colorAccent: '#FFFFFF',
      description:
        'Louisiana State University, founded in 1860, is the flagship university of Louisiana located in Baton Rouge. LSU is known for its vibrant campus life, strong engineering and agriculture programs, and one of the most passionate fan bases in college sports. Tiger Stadium — "Death Valley" — seats over 102,000 fans and is widely regarded as the most intimidating venue in college football.',
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
