import type { AcademicData, College, Major, DegreePathway, CareerOutcome } from '@/types';

// -----------------------------------------------------------------------------
// Academic Data (school-level statistics)
// -----------------------------------------------------------------------------

/**
 * Academic statistics for each school, sourced from College Scorecard and
 * institutional reporting. Keyed by school ID for fast lookups.
 */
export const ACADEMICS_DATA: Record<string, AcademicData> = {
  alabama: {
    schoolId: 'alabama',
    enrollment: 38316,
    admissionRate: 0.80,
    satAvg: 1200,
    actAvg: 27,
    tuitionInState: 11580,
    tuitionOutOfState: 32300,
    graduationRate: 0.72,
    medianEarnings: 50400,
    retentionRate: 0.87,
  },
  oregon: {
    schoolId: 'oregon',
    enrollment: 23634,
    admissionRate: 0.82,
    satAvg: 1195,
    actAvg: 26,
    tuitionInState: 12720,
    tuitionOutOfState: 39105,
    graduationRate: 0.75,
    medianEarnings: 52100,
    retentionRate: 0.88,
  },
  'ohio-state': {
    schoolId: 'ohio-state',
    enrollment: 61369,
    admissionRate: 0.53,
    satAvg: 1340,
    actAvg: 30,
    tuitionInState: 11936,
    tuitionOutOfState: 35019,
    graduationRate: 0.83,
    medianEarnings: 58300,
    retentionRate: 0.94,
  },
  texas: {
    schoolId: 'texas',
    enrollment: 52384,
    admissionRate: 0.31,
    satAvg: 1370,
    actAvg: 31,
    tuitionInState: 11448,
    tuitionOutOfState: 41070,
    graduationRate: 0.84,
    medianEarnings: 62500,
    retentionRate: 0.95,
  },
  lsu: {
    schoolId: 'lsu',
    enrollment: 35258,
    admissionRate: 0.75,
    satAvg: 1195,
    actAvg: 26,
    tuitionInState: 11962,
    tuitionOutOfState: 28639,
    graduationRate: 0.69,
    medianEarnings: 48700,
    retentionRate: 0.85,
  },
};

// -----------------------------------------------------------------------------
// Colleges (academic divisions within each university)
// -----------------------------------------------------------------------------

