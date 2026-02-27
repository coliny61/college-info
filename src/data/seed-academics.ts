// seed-academics.ts — Creates SchoolAcademics, Colleges, Majors, DegreePathways, CareerOutcomes

export async function seedAcademics(prisma: any, schoolMap: Record<string, any>) {
  // ─── School Academic Stats ──────────────────────────────────────────────────
  const academicStats = [
    { slug: 'alabama', enrollment: 38563, admissionRate: 0.80, satAvg: 1230, actAvg: 27, tuitionInState: 11580, tuitionOutOfState: 32300, graduationRate: 0.72, medianEarnings: 48200, retentionRate: 0.87 },
    { slug: 'oregon', enrollment: 23634, admissionRate: 0.83, satAvg: 1215, actAvg: 26, tuitionInState: 13666, tuitionOutOfState: 40062, graduationRate: 0.75, medianEarnings: 47800, retentionRate: 0.88 },
    { slug: 'ohio-state', enrollment: 61369, admissionRate: 0.53, satAvg: 1350, actAvg: 30, tuitionInState: 11936, tuitionOutOfState: 35019, graduationRate: 0.84, medianEarnings: 55600, retentionRate: 0.94 },
    { slug: 'texas', enrollment: 52195, admissionRate: 0.31, satAvg: 1370, actAvg: 31, tuitionInState: 11448, tuitionOutOfState: 41070, graduationRate: 0.83, medianEarnings: 57200, retentionRate: 0.95 },
    { slug: 'lsu', enrollment: 35893, admissionRate: 0.74, satAvg: 1200, actAvg: 26, tuitionInState: 11962, tuitionOutOfState: 28639, graduationRate: 0.69, medianEarnings: 45100, retentionRate: 0.84 },
  ]

  for (const stats of academicStats) {
    const { slug, ...data } = stats
    await prisma.schoolAcademics.create({
      data: { schoolId: schoolMap[slug].id, ...data },
    })
  }
  console.log(`  Created ${academicStats.length} SchoolAcademics`)

  // ─── Colleges & Majors ─────────────────────────────────────────────────────
  const collegeDefinitions = [
    // Alabama
    { slug: 'alabama', name: 'College of Engineering', description: 'One of the top engineering programs in the Southeast, offering ABET-accredited programs in 10 disciplines with state-of-the-art research facilities.', totalStudents: 6200, majors: [
      { name: 'Mechanical Engineering', degreeType: 'B.S.', description: 'Design and analysis of mechanical and thermal systems with hands-on lab experience.' },
      { name: 'Civil Engineering', degreeType: 'B.S.', description: 'Infrastructure design, structural analysis, and environmental engineering fundamentals.' },
      { name: 'Computer Science', degreeType: 'B.S.', description: 'Software development, algorithms, AI, and systems programming with industry partnerships.' },
    ]},
    { slug: 'alabama', name: 'Culverhouse College of Business', description: 'A nationally ranked business school known for its accounting, finance, and management programs.', totalStudents: 8100, majors: [
      { name: 'Finance', degreeType: 'B.S.', description: 'Investment analysis, corporate finance, and financial markets with Bloomberg Terminal access.' },
      { name: 'Marketing', degreeType: 'B.S.', description: 'Brand strategy, digital marketing, and consumer behavior in the modern marketplace.' },
    ]},
    { slug: 'alabama', name: 'College of Arts & Sciences', description: 'The largest college at Alabama, offering over 50 majors spanning the humanities, sciences, and social sciences.', totalStudents: 12000, majors: [
      { name: 'Biology', degreeType: 'B.S.', description: 'Molecular, cellular, and organismal biology with research opportunities from freshman year.' },
    ]},
    // Oregon
    { slug: 'oregon', name: 'Lundquist College of Business', description: 'A top-ranked business school with strong connections to Nike, Intel, and the Pacific Northwest tech ecosystem.', totalStudents: 3500, majors: [
      { name: 'Sports Business', degreeType: 'B.S.', description: 'The intersection of business strategy and the sports industry, leveraging Oregon\'s Nike connection.' },
      { name: 'Accounting', degreeType: 'B.S.', description: 'Financial reporting, auditing, and tax preparation for CPA licensure.' },
    ]},
    { slug: 'oregon', name: 'School of Journalism', description: 'One of the oldest accredited journalism schools in the nation, combining traditional media with digital innovation.', totalStudents: 2800, majors: [
      { name: 'Journalism', degreeType: 'B.A.', description: 'Investigative reporting, multimedia storytelling, and media ethics.' },
      { name: 'Advertising', degreeType: 'B.S.', description: 'Creative strategy, media planning, and brand communications.' },
    ]},
    { slug: 'oregon', name: 'College of Arts & Sciences', description: 'The intellectual core of the university, with programs ranging from physics to philosophy.', totalStudents: 8500, majors: [
      { name: 'Environmental Science', degreeType: 'B.S.', description: 'Climate science, ecology, and conservation with field research in the Cascades.' },
    ]},
    // Ohio State
    { slug: 'ohio-state', name: 'College of Engineering', description: 'A top-20 engineering school with $100M+ in annual research funding and Fortune 500 employer partnerships.', totalStudents: 10200, majors: [
      { name: 'Electrical Engineering', degreeType: 'B.S.', description: 'Circuit design, signal processing, and power systems engineering.' },
      { name: 'Biomedical Engineering', degreeType: 'B.S.', description: 'Medical device design, biomechanics, and tissue engineering at the intersection of health and technology.' },
      { name: 'Computer Science & Engineering', degreeType: 'B.S.', description: 'Full-stack software development, machine learning, and systems architecture.' },
    ]},
    { slug: 'ohio-state', name: 'Fisher College of Business', description: 'A top-tier business school offering specialized programs in real estate, logistics, and risk management.', totalStudents: 7500, majors: [
      { name: 'Business Analytics', degreeType: 'B.S.', description: 'Data-driven decision making, predictive modeling, and business intelligence tools.' },
    ]},
    { slug: 'ohio-state', name: 'College of Medicine', description: 'One of the largest medical schools in the country, housed within the Wexner Medical Center.', totalStudents: 800, majors: [
      { name: 'Pre-Medicine', degreeType: 'B.S.', description: 'A rigorous pre-medical curriculum with early clinical exposure at Wexner Medical Center.' },
    ]},
    // Texas
    { slug: 'texas', name: 'Cockrell School of Engineering', description: 'A top-10 engineering school with world-class research in energy, computing, and aerospace.', totalStudents: 7800, majors: [
      { name: 'Petroleum Engineering', degreeType: 'B.S.', description: 'The #1 petroleum engineering program in the nation, with industry partnerships throughout Texas.' },
      { name: 'Aerospace Engineering', degreeType: 'B.S.', description: 'Aircraft and spacecraft design, propulsion systems, and orbital mechanics.' },
      { name: 'Computer Science', degreeType: 'B.S.', description: 'AI, systems, and software engineering in Austin\'s booming tech ecosystem.' },
    ]},
    { slug: 'texas', name: 'McCombs School of Business', description: 'A top-15 business school known for entrepreneurship and its location in the startup capital of the South.', totalStudents: 6900, majors: [
      { name: 'Management Information Systems', degreeType: 'B.B.A.', description: 'IT management, data analytics, and enterprise systems with strong recruiting pipelines.' },
      { name: 'Finance', degreeType: 'B.B.A.', description: 'Investment banking, corporate finance, and fintech with Wall Street placement rates.' },
    ]},
    // LSU
    { slug: 'lsu', name: 'College of Engineering', description: 'A growing engineering college with strengths in chemical, petroleum, and environmental engineering.', totalStudents: 4500, majors: [
      { name: 'Chemical Engineering', degreeType: 'B.S.', description: 'Process design, petrochemical refining, and environmental remediation in Louisiana\'s industrial corridor.' },
      { name: 'Construction Management', degreeType: 'B.S.', description: 'Project management, cost estimation, and building information modeling for the construction industry.' },
    ]},
    { slug: 'lsu', name: 'E.J. Ourso College of Business', description: 'AACSB-accredited business programs with connections to Louisiana\'s energy, agriculture, and logistics industries.', totalStudents: 5200, majors: [
      { name: 'Accounting', degreeType: 'B.S.', description: 'CPA-track accounting with audit and tax specializations.' },
    ]},
    { slug: 'lsu', name: 'College of Agriculture', description: 'One of the strongest agriculture programs in the SEC, leveraging Louisiana\'s unique ecology and climate.', totalStudents: 3200, majors: [
      { name: 'Animal Sciences', degreeType: 'B.S.', description: 'Livestock management, veterinary preparation, and animal nutrition.' },
    ]},
  ]

  let collegeCount = 0
  let majorCount = 0
  for (const def of collegeDefinitions) {
    const college = await prisma.college.create({
      data: {
        schoolId: schoolMap[def.slug].id,
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

      // Add sample degree pathway for each major
      await prisma.degreePathway.create({
        data: {
          majorId: major.id,
          year: 1,
          title: 'Foundation Year',
          courses: ['Intro to ' + majorDef.name.split(' ')[0], 'Calculus I', 'English Composition'],
          description: 'Build core knowledge and fundamental skills in ' + majorDef.name.toLowerCase() + '.',
        },
      })
      await prisma.degreePathway.create({
        data: {
          majorId: major.id,
          year: 2,
          title: 'Core Development',
          courses: ['Advanced ' + majorDef.name.split(' ')[0], 'Statistics', 'Technical Writing'],
          description: 'Deepen expertise with intermediate coursework and first research exposure.',
        },
      })

      // Add sample career outcome for each major
      await prisma.careerOutcome.create({
        data: {
          majorId: major.id,
          title: majorDef.name + ' Professional',
          medianSalary: 55000 + Math.floor(Math.random() * 30000),
          growthRate: 0.05 + Math.random() * 0.1,
          description: 'Entry-level position in ' + majorDef.name.toLowerCase() + ' with strong growth potential.',
        },
      })
    }
  }

  console.log(`  Created ${collegeCount} Colleges, ${majorCount} Majors with pathways and outcomes`)
}
