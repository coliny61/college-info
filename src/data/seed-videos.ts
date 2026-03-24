// seed-videos.ts — Creates SchoolVideo records (coach intros, highlights, day-in-life)

export async function seedVideos(prisma: any, schoolMap: Record<string, any>) {
  const videos = [
    // ─── Texas Tech ─────────────────────────────────────────────────────────────
    {
      slug: 'texas-tech',
      type: 'coach_intro',
      title: 'Welcome from Coach McGuire',
      description: 'Head Coach Joey McGuire welcomes recruits to Texas Tech and shares his vision for Red Raider football.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-ttu-mcguire',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 1,
    },
    {
      slug: 'texas-tech',
      type: 'coach_intro',
      title: 'OC Mack Leftwich on the Offense',
      description: 'Offensive Coordinator Mack Leftwich breaks down the spread RPO system and what he looks for in quarterbacks and playmakers.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-ttu-leftwich',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 2,
    },
    {
      slug: 'texas-tech',
      type: 'highlight',
      title: '2025 Big 12 Championship Highlights',
      description: 'Relive Texas Tech\'s historic 2025 Big 12 Championship run — the program\'s first conference title since 1955.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-ttu-highlights',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 3,
    },
    {
      slug: 'texas-tech',
      type: 'day_in_life',
      title: 'A Day in the Life: Behren Morton',
      description: 'Follow starting QB Behren Morton through a typical game week — from film study to practice to recovery.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-ttu-morton',
      thumbnailUrl: null,
      coachId: null,
      playerName: 'Behren Morton',
      sortOrder: 4,
    },

    // ─── Oklahoma ───────────────────────────────────────────────────────────────
    {
      slug: 'oklahoma',
      type: 'coach_intro',
      title: 'Welcome from Coach Venables',
      description: 'Head Coach Brent Venables welcomes recruits to the University of Oklahoma and shares what it means to be a Sooner.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-ou-venables',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 1,
    },
    {
      slug: 'oklahoma',
      type: 'coach_intro',
      title: 'OC Ben Arbuckle on the Air Raid',
      description: 'Offensive Coordinator Ben Arbuckle explains the Air Raid system and how OU\'s offense creates explosive plays.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-ou-arbuckle',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 2,
    },
    {
      slug: 'oklahoma',
      type: 'highlight',
      title: '2025 Season Highlights',
      description: 'OU\'s 10-3 season and first-ever SEC College Football Playoff appearance — the best moments from a historic year.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-ou-highlights',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 3,
    },
    {
      slug: 'oklahoma',
      type: 'day_in_life',
      title: 'A Day in the Life: John Mateer',
      description: 'Dual-threat QB John Mateer takes you through his daily routine — classes, workouts, film, and life as a Sooner.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-ou-mateer',
      thumbnailUrl: null,
      coachId: null,
      playerName: 'John Mateer',
      sortOrder: 4,
    },
  ]

  for (const video of videos) {
    const { slug, ...data } = video
    await prisma.schoolVideo.create({
      data: {
        schoolId: schoolMap[slug].id,
        ...data,
      },
    })
  }
  console.log(`  Created ${videos.length} School Videos`)
}