export const COLLEGES: College[] = [
  // Alabama
  {
    id: 'alabama-engineering',
    schoolId: 'alabama',
    name: 'College of Engineering',
    description:
      'One of the fastest-growing engineering colleges in the nation, offering 12 undergraduate and 9 graduate degree programs across disciplines including aerospace, civil, chemical, and computer science.',
    totalStudents: 6200,
    imageUrl: 'https://placeholder.com/alabama-engineering.jpg',
  },
  {
    id: 'alabama-business',
    schoolId: 'alabama',
    name: 'Culverhouse College of Business',
    description:
      'The Culverhouse College of Business is ranked among the top public business schools in the country, known for its strong accounting, finance, and management programs.',
    totalStudents: 7500,
    imageUrl: 'https://placeholder.com/alabama-business.jpg',
  },
  {
    id: 'alabama-arts-sciences',
    schoolId: 'alabama',
    name: 'College of Arts & Sciences',
    description:
      'The largest college at Alabama, offering programs across the humanities, social sciences, natural sciences, and mathematics.',
    totalStudents: 9800,
    imageUrl: 'https://placeholder.com/alabama-arts-sciences.jpg',
  },

  // Oregon
  {
    id: 'oregon-business',
    schoolId: 'oregon',
    name: 'Lundquist College of Business',
    description:
      'The Lundquist College of Business is recognized for its sports business, entrepreneurship, and finance programs, leveraging close ties to Nike and the Oregon business community.',
    totalStudents: 3200,
    imageUrl: 'https://placeholder.com/oregon-business.jpg',
  },
  {
    id: 'oregon-arts-sciences',
    schoolId: 'oregon',
    name: 'College of Arts & Sciences',
    description:
      'The largest academic division at Oregon, spanning the natural sciences, social sciences, and humanities with nationally ranked programs in psychology, biology, and English.',
    totalStudents: 8100,
    imageUrl: 'https://placeholder.com/oregon-arts-sciences.jpg',
  },
  {
    id: 'oregon-journalism',
    schoolId: 'oregon',
    name: 'School of Journalism and Communication',
    description:
      'One of the oldest accredited journalism programs in the nation, offering advertising, public relations, and multimedia journalism tracks.',
    totalStudents: 2400,
    imageUrl: 'https://placeholder.com/oregon-journalism.jpg',
  },

  // Ohio State
  {
    id: 'ohio-state-engineering',
    schoolId: 'ohio-state',
    name: 'College of Engineering',
    description:
      'Ohio State Engineering is a top-20 nationally ranked engineering college with over 14,000 students and world-class research in aerospace, biomedical, computer science, and electrical engineering.',
    totalStudents: 14200,
    imageUrl: 'https://placeholder.com/ohio-state-engineering.jpg',
  },
  {
    id: 'ohio-state-business',
    schoolId: 'ohio-state',
    name: 'Fisher College of Business',
    description:
      'The Max M. Fisher College of Business is ranked among the top 15 public business schools, offering specialized programs in finance, marketing, logistics, and real estate.',
    totalStudents: 7800,
    imageUrl: 'https://placeholder.com/ohio-state-business.jpg',
  },
  {
    id: 'ohio-state-arts-sciences',
    schoolId: 'ohio-state',
    name: 'College of Arts & Sciences',
    description:
      'The academic heart of Ohio State, offering 81 majors across the arts, humanities, mathematical and physical sciences, social and behavioral sciences, and natural sciences.',
    totalStudents: 16500,
    imageUrl: 'https://placeholder.com/ohio-state-arts-sciences.jpg',
  },

  // Texas
  {
    id: 'texas-engineering',
    schoolId: 'texas',
    name: 'Cockrell School of Engineering',
    description:
      'The Cockrell School of Engineering is a top-10 nationally ranked engineering school, recognized for research in energy, computing, biomedical engineering, and aerospace.',
    totalStudents: 8500,
    imageUrl: 'https://placeholder.com/texas-engineering.jpg',
  },
  {
    id: 'texas-business',
    schoolId: 'texas',
    name: 'McCombs School of Business',
    description:
      'McCombs is consistently ranked among the top 5 public business schools in the country, known for finance, accounting, management, and technology commercialization.',
    totalStudents: 6200,
    imageUrl: 'https://placeholder.com/texas-business.jpg',
  },
  {
    id: 'texas-arts-sciences',
    schoolId: 'texas',
    name: 'College of Liberal Arts',
    description:
      'The College of Liberal Arts is the largest college at UT Austin, offering over 40 undergraduate degree programs in the humanities, social sciences, and fine arts.',
    totalStudents: 11200,
    imageUrl: 'https://placeholder.com/texas-liberal-arts.jpg',
  },
  {
    id: 'texas-cs',
    schoolId: 'texas',
    name: 'College of Natural Sciences',
    description:
      'Home to the top-10 ranked computer science department and strong programs in biology, chemistry, physics, and mathematics.',
    totalStudents: 9800,
    imageUrl: 'https://placeholder.com/texas-natural-sciences.jpg',
  },

  // LSU
  {
    id: 'lsu-engineering',
    schoolId: 'lsu',
    name: 'College of Engineering',
    description:
      'LSU Engineering offers programs in chemical, civil, electrical, mechanical, and petroleum engineering, with particularly strong ties to the Gulf Coast energy sector.',
    totalStudents: 4800,
    imageUrl: 'https://placeholder.com/lsu-engineering.jpg',
  },
  {
    id: 'lsu-business',
    schoolId: 'lsu',
    name: 'E. J. Ourso College of Business',
    description:
      'The Ourso College of Business provides AACSB-accredited programs in accounting, finance, information systems, and management with a focus on experiential learning.',
    totalStudents: 5200,
    imageUrl: 'https://placeholder.com/lsu-business.jpg',
  },
  {
    id: 'lsu-arts-sciences',
    schoolId: 'lsu',
    name: 'College of Humanities & Social Sciences',
    description:
      'Offering diverse programs from English and history to political science and sociology, the college anchors LSU\'s liberal arts education.',
    totalStudents: 6100,
    imageUrl: 'https://placeholder.com/lsu-humanities.jpg',
  },
];

// -----------------------------------------------------------------------------
// Majors
// -----------------------------------------------------------------------------

