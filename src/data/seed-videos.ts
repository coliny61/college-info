// seed-videos.ts — Creates SchoolVideo records for UMHB and TAMUCC

export async function seedVideos(prisma: any, schoolMap: Record<string, any>) {
  const videos = [
    // ─── UMHB ─────────────────────────────────────────────────────────────────
    {
      slug: 'umhb',
      type: 'coach_intro',
      title: 'Welcome from Coach Harmon',
      description: 'Head Coach Larry Harmon welcomes recruits to UMHB and shares the championship culture of Crusader football.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-umhb-harmon',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 1,
    },
    {
      slug: 'umhb',
      type: 'highlight',
      title: 'UMHB Football Championship Highlights',
      description: 'Relive the Crusaders\' dominant run to the 2021 D3 National Championship — featuring the Stagg Bowl victory.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-umhb-football-highlights',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 2,
    },
    {
      slug: 'umhb',
      type: 'highlight',
      title: 'Crusaders Basketball 2024-25 Season Highlights',
      description: 'Top plays from the UMHB men\'s basketball season — conference battles, buzzer beaters, and highlight dunks.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-umhb-basketball-highlights',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 3,
    },
    {
      slug: 'umhb',
      type: 'day_in_life',
      title: 'A Day in the Life at UMHB',
      description: 'Follow a Crusader student-athlete through a typical day — chapel, classes, practice, and community on the Belton campus.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-umhb-day-in-life',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 4,
    },

    // ─── TAMUCC ───────────────────────────────────────────────────────────────
    {
      slug: 'tamucc',
      type: 'coach_intro',
      title: 'Welcome from Coach Lutz',
      description: 'Head Coach Steve Lutz welcomes recruits to TAMUCC and talks about the rise of Islanders basketball.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-tamucc-lutz',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 1,
    },
    {
      slug: 'tamucc',
      type: 'highlight',
      title: 'Islanders Basketball — NCAA Tournament Run',
      description: 'Highlights from TAMUCC\'s back-to-back Southland Conference championships and NCAA Tournament appearances.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-tamucc-basketball-highlights',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 2,
    },
    {
      slug: 'tamucc',
      type: 'highlight',
      title: 'Islanders Volleyball 2024 Season Highlights',
      description: 'TAMUCC volleyball\'s dominant Southland Conference championship season and NCAA Tournament run.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-tamucc-volleyball-highlights',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 3,
    },
    {
      slug: 'tamucc',
      type: 'highlight',
      title: 'Beach Volleyball on the Island',
      description: 'Experience TAMUCC beach volleyball — matches on the sand courts with Corpus Christi Bay as the backdrop.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-tamucc-beach-volleyball',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 4,
    },
    {
      slug: 'tamucc',
      type: 'day_in_life',
      title: 'Life on The Island',
      description: 'A day at The Island University — from sunrise bay views to classes, practice at Hilliard Center, and sunset on campus.',
      videoUrl: 'https://www.youtube.com/embed/placeholder-tamucc-campus-tour',
      thumbnailUrl: null,
      coachId: null,
      playerName: null,
      sortOrder: 5,
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
