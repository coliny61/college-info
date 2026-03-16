// seed-academics.ts — Creates SchoolAcademics, Colleges, Majors, DegreePathways, CareerOutcomes

export async function seedAcademics(prisma: any, schoolMap: Record<string, any>) {
  // ─── School Academic Stats ──────────────────────────────────────────────────
  const academicStats = [
    { slug: 'texas-tech', enrollment: 40773, admissionRate: 0.73, satAvg: 1180, actAvg: 25, tuitionInState: 11852, tuitionOutOfState: 24157, graduationRate: 0.67, medianEarnings: 52000, retentionRate: 0.85, studentToFacultyRatio: 21.0, averageClassSize: 35, ranking: 187, athleteGraduationRate: 0.72 },
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
