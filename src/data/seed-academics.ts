// seed-academics.ts — Creates SchoolAcademics, Colleges, Majors, DegreePathways, CareerOutcomes

import { ttuColleges, type CollegeDef } from './seed-academics-ttu'

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
  // TTU colleges imported from seed-academics-ttu.ts (~65 majors across 10 colleges)
  // OU colleges defined inline below

  const ouColleges: CollegeDef[] = [
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

  const collegeDefinitions: CollegeDef[] = [...ttuColleges, ...ouColleges]

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
