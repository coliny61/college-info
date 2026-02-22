import type { School } from '@/types';

/**
 * Core school data for the five featured universities on the platform.
 * Each school includes branding colors, conference affiliation, and a
 * College Scorecard ID for linking to federal education data.
 */
export const SCHOOLS: School[] = [
  {
    id: 'alabama',
    name: 'University of Alabama',
    shortName: 'BAMA',
    mascot: 'Crimson Tide',
    conference: 'SEC',
    city: 'Tuscaloosa',
    state: 'AL',
    scorecardId: '100751',
    colors: {
      primary: '#9E1B32',
      secondary: '#828A8F',
      accent: '#FFFFFF',
    },
    logoUrl: 'https://placeholder.com/alabama-logo.png',
    heroImageUrl: 'https://placeholder.com/alabama-hero.jpg',
    description:
      'The University of Alabama, founded in 1831, is the flagship public university of Alabama. Located in Tuscaloosa, the Capstone is home to one of the most storied football programs in NCAA history, with 18 national championships. Alabama offers over 100 undergraduate programs across 13 colleges and schools, combining a world-class athletic tradition with growing academic prestige.',
  },
  {
    id: 'oregon',
    name: 'University of Oregon',
    shortName: 'UO',
    mascot: 'Ducks',
    conference: 'Big Ten',
    city: 'Eugene',
    state: 'OR',
    scorecardId: '209551',
    colors: {
      primary: '#154733',
      secondary: '#FEE123',
      accent: '#000000',
    },
    logoUrl: 'https://placeholder.com/oregon-logo.png',
    heroImageUrl: 'https://placeholder.com/oregon-hero.jpg',
    description:
      'The University of Oregon, established in 1876, is a public research university in Eugene, Oregon. Known worldwide for its close relationship with Nike and cutting-edge athletic facilities, the Ducks compete in the Big Ten Conference. Oregon offers strong programs in journalism, business, architecture, and the sciences, set against the stunning backdrop of the Pacific Northwest.',
  },
  {
    id: 'ohio-state',
    name: 'The Ohio State University',
    shortName: 'OSU',
    mascot: 'Buckeyes',
    conference: 'Big Ten',
    city: 'Columbus',
    state: 'OH',
    scorecardId: '204796',
    colors: {
      primary: '#BB0000',
      secondary: '#666666',
      accent: '#FFFFFF',
    },
    logoUrl: 'https://placeholder.com/ohio-state-logo.png',
    heroImageUrl: 'https://placeholder.com/ohio-state-hero.jpg',
    description:
      'The Ohio State University, founded in 1870 in Columbus, Ohio, is one of the largest universities in the United States with over 61,000 students. The Buckeyes boast eight national football championships and one of the most passionate fan bases in college sports. Ohio State is a top-tier public research institution with renowned programs in engineering, business, medicine, and the arts.',
  },
  {
    id: 'texas',
    name: 'University of Texas at Austin',
    shortName: 'UT',
    mascot: 'Longhorns',
    conference: 'SEC',
    city: 'Austin',
    state: 'TX',
    scorecardId: '228778',
    colors: {
      primary: '#BF5700',
      secondary: '#333F48',
      accent: '#FFFFFF',
    },
    logoUrl: 'https://placeholder.com/texas-logo.png',
    heroImageUrl: 'https://placeholder.com/texas-hero.jpg',
    description:
      'The University of Texas at Austin, established in 1883, is the flagship institution of the University of Texas System and one of the most respected public universities in the world. Located in the vibrant city of Austin, the Longhorns compete in the SEC and have won four national football championships. UT Austin is home to world-class programs in engineering, computer science, business, and the liberal arts, with a 40-acre campus that serves as a hub of innovation and culture.',
  },
  {
    id: 'lsu',
    name: 'Louisiana State University',
    shortName: 'LSU',
    mascot: 'Tigers',
    conference: 'SEC',
    city: 'Baton Rouge',
    state: 'LA',
    scorecardId: '159391',
    colors: {
      primary: '#461D7C',
      secondary: '#FDD023',
      accent: '#FFFFFF',
    },
    logoUrl: 'https://placeholder.com/lsu-logo.png',
    heroImageUrl: 'https://placeholder.com/lsu-hero.jpg',
    description:
      'Louisiana State University, founded in 1860, is the flagship university of Louisiana located in Baton Rouge. LSU is known for its electric game-day atmosphere in Tiger Stadium (Death Valley), widely regarded as one of the most intimidating venues in college football. The Tigers have won four national championships, including a dominant 2019 season. LSU offers over 235 degree programs and is a Carnegie R1 research institution with strengths in engineering, petroleum studies, agriculture, and the sciences.',
  },
];