export const MAJORS: Major[] = [
  // Alabama Engineering
  {
    id: 'alabama-cs',
    collegeId: 'alabama-engineering',
    name: 'Computer Science',
    degreeType: 'BS',
    description:
      'A rigorous program covering algorithms, software engineering, artificial intelligence, and systems, preparing graduates for careers in tech and research.',
  },
  {
    id: 'alabama-mechanical',
    collegeId: 'alabama-engineering',
    name: 'Mechanical Engineering',
    degreeType: 'BS',
    description:
      'Covers thermodynamics, materials science, dynamics, and design with hands-on capstone projects in automotive and aerospace applications.',
  },

  // Alabama Business
  {
    id: 'alabama-finance',
    collegeId: 'alabama-business',
    name: 'Finance',
    degreeType: 'BS',
    description:
      'A comprehensive finance program emphasizing corporate finance, investment analysis, and financial planning with access to a student-managed investment fund.',
  },
  {
    id: 'alabama-accounting',
    collegeId: 'alabama-business',
    name: 'Accounting',
    degreeType: 'BS',
    description:
      'Alabama\'s accounting program is nationally ranked and produces CPA pass rates well above the national average.',
  },

  // Alabama Arts & Sciences
  {
    id: 'alabama-biology',
    collegeId: 'alabama-arts-sciences',
    name: 'Biology',
    degreeType: 'BS',
    description:
      'A broad-based biology program with concentrations in cellular/molecular biology, ecology, and pre-med preparation.',
  },

  // Oregon Business
  {
    id: 'oregon-sports-business',
    collegeId: 'oregon-business',
    name: 'Sports Business',
    degreeType: 'BS',
    description:
      'A nationally recognized program at the intersection of business and athletics, with unique access to Nike and major sports organizations in the Pacific Northwest.',
  },
  {
    id: 'oregon-finance',
    collegeId: 'oregon-business',
    name: 'Finance',
    degreeType: 'BS',
    description:
      'Strong finance curriculum with emphasis on portfolio management, fintech, and Pacific Rim economic connections.',
  },

  // Oregon Journalism
  {
    id: 'oregon-journalism-major',
    collegeId: 'oregon-journalism',
    name: 'Journalism',
    degreeType: 'BA',
    description:
      'One of the premier journalism programs in the country, blending traditional reporting with digital media, data journalism, and multimedia storytelling.',
  },

  // Oregon Arts & Sciences
  {
    id: 'oregon-psychology',
    collegeId: 'oregon-arts-sciences',
    name: 'Psychology',
    degreeType: 'BS',
    description:
      'Covers cognitive, developmental, social, and clinical psychology with opportunities for undergraduate research.',
  },

  // Ohio State Engineering
  {
    id: 'ohio-state-cse',
    collegeId: 'ohio-state-engineering',
    name: 'Computer Science & Engineering',
    degreeType: 'BS',
    description:
      'A combined CS and engineering program ranked in the top 20 nationally, with research strengths in AI, cybersecurity, and high-performance computing.',
  },
  {
    id: 'ohio-state-biomedical',
    collegeId: 'ohio-state-engineering',
    name: 'Biomedical Engineering',
    degreeType: 'BS',
    description:
      'Integrates engineering with medicine, preparing students for careers in medical devices, pharmaceuticals, and health technology.',
  },

  // Ohio State Business
  {
    id: 'ohio-state-finance',
    collegeId: 'ohio-state-business',
    name: 'Finance',
    degreeType: 'BS',
    description:
      'Fisher College\'s finance program offers deep training in corporate finance, investment banking, and risk management with strong Wall Street recruiting.',
  },

  // Ohio State Arts & Sciences
  {
    id: 'ohio-state-polisci',
    collegeId: 'ohio-state-arts-sciences',
    name: 'Political Science',
    degreeType: 'BA',
    description:
      'Top-ranked political science program with strengths in American politics, international relations, and public policy research.',
  },

  // Texas Engineering
  {
    id: 'texas-cs',
    collegeId: 'texas-cs',
    name: 'Computer Science',
    degreeType: 'BS',
    description:
      'UT Austin\'s computer science program is top-10 nationally, producing graduates who drive innovation at leading tech companies and startups.',
  },
  {
    id: 'texas-petroleum',
    collegeId: 'texas-engineering',
    name: 'Petroleum Engineering',
    degreeType: 'BS',
    description:
      'The #1 ranked petroleum engineering program in the country, leveraging Texas\'s energy industry connections for unparalleled career opportunities.',
  },

  // Texas Business
  {
    id: 'texas-finance',
    collegeId: 'texas-business',
    name: 'Finance',
    degreeType: 'BS',
    description:
      'McCombs Finance is a top-5 public university finance program, with extensive alumni networks in investment banking, private equity, and energy finance.',
  },

  // Texas Liberal Arts
  {
    id: 'texas-economics',
    collegeId: 'texas-arts-sciences',
    name: 'Economics',
    degreeType: 'BA',
    description:
      'A rigorous economics program with strengths in econometrics, labor economics, and development economics, preparing students for graduate study or industry careers.',
  },

  // LSU Engineering
  {
    id: 'lsu-petroleum',
    collegeId: 'lsu-engineering',
    name: 'Petroleum Engineering',
    degreeType: 'BS',
    description:
      'One of the top petroleum engineering programs in the nation, benefiting from proximity to the Gulf Coast energy corridor and industry partnerships.',
  },
  {
    id: 'lsu-civil',
    collegeId: 'lsu-engineering',
    name: 'Civil Engineering',
    degreeType: 'BS',
    description:
      'Addresses coastal engineering, flood protection, and infrastructure challenges unique to Louisiana and the Gulf region.',
  },

  // LSU Business
  {
    id: 'lsu-accounting',
    collegeId: 'lsu-business',
    name: 'Accounting',
    degreeType: 'BS',
    description:
      'AACSB-accredited accounting program with strong CPA exam preparation and internship pipelines to Big Four firms.',
  },

  // LSU Humanities
  {
    id: 'lsu-english',
    collegeId: 'lsu-arts-sciences',
    name: 'English',
    degreeType: 'BA',
    description:
      'Home to the renowned Southern Review literary journal, the English department offers creative writing, literature, and rhetoric tracks.',
  },
];

