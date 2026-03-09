// seed-academics.ts — Creates SchoolAcademics, Colleges, Majors, DegreePathways, CareerOutcomes

export async function seedAcademics(prisma: any, schoolMap: Record<string, any>) {
  // ─── School Academic Stats ──────────────────────────────────────────────────
  const academicStats = [
    { slug: 'texas-tech', enrollment: 40322, admissionRate: 0.68, satAvg: 1140, actAvg: 24, tuitionInState: 11340, tuitionOutOfState: 23830, graduationRate: 0.62, medianEarnings: 49500, retentionRate: 0.84 },
    { slug: 'usc', enrollment: 49042, admissionRate: 0.12, satAvg: 1480, actAvg: 34, tuitionInState: 66640, tuitionOutOfState: 66640, graduationRate: 0.92, medianEarnings: 74200, retentionRate: 0.97 },
    { slug: 'baylor', enrollment: 20626, admissionRate: 0.67, satAvg: 1270, actAvg: 29, tuitionInState: 54298, tuitionOutOfState: 54298, graduationRate: 0.78, medianEarnings: 55900, retentionRate: 0.90 },
    { slug: 'oklahoma', enrollment: 32076, admissionRate: 0.73, satAvg: 1240, actAvg: 27, tuitionInState: 12063, tuitionOutOfState: 29163, graduationRate: 0.71, medianEarnings: 50800, retentionRate: 0.88 },
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
    // Texas Tech
    { slug: 'texas-tech', name: 'Whitacre College of Engineering', description: 'One of the largest engineering colleges in Texas, offering 13 undergraduate degree programs with strong industry ties to the energy, technology, and defense sectors across West Texas and beyond.', totalStudents: 5800, majors: [
      { name: 'Petroleum Engineering', degreeType: 'B.S.', description: 'Design and optimize extraction of oil and gas resources, with access to the Permian Basin — the most productive oilfield in the United States.' },
      { name: 'Mechanical Engineering', degreeType: 'B.S.', description: 'Design, analyze, and manufacture mechanical systems with hands-on wind energy research and robotics lab experience.' },
      { name: 'Computer Science', degreeType: 'B.S.', description: 'Software development, algorithms, cybersecurity, and AI with research opportunities in the Whitacre College computing labs.' },
    ]},
    { slug: 'texas-tech', name: 'Rawls College of Business', description: 'An AACSB-accredited business school recognized for energy commerce, entrepreneurship, and personal financial planning programs.', totalStudents: 5200, majors: [
      { name: 'Energy Commerce', degreeType: 'B.B.A.', description: 'A unique program combining business and energy industry knowledge, preparing students for leadership in the oil, gas, and renewable energy sectors.' },
      { name: 'Finance', degreeType: 'B.B.A.', description: 'Investment analysis, corporate finance, and financial markets with Bloomberg Terminal access and CFA preparation.' },
    ]},
    { slug: 'texas-tech', name: 'College of Media & Communication', description: 'A nationally ranked communication school with state-of-the-art broadcast studios and a student-run media network.', totalStudents: 3200, majors: [
      { name: 'Journalism & Electronic Media', degreeType: 'B.A.', description: 'Multimedia storytelling, broadcast journalism, and digital media production in professional-grade studios.' },
    ]},

    // USC
    { slug: 'usc', name: 'Viterbi School of Engineering', description: 'A top-10 engineering school named after Qualcomm co-founder Andrew Viterbi, known for pioneering research in AI, biomedical engineering, and astronautics.', totalStudents: 7200, majors: [
      { name: 'Computer Science', degreeType: 'B.S.', description: 'One of the top CS programs in the world, with deep ties to Silicon Beach startups, gaming studios, and major tech companies across LA.' },
      { name: 'Biomedical Engineering', degreeType: 'B.S.', description: 'Medical device design, neural engineering, and tissue engineering at the intersection of Keck Medicine and Viterbi research.' },
      { name: 'Astronautical Engineering', degreeType: 'B.S.', description: 'One of only a handful of dedicated astronautics programs in the nation, with partnerships at SpaceX, JPL, and Boeing.' },
    ]},
    { slug: 'usc', name: 'Marshall School of Business', description: 'A globally ranked business school in the heart of Los Angeles, offering unparalleled access to entertainment, tech, and international business networks.', totalStudents: 6500, majors: [
      { name: 'Business Administration', degreeType: 'B.S.', description: 'A comprehensive business program with specializations in entrepreneurship, finance, and marketing in the LA business ecosystem.' },
      { name: 'Finance', degreeType: 'B.S.', description: 'Investment banking, real estate finance, and fintech with placement into top Wall Street and West Coast firms.' },
    ]},
    { slug: 'usc', name: 'School of Cinematic Arts', description: 'The oldest and most prestigious film school in the world, founded in 1929 with ties to George Lucas, Steven Spielberg, and the entertainment industry.', totalStudents: 1800, majors: [
      { name: 'Film & Television Production', degreeType: 'B.F.A.', description: 'Hands-on filmmaking from day one — directing, cinematography, editing, and sound design in world-class production facilities.' },
      { name: 'Interactive Media & Games', degreeType: 'B.A.', description: 'Game design, immersive media, and interactive storytelling at the intersection of technology and entertainment.' },
    ]},

    // Baylor
    { slug: 'baylor', name: 'School of Engineering & Computer Science', description: 'A growing engineering school offering ABET-accredited programs with small class sizes and a Christian mission of service through innovation.', totalStudents: 2200, majors: [
      { name: 'Electrical & Computer Engineering', degreeType: 'B.S.', description: 'Circuit design, embedded systems, and signal processing with undergraduate research from freshman year.' },
      { name: 'Computer Science', degreeType: 'B.S.', description: 'Software engineering, machine learning, and cybersecurity with partnerships in the growing Central Texas tech corridor.' },
      { name: 'Mechanical Engineering', degreeType: 'B.S.', description: 'Thermal systems, robotics, and manufacturing design with hands-on capstone projects for industry sponsors.' },
    ]},
    { slug: 'baylor', name: 'Hankamer School of Business', description: 'An AACSB-accredited business school ranked among the top in Texas, known for its entrepreneurship program and ethical business leadership focus.', totalStudents: 3800, majors: [
      { name: 'Accounting', degreeType: 'B.B.A.', description: 'CPA-track accounting with 95%+ first-time pass rate, audit and tax specializations, and Big Four recruiting pipeline.' },
      { name: 'Entrepreneurship', degreeType: 'B.B.A.', description: 'New venture creation, business plan development, and startup funding with access to Baylor\'s innovation incubator.' },
    ]},
    { slug: 'baylor', name: 'College of Arts & Sciences', description: 'The largest college at Baylor, offering over 40 majors spanning humanities, natural sciences, and social sciences with a liberal arts foundation.', totalStudents: 6500, majors: [
      { name: 'Biology', degreeType: 'B.S.', description: 'Pre-medical track with early clinical shadowing, undergraduate research, and partnerships with Baylor Scott & White Health.' },
      { name: 'Pre-Law / Political Science', degreeType: 'B.A.', description: 'Constitutional law, policy analysis, and mock trial with direct pipeline to Baylor Law School, one of the top in Texas.' },
    ]},

    // Oklahoma
    { slug: 'oklahoma', name: 'Gallogly College of Engineering', description: 'A top-50 engineering college offering 10 undergraduate programs with particular strength in petroleum, aerospace, and environmental engineering.', totalStudents: 4200, majors: [
      { name: 'Petroleum Engineering', degreeType: 'B.S.', description: 'A top-5 petroleum engineering program in the nation, with industry partnerships throughout Oklahoma\'s energy sector.' },
      { name: 'Aerospace Engineering', degreeType: 'B.S.', description: 'Aircraft and spacecraft design, propulsion, and UAV systems with ties to Tinker Air Force Base and the FAA.' },
      { name: 'Computer Science', degreeType: 'B.S.', description: 'Software engineering, data science, and cybersecurity with research in weather informatics and AI.' },
    ]},
    { slug: 'oklahoma', name: 'Price College of Business', description: 'A nationally ranked business school with strong alumni networks in energy, finance, and entrepreneurship across the Southwest.', totalStudents: 5100, majors: [
      { name: 'Finance', degreeType: 'B.B.A.', description: 'Investment analysis, energy finance, and corporate strategy with Bloomberg Terminal access and case competition teams.' },
      { name: 'Management Information Systems', degreeType: 'B.B.A.', description: 'IT management, data analytics, and enterprise systems with Fortune 500 internship placements.' },
    ]},
    { slug: 'oklahoma', name: 'Gaylord College of Journalism', description: 'One of the top journalism and mass communication schools in the nation, housed in a $75 million state-of-the-art facility.', totalStudents: 2400, majors: [
      { name: 'Journalism', degreeType: 'B.A.', description: 'Print, broadcast, and digital journalism with professional newsroom experience and award-winning student media.' },
      { name: 'Public Relations', degreeType: 'B.A.', description: 'Strategic communications, crisis management, and brand storytelling with agency-style client work.' },
    ]},
  ]

  let collegeCount = 0
  let majorCount = 0
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

      // Add degree pathways for each major
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
      await prisma.degreePathway.create({
        data: {
          majorId: major.id,
          year: 3,
          title: 'Specialization',
          courses: [majorDef.name + ' Elective I', majorDef.name + ' Lab', 'Junior Seminar'],
          description: 'Choose a concentration area and begin applied projects or internships.',
        },
      })
      await prisma.degreePathway.create({
        data: {
          majorId: major.id,
          year: 4,
          title: 'Capstone & Career Prep',
          courses: ['Senior Capstone Project', majorDef.name + ' Elective II', 'Professional Development'],
          description: 'Complete a capstone project and prepare for graduate school or industry careers.',
        },
      })

      // Add career outcome for each major
      await prisma.careerOutcome.create({
        data: {
          majorId: major.id,
          title: majorDef.name + ' Professional',
          medianSalary: 55000 + Math.floor(Math.random() * 35000),
          growthRate: 0.04 + Math.random() * 0.12,
          description: 'Entry-level position in ' + majorDef.name.toLowerCase() + ' with strong growth potential.',
        },
      })
    }
  }

  console.log(`  Created ${collegeCount} Colleges, ${majorCount} Majors with pathways and outcomes`)
}
