// seed-academics-tamucc.ts — All Texas A&M University-Corpus Christi colleges, majors, pathways & career outcomes
// Source: tamucc.edu, catalog.tamucc.edu (2025-2026 academic year)

import type { MajorDef, CollegeDef } from './seed-academics-umhb'

export const tamuccColleges: CollegeDef[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. COLLEGE OF SCIENCE & ENGINEERING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'tamucc',
    name: 'College of Science & Engineering',
    description: 'Home to nationally recognized coastal and marine research programs, leveraging the university\'s island campus location on the Gulf of Mexico for hands-on field science and engineering innovation.',
    totalStudents: 2800,
    majors: [
      {
        name: 'Marine Biology',
        degreeType: 'B.S.',
        description: 'Signature program taking full advantage of TAMUCC\'s island campus with access to the Harte Research Institute, Gulf of Mexico field stations, and coastal ecosystems for hands-on marine research.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['MARB 1401 Intro to Marine Biology', 'BIOL 1406 General Biology I', 'CHEM 1311 General Chemistry I', 'MATH 1314 College Algebra'], description: 'Introduction to marine organisms, ecosystems, and coastal ecology with weekly field trips to Corpus Christi Bay and barrier islands.' },
          { year: 2, title: 'Marine Science Core', courses: ['MARB 2401 Marine Ecology', 'MARB 2410 Marine Invertebrate Zoology', 'BIOL 1407 General Biology II', 'CHEM 1312 General Chemistry II'], description: 'Study marine invertebrates, coastal ecosystems, and ecological relationships through field collections and lab identification. Includes kayak and boat-based sampling in Oso Bay and Laguna Madre.' },
          { year: 3, title: 'Advanced Marine Research', courses: ['MARB 3401 Marine Vertebrate Biology', 'MARB 3410 Biological Oceanography', 'MARB 3420 Coastal Plant Ecology', 'MARB 3430 Marine Conservation Biology'], description: 'Advanced study of marine vertebrates, oceanographic processes, and conservation. Students begin independent research projects at the Harte Research Institute and participate in Gulf of Mexico research cruises.' },
          { year: 4, title: 'Capstone & Field Research', courses: ['MARB 4310 Senior Marine Research', 'MARB 4320 Marine Biotechnology', 'MARB 4330 GIS for Marine Science', 'MARB 4610 Marine Biology Internship'], description: 'Year-long capstone research project at coastal field stations, with many students studying sea turtle nesting, coral reef ecology, or fisheries management. Strong placement into marine science graduate programs nationwide.' },
        ],
        careers: [
          { title: 'Marine Biologist', medianSalary: 66350, growthRate: 0.05, description: 'Study marine organisms and ecosystems to support conservation and resource management.' },
          { title: 'Environmental Scientist', medianSalary: 76530, growthRate: 0.06, description: 'Assess environmental impacts on coastal and marine habitats.' },
          { title: 'Fisheries Biologist', medianSalary: 64000, growthRate: 0.05, description: 'Manage fish populations and aquatic habitats for state and federal agencies.' },
        ],
      },
      {
        name: 'Biology',
        degreeType: 'B.S.',
        description: 'Broad biology program with strong pre-med and pre-health tracks and access to coastal research opportunities.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['BIOL 1406 General Biology I', 'BIOL 1407 General Biology II', 'CHEM 1311 General Chemistry I', 'MATH 1314 College Algebra'], description: 'Core biology and chemistry with laboratory components.' },
          { year: 2, title: 'Organismal Biology', courses: ['BIOL 2401 Anatomy & Physiology I', 'BIOL 2402 Anatomy & Physiology II', 'CHEM 1312 General Chemistry II', 'BIOL 2420 Microbiology'], description: 'Human anatomy, physiology, and microbiology for pre-health students.' },
          { year: 3, title: 'Advanced Biology', courses: ['BIOL 3301 Genetics', 'BIOL 3310 Cell Biology', 'BIOL 3320 Ecology', 'BIOL 3330 Biochemistry'], description: 'Upper-division courses in genetics, molecular biology, and ecology.' },
          { year: 4, title: 'Research & Capstone', courses: ['BIOL 4310 Senior Research', 'BIOL 4320 Senior Seminar', 'BIOL Elective', 'MCAT/GRE Prep'], description: 'Undergraduate research and preparation for graduate or professional school.' },
        ],
        careers: [
          { title: 'Physician (with M.D.)', medianSalary: 229300, growthRate: 0.03, description: 'Diagnose and treat patients after medical school and residency.' },
          { title: 'Clinical Laboratory Scientist', medianSalary: 57800, growthRate: 0.07, description: 'Perform diagnostic lab tests in hospitals and clinical settings.' },
          { title: 'Biomedical Researcher', medianSalary: 70000, growthRate: 0.08, description: 'Conduct research on disease mechanisms and potential therapies.' },
        ],
      },
      {
        name: 'Computer Science',
        degreeType: 'B.S.',
        description: 'Software development, cybersecurity, and data science with growing industry partnerships in the Coastal Bend region.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['COSC 1336 Programming I', 'COSC 1337 Programming II', 'MATH 2413 Calculus I', 'ENGL 1301 Composition I'], description: 'Programming fundamentals in Java/Python and calculus.' },
          { year: 2, title: 'Core CS', courses: ['COSC 2336 Data Structures', 'COSC 2310 Computer Organization', 'COSC 2320 Discrete Mathematics', 'MATH 2414 Calculus II'], description: 'Data structures, algorithms, and computer architecture.' },
          { year: 3, title: 'Advanced Topics', courses: ['COSC 3310 Database Systems', 'COSC 3320 Operating Systems', 'COSC 3330 Software Engineering', 'COSC 3340 Computer Networks'], description: 'Systems programming, databases, and software engineering methods.' },
          { year: 4, title: 'Capstone & Specialization', courses: ['COSC 4310 Senior Project', 'COSC 4320 Cybersecurity', 'COSC Elective', 'COSC 4610 CS Internship'], description: 'Team-based capstone project and elective specialization in cybersecurity or AI.' },
        ],
        careers: [
          { title: 'Software Developer', medianSalary: 132270, growthRate: 0.25, description: 'Design and build software applications and systems.' },
          { title: 'Cybersecurity Analyst', medianSalary: 112000, growthRate: 0.32, description: 'Protect organizations from cyber threats and security breaches.' },
          { title: 'Data Scientist', medianSalary: 108000, growthRate: 0.35, description: 'Analyze large datasets to extract insights and build predictive models.' },
        ],
      },
      {
        name: 'Mathematics',
        degreeType: 'B.S.',
        description: 'Pure and applied mathematics with tracks in teaching certification, actuarial science, and graduate school preparation.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['MATH 2413 Calculus I', 'MATH 2414 Calculus II', 'COSC 1336 Programming I', 'ENGL 1301 Composition I'], description: 'Calculus sequence and computational thinking.' },
          { year: 2, title: 'Core Mathematics', courses: ['MATH 2415 Calculus III', 'MATH 2305 Linear Algebra', 'MATH 2320 Discrete Mathematics', 'MATH 3310 Differential Equations'], description: 'Multivariable calculus, linear algebra, and proof writing.' },
          { year: 3, title: 'Advanced Topics', courses: ['MATH 3320 Abstract Algebra', 'MATH 3330 Real Analysis', 'MATH 3340 Probability & Statistics', 'MATH Elective'], description: 'Abstract algebra, analysis, and applied probability.' },
          { year: 4, title: 'Capstone', courses: ['MATH 4310 Senior Research', 'MATH 4320 Senior Seminar', 'MATH Elective', 'Professional Elective'], description: 'Research project and preparation for careers or graduate school.' },
        ],
        careers: [
          { title: 'Actuary', medianSalary: 113990, growthRate: 0.21, description: 'Assess financial risk using statistics and mathematical modeling.' },
          { title: 'Data Analyst', medianSalary: 65000, growthRate: 0.23, description: 'Transform data into actionable insights for business decisions.' },
          { title: 'Mathematics Teacher', medianSalary: 61690, growthRate: 0.04, description: 'Teach secondary mathematics with state certification.' },
        ],
      },
      {
        name: 'Engineering Technology',
        degreeType: 'B.S.',
        description: 'Applied engineering program with concentrations in mechanical and manufacturing technology serving the Coastal Bend industrial sector.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ENTC 1301 Intro to Engineering Technology', 'MATH 2413 Calculus I', 'PHYS 2325 Engineering Physics I', 'ENGL 1301 Composition I'], description: 'Engineering fundamentals, physics, and calculus foundations.' },
          { year: 2, title: 'Core Engineering', courses: ['ENTC 2310 Statics', 'ENTC 2320 Dynamics', 'ENTC 2330 Engineering Graphics (CAD)', 'PHYS 2326 Engineering Physics II'], description: 'Mechanics, CAD drafting, and applied physics for engineering.' },
          { year: 3, title: 'Applied Technology', courses: ['ENTC 3310 Thermodynamics', 'ENTC 3320 Manufacturing Processes', 'ENTC 3330 Quality Control', 'ENTC 3340 Materials Science'], description: 'Thermodynamics, manufacturing systems, and quality engineering.' },
          { year: 4, title: 'Capstone & Internship', courses: ['ENTC 4310 Senior Design Project', 'ENTC 4610 Engineering Internship', 'ENTC 4320 Project Management', 'ENTC Elective'], description: 'Industry-sponsored senior design project and professional internship.' },
        ],
        careers: [
          { title: 'Mechanical Engineering Technologist', medianSalary: 73000, growthRate: 0.06, description: 'Apply engineering principles to design and test mechanical systems.' },
          { title: 'Quality Engineer', medianSalary: 76000, growthRate: 0.07, description: 'Ensure products meet quality standards through testing and process improvement.' },
          { title: 'Manufacturing Engineer', medianSalary: 78000, growthRate: 0.05, description: 'Optimize manufacturing processes and production systems.' },
        ],
      },
      {
        name: 'Environmental Science',
        degreeType: 'B.S.',
        description: 'Interdisciplinary program combining ecology, chemistry, and policy with fieldwork in Gulf Coast wetlands and barrier islands.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ENVS 1401 Intro to Environmental Science', 'BIOL 1406 General Biology I', 'CHEM 1311 General Chemistry I', 'MATH 1314 College Algebra'], description: 'Introduction to environmental systems and foundational sciences.' },
          { year: 2, title: 'Core Environmental Science', courses: ['ENVS 2310 Environmental Chemistry', 'ENVS 2320 Ecology', 'GEOL 1401 Physical Geology', 'ENVS 2330 GIS Fundamentals'], description: 'Environmental chemistry, ecology, and geographic information systems.' },
          { year: 3, title: 'Applied Studies', courses: ['ENVS 3310 Water Resources', 'ENVS 3320 Soil Science', 'ENVS 3330 Environmental Policy & Law', 'ENVS 3340 Environmental Impact Assessment'], description: 'Applied environmental assessment, policy frameworks, and resource management.' },
          { year: 4, title: 'Capstone & Field Research', courses: ['ENVS 4310 Senior Research', 'ENVS 4610 Environmental Internship', 'ENVS 4320 Restoration Ecology', 'ENVS Elective'], description: 'Field-based research on coastal environmental issues and professional internship.' },
        ],
        careers: [
          { title: 'Environmental Scientist', medianSalary: 76530, growthRate: 0.06, description: 'Assess environmental conditions and develop remediation plans.' },
          { title: 'Environmental Compliance Specialist', medianSalary: 68000, growthRate: 0.07, description: 'Ensure organizations comply with environmental regulations.' },
          { title: 'Conservation Scientist', medianSalary: 64000, growthRate: 0.05, description: 'Manage and protect natural resources on public and private lands.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. COLLEGE OF NURSING & HEALTH SCIENCES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'tamucc',
    name: 'College of Nursing & Health Sciences',
    description: 'Prepares healthcare professionals through clinical partnerships with Corpus Christi medical centers and community health organizations.',
    totalStudents: 1800,
    majors: [
      {
        name: 'Nursing',
        degreeType: 'B.S.N.',
        description: 'Pre-licensure BSN program with clinical rotations across Coastal Bend hospitals and community health settings.',
        pathways: [
          { year: 1, title: 'Pre-Nursing Foundation', courses: ['BIOL 1401 Anatomy & Physiology I', 'CHEM 1305 General Chemistry', 'ENGL 1301 Composition I', 'PSYC 1301 General Psychology'], description: 'Science prerequisites for nursing program admission.' },
          { year: 2, title: 'Nursing Fundamentals', courses: ['NURS 2301 Fundamentals of Nursing', 'NURS 2310 Health Assessment', 'BIOL 1402 Anatomy & Physiology II', 'BIOL 2420 Microbiology'], description: 'Introduction to patient care techniques and health assessment.' },
          { year: 3, title: 'Clinical Rotations', courses: ['NURS 3301 Adult Health Nursing', 'NURS 3310 Pediatric Nursing', 'NURS 3320 OB/Maternal Nursing', 'NURS 3330 Pharmacology'], description: 'Hospital-based clinical experiences in medical-surgical, pediatric, and maternal units.' },
          { year: 4, title: 'Advanced Practice & NCLEX Prep', courses: ['NURS 4301 Community Health Nursing', 'NURS 4310 Psychiatric Nursing', 'NURS 4320 Nursing Leadership', 'NURS 4330 NCLEX Review'], description: 'Community and psychiatric nursing, leadership capstone, and NCLEX-RN preparation.' },
        ],
        careers: [
          { title: 'Registered Nurse', medianSalary: 81220, growthRate: 0.06, description: 'Provide direct patient care across diverse healthcare settings.' },
          { title: 'Emergency Room Nurse', medianSalary: 84000, growthRate: 0.06, description: 'Deliver acute care in high-intensity emergency department environments.' },
          { title: 'Public Health Nurse', medianSalary: 72000, growthRate: 0.07, description: 'Promote community wellness through preventive health programs.' },
        ],
      },
      {
        name: 'Kinesiology',
        degreeType: 'B.S.',
        description: 'Study human movement and exercise science with tracks in athletic training, fitness, and sport management.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['KINE 1301 Intro to Kinesiology', 'BIOL 1401 Anatomy & Physiology I', 'CHEM 1305 General Chemistry', 'MATH 1314 College Algebra'], description: 'Science foundations and introduction to human movement.' },
          { year: 2, title: 'Movement Science', courses: ['KINE 2310 Biomechanics', 'KINE 2320 Exercise Physiology', 'BIOL 1402 Anatomy & Physiology II', 'KINE 2330 Motor Learning'], description: 'Core courses in biomechanics, physiology, and movement control.' },
          { year: 3, title: 'Specialization', courses: ['KINE 3310 Exercise Testing & Prescription', 'KINE 3320 Sports Nutrition', 'KINE 3330 Strength & Conditioning', 'KINE Elective'], description: 'Choose a focus area in exercise science, coaching, or sport management.' },
          { year: 4, title: 'Capstone & Internship', courses: ['KINE 4610 Kinesiology Internship', 'KINE 4310 Research Methods', 'KINE 4320 Senior Seminar', 'KINE Elective'], description: 'Professional internship and research capstone.' },
        ],
        careers: [
          { title: 'Exercise Physiologist', medianSalary: 51350, growthRate: 0.10, description: 'Design fitness programs based on physiological assessment.' },
          { title: 'Athletic Trainer', medianSalary: 53840, growthRate: 0.17, description: 'Prevent and treat athletic injuries in sports settings.' },
          { title: 'Corporate Wellness Coordinator', medianSalary: 55000, growthRate: 0.12, description: 'Develop workplace health and wellness programs.' },
        ],
      },
      {
        name: 'Health Sciences',
        degreeType: 'B.S.',
        description: 'Interdisciplinary pre-professional program preparing students for graduate programs in physical therapy, occupational therapy, or physician assistant studies.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['HSCI 1301 Intro to Health Sciences', 'BIOL 1406 General Biology I', 'CHEM 1311 General Chemistry I', 'ENGL 1301 Composition I'], description: 'Introduction to healthcare professions and science prerequisites.' },
          { year: 2, title: 'Health Science Core', courses: ['BIOL 2401 Anatomy & Physiology I', 'BIOL 2402 Anatomy & Physiology II', 'HSCI 2310 Medical Terminology', 'HSCI 2320 Public Health Concepts'], description: 'Anatomy, medical terminology, and public health fundamentals.' },
          { year: 3, title: 'Applied Health', courses: ['HSCI 3310 Epidemiology', 'HSCI 3320 Health Promotion', 'HSCI 3330 Research Methods', 'HSCI 3340 Healthcare Administration'], description: 'Disease prevention, health promotion, and healthcare systems.' },
          { year: 4, title: 'Capstone & Grad Prep', courses: ['HSCI 4310 Senior Research', 'HSCI 4610 Health Sciences Internship', 'HSCI Elective', 'GRE Prep'], description: 'Research capstone and clinical observation hours for graduate school applications.' },
        ],
        careers: [
          { title: 'Physical Therapist (with DPT)', medianSalary: 97720, growthRate: 0.15, description: 'Help patients recover mobility through therapeutic exercise after earning a doctorate.' },
          { title: 'Physician Assistant (with MPAS)', medianSalary: 126010, growthRate: 0.28, description: 'Diagnose and treat patients under physician supervision after PA school.' },
          { title: 'Health Educator', medianSalary: 60600, growthRate: 0.07, description: 'Teach people about health behaviors and disease prevention.' },
        ],
      },
      {
        name: 'Public Health',
        degreeType: 'B.S.',
        description: 'Addresses community health challenges through epidemiology, health policy, and population-level interventions.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['PUBH 1301 Intro to Public Health', 'BIOL 1406 General Biology I', 'MATH 1342 Statistics', 'ENGL 1301 Composition I'], description: 'Introduction to public health principles and biostatistics.' },
          { year: 2, title: 'Core Public Health', courses: ['PUBH 2310 Epidemiology', 'PUBH 2320 Biostatistics', 'PUBH 2330 Environmental Health', 'PUBH 2340 Health Behavior Theory'], description: 'Disease surveillance, statistical methods, and environmental health.' },
          { year: 3, title: 'Applied Public Health', courses: ['PUBH 3310 Health Policy', 'PUBH 3320 Global Health', 'PUBH 3330 Community Health Assessment', 'PUBH 3340 Program Planning'], description: 'Health policy, global health issues, and community intervention design.' },
          { year: 4, title: 'Capstone & Practicum', courses: ['PUBH 4310 Senior Capstone', 'PUBH 4610 Public Health Practicum', 'PUBH Elective', 'Professional Elective'], description: 'Community-based practicum and capstone project addressing local health needs.' },
        ],
        careers: [
          { title: 'Epidemiologist', medianSalary: 78520, growthRate: 0.26, description: 'Investigate patterns of disease and develop prevention strategies.' },
          { title: 'Public Health Program Manager', medianSalary: 65000, growthRate: 0.12, description: 'Design and manage public health programs for communities.' },
          { title: 'Health Policy Analyst', medianSalary: 70000, growthRate: 0.10, description: 'Analyze health policies and recommend improvements.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. COLLEGE OF BUSINESS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'tamucc',
    name: 'College of Business',
    description: 'AACSB-accredited business school preparing students for careers in the dynamic Gulf Coast economy with experiential learning and industry connections.',
    totalStudents: 2100,
    majors: [
      {
        name: 'Business Administration',
        degreeType: 'B.B.A.',
        description: 'Versatile business degree with concentrations in general management, international business, and entrepreneurship.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['BUSI 1301 Intro to Business', 'ACCT 2301 Financial Accounting', 'ECON 2301 Microeconomics', 'MATH 1324 Business Math'], description: 'Core business and economics foundations.' },
          { year: 2, title: 'Business Core', courses: ['ACCT 2302 Managerial Accounting', 'ECON 2302 Macroeconomics', 'BUSI 2310 Business Statistics', 'BUSI 2320 Business Communications'], description: 'Accounting, economics, and analytical skills.' },
          { year: 3, title: 'Advanced Business', courses: ['MGMT 3310 Principles of Management', 'MKTG 3310 Principles of Marketing', 'FINA 3310 Corporate Finance', 'BUSI 3310 Business Law'], description: 'Functional area courses across management, marketing, and finance.' },
          { year: 4, title: 'Capstone & Internship', courses: ['BUSI 4310 Strategic Management', 'BUSI 4610 Business Internship', 'BUSI Elective', 'Professional Elective'], description: 'Strategic capstone and professional internship in the Coastal Bend business community.' },
        ],
        careers: [
          { title: 'Business Analyst', medianSalary: 62000, growthRate: 0.11, description: 'Analyze business operations and recommend process improvements.' },
          { title: 'Operations Manager', medianSalary: 75000, growthRate: 0.06, description: 'Oversee daily business operations and logistics.' },
          { title: 'Management Consultant', medianSalary: 78000, growthRate: 0.11, description: 'Advise organizations on strategy, operations, and performance.' },
        ],
      },
      {
        name: 'Finance',
        degreeType: 'B.B.A.',
        description: 'Prepares students for careers in corporate finance, banking, investment, and financial planning.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ACCT 2301 Financial Accounting', 'ECON 2301 Microeconomics', 'MATH 1324 Business Math', 'ENGL 1301 Composition I'], description: 'Accounting and economics foundations for finance.' },
          { year: 2, title: 'Finance Core', courses: ['FINA 2310 Personal Finance', 'ACCT 2302 Managerial Accounting', 'ECON 2302 Macroeconomics', 'BUSI 2310 Business Statistics'], description: 'Financial principles, macroeconomics, and statistical analysis.' },
          { year: 3, title: 'Advanced Finance', courses: ['FINA 3310 Corporate Finance', 'FINA 3320 Investments', 'FINA 3330 Financial Markets & Institutions', 'FINA 3340 Risk Management'], description: 'Corporate valuation, portfolio management, and financial markets.' },
          { year: 4, title: 'Capstone & Internship', courses: ['FINA 4310 Advanced Corporate Finance', 'FINA 4320 Financial Modeling', 'FINA 4610 Finance Internship', 'BUSI 4310 Strategic Management'], description: 'Financial modeling, advanced analysis, and professional internship.' },
        ],
        careers: [
          { title: 'Financial Analyst', medianSalary: 73000, growthRate: 0.09, description: 'Evaluate financial data and guide investment decisions.' },
          { title: 'Commercial Banker', medianSalary: 68000, growthRate: 0.04, description: 'Manage commercial lending relationships and credit portfolios.' },
          { title: 'Financial Planner', medianSalary: 72000, growthRate: 0.15, description: 'Help individuals and families plan for financial goals.' },
        ],
      },
      {
        name: 'Marketing',
        degreeType: 'B.B.A.',
        description: 'Digital-forward marketing program with emphasis on analytics, social media, and consumer insights.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['BUSI 1301 Intro to Business', 'ACCT 2301 Financial Accounting', 'ECON 2301 Microeconomics', 'ENGL 1301 Composition I'], description: 'Business fundamentals and communication skills.' },
          { year: 2, title: 'Marketing Foundations', courses: ['MKTG 2310 Consumer Behavior', 'BUSI 2310 Business Statistics', 'MKTG 2320 Digital Marketing', 'BUSI 2320 Business Communications'], description: 'Consumer psychology and digital marketing basics.' },
          { year: 3, title: 'Marketing Strategy', courses: ['MKTG 3310 Principles of Marketing', 'MKTG 3320 Marketing Research', 'MKTG 3330 Social Media Strategy', 'MKTG 3340 Sales Management'], description: 'Marketing research, social media, and sales force management.' },
          { year: 4, title: 'Capstone & Internship', courses: ['MKTG 4310 Marketing Strategy', 'MKTG 4610 Marketing Internship', 'BUSI 4310 Strategic Management', 'MKTG Elective'], description: 'Capstone marketing strategy project and internship.' },
        ],
        careers: [
          { title: 'Marketing Manager', medianSalary: 67000, growthRate: 0.10, description: 'Plan and direct marketing campaigns for organizations.' },
          { title: 'Digital Marketing Analyst', medianSalary: 60000, growthRate: 0.13, description: 'Analyze digital marketing performance and optimize campaigns.' },
          { title: 'Sales Manager', medianSalary: 72000, growthRate: 0.05, description: 'Lead sales teams and develop revenue strategies.' },
        ],
      },
      {
        name: 'Management',
        degreeType: 'B.B.A.',
        description: 'Organizational leadership and human resources with emphasis on team dynamics and strategic decision-making.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['BUSI 1301 Intro to Business', 'ACCT 2301 Financial Accounting', 'ECON 2301 Microeconomics', 'ENGL 1301 Composition I'], description: 'Business and economics foundations.' },
          { year: 2, title: 'Business Core', courses: ['MGMT 2310 Organizational Behavior', 'BUSI 2310 Business Statistics', 'ECON 2302 Macroeconomics', 'BUSI 2320 Business Communications'], description: 'Organizational behavior and core business competencies.' },
          { year: 3, title: 'Management Focus', courses: ['MGMT 3310 Principles of Management', 'MGMT 3320 Human Resource Management', 'MGMT 3330 Operations Management', 'MGMT 3340 Organizational Leadership'], description: 'HR management, operations, and leadership development.' },
          { year: 4, title: 'Capstone & Internship', courses: ['MGMT 4310 Strategic Leadership', 'MGMT 4610 Management Internship', 'BUSI 4310 Strategic Management', 'MGMT Elective'], description: 'Leadership capstone and professional internship.' },
        ],
        careers: [
          { title: 'Human Resources Manager', medianSalary: 67000, growthRate: 0.07, description: 'Oversee staffing, training, and employee relations.' },
          { title: 'Operations Manager', medianSalary: 75000, growthRate: 0.06, description: 'Manage daily business operations and supply chains.' },
          { title: 'Training & Development Manager', medianSalary: 70000, growthRate: 0.08, description: 'Design employee training programs and career development initiatives.' },
        ],
      },
      {
        name: 'Accounting',
        degreeType: 'B.B.A.',
        description: 'CPA-track program with strong employer connections in the Gulf Coast energy and maritime industries.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ACCT 2301 Financial Accounting', 'ECON 2301 Microeconomics', 'MATH 1324 Business Math', 'ENGL 1301 Composition I'], description: 'Accounting principles and business foundations.' },
          { year: 2, title: 'Accounting Core', courses: ['ACCT 2302 Managerial Accounting', 'ACCT 3310 Intermediate Accounting I', 'ACCT 3320 Intermediate Accounting II', 'BUSI 2310 Business Statistics'], description: 'Intermediate financial reporting and managerial accounting.' },
          { year: 3, title: 'Advanced Accounting', courses: ['ACCT 3330 Cost Accounting', 'ACCT 3340 Federal Taxation', 'ACCT 3350 Auditing', 'ACCT 3360 Accounting Information Systems'], description: 'Tax, audit, cost, and information systems for CPA preparation.' },
          { year: 4, title: 'CPA Prep & Capstone', courses: ['ACCT 4310 Advanced Auditing', 'ACCT 4320 Advanced Taxation', 'ACCT 4610 Accounting Internship', 'BUSI 4310 Strategic Management'], description: 'Advanced coursework and internship; 150-hour track for CPA eligibility.' },
        ],
        careers: [
          { title: 'Certified Public Accountant', medianSalary: 79880, growthRate: 0.06, description: 'Provide audit, tax, and advisory services.' },
          { title: 'Tax Accountant', medianSalary: 68000, growthRate: 0.04, description: 'Prepare tax returns and advise on tax strategy.' },
          { title: 'Internal Auditor', medianSalary: 74000, growthRate: 0.07, description: 'Evaluate organizational financial controls and compliance.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. COLLEGE OF LIBERAL ARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'tamucc',
    name: 'College of Liberal Arts',
    description: 'Diverse programs in the humanities and social sciences with strong connections to the Coastal Bend\'s multicultural community.',
    totalStudents: 2200,
    majors: [
      {
        name: 'Psychology',
        degreeType: 'B.A.',
        description: 'Comprehensive psychology program with research opportunities and preparation for graduate study in clinical, counseling, or industrial-organizational psychology.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['PSYC 1301 General Psychology', 'PSYC 1302 Developmental Psychology', 'MATH 1342 Statistics', 'ENGL 1301 Composition I'], description: 'Introduction to psychology and statistical methods.' },
          { year: 2, title: 'Core Psychology', courses: ['PSYC 2310 Abnormal Psychology', 'PSYC 2320 Social Psychology', 'PSYC 2330 Research Methods', 'PSYC 2340 Biological Psychology'], description: 'Core areas of psychology and research design.' },
          { year: 3, title: 'Applied Psychology', courses: ['PSYC 3310 Counseling Psychology', 'PSYC 3320 Cognitive Psychology', 'PSYC 3330 Industrial-Organizational Psychology', 'PSYC 3340 Psychological Assessment'], description: 'Applied coursework in counseling, cognition, and workplace psychology.' },
          { year: 4, title: 'Capstone & Practicum', courses: ['PSYC 4310 Senior Research', 'PSYC 4610 Psychology Practicum', 'PSYC Elective', 'GRE Prep'], description: 'Research project, field experience, and graduate school preparation.' },
        ],
        careers: [
          { title: 'Licensed Professional Counselor', medianSalary: 53710, growthRate: 0.18, description: 'Provide mental health counseling after graduate education and licensure.' },
          { title: 'I/O Psychology Consultant', medianSalary: 72000, growthRate: 0.06, description: 'Apply psychological principles to improve workplace performance.' },
          { title: 'Research Coordinator', medianSalary: 52000, growthRate: 0.10, description: 'Manage research studies in clinical or academic settings.' },
        ],
      },
      {
        name: 'Communication',
        degreeType: 'B.A.',
        description: 'Covers media production, public relations, and strategic communication with hands-on experience in campus media outlets.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['COMM 1301 Intro to Communication', 'COMM 1310 Public Speaking', 'ENGL 1301 Composition I', 'COMM 1320 Media Literacy'], description: 'Communication theory, public speaking, and media foundations.' },
          { year: 2, title: 'Core Communication', courses: ['COMM 2310 Interpersonal Communication', 'COMM 2320 Media Writing', 'COMM 2330 Visual Communication', 'COMM 2340 Communication Research'], description: 'Writing for media, visual storytelling, and research methods.' },
          { year: 3, title: 'Specialization', courses: ['COMM 3310 Public Relations', 'COMM 3320 Digital Media Production', 'COMM 3330 Strategic Communication', 'COMM 3340 Journalism'], description: 'PR campaigns, digital content creation, and journalism practice.' },
          { year: 4, title: 'Capstone & Internship', courses: ['COMM 4310 Communication Capstone', 'COMM 4610 Communication Internship', 'COMM Elective', 'Professional Elective'], description: 'Portfolio capstone and professional internship in media or PR.' },
        ],
        careers: [
          { title: 'Public Relations Specialist', medianSalary: 62810, growthRate: 0.08, description: 'Manage public image and media relations for organizations.' },
          { title: 'Social Media Manager', medianSalary: 56000, growthRate: 0.10, description: 'Create and manage social media presence for brands.' },
          { title: 'Video Producer', medianSalary: 60000, growthRate: 0.06, description: 'Produce video content for broadcast, web, and social platforms.' },
        ],
      },
      {
        name: 'English',
        degreeType: 'B.A.',
        description: 'Literature and writing program with tracks in creative writing, technical communication, and teaching certification.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ENGL 1301 Composition I', 'ENGL 1302 Composition II', 'ENGL 2310 Intro to Literature', 'HIST 1301 US History I'], description: 'Writing skills and introduction to literary study.' },
          { year: 2, title: 'Literary Survey', courses: ['ENGL 2320 British Literature', 'ENGL 2330 American Literature', 'ENGL 2340 World Literature', 'ENGL 2350 Intro to Creative Writing'], description: 'Survey of major literary traditions and creative writing introduction.' },
          { year: 3, title: 'Advanced Studies', courses: ['ENGL 3310 Literary Theory', 'ENGL 3320 Advanced Creative Writing', 'ENGL 3330 Rhetoric & Composition', 'ENGL Elective'], description: 'Literary criticism, advanced writing, and rhetorical theory.' },
          { year: 4, title: 'Capstone', courses: ['ENGL 4310 Senior Thesis', 'ENGL 4320 Professional Writing', 'ENGL Elective', 'Professional Elective'], description: 'Senior thesis or creative writing portfolio and career preparation.' },
        ],
        careers: [
          { title: 'Technical Writer', medianSalary: 59500, growthRate: 0.07, description: 'Write clear documentation for technical products and processes.' },
          { title: 'Editor', medianSalary: 55000, growthRate: 0.05, description: 'Review and improve written content for publications.' },
          { title: 'English Teacher', medianSalary: 61690, growthRate: 0.04, description: 'Teach English language arts at the secondary level.' },
        ],
      },
      {
        name: 'Political Science',
        degreeType: 'B.A.',
        description: 'Study government, policy, and political systems with opportunities for legislative internships and pre-law preparation.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['POLS 2301 American Government I', 'POLS 2302 American Government II', 'ENGL 1301 Composition I', 'HIST 1301 US History I'], description: 'American government and political foundations.' },
          { year: 2, title: 'Core Political Science', courses: ['POLS 2310 Comparative Government', 'POLS 2320 International Relations', 'POLS 2330 Political Theory', 'POLS 2340 Research Methods'], description: 'Comparative politics, international relations, and research design.' },
          { year: 3, title: 'Advanced Topics', courses: ['POLS 3310 Constitutional Law', 'POLS 3320 Public Policy', 'POLS 3330 Campaign & Elections', 'POLS Elective'], description: 'Legal foundations, policy analysis, and electoral politics.' },
          { year: 4, title: 'Capstone & Internship', courses: ['POLS 4310 Senior Seminar', 'POLS 4610 Political Science Internship', 'POLS Elective', 'LSAT/GRE Prep'], description: 'Capstone research and internship in government or nonprofit sectors.' },
        ],
        careers: [
          { title: 'Attorney (with J.D.)', medianSalary: 135740, growthRate: 0.06, description: 'Practice law after completing law school and passing the bar exam.' },
          { title: 'Legislative Aide', medianSalary: 48000, growthRate: 0.05, description: 'Support elected officials with policy research and constituent services.' },
          { title: 'Policy Analyst', medianSalary: 68000, growthRate: 0.06, description: 'Research and analyze public policies for government or think tanks.' },
        ],
      },
      {
        name: 'Criminal Justice',
        degreeType: 'B.S.',
        description: 'Prepares students for law enforcement, corrections, and legal careers with South Texas community partnerships.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CRIJ 1301 Intro to Criminal Justice', 'CRIJ 1310 Intro to Policing', 'PSYC 1301 General Psychology', 'ENGL 1301 Composition I'], description: 'Overview of criminal justice system components.' },
          { year: 2, title: 'Core Studies', courses: ['CRIJ 2310 Criminology', 'CRIJ 2320 Criminal Law', 'CRIJ 2330 Corrections', 'CRIJ 2340 Juvenile Justice'], description: 'Crime theory, legal foundations, and correctional systems.' },
          { year: 3, title: 'Specialization', courses: ['CRIJ 3310 Criminal Investigation', 'CRIJ 3320 Forensic Science', 'CRIJ 3330 Homeland Security', 'CRIJ 3340 White Collar Crime'], description: 'Investigation techniques, forensics, and emerging crime areas.' },
          { year: 4, title: 'Capstone & Internship', courses: ['CRIJ 4310 Senior Seminar', 'CRIJ 4610 CJ Internship', 'CRIJ Elective', 'Professional Elective'], description: 'Internship with law enforcement or legal agencies and capstone.' },
        ],
        careers: [
          { title: 'Police Officer', medianSalary: 65790, growthRate: 0.03, description: 'Protect communities and enforce local and state laws.' },
          { title: 'Border Patrol Agent', medianSalary: 68000, growthRate: 0.05, description: 'Enforce immigration laws and secure the US border.' },
          { title: 'Corrections Officer', medianSalary: 49000, growthRate: 0.04, description: 'Supervise inmates in federal, state, or local correctional facilities.' },
        ],
      },
      {
        name: 'Sociology',
        degreeType: 'B.A.',
        description: 'Study social structures, inequality, and community dynamics with research focus on the diverse Coastal Bend population.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['SOCI 1301 Intro to Sociology', 'SOCI 1302 Social Problems', 'MATH 1342 Statistics', 'ENGL 1301 Composition I'], description: 'Introduction to sociological thinking and social issues.' },
          { year: 2, title: 'Core Sociology', courses: ['SOCI 2310 Social Stratification', 'SOCI 2320 Race & Ethnicity', 'SOCI 2330 Research Methods', 'SOCI 2340 Social Theory'], description: 'Inequality, diversity, research design, and classical theory.' },
          { year: 3, title: 'Applied Sociology', courses: ['SOCI 3310 Urban Sociology', 'SOCI 3320 Medical Sociology', 'SOCI 3330 Family & Society', 'SOCI Elective'], description: 'Applied study of health, urban, and family systems.' },
          { year: 4, title: 'Capstone & Practicum', courses: ['SOCI 4310 Senior Research', 'SOCI 4610 Sociology Practicum', 'SOCI Elective', 'GRE Prep'], description: 'Original research project and community-based practicum.' },
        ],
        careers: [
          { title: 'Social Worker (with MSW)', medianSalary: 55350, growthRate: 0.09, description: 'Help individuals and families navigate social challenges after earning a graduate degree.' },
          { title: 'Community Outreach Coordinator', medianSalary: 48000, growthRate: 0.10, description: 'Connect underserved populations with community resources and services.' },
          { title: 'Market Research Analyst', medianSalary: 63920, growthRate: 0.13, description: 'Study consumer and social trends to inform business decisions.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. COLLEGE OF EDUCATION & HUMAN DEVELOPMENT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'tamucc',
    name: 'College of Education & Human Development',
    description: 'Prepares educators and counselors for South Texas communities through field-based learning and bilingual education expertise.',
    totalStudents: 1500,
    majors: [
      {
        name: 'Elementary Education',
        degreeType: 'B.S.Ed.',
        description: 'EC-6 teacher certification program with bilingual education emphasis and field placements in Corpus Christi ISD schools.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['EDUC 1301 Intro to Education', 'PSYC 1301 General Psychology', 'ENGL 1301 Composition I', 'MATH 1314 College Algebra'], description: 'Introduction to teaching and general education core.' },
          { year: 2, title: 'Pedagogy Core', courses: ['EDUC 2310 Child Development', 'EDUC 2320 Literacy Foundations', 'EDUC 2330 Bilingual Education Methods', 'Field Experience I'], description: 'Developmental theory and bilingual education strategies.' },
          { year: 3, title: 'Methods & Field Work', courses: ['EDUC 3310 Math Methods EC-6', 'EDUC 3320 Science Methods EC-6', 'EDUC 3330 Social Studies Methods', 'EDUC 3340 Reading Methods'], description: 'Subject-specific teaching methods with weekly field placements.' },
          { year: 4, title: 'Student Teaching & Certification', courses: ['EDUC 4610 Student Teaching', 'EDUC 4310 Classroom Management', 'TExES Prep Seminar'], description: 'Full-semester student teaching and TExES certification preparation.' },
        ],
        careers: [
          { title: 'Elementary School Teacher', medianSalary: 61690, growthRate: 0.04, description: 'Teach core subjects to students in grades K-6.' },
          { title: 'Bilingual Education Specialist', medianSalary: 65000, growthRate: 0.06, description: 'Support English language learners in dual-language programs.' },
          { title: 'Instructional Coach', medianSalary: 68000, growthRate: 0.07, description: 'Mentor and support teachers in improving instructional practice.' },
        ],
      },
      {
        name: 'Special Education',
        degreeType: 'B.S.Ed.',
        description: 'Prepares teachers to serve students with diverse learning needs through evidence-based practices and assistive technology.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['EDUC 1301 Intro to Education', 'SPED 1301 Intro to Special Education', 'PSYC 1301 General Psychology', 'ENGL 1301 Composition I'], description: 'Introduction to disability categories and inclusion principles.' },
          { year: 2, title: 'Assessment & Intervention', courses: ['SPED 2310 Assessment in Special Education', 'SPED 2320 Behavior Intervention', 'EDUC 2310 Child Development', 'Field Experience I'], description: 'Diagnostic assessment, IEP development, and behavior support.' },
          { year: 3, title: 'Instructional Methods', courses: ['SPED 3310 Methods for Learning Disabilities', 'SPED 3320 Methods for Autism Spectrum', 'SPED 3330 Assistive Technology', 'SPED 3340 Transition Services'], description: 'Specialized methods for LD, ASD, and transition-age students.' },
          { year: 4, title: 'Student Teaching & Certification', courses: ['SPED 4610 Student Teaching', 'SPED 4310 Collaboration Skills', 'TExES Prep Seminar'], description: 'Student teaching in inclusive settings and TExES certification prep.' },
        ],
        careers: [
          { title: 'Special Education Teacher', medianSalary: 62950, growthRate: 0.04, description: 'Teach and support students with disabilities in K-12 classrooms.' },
          { title: 'Autism Specialist', medianSalary: 58000, growthRate: 0.15, description: 'Provide specialized support for students on the autism spectrum.' },
          { title: 'Diagnostician', medianSalary: 72000, growthRate: 0.06, description: 'Evaluate students for special education eligibility and services.' },
        ],
      },
      {
        name: 'Counseling',
        degreeType: 'M.S.',
        description: 'Graduate program in clinical mental health and school counseling with practicum placements across the Coastal Bend region.',
        pathways: [
          { year: 1, title: 'Counseling Core', courses: ['CNEP 5301 Counseling Theories', 'CNEP 5310 Ethics & Professional Issues', 'CNEP 5320 Human Development', 'CNEP 5330 Multicultural Counseling'], description: 'Foundational counseling theories, ethics, and multicultural competence.' },
          { year: 2, title: 'Clinical Skills', courses: ['CNEP 6301 Counseling Techniques', 'CNEP 6310 Group Counseling', 'CNEP 6320 Assessment & Appraisal', 'CNEP 6330 Practicum'], description: 'Clinical skill development and supervised practicum experience.' },
          { year: 3, title: 'Internship', courses: ['CNEP 6340 Internship I', 'CNEP 6350 Internship II', 'CNEP 6360 Crisis Counseling', 'CNEP Elective'], description: 'Full supervised internship in clinical or school settings.' },
          { year: 4, title: 'Licensure Prep', courses: ['CNEP 6370 Advanced Clinical Practice', 'NCE/LPC Exam Prep'], description: 'Preparation for National Counselor Exam and state licensure.' },
        ],
        careers: [
          { title: 'Licensed Professional Counselor', medianSalary: 53710, growthRate: 0.18, description: 'Provide mental health counseling services in clinical settings.' },
          { title: 'School Counselor', medianSalary: 60510, growthRate: 0.10, description: 'Support student academic and social-emotional development in K-12 schools.' },
          { title: 'Substance Abuse Counselor', medianSalary: 49710, growthRate: 0.22, description: 'Help clients overcome addiction and substance use disorders.' },
        ],
      },
      {
        name: 'Educational Leadership',
        degreeType: 'Ed.D.',
        description: 'Doctoral program for experienced educators pursuing superintendent certification and district-level leadership.',
        pathways: [
          { year: 1, title: 'Leadership Foundations', courses: ['EDLD 7301 Advanced Educational Leadership', 'EDLD 7310 Education Policy', 'EDLD 7320 Quantitative Research', 'EDLD 7330 Qualitative Research'], description: 'Advanced leadership theory and research methodology.' },
          { year: 2, title: 'Applied Research', courses: ['EDLD 7340 Dissertation Seminar I', 'EDLD 7350 Organizational Change', 'EDLD 7360 School Improvement', 'EDLD 7370 Dissertation Seminar II'], description: 'Dissertation research and organizational leadership applications.' },
          { year: 3, title: 'Dissertation', courses: ['EDLD 7380 Dissertation I', 'EDLD 7390 Dissertation II', 'EDLD 7400 Dissertation Defense'], description: 'Complete and defend doctoral dissertation.' },
          { year: 4, title: 'Certification', courses: ['EDLD 7410 Superintendent Certification', 'EDLD 7420 District Leadership Practicum'], description: 'Superintendent certification and district-level leadership practicum.' },
        ],
        careers: [
          { title: 'Superintendent', medianSalary: 140000, growthRate: 0.04, description: 'Lead an entire school district including strategy, budget, and operations.' },
          { title: 'Associate Superintendent', medianSalary: 120000, growthRate: 0.05, description: 'Manage district-level academic or operational departments.' },
          { title: 'University Administrator', medianSalary: 102000, growthRate: 0.07, description: 'Lead academic programs or student services at the postsecondary level.' },
        ],
      },
    ],
  },
]