// -----------------------------------------------------------------------------
// Degree Pathways (sample: Alabama Computer Science)
// -----------------------------------------------------------------------------

export const DEGREE_PATHWAYS: DegreePathway[] = [
  // Alabama CS - full 4-year pathway
  {
    majorId: 'alabama-cs',
    year: 1,
    title: 'Foundation Year',
    courses: [
      'CS 100 - Introduction to Computer Science',
      'CS 150 - Programming I (Python)',
      'MATH 125 - Calculus I',
      'MATH 126 - Calculus II',
      'EN 101 - English Composition',
      'General Education Elective',
    ],
    description:
      'Build a solid foundation in programming fundamentals, mathematical reasoning, and computational thinking. Students learn Python, basic data structures, and problem-solving techniques.',
  },
  {
    majorId: 'alabama-cs',
    year: 2,
    title: 'Core Studies',
    courses: [
      'CS 200 - Programming II (Java)',
      'CS 250 - Data Structures & Algorithms',
      'CS 260 - Computer Organization',
      'MATH 237 - Linear Algebra',
      'MATH 301 - Discrete Mathematics',
      'CS 270 - Software Development Fundamentals',
    ],
    description:
      'Deepen understanding of core computer science concepts including data structures, algorithms, and computer architecture. Begin exploring software engineering practices.',
  },
  {
    majorId: 'alabama-cs',
    year: 3,
    title: 'Specialization',
    courses: [
      'CS 350 - Operating Systems',
      'CS 360 - Database Systems',
      'CS 370 - Computer Networks',
      'CS 380 - Software Engineering',
      'CS 3XX - Technical Elective I',
      'CS 3XX - Technical Elective II',
    ],
    description:
      'Choose a specialization track (AI/ML, cybersecurity, systems, or software engineering) while completing core upper-division requirements. Begin undergraduate research or internship.',
  },
  {
    majorId: 'alabama-cs',
    year: 4,
    title: 'Senior Capstone',
    courses: [
      'CS 495 - Senior Capstone Project',
      'CS 4XX - Technical Elective III',
      'CS 4XX - Technical Elective IV',
      'CS 4XX - Technical Elective V',
      'Free Elective',
      'Free Elective',
    ],
    description:
      'Complete a year-long capstone project with industry sponsors, finish electives in your specialization, and prepare for graduate school or industry employment. Career development and networking opportunities are emphasized.',
  },

  // Ohio State CSE - full 4-year pathway
  {
    majorId: 'ohio-state-cse',
    year: 1,
    title: 'Foundations of Computing',
    courses: [
      'CSE 2221 - Software I',
      'CSE 2231 - Software II',
      'MATH 1151 - Calculus I',
      'MATH 1152 - Calculus II',
      'ENGR 1181 - Engineering Fundamentals',
      'ENGLISH 1110 - First-Year Writing',
    ],
    description:
      'Introduction to software development with Java-based component programming, calculus sequence, and engineering fundamentals.',
  },
  {
    majorId: 'ohio-state-cse',
    year: 2,
    title: 'Core Computer Science',
    courses: [
      'CSE 2321 - Discrete Structures',
      'CSE 2331 - Data Structures & Algorithms',
      'CSE 2421 - Systems I (Low-Level Programming)',
      'CSE 2431 - Systems II (Operating Systems)',
      'MATH 2568 - Linear Algebra',
      'STAT 3470 - Probability & Statistics',
    ],
    description:
      'Build core skills in algorithms, systems-level programming, and the mathematical foundations of computing.',
  },
  {
    majorId: 'ohio-state-cse',
    year: 3,
    title: 'Advanced Topics',
    courses: [
      'CSE 3341 - Principles of Programming Languages',
      'CSE 3421 - Computer Architecture',
      'CSE 3461 - Computer Networking',
      'CSE 3901 - Web Applications',
      'CSE 3XXX - Technical Elective I',
      'CSE 3XXX - Technical Elective II',
    ],
    description:
      'Explore advanced topics in programming languages, architecture, networking, and web development. Begin specialization in areas like AI, security, or graphics.',
  },
  {
    majorId: 'ohio-state-cse',
    year: 4,
    title: 'Capstone & Specialization',
    courses: [
      'CSE 5911 - Capstone Design',
      'CSE 5XXX - Technical Elective III',
      'CSE 5XXX - Technical Elective IV',
      'CSE 5XXX - Technical Elective V',
      'Free Elective',
      'Free Elective',
    ],
    description:
      'Complete an industry-sponsored capstone project, finish technical electives, and prepare for careers in software engineering, AI research, or graduate studies.',
  },

  // Texas CS - full 4-year pathway
  {
    majorId: 'texas-cs',
    year: 1,
    title: 'Programming Foundations',
    courses: [
      'CS 312 - Introduction to Programming',
      'CS 314 - Data Structures',
      'M 408C - Differential Calculus',
      'M 408D - Integral Calculus',
      'UGS 302 - First-Year Signature Course',
      'RHE 306 - Rhetoric & Writing',
    ],
    description:
      'Learn programming in Java, data structures fundamentals, and the calculus sequence. UT\'s first-year signature course provides interdisciplinary perspectives.',
  },
  {
    majorId: 'texas-cs',
    year: 2,
    title: 'Systems & Theory',
    courses: [
      'CS 429 - Computer Organization & Architecture',
      'CS 331 - Algorithms & Complexity',
      'CS 439 - Principles of Computer Systems',
      'M 340L - Linear Algebra',
      'M 362K - Probability',
      'Science Elective',
    ],
    description:
      'Deep dive into systems programming, algorithm design and analysis, and the mathematical theory underlying computer science.',
  },
  {
    majorId: 'texas-cs',
    year: 3,
    title: 'Advanced Computing',
    courses: [
      'CS 371P - Object-Oriented Programming',
      'CS 373 - Software Engineering',
      'CS 372 - Operating Systems',
      'CS 3XX - CS Elective I',
      'CS 3XX - CS Elective II',
      'Free Elective',
    ],
    description:
      'Advanced coursework in software engineering, operating systems, and chosen specialization tracks including AI, graphics, security, or networking.',
  },
  {
    majorId: 'texas-cs',
    year: 4,
    title: 'Senior Capstone',
    courses: [
      'CS 378 - Capstone Project',
      'CS 4XX - CS Elective III',
      'CS 4XX - CS Elective IV',
      'CS 4XX - CS Elective V',
      'Free Elective',
      'Free Elective',
    ],
    description:
      'Complete senior capstone with Austin tech industry partners, round out specialization with upper-division electives, and prepare for industry or graduate school.',
  },
];

