// seed-academics.ts — Creates SchoolAcademics, Colleges, Majors, DegreePathways, CareerOutcomes

export async function seedAcademics(prisma: any, schoolMap: Record<string, any>) {
  // ─── School Academic Stats ──────────────────────────────────────────────────
  const academicStats = [
    { slug: 'texas-tech', enrollment: 40773, admissionRate: 0.73, satAvg: 1180, actAvg: 25, tuitionInState: 11852, tuitionOutOfState: 24157, graduationRate: 0.67, medianEarnings: 52000, retentionRate: 0.85, studentToFacultyRatio: 21.0, averageClassSize: 35, ranking: 187, athleteGraduationRate: 0.72 },
    { slug: 'usc', enrollment: 49500, admissionRate: 0.12, satAvg: 1480, actAvg: 34, tuitionInState: 66640, tuitionOutOfState: 66640, graduationRate: 0.92, medianEarnings: 81000, retentionRate: 0.97, studentToFacultyRatio: 9.0, averageClassSize: 26, ranking: 28, athleteGraduationRate: 0.90 },
    { slug: 'baylor', enrollment: 20824, admissionRate: 0.67, satAvg: 1270, actAvg: 29, tuitionInState: 54298, tuitionOutOfState: 54298, graduationRate: 0.78, medianEarnings: 58000, retentionRate: 0.90, studentToFacultyRatio: 15.0, averageClassSize: 28, ranking: 93, athleteGraduationRate: 0.82 },
    { slug: 'oklahoma', enrollment: 32217, admissionRate: 0.73, satAvg: 1240, actAvg: 27, tuitionInState: 12063, tuitionOutOfState: 29163, graduationRate: 0.71, medianEarnings: 53000, retentionRate: 0.88, studentToFacultyRatio: 18.0, averageClassSize: 32, ranking: 127, athleteGraduationRate: 0.76 },
  ]

  for (const stats of academicStats) {
    const { slug, ...data } = stats
    await prisma.schoolAcademics.create({
      data: { schoolId: schoolMap[slug].id, ...data },
    })
  }
  console.log(`  Created ${academicStats.length} SchoolAcademics`)

  // ─── Colleges, Majors, Pathways & Career Outcomes ────────────────────────
  // Each major now has realistic course sequences and multiple career outcomes

  interface MajorDef {
    name: string
    degreeType: string
    description: string
    pathways: Array<{ year: number; title: string; courses: string[]; description: string }>
    careers: Array<{ title: string; medianSalary: number; growthRate: number; description: string }>
  }

  interface CollegeDef {
    slug: string
    name: string
    description: string
    totalStudents: number
    majors: MajorDef[]
  }

  const collegeDefinitions: CollegeDef[] = [
    // ─── Texas Tech ──────────────────────────────────────────────────────────
    { slug: 'texas-tech', name: 'Whitacre College of Engineering', description: 'One of the largest engineering colleges in Texas, offering 13 undergraduate degree programs with strong industry ties to the energy, technology, and defense sectors across West Texas and beyond.', totalStudents: 5800, majors: [
      { name: 'Petroleum Engineering', degreeType: 'B.S.', description: 'Design and optimize extraction of oil and gas resources, with access to the Permian Basin — the most productive oilfield in the United States.', pathways: [
        { year: 1, title: 'Foundation Year', courses: ['PETR 1305 Intro to Petroleum Engineering', 'MATH 1451 Calculus I', 'CHEM 1307 General Chemistry', 'ENGL 1301 Composition I'], description: 'Build foundations in math, chemistry, and engineering principles.' },
        { year: 2, title: 'Core Engineering', courses: ['PETR 2304 Drilling Engineering', 'PETR 2306 Reservoir Rock Properties', 'PHYS 2401 Physics I', 'MATH 2450 Calculus III'], description: 'Develop drilling and reservoir fundamentals with applied physics.' },
        { year: 3, title: 'Specialization', courses: ['PETR 3310 Production Engineering', 'PETR 3315 Well Logging', 'PETR 3320 Reservoir Simulation', 'PETR 3306 Petrophysics'], description: 'Specialize in production, well evaluation, and reservoir modeling.' },
        { year: 4, title: 'Capstone & Industry Prep', courses: ['PETR 4330 Senior Design Project', 'PETR 4310 Enhanced Oil Recovery', 'PETR 4320 Completions Engineering', 'Professional Elective'], description: 'Apply knowledge in industry capstone project; many students complete Permian Basin internships.' },
      ], careers: [
        { title: 'Petroleum Engineer', medianSalary: 131000, growthRate: 0.08, description: 'Design drilling plans, optimize production, and manage reservoir development for oil & gas operators.' },
        { title: 'Reservoir Engineer', medianSalary: 126000, growthRate: 0.06, description: 'Model subsurface reservoirs and forecast production using simulation software.' },
        { title: 'Completions Engineer', medianSalary: 118000, growthRate: 0.07, description: 'Design and optimize well completion strategies for maximum hydrocarbon recovery.' },
      ]},
      { name: 'Mechanical Engineering', degreeType: 'B.S.', description: 'Design, analyze, and manufacture mechanical systems with hands-on wind energy research and robotics lab experience.', pathways: [
        { year: 1, title: 'Foundation Year', courses: ['ME 1105 Intro to Mechanical Engineering', 'MATH 1451 Calculus I', 'PHYS 2401 Physics I', 'ENGR 1315 Engineering Graphics'], description: 'Engineering fundamentals, calculus, and hands-on CAD drafting.' },
        { year: 2, title: 'Core Mechanics', courses: ['ME 2301 Statics', 'ME 2322 Dynamics', 'ME 2330 Thermodynamics I', 'ME 2350 Mechanics of Materials'], description: 'Master classical mechanics, thermodynamics, and material behavior.' },
        { year: 3, title: 'Design & Systems', courses: ['ME 3360 Machine Design', 'ME 3370 Heat Transfer', 'ME 3341 Fluid Mechanics', 'ME 3380 Control Systems'], description: 'Design machines, analyze thermal-fluid systems, and learn control theory.' },
        { year: 4, title: 'Senior Design', courses: ['ME 4370 Senior Design I', 'ME 4371 Senior Design II', 'ME Technical Elective', 'ME Technical Elective'], description: 'Year-long capstone design project with industry sponsors; emphasis on wind energy and robotics.' },
      ], careers: [
        { title: 'Mechanical Engineer', medianSalary: 95000, growthRate: 0.10, description: 'Design and test mechanical devices, tools, and engines across manufacturing, automotive, and energy sectors.' },
        { title: 'Wind Energy Engineer', medianSalary: 88000, growthRate: 0.17, description: 'Design and optimize wind turbine systems — Texas Tech is in the heart of US wind energy country.' },
      ]},
      { name: 'Computer Science', degreeType: 'B.S.', description: 'Software development, algorithms, cybersecurity, and AI with research opportunities in the Whitacre College computing labs.', pathways: [
        { year: 1, title: 'Programming Foundations', courses: ['CS 1400 Intro to Computer Science', 'CS 1401 Programming Principles I', 'MATH 1451 Calculus I', 'MATH 2360 Linear Algebra'], description: 'Learn programming in Python and Java, plus the math foundations for computing.' },
        { year: 2, title: 'Core CS', courses: ['CS 2413 Data Structures', 'CS 2350 Computer Architecture', 'CS 2365 Object-Oriented Programming', 'MATH 3342 Probability & Statistics'], description: 'Data structures, computer organization, and software engineering fundamentals.' },
        { year: 3, title: 'Specialization', courses: ['CS 3364 Algorithms', 'CS 3375 Operating Systems', 'CS 3365 Software Engineering', 'CS Elective (AI/Security/Data)'], description: 'Choose specialization tracks in AI, cybersecurity, or data science.' },
        { year: 4, title: 'Capstone & Career Prep', courses: ['CS 4365 Senior Software Project', 'CS Elective', 'CS Elective', 'Professional Development'], description: 'Build production software in a team and prepare for industry or grad school.' },
      ], careers: [
        { title: 'Software Engineer', medianSalary: 110000, growthRate: 0.22, description: 'Design, develop, and maintain software systems across web, mobile, and cloud platforms.' },
        { title: 'Cybersecurity Analyst', medianSalary: 102000, growthRate: 0.32, description: 'Protect systems and networks from cyber threats — one of the fastest-growing fields in tech.' },
        { title: 'Data Scientist', medianSalary: 108000, growthRate: 0.28, description: 'Extract insights from large datasets using machine learning, statistics, and programming.' },
      ]},
    ]},
    { slug: 'texas-tech', name: 'Rawls College of Business', description: 'An AACSB-accredited business school recognized for energy commerce, entrepreneurship, and personal financial planning programs.', totalStudents: 5200, majors: [
      { name: 'Energy Commerce', degreeType: 'B.B.A.', description: 'A unique program combining business and energy industry knowledge, preparing students for leadership in the oil, gas, and renewable energy sectors.', pathways: [
        { year: 1, title: 'Business Foundations', courses: ['ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'MATH 1320 Business Math', 'ENGL 1301 Composition I'], description: 'Foundational business, economics, and accounting courses.' },
        { year: 2, title: 'Energy Industry Core', courses: ['EC 3301 Energy Markets & Policy', 'EC 3310 Oil & Gas Accounting', 'FIN 3320 Corporate Finance', 'MGT 3370 Business Law'], description: 'Study energy markets, commodity trading, and energy-sector finance.' },
        { year: 3, title: 'Energy Specialization', courses: ['EC 3315 Land Management', 'EC 4320 Energy Trading & Risk', 'EC 4330 Renewable Energy Business', 'MKT 3350 Marketing'], description: 'Deep-dive into land management, energy trading, and renewables.' },
        { year: 4, title: 'Industry Capstone', courses: ['EC 4340 Energy Commerce Capstone', 'EC 4350 Energy Law & Regulation', 'Business Elective', 'Professional Elective'], description: 'Capstone project with Permian Basin companies; most students intern during senior year.' },
      ], careers: [
        { title: 'Energy Trader', medianSalary: 105000, growthRate: 0.09, description: 'Buy and sell energy commodities (oil, gas, electricity) on behalf of trading firms and utilities.' },
        { title: 'Landman', medianSalary: 78000, growthRate: 0.05, description: 'Negotiate mineral rights leases and manage land acquisition for energy companies.' },
        { title: 'Energy Consultant', medianSalary: 88000, growthRate: 0.11, description: 'Advise companies on energy strategy, market trends, and regulatory compliance.' },
      ]},
      { name: 'Finance', degreeType: 'B.B.A.', description: 'Investment analysis, corporate finance, and financial markets with Bloomberg Terminal access and CFA preparation.', pathways: [
        { year: 1, title: 'Business Foundations', courses: ['ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'MATH 1320 Business Math', 'BLAW 2361 Legal Environment'], description: 'Build knowledge in economics, accounting, and business law.' },
        { year: 2, title: 'Finance Core', courses: ['FIN 3320 Corporate Finance', 'FIN 3322 Investments', 'ACCT 2301 Accounting II', 'ISQS 2340 Business Statistics'], description: 'Master corporate valuation, investment analysis, and financial statements.' },
        { year: 3, title: 'Advanced Finance', courses: ['FIN 4325 Financial Modeling', 'FIN 4330 Portfolio Management', 'FIN 4335 Derivatives', 'FIN Elective'], description: 'Bloomberg Terminal work, portfolio construction, and options pricing.' },
        { year: 4, title: 'Career Preparation', courses: ['FIN 4340 Senior Seminar', 'FIN Elective', 'Business Elective', 'CFA Prep Elective'], description: 'Prepare for CFA Level I, capstone projects, and industry placement.' },
      ], careers: [
        { title: 'Financial Analyst', medianSalary: 83000, growthRate: 0.09, description: 'Analyze financial data and create models to guide business investment decisions.' },
        { title: 'Investment Banking Analyst', medianSalary: 100000, growthRate: 0.07, description: 'Advise companies on mergers, acquisitions, and capital raising at major banks.' },
      ]},
    ]},
    { slug: 'texas-tech', name: 'College of Media & Communication', description: 'A nationally ranked communication school with state-of-the-art broadcast studios and a student-run media network.', totalStudents: 3200, majors: [
      { name: 'Sports Media & Communication', degreeType: 'B.A.', description: 'Prepare for careers in sports journalism, broadcasting, and PR — covering Big 12 athletics from day one with access to professional-grade studios.', pathways: [
        { year: 1, title: 'Media Foundations', courses: ['MCOM 1301 Intro to Mass Media', 'MCOM 1300 Media Writing', 'ENGL 1301 Composition I', 'COMM 2300 Public Speaking'], description: 'Develop writing, speaking, and media literacy foundations.' },
        { year: 2, title: 'Sports Journalism Core', courses: ['MCOM 2310 Sports Reporting', 'MCOM 2330 Broadcast Production', 'MCOM 2340 Digital Content Creation', 'MCOM 2320 Media Ethics'], description: 'Cover Red Raider athletics while learning reporting and production skills.' },
        { year: 3, title: 'Advanced Production', courses: ['MCOM 3350 TV Sports Production', 'MCOM 3360 Social Media Strategy', 'MCOM 3370 Sports PR & Communications', 'MCOM Elective'], description: 'Produce live sports broadcasts, manage athlete social media, and study sports PR.' },
        { year: 4, title: 'Industry Capstone', courses: ['MCOM 4380 Senior Practicum', 'MCOM 4370 Sports Media Capstone', 'MCOM Elective', 'Professional Elective'], description: 'Complete a professional internship with ESPN, Fox Sports, or Big 12 Network.' },
      ], careers: [
        { title: 'Sports Reporter / Broadcaster', medianSalary: 52000, growthRate: 0.06, description: 'Cover sports for TV, radio, digital, and print media outlets.' },
        { title: 'Sports PR / Communications Director', medianSalary: 65000, growthRate: 0.08, description: 'Manage media relations and communications for athletic departments or professional teams.' },
        { title: 'Content Creator / Social Media Manager', medianSalary: 58000, growthRate: 0.15, description: 'Create digital content and manage social media strategy for sports organizations.' },
      ]},
    ]},

    // ─── USC ─────────────────────────────────────────────────────────────────
    { slug: 'usc', name: 'Viterbi School of Engineering', description: 'A top-10 engineering school named after Qualcomm co-founder Andrew Viterbi, known for pioneering research in AI, biomedical engineering, and astronautics.', totalStudents: 7200, majors: [
      { name: 'Computer Science', degreeType: 'B.S.', description: 'One of the top CS programs in the world, with deep ties to Silicon Beach startups, gaming studios, and major tech companies across LA.', pathways: [
        { year: 1, title: 'Programming Foundations', courses: ['CSCI 103 Intro to Programming', 'CSCI 104 Data Structures', 'MATH 125 Calculus I', 'WRIT 150 Writing Seminar'], description: 'Learn C++ and data structures — the USC CS entry sequence.' },
        { year: 2, title: 'Systems & Theory', courses: ['CSCI 201 Software Development', 'CSCI 270 Algorithms', 'CSCI 356 Computer Systems', 'EE 109 Digital Logic'], description: 'Algorithms, systems programming, and software engineering projects.' },
        { year: 3, title: 'Specialization', courses: ['CSCI 401 Software Engineering Capstone', 'CSCI 467 Machine Learning', 'CSCI 420 Computer Graphics', 'CS Elective (Games/AI/Security)'], description: 'Choose tracks in AI, game development, security, or systems. Many intern at LA tech companies.' },
        { year: 4, title: 'Industry Capstone', courses: ['CSCI 490 Directed Research', 'CS Technical Elective', 'CS Technical Elective', 'General Elective'], description: 'Research with faculty or complete industry capstone. USC grads go to Google, Apple, and top startups.' },
      ], careers: [
        { title: 'Software Engineer (Big Tech)', medianSalary: 145000, growthRate: 0.22, description: 'Design and build software at Google, Apple, Meta, or other major tech companies.' },
        { title: 'Game Developer', medianSalary: 105000, growthRate: 0.12, description: 'USC\'s proximity to gaming studios (Riot, Blizzard, Naughty Dog) makes this a popular path.' },
        { title: 'AI / ML Engineer', medianSalary: 155000, growthRate: 0.40, description: 'Develop machine learning models and AI systems — the fastest-growing specialization in tech.' },
      ]},
      { name: 'Biomedical Engineering', degreeType: 'B.S.', description: 'Medical device design, neural engineering, and tissue engineering at the intersection of Keck Medicine and Viterbi research.', pathways: [
        { year: 1, title: 'Science Foundations', courses: ['BME 101 Intro to BME', 'CHEM 105a General Chemistry', 'BISC 120 General Biology', 'MATH 125 Calculus I'], description: 'Build biology, chemistry, and math foundations for biomedical engineering.' },
        { year: 2, title: 'Biomedical Core', courses: ['BME 210 Biomedical Computer Simulation', 'BME 251 Biomechanics', 'BME 301 Biomedical Signal Processing', 'PHYS 151 Physics I'], description: 'Study biomechanics, signal processing, and computational modeling.' },
        { year: 3, title: 'Clinical Engineering', courses: ['BME 403 Medical Device Design', 'BME 410 Neural Engineering', 'BME 404 Tissue Engineering', 'BME Elective'], description: 'Design medical devices, study neural interfaces, and explore tissue engineering.' },
        { year: 4, title: 'Senior Design & Research', courses: ['BME 490 Senior Design I', 'BME 491 Senior Design II', 'BME Elective', 'General Elective'], description: 'Year-long design project with Keck Hospital clinical partners.' },
      ], careers: [
        { title: 'Biomedical Engineer', medianSalary: 97000, growthRate: 0.15, description: 'Design and improve medical devices, prosthetics, and diagnostic equipment.' },
        { title: 'Medical Device Product Manager', medianSalary: 120000, growthRate: 0.11, description: 'Lead product development for medical device companies like Medtronic, Boston Scientific.' },
      ]},
      { name: 'Astronautical Engineering', degreeType: 'B.S.', description: 'One of only a handful of dedicated astronautics programs in the nation, with partnerships at SpaceX, JPL, and Boeing.', pathways: [
        { year: 1, title: 'Engineering Foundations', courses: ['ASTE 101 Intro to Astronautics', 'MATH 125 Calculus I', 'PHYS 151 Physics I', 'CSCI 103 Intro to Programming'], description: 'Foundational math, physics, and first exposure to space systems.' },
        { year: 2, title: 'Orbital Mechanics & Propulsion', courses: ['ASTE 280 Orbital Mechanics', 'ASTE 281 Rocket Propulsion', 'AME 204 Statics', 'AME 309 Dynamics'], description: 'Learn to calculate satellite orbits and design rocket propulsion systems.' },
        { year: 3, title: 'Spacecraft Design', courses: ['ASTE 330 Spacecraft Design', 'ASTE 470 Attitude Control', 'ASTE 420 Space Environments', 'ASTE Elective'], description: 'Full spacecraft system design, attitude dynamics, and space environment modeling.' },
        { year: 4, title: 'Senior Capstone', courses: ['ASTE 490 Senior Design I', 'ASTE 491 Senior Design II', 'ASTE Elective', 'General Elective'], description: 'Design a complete spacecraft system. Many teams partner with SpaceX, JPL, and NASA.' },
      ], careers: [
        { title: 'Aerospace Engineer (SpaceX/JPL)', medianSalary: 122000, growthRate: 0.08, description: 'Design rockets, satellites, and space systems for the growing commercial space industry.' },
        { title: 'Systems Engineer', medianSalary: 110000, growthRate: 0.10, description: 'Integrate complex spacecraft subsystems — structures, power, thermal, comms — into complete missions.' },
      ]},
    ]},
    { slug: 'usc', name: 'Marshall School of Business', description: 'A globally ranked business school in the heart of Los Angeles, offering unparalleled access to entertainment, tech, and international business networks.', totalStudents: 6500, majors: [
      { name: 'Business Administration', degreeType: 'B.S.', description: 'A comprehensive business program with specializations in entrepreneurship, finance, and marketing in the LA business ecosystem.', pathways: [
        { year: 1, title: 'Business Foundations', courses: ['BUAD 280 Intro to Business', 'ECON 203 Microeconomics', 'ACCT 410 Accounting I', 'WRIT 150 Writing Seminar'], description: 'Foundational coursework in business, economics, and financial literacy.' },
        { year: 2, title: 'Business Core', courses: ['BUAD 302 Communication for Management', 'FBE 462 Corporate Finance', 'MKT 425 Marketing Fundamentals', 'BUAD 304 Organizational Behavior'], description: 'Core management, finance, and marketing — the backbone of a Marshall education.' },
        { year: 3, title: 'Concentration & Internship', courses: ['BAEP 451 Entrepreneurship', 'BUAD 497 Internship', 'Concentration Elective', 'Concentration Elective'], description: 'Choose a focus area and complete an LA-based internship. Top placements at entertainment and tech firms.' },
        { year: 4, title: 'Capstone & Career Launch', courses: ['BUAD 425 Strategic Management', 'BUAD 490 Senior Seminar', 'Free Elective', 'Free Elective'], description: 'Strategic management capstone and preparation for industry or MBA programs.' },
      ], careers: [
        { title: 'Management Consultant', medianSalary: 95000, growthRate: 0.14, description: 'Advise companies on strategy, operations, and growth at firms like McKinsey, BCG, Deloitte.' },
        { title: 'Product Manager', medianSalary: 125000, growthRate: 0.18, description: 'Lead product development at tech companies — a top career path for USC business grads.' },
        { title: 'Entertainment Business Executive', medianSalary: 105000, growthRate: 0.06, description: 'Work in talent management, studio operations, or media at LA entertainment companies.' },
      ]},
      { name: 'Finance', degreeType: 'B.S.', description: 'Investment banking, real estate finance, and fintech with placement into top Wall Street and West Coast firms.', pathways: [
        { year: 1, title: 'Foundations', courses: ['ECON 203 Microeconomics', 'ACCT 410 Accounting I', 'MATH 118 Calculus for Business', 'WRIT 150 Writing Seminar'], description: 'Build quantitative and accounting foundations.' },
        { year: 2, title: 'Finance Core', courses: ['FBE 462 Corporate Finance', 'FBE 421 Investments', 'ACCT 411 Accounting II', 'FBE 460 Financial Statement Analysis'], description: 'Corporate valuation, investment analysis, and financial modeling.' },
        { year: 3, title: 'Advanced Finance', courses: ['FBE 464 Real Estate Finance', 'FBE 441 Fixed Income', 'FBE 470 Fintech', 'FBE Elective'], description: 'Deep-dive into real estate, fixed income, and emerging fintech. Many intern at Goldman, JPM, or LA RE firms.' },
        { year: 4, title: 'Career Launch', courses: ['FBE 490 Senior Finance Seminar', 'FBE Elective', 'Free Elective', 'Free Elective'], description: 'Final prep for Wall Street, real estate, or fintech careers.' },
      ], careers: [
        { title: 'Investment Banking Analyst', medianSalary: 110000, growthRate: 0.07, description: 'M&A advisory and capital markets at bulge-bracket banks — USC places well on Wall Street.' },
        { title: 'Real Estate Analyst', medianSalary: 85000, growthRate: 0.09, description: 'Analyze commercial real estate deals in LA\'s massive property market.' },
      ]},
    ]},
    { slug: 'usc', name: 'School of Cinematic Arts', description: 'The oldest and most prestigious film school in the world, founded in 1929 with ties to George Lucas, Steven Spielberg, and the entertainment industry.', totalStudents: 1800, majors: [
      { name: 'Film & Television Production', degreeType: 'B.F.A.', description: 'Hands-on filmmaking from day one — directing, cinematography, editing, and sound design in world-class production facilities.', pathways: [
        { year: 1, title: 'Foundations of Cinema', courses: ['CTPR 180 Introduction to Cinematic Arts', 'CTPR 200 Intro to Production', 'CTCS 190 Film History', 'WRIT 150 Writing Seminar'], description: 'Study cinema history and shoot first short films on 16mm and digital.' },
        { year: 2, title: 'Craft Development', courses: ['CTPR 310 Intermediate Production', 'CTPR 320 Cinematography', 'CTPR 330 Editing', 'CTPR 340 Sound Design'], description: 'Rotate through directing, cinematography, editing, and sound on collaborative projects.' },
        { year: 3, title: 'Advanced Production', courses: ['CTPR 410 Advanced Directing', 'CTPR 480 Producing', 'CTPR Elective', 'General Elective'], description: 'Direct narrative and documentary projects with professional-level equipment and budgets.' },
        { year: 4, title: 'Thesis Film', courses: ['CTPR 490 Senior Thesis Production', 'CTPR 491 Thesis Post-Production', 'SCA Elective', 'Free Elective'], description: 'Produce a thesis film that premieres at SCA\'s First Look festival — many go to major film festivals.' },
      ], careers: [
        { title: 'Film Director', medianSalary: 80000, growthRate: 0.06, description: 'Direct feature films, TV episodes, commercials, or digital content in Hollywood.' },
        { title: 'Cinematographer (DP)', medianSalary: 75000, growthRate: 0.08, description: 'Create the visual language of films and TV shows through camera and lighting.' },
        { title: 'Film/TV Editor', medianSalary: 72000, growthRate: 0.09, description: 'Shape narrative through post-production editing at studios and streaming platforms.' },
      ]},
      { name: 'Interactive Media & Games', degreeType: 'B.A.', description: 'Game design, immersive media, and interactive storytelling at the intersection of technology and entertainment.', pathways: [
        { year: 1, title: 'Foundations', courses: ['ITP 104 Web Development', 'CTIN 190 Intro to Interactive Media', 'CSCI 102 Programming Fundamentals', 'ARTS 100 Visual Studies'], description: 'Learn programming, web development, and visual design fundamentals.' },
        { year: 2, title: 'Game Design Core', courses: ['CTIN 484 Game Design Workshop', 'CTIN 488 3D Game Development', 'CTIN 486 Interactive Narrative', 'CTAN 201 Digital Arts'], description: 'Design and build games — from concept to playable prototype.' },
        { year: 3, title: 'Advanced Development', courses: ['CTIN 489 VR/AR Development', 'CTIN 490 Advanced Game Design', 'CTIN Elective', 'SCA Elective'], description: 'Build VR/AR experiences and explore emerging interactive platforms.' },
        { year: 4, title: 'Capstone Game', courses: ['CTIN 498 Senior Game Project I', 'CTIN 499 Senior Game Project II', 'Free Elective', 'Free Elective'], description: 'Year-long team project building a polished game. Showcased at USC Games Expo to industry recruiters.' },
      ], careers: [
        { title: 'Game Designer', medianSalary: 95000, growthRate: 0.12, description: 'Design gameplay mechanics, levels, and player experiences at studios like Riot, Blizzard, or indies.' },
        { title: 'XR Developer', medianSalary: 105000, growthRate: 0.25, description: 'Build virtual and augmented reality experiences for gaming, training, and entertainment.' },
      ]},
    ]},

    // ─── Baylor ──────────────────────────────────────────────────────────────
    { slug: 'baylor', name: 'School of Engineering & Computer Science', description: 'A growing engineering school offering ABET-accredited programs with small class sizes and a Christian mission of service through innovation.', totalStudents: 2200, majors: [
      { name: 'Electrical & Computer Engineering', degreeType: 'B.S.', description: 'Circuit design, embedded systems, and signal processing with undergraduate research from freshman year.', pathways: [
        { year: 1, title: 'Engineering Foundations', courses: ['ELC 1201 Intro to ECE', 'PHY 1420 University Physics I', 'MTH 1321 Calculus I', 'ENG 1310 Composition'], description: 'Physics, calculus, and first exposure to circuits and programming.' },
        { year: 2, title: 'Core Circuits & Systems', courses: ['ELC 2330 Circuit Analysis', 'ELC 2335 Digital Logic', 'ELC 2340 Signals & Systems', 'MTH 2321 Calculus III'], description: 'Analyze circuits, design digital systems, and study signal processing.' },
        { year: 3, title: 'Specialization', courses: ['ELC 3336 Microprocessors', 'ELC 3350 Electronics', 'ELC 4340 Embedded Systems', 'ECE Elective'], description: 'Specialize in embedded systems, VLSI, robotics, or power systems.' },
        { year: 4, title: 'Senior Design', courses: ['ELC 4195 Senior Design I', 'ELC 4196 Senior Design II', 'ECE Elective', 'Free Elective'], description: 'Year-long capstone project; Baylor ECE teams regularly compete at IEEE conferences.' },
      ], careers: [
        { title: 'Embedded Systems Engineer', medianSalary: 98000, growthRate: 0.13, description: 'Design firmware and hardware for IoT devices, automotive systems, and consumer electronics.' },
        { title: 'Hardware Engineer', medianSalary: 105000, growthRate: 0.07, description: 'Design circuit boards and integrated chips for semiconductor and defense companies.' },
      ]},
      { name: 'Computer Science', degreeType: 'B.S.', description: 'Software engineering, machine learning, and cybersecurity with partnerships in the growing Central Texas tech corridor.', pathways: [
        { year: 1, title: 'Programming Foundations', courses: ['CSI 1430 Intro to CS I', 'CSI 1440 Intro to CS II', 'MTH 1321 Calculus I', 'ENG 1310 Composition'], description: 'Learn C++ and Java programming, problem solving, and computational thinking.' },
        { year: 2, title: 'Core CS', courses: ['CSI 2350 Data Structures', 'CSI 3334 Algorithms', 'CSI 2330 Computer Architecture', 'MTH 2311 Linear Algebra'], description: 'Data structures, algorithms, and how computers work at the hardware level.' },
        { year: 3, title: 'Specialization', courses: ['CSI 4337 Software Engineering', 'CSI 4352 Database Systems', 'CSI 4365 Machine Learning', 'CS Elective'], description: 'Build real software systems and explore AI, databases, or security tracks.' },
        { year: 4, title: 'Senior Project', courses: ['CSI 4397 Senior Design I', 'CSI 4398 Senior Design II', 'CS Elective', 'Free Elective'], description: 'Year-long industry-sponsored capstone; small class sizes mean close faculty mentoring.' },
      ], careers: [
        { title: 'Software Developer', medianSalary: 105000, growthRate: 0.22, description: 'Build software applications across web, mobile, and enterprise platforms.' },
        { title: 'Cloud Engineer', medianSalary: 115000, growthRate: 0.26, description: 'Design and manage cloud infrastructure on AWS, Azure, or GCP.' },
      ]},
      { name: 'Mechanical Engineering', degreeType: 'B.S.', description: 'Thermal systems, robotics, and manufacturing design with hands-on capstone projects for industry sponsors.', pathways: [
        { year: 1, title: 'Engineering Foundations', courses: ['ME 1301 Intro to Engineering', 'PHY 1420 University Physics I', 'MTH 1321 Calculus I', 'EGR 1301 Engineering Graphics'], description: 'Physics, calculus, and 3D CAD drafting fundamentals.' },
        { year: 2, title: 'Core Mechanics', courses: ['ME 2340 Statics', 'ME 2341 Dynamics', 'ME 2330 Thermodynamics', 'ME 2360 Mechanics of Materials'], description: 'Master classical mechanics, thermodynamics, and stress analysis.' },
        { year: 3, title: 'Design & Thermal-Fluids', courses: ['ME 3350 Machine Design', 'ME 3360 Heat Transfer', 'ME 3340 Fluid Mechanics', 'ME Elective'], description: 'Design machines and analyze thermal-fluid systems with lab experiments.' },
        { year: 4, title: 'Senior Design', courses: ['ME 4395 Senior Design I', 'ME 4396 Senior Design II', 'ME Elective', 'Free Elective'], description: 'Industry capstone project — recent sponsors include Caterpillar, L3Harris, and SpaceX.' },
      ], careers: [
        { title: 'Mechanical Engineer', medianSalary: 92000, growthRate: 0.10, description: 'Design and analyze mechanical systems across aerospace, automotive, and manufacturing.' },
        { title: 'Manufacturing Engineer', medianSalary: 85000, growthRate: 0.08, description: 'Optimize production processes and quality systems in manufacturing plants.' },
      ]},
    ]},
    { slug: 'baylor', name: 'Hankamer School of Business', description: 'An AACSB-accredited business school ranked among the top in Texas, known for its entrepreneurship program and ethical business leadership focus.', totalStudents: 3800, majors: [
      { name: 'Accounting', degreeType: 'B.B.A.', description: 'CPA-track accounting with 95%+ first-time pass rate, audit and tax specializations, and Big Four recruiting pipeline.', pathways: [
        { year: 1, title: 'Business Foundations', courses: ['ACC 2301 Intro to Accounting I', 'ECO 2306 Microeconomics', 'BUS 1301 Intro to Business', 'ENG 1310 Composition'], description: 'Foundational business coursework and first accounting courses.' },
        { year: 2, title: 'Accounting Core', courses: ['ACC 3310 Intermediate Accounting I', 'ACC 3311 Intermediate Accounting II', 'ACC 3320 Cost Accounting', 'FIN 3310 Corporate Finance'], description: 'Financial reporting standards, cost accounting, and corporate finance.' },
        { year: 3, title: 'Audit & Tax', courses: ['ACC 4330 Auditing', 'ACC 4340 Federal Income Tax', 'ACC 4335 Accounting Systems', 'ACC Elective'], description: 'Specialize in audit or tax tracks; many complete Big Four internships.' },
        { year: 4, title: 'CPA Preparation', courses: ['ACC 5330 Advanced Auditing', 'ACC 5340 Advanced Tax', 'ACC Elective', 'Business Elective'], description: '150-hour CPA track; Baylor accounting has one of the highest CPA pass rates in Texas.' },
      ], careers: [
        { title: 'Public Accountant (Big Four)', medianSalary: 72000, growthRate: 0.06, description: 'Start at Deloitte, PwC, EY, or KPMG in audit or tax — strong Baylor pipeline.' },
        { title: 'Corporate Controller', medianSalary: 125000, growthRate: 0.08, description: 'Manage all financial reporting and accounting operations for a company.' },
      ]},
      { name: 'Entrepreneurship', degreeType: 'B.B.A.', description: 'New venture creation, business plan development, and startup funding with access to Baylor\'s innovation incubator.', pathways: [
        { year: 1, title: 'Business Foundations', courses: ['ENT 2301 Intro to Entrepreneurship', 'ECO 2306 Microeconomics', 'BUS 1301 Intro to Business', 'ENG 1310 Composition'], description: 'Introduction to business creation and economic thinking.' },
        { year: 2, title: 'Venture Development', courses: ['ENT 3310 Opportunity Recognition', 'MKT 3320 Marketing', 'FIN 3310 Corporate Finance', 'MGT 3310 Management'], description: 'Learn to identify business opportunities, build financial models, and market products.' },
        { year: 3, title: 'Startup Launch', courses: ['ENT 4340 Business Plan Development', 'ENT 4350 Venture Finance', 'ENT 4360 Social Entrepreneurship', 'ENT Elective'], description: 'Write a business plan, pitch to investors, and explore social enterprise.' },
        { year: 4, title: 'Incubator & Capstone', courses: ['ENT 4380 Entrepreneurship Capstone', 'ENT 4370 Family Business', 'Business Elective', 'Free Elective'], description: 'Launch a real venture through Baylor\'s innovation incubator program.' },
      ], careers: [
        { title: 'Startup Founder', medianSalary: 65000, growthRate: 0.12, description: 'Launch and grow a new business — Baylor\'s network provides funding and mentorship connections.' },
        { title: 'Business Development Manager', medianSalary: 82000, growthRate: 0.10, description: 'Identify growth opportunities and partnerships for companies of all sizes.' },
      ]},
    ]},
    { slug: 'baylor', name: 'College of Arts & Sciences', description: 'The largest college at Baylor, offering over 40 majors spanning humanities, natural sciences, and social sciences with a liberal arts foundation.', totalStudents: 6500, majors: [
      { name: 'Biology (Pre-Med)', degreeType: 'B.S.', description: 'Pre-medical track with early clinical shadowing, undergraduate research, and partnerships with Baylor Scott & White Health.', pathways: [
        { year: 1, title: 'Science Foundations', courses: ['BIO 1306 General Biology I', 'BIO 1106 Biology Lab I', 'CHE 1301 General Chemistry I', 'MTH 1321 Calculus I'], description: 'Foundational biology and chemistry for the pre-med track.' },
        { year: 2, title: 'Organic & Anatomy', courses: ['CHE 3331 Organic Chemistry I', 'BIO 2306 Anatomy & Physiology', 'BIO 2320 Genetics', 'PHY 1420 Physics I'], description: 'The core pre-med courses: organic chemistry, A&P, and genetics.' },
        { year: 3, title: 'Advanced Biology', courses: ['BIO 3320 Cell Biology', 'BIO 3340 Biochemistry', 'BIO 3360 Microbiology', 'BIO Research Elective'], description: 'Advanced coursework and first research experience in Baylor labs.' },
        { year: 4, title: 'MCAT Prep & Applications', courses: ['BIO 4340 Advanced Biochemistry', 'BIO 4380 Senior Research', 'Bio Elective', 'MCAT Prep'], description: 'Complete research thesis, prepare for MCAT, and apply to medical schools.' },
      ], careers: [
        { title: 'Physician (after med school)', medianSalary: 230000, growthRate: 0.03, description: 'Baylor pre-med grads have strong acceptance rates to Texas medical schools.' },
        { title: 'Biomedical Researcher', medianSalary: 72000, growthRate: 0.17, description: 'Conduct research in genetics, cancer biology, or pharmaceutical development.' },
      ]},
      { name: 'Pre-Law / Political Science', degreeType: 'B.A.', description: 'Constitutional law, policy analysis, and mock trial with direct pipeline to Baylor Law School, one of the top in Texas.', pathways: [
        { year: 1, title: 'Foundations', courses: ['PSC 1306 American Government', 'PSC 1307 Intro to Political Science', 'ENG 1310 Composition', 'PHI 1301 Intro to Philosophy'], description: 'Study American government, political theory, and critical thinking.' },
        { year: 2, title: 'Law & Policy', courses: ['PSC 2310 Constitutional Law', 'PSC 2320 International Relations', 'PSC 2330 Political Economy', 'PSC 2340 Research Methods'], description: 'Deep-dive into constitutional law, global affairs, and research methodology.' },
        { year: 3, title: 'Mock Trial & Advanced Law', courses: ['PSC 3340 Mock Trial', 'PSC 3350 Civil Liberties', 'PSC 3360 Administrative Law', 'PSC Elective'], description: 'Baylor mock trial is nationally ranked — compete at regional and national tournaments.' },
        { year: 4, title: 'LSAT Prep & Applications', courses: ['PSC 4380 Senior Seminar', 'PSC 4370 Jurisprudence', 'PSC Elective', 'LSAT Prep'], description: 'Prepare for LSAT and law school applications. Baylor Law offers a 3+3 accelerated JD.' },
      ], careers: [
        { title: 'Attorney (after law school)', medianSalary: 135000, growthRate: 0.06, description: 'Practice law in litigation, corporate, or public interest — Baylor Law is top-ranked in Texas for trial advocacy.' },
        { title: 'Policy Analyst', medianSalary: 65000, growthRate: 0.09, description: 'Research and advise on public policy for government agencies, think tanks, or advocacy groups.' },
      ]},
    ]},

    // ─── Oklahoma ────────────────────────────────────────────────────────────
    { slug: 'oklahoma', name: 'Gallogly College of Engineering', description: 'A top-50 engineering college offering 10 undergraduate programs with particular strength in petroleum, aerospace, and environmental engineering.', totalStudents: 4200, majors: [
      { name: 'Petroleum Engineering', degreeType: 'B.S.', description: 'A top-5 petroleum engineering program in the nation, with industry partnerships throughout Oklahoma\'s energy sector.', pathways: [
        { year: 1, title: 'Engineering Foundations', courses: ['PE 1113 Intro to Petroleum Engineering', 'MATH 1823 Calculus I', 'CHEM 1315 General Chemistry', 'ENGR 1410 Engineering Graphics'], description: 'Math, chemistry, and first look at the petroleum industry.' },
        { year: 2, title: 'Core Engineering', courses: ['PE 2012 Drilling Engineering', 'PE 2532 Rock & Fluid Properties', 'PHYS 2514 Physics I', 'MATH 2924 Calculus IV'], description: 'Drilling principles, reservoir rock analysis, and applied physics.' },
        { year: 3, title: 'Reservoir & Production', courses: ['PE 3113 Production Engineering', 'PE 3243 Reservoir Engineering', 'PE 3143 Well Logging', 'PE 4043 Reservoir Simulation'], description: 'Design production systems and simulate reservoir behavior.' },
        { year: 4, title: 'Senior Design', courses: ['PE 4901 Senior Design I', 'PE 4911 Senior Design II', 'PE Elective', 'Free Elective'], description: 'Industry capstone with Oklahoma energy companies; excellent industry placement.' },
      ], careers: [
        { title: 'Petroleum Engineer', medianSalary: 131000, growthRate: 0.08, description: 'Design and optimize oil and gas extraction operations for energy companies.' },
        { title: 'Drilling Engineer', medianSalary: 115000, growthRate: 0.06, description: 'Plan and oversee well drilling operations — Oklahoma is a major energy hub.' },
      ]},
      { name: 'Aerospace Engineering', degreeType: 'B.S.', description: 'Aircraft and spacecraft design, propulsion, and UAV systems with ties to Tinker Air Force Base and the FAA.', pathways: [
        { year: 1, title: 'Engineering Foundations', courses: ['AME 1113 Intro to Aerospace', 'MATH 1823 Calculus I', 'PHYS 2514 Physics I', 'ENGR 1410 Engineering Graphics'], description: 'Introduction to flight, physics, and engineering drawing.' },
        { year: 2, title: 'Aerodynamics & Structures', courses: ['AME 2213 Aerodynamics I', 'AME 3353 Aerospace Structures', 'AME 2533 Dynamics', 'MATH 2924 Calculus IV'], description: 'Study how aircraft fly and how structures withstand flight loads.' },
        { year: 3, title: 'Propulsion & Controls', courses: ['AME 4163 Propulsion', 'AME 4313 Flight Controls', 'AME 4283 Aeroelasticity', 'AME Elective'], description: 'Design jet engines, control systems, and analyze aeroelastic behavior.' },
        { year: 4, title: 'Senior Design', courses: ['AME 4553 Senior Design I', 'AME 4563 Senior Design II', 'AME Elective', 'Free Elective'], description: 'Design a complete aircraft or spacecraft system. Teams have won national AIAA competitions.' },
      ], careers: [
        { title: 'Aerospace Engineer', medianSalary: 122000, growthRate: 0.08, description: 'Design aircraft, spacecraft, satellites, and UAV systems for defense and commercial aviation.' },
        { title: 'Flight Test Engineer', medianSalary: 100000, growthRate: 0.07, description: 'Test aircraft performance and safety — Tinker AFB provides unique opportunities near campus.' },
      ]},
      { name: 'Computer Science', degreeType: 'B.S.', description: 'Software engineering, data science, and cybersecurity with research in weather informatics and AI.', pathways: [
        { year: 1, title: 'Programming Foundations', courses: ['CS 1323 Programming I', 'CS 1324 Programming II', 'MATH 1823 Calculus I', 'ENGL 1113 Composition I'], description: 'Learn Python and C++, plus math foundations.' },
        { year: 2, title: 'Core CS', courses: ['CS 2413 Data Structures', 'CS 2334 Software Design', 'CS 2613 Computer Architecture', 'MATH 3333 Linear Algebra'], description: 'Data structures, OOP design, and how computers work at the hardware level.' },
        { year: 3, title: 'Specialization', courses: ['CS 3113 Operating Systems', 'CS 4013 Algorithms', 'CS 4613 Machine Learning', 'CS Elective'], description: 'Choose tracks in AI, security, data science, or weather informatics.' },
        { year: 4, title: 'Senior Capstone', courses: ['CS 4273 Software Engineering Capstone', 'CS Elective', 'CS Elective', 'Free Elective'], description: 'Team software project with industry partner; OU CS grads work across Oklahoma and national tech companies.' },
      ], careers: [
        { title: 'Software Engineer', medianSalary: 108000, growthRate: 0.22, description: 'Design and build software systems across web, mobile, and enterprise platforms.' },
        { title: 'Data Engineer', medianSalary: 112000, growthRate: 0.25, description: 'Build data pipelines and infrastructure — OU\'s weather informatics is world-renowned.' },
      ]},
    ]},
    { slug: 'oklahoma', name: 'Price College of Business', description: 'A nationally ranked business school with strong alumni networks in energy, finance, and entrepreneurship across the Southwest.', totalStudents: 5100, majors: [
      { name: 'Finance', degreeType: 'B.B.A.', description: 'Investment analysis, energy finance, and corporate strategy with Bloomberg Terminal access and case competition teams.', pathways: [
        { year: 1, title: 'Business Foundations', courses: ['ECON 1113 Microeconomics', 'ACCT 2113 Accounting I', 'MATH 1743 Business Calculus', 'ENGL 1113 Composition I'], description: 'Foundational business and economics coursework.' },
        { year: 2, title: 'Finance Core', courses: ['FIN 3303 Corporate Finance', 'FIN 3403 Investments', 'ACCT 2123 Accounting II', 'MIS 2113 Business Statistics'], description: 'Corporate valuation, portfolio theory, and financial statement analysis.' },
        { year: 3, title: 'Advanced Finance', courses: ['FIN 4213 Financial Modeling', 'FIN 4303 Energy Finance', 'FIN 4403 Derivatives', 'FIN Elective'], description: 'Bloomberg Terminal modeling, energy finance (Oklahoma specialty), and derivatives pricing.' },
        { year: 4, title: 'Career Prep', courses: ['FIN 4503 Senior Finance Seminar', 'FIN Elective', 'Business Elective', 'Free Elective'], description: 'Capstone and career preparation; strong alumni network in energy and banking.' },
      ], careers: [
        { title: 'Financial Analyst', medianSalary: 80000, growthRate: 0.09, description: 'Analyze financial data and build models to support investment and business decisions.' },
        { title: 'Energy Finance Analyst', medianSalary: 95000, growthRate: 0.07, description: 'Specialize in financing energy projects — a unique Oklahoma advantage.' },
      ]},
      { name: 'Management Information Systems', degreeType: 'B.B.A.', description: 'IT management, data analytics, and enterprise systems with Fortune 500 internship placements.', pathways: [
        { year: 1, title: 'Business & Tech Foundations', courses: ['MIS 2113 Intro to MIS', 'ECON 1113 Microeconomics', 'CS 1313 Programming for Non-Majors', 'ENGL 1113 Composition I'], description: 'Introduction to information systems, basic programming, and business.' },
        { year: 2, title: 'Core MIS', courses: ['MIS 3013 Systems Analysis', 'MIS 3113 Database Management', 'MIS 3213 Business Analytics', 'ACCT 2113 Accounting I'], description: 'Learn to analyze business requirements, design databases, and work with data.' },
        { year: 3, title: 'Enterprise Systems', courses: ['MIS 4013 Enterprise Architecture', 'MIS 4113 Cybersecurity', 'MIS 4213 Cloud Computing', 'MIS Elective'], description: 'Enterprise IT strategy, security, and cloud platforms; many complete Fortune 500 internships.' },
        { year: 4, title: 'Capstone', courses: ['MIS 4513 MIS Capstone', 'MIS Elective', 'Business Elective', 'Free Elective'], description: 'IT consulting capstone with a real-world business client.' },
      ], careers: [
        { title: 'IT Consultant', medianSalary: 88000, growthRate: 0.11, description: 'Advise businesses on technology strategy and system implementations.' },
        { title: 'Business Analyst', medianSalary: 82000, growthRate: 0.14, description: 'Bridge business needs and technology solutions at enterprise companies.' },
      ]},
    ]},
    { slug: 'oklahoma', name: 'Gaylord College of Journalism', description: 'One of the top journalism and mass communication schools in the nation, housed in a $75 million state-of-the-art facility.', totalStudents: 2400, majors: [
      { name: 'Journalism', degreeType: 'B.A.', description: 'Print, broadcast, and digital journalism with professional newsroom experience and award-winning student media.', pathways: [
        { year: 1, title: 'Media Foundations', courses: ['JMC 1013 Intro to Mass Communication', 'JMC 2013 Media Writing', 'ENGL 1113 Composition I', 'COMM 1113 Public Speaking'], description: 'Develop strong writing, communication, and media literacy skills.' },
        { year: 2, title: 'Journalism Core', courses: ['JMC 2033 News Reporting', 'JMC 2073 Visual Communication', 'JMC 3013 Media Law', 'JMC 3023 Media Ethics'], description: 'Learn news gathering, reporting, media law, and ethics in the Gaylord newsroom.' },
        { year: 3, title: 'Advanced Reporting', courses: ['JMC 3413 Broadcast Journalism', 'JMC 3623 Data Journalism', 'JMC 4013 Investigative Reporting', 'JMC Elective'], description: 'Investigative reporting, data-driven journalism, and broadcast production.' },
        { year: 4, title: 'Professional Capstone', courses: ['JMC 4723 Senior Capstone', 'JMC 4970 Internship', 'JMC Elective', 'Free Elective'], description: 'Professional internship and capstone project; OU student media has won national awards.' },
      ], careers: [
        { title: 'Reporter / Journalist', medianSalary: 55000, growthRate: 0.06, description: 'Cover news for TV stations, newspapers, digital outlets, or wire services.' },
        { title: 'Data Journalist', medianSalary: 68000, growthRate: 0.15, description: 'Use data analysis and visualization to tell data-driven news stories.' },
      ]},
      { name: 'Public Relations', degreeType: 'B.A.', description: 'Strategic communications, crisis management, and brand storytelling with agency-style client work.', pathways: [
        { year: 1, title: 'Communication Foundations', courses: ['JMC 1013 Intro to Mass Communication', 'PR 2013 Intro to Public Relations', 'ENGL 1113 Composition I', 'COMM 1113 Public Speaking'], description: 'Foundational communication, writing, and public relations concepts.' },
        { year: 2, title: 'PR Core', courses: ['PR 3003 PR Writing', 'PR 3013 PR Research', 'MKT 3013 Marketing', 'JMC 3013 Media Law'], description: 'Master PR writing, media relations, research methods, and marketing integration.' },
        { year: 3, title: 'Strategic PR', courses: ['PR 4013 PR Campaigns', 'PR 4023 Crisis Communication', 'PR 4033 Digital PR & Social Media', 'JMC Elective'], description: 'Plan real campaigns, manage crises, and build digital PR strategies for clients.' },
        { year: 4, title: 'Agency Experience', courses: ['PR 4043 PR Agency Practicum', 'JMC 4970 Internship', 'PR Elective', 'Free Elective'], description: 'Run a student PR agency serving real clients; many intern at national firms.' },
      ], careers: [
        { title: 'PR Specialist', medianSalary: 62000, growthRate: 0.08, description: 'Manage media relations, write press releases, and protect brand reputation.' },
        { title: 'Communications Director', medianSalary: 85000, growthRate: 0.10, description: 'Lead communications strategy for organizations, companies, or government agencies.' },
      ]},
    ]},
  ]

  let collegeCount = 0
  let majorCount = 0
  let pathwayCount = 0
  let careerCount = 0

  for (const def of collegeDefinitions) {
    const collegeSlug = def.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const college = await prisma.college.create({
      data: {
        schoolId: schoolMap[def.slug].id,
        slug: collegeSlug,
        name: def.name,
        description: def.description,
        totalStudents: def.totalStudents,
      },
    })
    collegeCount++

    for (const majorDef of def.majors) {
      const major = await prisma.major.create({
        data: {
          collegeId: college.id,
          name: majorDef.name,
          degreeType: majorDef.degreeType,
          description: majorDef.description,
        },
      })
      majorCount++

      for (const pathway of majorDef.pathways) {
        await prisma.degreePathway.create({
          data: {
            majorId: major.id,
            year: pathway.year,
            title: pathway.title,
            courses: pathway.courses,
            description: pathway.description,
          },
        })
        pathwayCount++
      }

      for (const career of majorDef.careers) {
        await prisma.careerOutcome.create({
          data: {
            majorId: major.id,
            title: career.title,
            medianSalary: career.medianSalary,
            growthRate: career.growthRate,
            description: career.description,
          },
        })
        careerCount++
      }
    }
  }

  console.log(`  Created ${collegeCount} Colleges, ${majorCount} Majors, ${pathwayCount} Pathways, ${careerCount} Career Outcomes`)
}