// -----------------------------------------------------------------------------
// Career Outcomes
// -----------------------------------------------------------------------------

export const CAREER_OUTCOMES: CareerOutcome[] = [
  // Alabama CS
  {
    majorId: 'alabama-cs',
    title: 'Software Engineer',
    medianSalary: 110000,
    growthRate: 0.25,
    description:
      'Design, develop, and maintain software applications across web, mobile, and enterprise platforms. High demand across all industries.',
  },
  {
    majorId: 'alabama-cs',
    title: 'Data Scientist',
    medianSalary: 105000,
    growthRate: 0.35,
    description:
      'Analyze complex datasets using statistical methods and machine learning to drive business decisions and product development.',
  },
  {
    majorId: 'alabama-cs',
    title: 'Cybersecurity Analyst',
    medianSalary: 95000,
    growthRate: 0.32,
    description:
      'Protect organizations from cyber threats by monitoring networks, analyzing vulnerabilities, and implementing security protocols.',
  },

  // Alabama Finance
  {
    majorId: 'alabama-finance',
    title: 'Financial Analyst',
    medianSalary: 75000,
    growthRate: 0.09,
    description:
      'Evaluate financial data, prepare reports, and advise businesses on investment decisions and financial planning.',
  },
  {
    majorId: 'alabama-finance',
    title: 'Investment Banking Analyst',
    medianSalary: 95000,
    growthRate: 0.07,
    description:
      'Assist in mergers, acquisitions, and capital raising for corporations through financial modeling and deal execution.',
  },

  // Oregon Sports Business
  {
    majorId: 'oregon-sports-business',
    title: 'Sports Marketing Manager',
    medianSalary: 78000,
    growthRate: 0.10,
    description:
      'Develop and execute marketing strategies for sports teams, athletic brands, and entertainment properties.',
  },
  {
    majorId: 'oregon-sports-business',
    title: 'Athletic Director (Assistant)',
    medianSalary: 65000,
    growthRate: 0.08,
    description:
      'Support the management of collegiate or professional athletic departments, overseeing budgets, compliance, and operations.',
  },

  // Ohio State CSE
  {
    majorId: 'ohio-state-cse',
    title: 'Software Engineer',
    medianSalary: 115000,
    growthRate: 0.25,
    description:
      'Build and scale software systems at leading technology companies. Ohio State graduates are heavily recruited by Amazon, Google, Microsoft, and top startups.',
  },
  {
    majorId: 'ohio-state-cse',
    title: 'Machine Learning Engineer',
    medianSalary: 130000,
    growthRate: 0.40,
    description:
      'Design and deploy machine learning models for production systems in areas like autonomous vehicles, natural language processing, and computer vision.',
  },

  // Ohio State Finance
  {
    majorId: 'ohio-state-finance',
    title: 'Corporate Finance Analyst',
    medianSalary: 80000,
    growthRate: 0.08,
    description:
      'Manage corporate financial planning, budgeting, and analysis for Fortune 500 companies in the Midwest and beyond.',
  },

  // Texas CS
  {
    majorId: 'texas-cs',
    title: 'Software Engineer',
    medianSalary: 120000,
    growthRate: 0.25,
    description:
      'UT Austin CS graduates are among the most sought-after in tech, with strong pipelines to Austin startups, Silicon Valley, and major tech hubs.',
  },
  {
    majorId: 'texas-cs',
    title: 'AI Research Scientist',
    medianSalary: 140000,
    growthRate: 0.42,
    description:
      'Conduct cutting-edge research in artificial intelligence, developing new algorithms and models that advance the field.',
  },

  // Texas Petroleum Engineering
  {
    majorId: 'texas-petroleum',
    title: 'Petroleum Engineer',
    medianSalary: 137000,
    growthRate: 0.03,
    description:
      'Design methods for extracting oil and gas from deposits, optimizing production processes for energy companies.',
  },
  {
    majorId: 'texas-petroleum',
    title: 'Reservoir Engineer',
    medianSalary: 125000,
    growthRate: 0.05,
    description:
      'Analyze reservoir data to maximize hydrocarbon recovery and guide drilling decisions for energy companies.',
  },

  // LSU Petroleum Engineering
  {
    majorId: 'lsu-petroleum',
    title: 'Drilling Engineer',
    medianSalary: 120000,
    growthRate: 0.04,
    description:
      'Plan and oversee drilling operations for oil and gas wells, ensuring safety and efficiency in extraction processes.',
  },
  {
    majorId: 'lsu-petroleum',
    title: 'Production Engineer',
    medianSalary: 115000,
    growthRate: 0.03,
    description:
      'Optimize the production of oil and gas from existing wells, implementing technologies to increase output and reduce costs.',
  },

  // LSU Accounting
  {
    majorId: 'lsu-accounting',
    title: 'Certified Public Accountant',
    medianSalary: 72000,
    growthRate: 0.06,
    description:
      'Provide auditing, tax, and advisory services to individuals and businesses, with clear advancement pathways to partner-level roles.',
  },
  {
    majorId: 'lsu-accounting',
    title: 'Forensic Accountant',
    medianSalary: 80000,
    growthRate: 0.11,
    description:
      'Investigate financial discrepancies and fraud, working with law enforcement, legal teams, and corporate compliance departments.',
  },
];
