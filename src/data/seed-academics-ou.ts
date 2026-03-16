// seed-academics-ou.ts — All University of Oklahoma colleges, majors, pathways & career outcomes
// Source: ou.edu, ou-public.courseleaf.com (2025-2026 academic year)

import type { CollegeDef } from './seed-academics-ttu'

export const ouColleges: CollegeDef[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. CHRISTOPHER C. GIBBS COLLEGE OF ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'Christopher C. Gibbs College of Architecture',
    description: 'Dedicated to training high-performing professionals to design resilient communities through architecture, construction science, interior design, and environmental design. NAAB-accredited 5-year B.Arch. program.',
    totalStudents: 1000,
    majors: [
      {
        name: 'Architecture',
        degreeType: 'B.Arch.',
        description: 'A NAAB-accredited five-year professional degree preparing students to become licensed architects. Studio-based curriculum with design-build projects and study-abroad options in Italy and Japan.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ARCH 1112 Design I', 'ARCH 1222 Design II', 'ARCH 1013 Architectural History I', 'MATH 1523 Pre-Calculus'], description: 'Introduction to design thinking, freehand drawing, and architectural history from antiquity through the Renaissance.' },
          { year: 2, title: 'Core Studios', courses: ['ARCH 2116 Design III', 'ARCH 2126 Design IV', 'ARCH 2213 Building Construction I', 'ARCH 2413 Structures I'], description: 'Develop spatial design skills with focus on construction methods, materials, and structural principles.' },
          { year: 3, title: 'Advanced Design', courses: ['ARCH 3116 Design V', 'ARCH 3126 Design VI', 'ARCH 3453 Environmental Systems I', 'ARCH 3223 Building Construction II'], description: 'Complex building design integrating environmental systems, codes, and sustainability.' },
          { year: 4, title: 'Comprehensive Studio', courses: ['ARCH 4116 Design VII', 'ARCH 4126 Design VIII', 'ARCH 4553 Professional Practice', 'ARCH Elective'], description: 'Comprehensive design projects addressing real-world site, program, and building performance challenges.' },
        ],
        careers: [
          { title: 'Architect', medianSalary: 82000, growthRate: 0.05, description: 'Design buildings and structures, managing projects from concept through construction administration.' },
          { title: 'Urban Designer', medianSalary: 78000, growthRate: 0.06, description: 'Plan and design urban spaces, neighborhoods, and public areas for cities and developers.' },
        ],
      },
      {
        name: 'Construction Science',
        degreeType: 'B.S.',
        description: 'Prepares students for construction project management through coursework in scheduling, estimating, safety, and building information modeling (BIM). Strong industry internship placement.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['CNST 1013 Intro to Construction', 'CNST 1112 Construction Graphics', 'MATH 1643 Business Calculus', 'ENGL 1113 Composition I'], description: 'Introduction to the construction industry, blueprint reading, and project documentation.' },
          { year: 2, title: 'Core Methods', courses: ['CNST 2113 Building Construction Methods', 'CNST 2123 Heavy Civil Construction', 'CNST 2213 Construction Safety', 'ACCT 2113 Accounting I'], description: 'Study commercial and civil construction methods, safety management, and cost fundamentals.' },
          { year: 3, title: 'Project Management', courses: ['CNST 3113 Estimating I', 'CNST 3213 Scheduling', 'CNST 3313 Construction Law', 'CNST 3413 Mechanical & Electrical Systems'], description: 'Master cost estimation, scheduling with CPM software, and construction contract law.' },
          { year: 4, title: 'Capstone', courses: ['CNST 4113 Estimating II', 'CNST 4213 Project Management', 'CNST 4313 Capstone', 'CNST Elective'], description: 'Capstone project managing a full construction project from bid to completion. Excellent industry job placement.' },
        ],
        careers: [
          { title: 'Construction Project Manager', medianSalary: 98000, growthRate: 0.08, description: 'Plan, coordinate, and oversee construction projects from start to finish.' },
          { title: 'Cost Estimator', medianSalary: 72000, growthRate: 0.04, description: 'Prepare cost estimates for construction projects by analyzing blueprints, specs, and proposals.' },
        ],
      },
      {
        name: 'Interior Design',
        degreeType: 'B.I.D.',
        description: 'CIDA-accredited program combining design creativity with technical knowledge. Studio-based learning with real client projects and professional internship requirements.',
        pathways: [
          { year: 1, title: 'Design Foundations', courses: ['ID 1013 Intro to Interior Design', 'ID 1112 Design Studio I', 'ART 1013 Art History Survey', 'ENGL 1113 Composition I'], description: 'Introduction to design elements, color theory, and spatial composition.' },
          { year: 2, title: 'Core Studios', courses: ['ID 2116 Design Studio III', 'ID 2126 Design Studio IV', 'ID 2213 Materials & Textiles', 'ID 2313 History of Interiors'], description: 'Residential and commercial projects exploring materials, space planning, and design history.' },
          { year: 3, title: 'Advanced Practice', courses: ['ID 3116 Design Studio V', 'ID 3126 Design Studio VI', 'ID 3213 Lighting Design', 'ID 3313 Building Systems'], description: 'Complex commercial projects integrating lighting, codes, accessibility, and sustainability.' },
          { year: 4, title: 'Professional Capstone', courses: ['ID 4116 Design Studio VII', 'ID 4013 Professional Practice', 'ID 4970 Internship', 'ID Elective'], description: 'Senior thesis project and required professional internship. Graduates eligible for NCIDQ certification.' },
        ],
        careers: [
          { title: 'Interior Designer', medianSalary: 62000, growthRate: 0.04, description: 'Design functional and aesthetically pleasing interior spaces for residential and commercial clients.' },
          { title: 'Space Planner', medianSalary: 68000, growthRate: 0.05, description: 'Optimize interior spaces for corporate offices, healthcare facilities, and retail environments.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. DODGE FAMILY COLLEGE OF ARTS & SCIENCES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'Dodge Family College of Arts & Sciences',
    description: 'The largest college at OU with over 10,000 students across 27 departments, offering 60+ majors spanning natural sciences, social sciences, humanities, and professional programs. Home to world-class research in weather, energy, and indigenous studies.',
    totalStudents: 10200,
    majors: [
      {
        name: 'Biology',
        degreeType: 'B.S.',
        description: 'Comprehensive biology program with four concentrations: Ecology & Evolution, Integrative Biological Systems, Microbiology, and Molecular/Cellular/Developmental Biology. Strong pre-med pathway.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['BIOL 1114 Intro to Zoology', 'BIOL 1124 Intro to Botany', 'CHEM 1315 General Chemistry I', 'MATH 1823 Calculus I'], description: 'Introduction to animal and plant biology with chemistry and math foundations.' },
          { year: 2, title: 'Core Biology', courses: ['BIOL 3113 Genetics', 'BIOL 3023 Ecology', 'CHEM 3053 Organic Chemistry I', 'PHYS 2514 Physics I'], description: 'Genetics, ecology, organic chemistry, and physics — core pre-med and research prerequisites.' },
          { year: 3, title: 'Specialization', courses: ['BIOL 3413 Cell Biology', 'BIOL 4123 Molecular Biology', 'BIOL 4473 Immunology', 'BIOL Elective'], description: 'Choose concentration area and dive deep into advanced topics. Many join faculty research labs.' },
          { year: 4, title: 'Senior Research', courses: ['BIOL 4970 Research', 'BIOL 4513 Senior Seminar', 'BIOL Elective', 'Free Elective'], description: 'Independent research project and preparation for graduate/medical school or industry careers.' },
        ],
        careers: [
          { title: 'Biomedical Scientist', medianSalary: 78000, growthRate: 0.10, description: 'Conduct research in biomedical labs at universities, hospitals, or pharmaceutical companies.' },
          { title: 'Physician (with M.D.)', medianSalary: 229000, growthRate: 0.03, description: 'Diagnose and treat patients — OU has a top medical school pathway on the Health Sciences Center campus.' },
        ],
      },
      {
        name: 'Biochemistry',
        degreeType: 'B.S.',
        description: 'Interdisciplinary program at the interface of chemistry and biology, ideal for pre-med students and those interested in pharmaceutical research, genomics, or biotechnology.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['CHEM 1315 General Chemistry I', 'CHEM 1415 General Chemistry II', 'BIOL 1114 Intro to Zoology', 'MATH 1823 Calculus I'], description: 'Strong chemistry and biology foundations with calculus.' },
          { year: 2, title: 'Organic & Analytical', courses: ['CHEM 3053 Organic Chemistry I', 'CHEM 3153 Organic Chemistry II', 'CHEM 3013 Analytical Chemistry', 'PHYS 2514 Physics I'], description: 'Organic chemistry sequence, analytical methods, and physics.' },
          { year: 3, title: 'Biochemistry Core', courses: ['BMSC 3613 Biochemistry I', 'BMSC 3623 Biochemistry II', 'BIOL 3113 Genetics', 'BIOL 3413 Cell Biology'], description: 'Protein structure, enzyme kinetics, metabolism, and molecular genetics.' },
          { year: 4, title: 'Advanced Research', courses: ['BMSC 4970 Research', 'BMSC 4513 Advanced Biochemistry', 'BMSC Elective', 'Free Elective'], description: 'Independent research in faculty labs; strong placement into medical and graduate programs.' },
        ],
        careers: [
          { title: 'Biochemist', medianSalary: 82000, growthRate: 0.11, description: 'Study chemical processes in living organisms at pharmaceutical, biotech, or research institutions.' },
          { title: 'Pharmaceutical Scientist', medianSalary: 95000, growthRate: 0.08, description: 'Develop and test new drugs and therapies for pharmaceutical companies.' },
        ],
      },
      {
        name: 'Chemistry',
        degreeType: 'B.S.',
        description: 'ACS-certified program with specializations in organic, inorganic, analytical, and physical chemistry. Access to state-of-the-art instrumentation and undergraduate research opportunities.',
        pathways: [
          { year: 1, title: 'General Chemistry', courses: ['CHEM 1315 General Chemistry I', 'CHEM 1415 General Chemistry II', 'MATH 1823 Calculus I', 'MATH 2423 Calculus II'], description: 'Foundational chemistry with calculus sequence.' },
          { year: 2, title: 'Organic & Analytical', courses: ['CHEM 3053 Organic Chemistry I', 'CHEM 3153 Organic Chemistry II', 'CHEM 3013 Analytical Chemistry', 'PHYS 2514 Physics I'], description: 'Organic synthesis, analytical techniques, and physics.' },
          { year: 3, title: 'Physical & Inorganic', courses: ['CHEM 3513 Physical Chemistry I', 'CHEM 3523 Physical Chemistry II', 'CHEM 4113 Inorganic Chemistry', 'CHEM Elective'], description: 'Thermodynamics, quantum mechanics, and inorganic chemistry.' },
          { year: 4, title: 'Advanced Topics', courses: ['CHEM 4970 Research', 'CHEM 4313 Instrumental Analysis', 'CHEM Elective', 'Free Elective'], description: 'Independent research, advanced instrumentation, and preparation for graduate school or industry.' },
        ],
        careers: [
          { title: 'Chemist', medianSalary: 80000, growthRate: 0.06, description: 'Analyze substances, develop new materials, or conduct research in chemical companies and labs.' },
          { title: 'Environmental Chemist', medianSalary: 76000, growthRate: 0.08, description: 'Study chemical processes in the environment — relevant to Oklahoma\'s energy industry.' },
        ],
      },
      {
        name: 'Psychology',
        degreeType: 'B.A.',
        description: 'One of the most popular majors at OU, offering both B.A. and B.S. tracks. Research opportunities in clinical, developmental, cognitive, and social psychology with faculty mentorship.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['PSY 1113 Intro to Psychology', 'PSY 2003 Statistics for Psychology', 'ENGL 1113 Composition I', 'MATH 1643 Business Calculus'], description: 'Introduction to major psychological perspectives and research methods.' },
          { year: 2, title: 'Core Areas', courses: ['PSY 2603 Developmental Psychology', 'PSY 2403 Abnormal Psychology', 'PSY 3003 Research Methods', 'PSY 2113 Social Psychology'], description: 'Study human development, psychopathology, research design, and social behavior.' },
          { year: 3, title: 'Specialization', courses: ['PSY 3503 Cognitive Psychology', 'PSY 3313 Psychology of Learning', 'PSY 4413 Clinical Psychology', 'PSY Elective'], description: 'Choose focus areas and gain research experience in faculty labs.' },
          { year: 4, title: 'Capstone', courses: ['PSY 4513 Senior Seminar', 'PSY 4970 Research', 'PSY Elective', 'Free Elective'], description: 'Senior research project and career preparation for graduate school or professional paths.' },
        ],
        careers: [
          { title: 'Clinical Psychologist (with Ph.D.)', medianSalary: 90000, growthRate: 0.06, description: 'Diagnose and treat mental health disorders through therapy and assessment.' },
          { title: 'Human Resources Specialist', medianSalary: 65000, growthRate: 0.08, description: 'Apply psychological principles to recruitment, training, and organizational development.' },
        ],
      },
      {
        name: 'Political Science',
        degreeType: 'B.A.',
        description: 'Study American government, comparative politics, international relations, and political theory. Strong pre-law pipeline with access to OU\'s Carl Albert Congressional Research Center.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['PSC 1113 American Government', 'PSC 2013 Intro to Political Science', 'ENGL 1113 Composition I', 'HIST 1483 American History'], description: 'Introduction to American government, political theory, and foundational writing skills.' },
          { year: 2, title: 'Subfield Exploration', courses: ['PSC 3113 Comparative Politics', 'PSC 3213 International Relations', 'PSC 3013 Political Analysis', 'PSC 2213 State & Local Government'], description: 'Explore major subfields: comparative, international relations, and political analysis methods.' },
          { year: 3, title: 'Advanced Topics', courses: ['PSC 4113 Constitutional Law', 'PSC 4213 American Foreign Policy', 'PSC 4013 Political Theory', 'PSC Elective'], description: 'Constitutional law, foreign policy, and political philosophy — key pre-law and pre-grad preparation.' },
          { year: 4, title: 'Senior Research', courses: ['PSC 4513 Senior Seminar', 'PSC 4970 Internship', 'PSC Elective', 'Free Elective'], description: 'Senior thesis and internship at state capitol, congressional offices, or advocacy organizations.' },
        ],
        careers: [
          { title: 'Attorney (with J.D.)', medianSalary: 127000, growthRate: 0.06, description: 'Practice law in government, corporate, or public interest settings — OU has a strong law school.' },
          { title: 'Policy Analyst', medianSalary: 65000, growthRate: 0.06, description: 'Research and analyze public policy for government agencies, think tanks, or nonprofits.' },
        ],
      },
      {
        name: 'Economics',
        degreeType: 'B.A.',
        description: 'Study microeconomics, macroeconomics, econometrics, and applied economic analysis. Excellent preparation for careers in finance, consulting, government, and graduate programs.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['ECON 1113 Microeconomics', 'ECON 1123 Macroeconomics', 'MATH 1823 Calculus I', 'ENGL 1113 Composition I'], description: 'Principles of micro and macroeconomics with calculus for quantitative analysis.' },
          { year: 2, title: 'Intermediate Theory', courses: ['ECON 3113 Intermediate Microeconomics', 'ECON 3123 Intermediate Macroeconomics', 'ECON 2843 Statistics', 'MATH 2423 Calculus II'], description: 'Mathematical economic theory, statistical methods, and economic modeling.' },
          { year: 3, title: 'Applied Economics', courses: ['ECON 3843 Econometrics', 'ECON 4213 Labor Economics', 'ECON 4313 Public Finance', 'ECON Elective'], description: 'Econometric analysis, labor markets, and public sector economics.' },
          { year: 4, title: 'Senior Topics', courses: ['ECON 4513 Senior Seminar', 'ECON 4413 International Economics', 'ECON Elective', 'Free Elective'], description: 'Senior research paper and advanced electives. Many graduates enter top economics Ph.D. or MBA programs.' },
        ],
        careers: [
          { title: 'Economist', medianSalary: 105000, growthRate: 0.06, description: 'Analyze economic data and trends for government agencies, consulting firms, or financial institutions.' },
          { title: 'Financial Analyst', medianSalary: 80000, growthRate: 0.09, description: 'Evaluate investments and financial data for corporations and investment firms.' },
        ],
      },
      {
        name: 'Communication',
        degreeType: 'B.A.',
        description: 'Study interpersonal, organizational, and mediated communication with tracks in health communication, political communication, and organizational leadership.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['COMM 1113 Public Speaking', 'COMM 2113 Intro to Communication', 'ENGL 1113 Composition I', 'General Education Elective'], description: 'Develop foundational speaking, writing, and communication theory skills.' },
          { year: 2, title: 'Communication Theory', courses: ['COMM 3113 Persuasion', 'COMM 3213 Organizational Communication', 'COMM 3013 Communication Research', 'COMM 2313 Interpersonal Communication'], description: 'Study persuasion, organizational dynamics, and communication research methods.' },
          { year: 3, title: 'Specialization', courses: ['COMM 4113 Health Communication', 'COMM 4213 Political Communication', 'COMM 4313 Intercultural Communication', 'COMM Elective'], description: 'Choose a concentration in health, political, or intercultural communication.' },
          { year: 4, title: 'Capstone', courses: ['COMM 4513 Senior Capstone', 'COMM 4970 Internship', 'COMM Elective', 'Free Elective'], description: 'Capstone project and professional internship in corporate, healthcare, or media settings.' },
        ],
        careers: [
          { title: 'Corporate Communications Manager', medianSalary: 78000, growthRate: 0.08, description: 'Manage internal and external communications for corporations and organizations.' },
          { title: 'Health Communication Specialist', medianSalary: 62000, growthRate: 0.12, description: 'Develop health education campaigns for hospitals, nonprofits, and government agencies.' },
        ],
      },
      {
        name: 'English',
        degreeType: 'B.A.',
        description: 'Study literature, creative writing, rhetoric, and professional writing with tracks in literary studies, creative writing, and writing for industry. Award-winning faculty and student literary magazine.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['ENGL 1113 Composition I', 'ENGL 1213 Composition II', 'ENGL 2413 Intro to Literature', 'General Education Elective'], description: 'Writing fundamentals and introduction to literary analysis.' },
          { year: 2, title: 'Literary Periods', courses: ['ENGL 3123 British Literature I', 'ENGL 3133 British Literature II', 'ENGL 3223 American Literature', 'ENGL 2713 Creative Writing'], description: 'Survey of British and American literature with introduction to creative writing.' },
          { year: 3, title: 'Advanced Topics', courses: ['ENGL 4113 Shakespeare', 'ENGL 4213 Modern American Fiction', 'ENGL 4713 Advanced Creative Writing', 'ENGL Elective'], description: 'Deep study of major authors, genres, and advanced creative or professional writing.' },
          { year: 4, title: 'Senior Thesis', courses: ['ENGL 4513 Senior Seminar', 'ENGL 4970 Honors Thesis', 'ENGL Elective', 'Free Elective'], description: 'Senior thesis or creative portfolio. Graduates enter publishing, education, law school, and media.' },
        ],
        careers: [
          { title: 'Editor / Content Strategist', medianSalary: 65000, growthRate: 0.05, description: 'Edit publications, manage content strategy, or oversee editorial teams at media companies.' },
          { title: 'Technical Writer', medianSalary: 78000, growthRate: 0.07, description: 'Create technical documentation, user guides, and professional materials for organizations.' },
        ],
      },
      {
        name: 'History',
        degreeType: 'B.A.',
        description: 'Study American, European, and world history with access to OU\'s Western History Collections and the Carl Albert Congressional Research & Studies Center.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['HIST 1483 American History to 1865', 'HIST 1493 American History since 1865', 'ENGL 1113 Composition I', 'General Education Elective'], description: 'Survey of American history and development of writing and critical thinking skills.' },
          { year: 2, title: 'World & Methods', courses: ['HIST 1613 Western Civilization I', 'HIST 1623 Western Civilization II', 'HIST 3013 Historical Methods', 'HIST Elective'], description: 'Western civilization surveys and introduction to historical research methods.' },
          { year: 3, title: 'Specialization', courses: ['HIST 3613 Civil War & Reconstruction', 'HIST 4113 History of Oklahoma', 'HIST 4213 20th Century America', 'HIST Elective'], description: 'Advanced coursework in chosen areas; many use the extensive OU archival collections.' },
          { year: 4, title: 'Senior Research', courses: ['HIST 4513 Senior Seminar', 'HIST 4970 Research', 'HIST Elective', 'Free Elective'], description: 'Original archival research project. Excellent preparation for law school, public history, or graduate programs.' },
        ],
        careers: [
          { title: 'Museum Curator / Archivist', medianSalary: 52000, growthRate: 0.12, description: 'Manage collections, design exhibits, and preserve historical records at museums and archives.' },
          { title: 'Attorney (with J.D.)', medianSalary: 127000, growthRate: 0.06, description: 'History develops the research, writing, and analytical skills central to legal practice.' },
        ],
      },
      {
        name: 'Mathematics',
        degreeType: 'B.S.',
        description: 'Professional mathematics track preparing students for careers in data science, actuarial science, finance, and graduate programs. Strong computational and theoretical foundations.',
        pathways: [
          { year: 1, title: 'Calculus Sequence', courses: ['MATH 1823 Calculus I', 'MATH 2423 Calculus II', 'MATH 2924 Calculus IV', 'CS 1313 Programming'], description: 'Complete calculus sequence and introduction to programming for mathematical computation.' },
          { year: 2, title: 'Core Mathematics', courses: ['MATH 3333 Linear Algebra', 'MATH 3413 Differential Equations', 'MATH 3113 Abstract Algebra', 'MATH 2813 Statistics'], description: 'Linear algebra, differential equations, and introduction to abstract and applied mathematics.' },
          { year: 3, title: 'Advanced Topics', courses: ['MATH 4023 Real Analysis I', 'MATH 4113 Complex Analysis', 'MATH 4213 Probability', 'MATH Elective'], description: 'Rigorous proof-based courses in analysis and probability theory.' },
          { year: 4, title: 'Senior Project', courses: ['MATH 4513 Senior Seminar', 'MATH 4413 Numerical Analysis', 'MATH Elective', 'Free Elective'], description: 'Senior research project; graduates enter data science, actuarial science, finance, or Ph.D. programs.' },
        ],
        careers: [
          { title: 'Actuary', medianSalary: 115000, growthRate: 0.21, description: 'Analyze financial risk using mathematics and statistics for insurance and financial companies.' },
          { title: 'Data Scientist', medianSalary: 108000, growthRate: 0.36, description: 'Apply mathematical modeling and statistical analysis to solve complex business problems.' },
        ],
      },
      {
        name: 'Sociology',
        degreeType: 'B.A.',
        description: 'Study social structures, inequality, race, crime, and institutions with concentrations in general sociology and criminology. Research opportunities with the OU Institute for Social Research.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['SOC 1113 Intro to Sociology', 'SOC 2113 Social Problems', 'ENGL 1113 Composition I', 'General Education Elective'], description: 'Introduction to sociological perspectives and contemporary social issues.' },
          { year: 2, title: 'Core Sociology', courses: ['SOC 3113 Social Research Methods', 'SOC 3213 Social Statistics', 'SOC 3413 Criminology', 'SOC 3313 Race & Ethnicity'], description: 'Research methods, data analysis, and study of crime, race, and social inequality.' },
          { year: 3, title: 'Specialization', courses: ['SOC 4113 Social Stratification', 'SOC 4213 Deviance & Social Control', 'SOC 4313 Urban Sociology', 'SOC Elective'], description: 'Advanced study in chosen concentration — general sociology or criminology track.' },
          { year: 4, title: 'Capstone', courses: ['SOC 4513 Senior Seminar', 'SOC 4970 Internship', 'SOC Elective', 'Free Elective'], description: 'Capstone research and internship at criminal justice agencies, social services, or research centers.' },
        ],
        careers: [
          { title: 'Social Worker (with MSW)', medianSalary: 55000, growthRate: 0.09, description: 'Help individuals and families navigate social services, mental health, and crisis situations.' },
          { title: 'Criminal Justice Analyst', medianSalary: 60000, growthRate: 0.06, description: 'Analyze crime data and criminal justice policy for law enforcement and government agencies.' },
        ],
      },
      {
        name: 'Native American Studies',
        degreeType: 'B.A.',
        description: 'One of the premier indigenous studies programs in the nation, studying the history, culture, politics, and contemporary issues of Native peoples. Oklahoma is home to 39 tribal nations.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['NAS 1003 Intro to Native American Studies', 'NAS 2003 Native Peoples of North America', 'ENGL 1113 Composition I', 'HIST 1483 American History'], description: 'Introduction to Native American history, cultures, and sovereignty within the American context.' },
          { year: 2, title: 'Core Studies', courses: ['NAS 3013 Federal Indian Law & Policy', 'NAS 3113 Native American Literature', 'NAS 3213 Native American Art', 'NAS Elective'], description: 'Federal Indian law, tribal sovereignty, Native literature, and artistic traditions.' },
          { year: 3, title: 'Specialization', courses: ['NAS 4013 Tribal Government', 'NAS 4113 Indigenous Health', 'NAS 4213 Native Language Revitalization', 'NAS Elective'], description: 'Advanced study in tribal governance, health disparities, and language preservation.' },
          { year: 4, title: 'Capstone', courses: ['NAS 4513 Senior Seminar', 'NAS 4970 Internship', 'NAS Elective', 'Free Elective'], description: 'Senior thesis and tribal internship; many graduates work for tribal governments, Indian Health Service, or federal agencies.' },
        ],
        careers: [
          { title: 'Tribal Government Administrator', medianSalary: 58000, growthRate: 0.08, description: 'Manage programs and services for tribal nations — Oklahoma has the highest Native population in the U.S.' },
          { title: 'Federal Indian Affairs Specialist', medianSalary: 72000, growthRate: 0.06, description: 'Work at the Bureau of Indian Affairs or other federal agencies on tribal consultation and policy.' },
        ],
      },
      {
        name: 'Health and Exercise Science',
        degreeType: 'B.S.',
        description: 'Interdisciplinary program combining exercise physiology and health promotion. One of the largest majors in Arts & Sciences, preparing students for careers in fitness, wellness, physical therapy, and public health.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['HES 1823 Intro to Health & Exercise Science', 'BIOL 1114 Intro to Zoology', 'CHEM 1315 General Chemistry I', 'MATH 1643 Business Calculus'], description: 'Introduction to the field with biology and chemistry foundations.' },
          { year: 2, title: 'Core Science', courses: ['HES 2813 Anatomy & Physiology I', 'HES 2823 Anatomy & Physiology II', 'HES 2013 Nutrition', 'PSY 1113 Intro to Psychology'], description: 'Human anatomy, physiology, and nutrition — the scientific basis for exercise and health.' },
          { year: 3, title: 'Exercise Science', courses: ['HES 3013 Exercise Physiology', 'HES 3113 Kinesiology', 'HES 3213 Exercise Testing', 'HES Elective'], description: 'Study how the body responds to exercise and learn clinical assessment techniques.' },
          { year: 4, title: 'Professional Prep', courses: ['HES 4013 Senior Seminar', 'HES 4970 Internship', 'HES Elective', 'Free Elective'], description: 'Clinical internship and preparation for DPT, PA, or exercise science graduate programs.' },
        ],
        careers: [
          { title: 'Physical Therapist (with DPT)', medianSalary: 97000, growthRate: 0.15, description: 'Diagnose and treat movement disorders — HES is the top pre-PT pathway at OU.' },
          { title: 'Exercise Physiologist', medianSalary: 52000, growthRate: 0.10, description: 'Design fitness and rehabilitation programs for hospitals, clinics, and wellness centers.' },
        ],
      },
      {
        name: 'Social Work',
        degreeType: 'B.A.',
        description: 'CSWE-accredited program preparing students for direct social work practice with individuals, families, and communities. Strong field practicum with 400+ hours of supervised experience.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['SWK 2113 Intro to Social Work', 'SOC 1113 Intro to Sociology', 'PSY 1113 Intro to Psychology', 'ENGL 1113 Composition I'], description: 'Introduction to social work values, ethics, and the profession alongside social science foundations.' },
          { year: 2, title: 'Human Behavior', courses: ['SWK 3113 Human Behavior & Social Environment I', 'SWK 3123 Human Behavior & Social Environment II', 'SWK 3213 Social Welfare Policy', 'SWK 3013 Diversity & Oppression'], description: 'Study human development, social policy, and the impact of systemic oppression.' },
          { year: 3, title: 'Practice Methods', courses: ['SWK 3313 Social Work Practice I', 'SWK 3323 Social Work Practice II', 'SWK 3413 Research Methods', 'SWK Elective'], description: 'Learn clinical interviewing, assessment, and intervention skills with individuals and groups.' },
          { year: 4, title: 'Field Practicum', courses: ['SWK 4113 Field Practicum I', 'SWK 4123 Field Practicum II', 'SWK 4213 Advanced Practice', 'SWK Elective'], description: '400+ hours of supervised field work at social service agencies, hospitals, or schools.' },
        ],
        careers: [
          { title: 'Social Worker', medianSalary: 55000, growthRate: 0.09, description: 'Help individuals and families access resources, navigate crises, and improve well-being.' },
          { title: 'Child Welfare Specialist', medianSalary: 48000, growthRate: 0.10, description: 'Protect children through investigation, case management, and family services.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. MICHAEL F. PRICE COLLEGE OF BUSINESS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'Michael F. Price College of Business',
    description: 'A nationally ranked business school offering 12 BBA majors with strong alumni networks in energy, finance, and entrepreneurship across the Southwest. Home to the Steed School of Accounting and the Center for the Creation of Economic Wealth.',
    totalStudents: 6100,
    majors: [
      {
        name: 'Finance',
        degreeType: 'B.B.A.',
        description: 'Investment analysis, energy finance, and corporate strategy with Bloomberg Terminal access and case competition teams. Unique energy finance concentration leveraging Oklahoma\'s oil and gas industry.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ECON 1113 Microeconomics', 'ACCT 2113 Accounting I', 'MATH 1743 Business Calculus', 'ENGL 1113 Composition I'], description: 'Foundational business and economics coursework.' },
          { year: 2, title: 'Finance Core', courses: ['FIN 3303 Corporate Finance', 'FIN 3403 Investments', 'ACCT 2123 Accounting II', 'MIS 2113 Business Statistics'], description: 'Corporate valuation, portfolio theory, and financial statement analysis.' },
          { year: 3, title: 'Advanced Finance', courses: ['FIN 4213 Financial Modeling', 'FIN 4303 Energy Finance', 'FIN 4403 Derivatives', 'FIN Elective'], description: 'Bloomberg Terminal modeling, energy finance (Oklahoma specialty), and derivatives pricing.' },
          { year: 4, title: 'Career Prep', courses: ['FIN 4503 Senior Finance Seminar', 'FIN Elective', 'Business Elective', 'Free Elective'], description: 'Capstone and career preparation; strong alumni network in energy and banking.' },
        ],
        careers: [
          { title: 'Financial Analyst', medianSalary: 80000, growthRate: 0.09, description: 'Analyze financial data and build models to support investment and business decisions.' },
          { title: 'Energy Finance Analyst', medianSalary: 95000, growthRate: 0.07, description: 'Specialize in financing energy projects — a unique Oklahoma advantage.' },
        ],
      },
      {
        name: 'Accounting',
        degreeType: 'B.B.A.',
        description: 'Steed School of Accounting program preparing students for CPA licensure. Features a 5-year integrated B.B.A./M.Acc. pathway and strong Big Four recruiting pipeline.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ACCT 2113 Accounting I', 'ECON 1113 Microeconomics', 'MATH 1743 Business Calculus', 'ENGL 1113 Composition I'], description: 'Introduction to financial accounting and core business coursework.' },
          { year: 2, title: 'Accounting Core', courses: ['ACCT 2123 Accounting II', 'ACCT 3113 Intermediate Accounting I', 'ACCT 3123 Intermediate Accounting II', 'MIS 2113 Business Statistics'], description: 'Deep dive into financial reporting standards, revenue recognition, and asset valuation.' },
          { year: 3, title: 'Advanced Accounting', courses: ['ACCT 3213 Cost Accounting', 'ACCT 3313 Tax Accounting', 'ACCT 4113 Auditing', 'ACCT Elective'], description: 'Cost management, tax preparation, and audit methodology. Many secure Big Four internships.' },
          { year: 4, title: 'CPA Preparation', courses: ['ACCT 4213 Advanced Accounting', 'ACCT 4313 Governmental Accounting', 'ACCT Elective', 'Business Elective'], description: 'Complete 150-hour requirement for CPA eligibility; many continue to M.Acc. program.' },
        ],
        careers: [
          { title: 'Certified Public Accountant', medianSalary: 78000, growthRate: 0.06, description: 'Perform audits, prepare tax returns, and advise clients at public accounting firms.' },
          { title: 'Controller', medianSalary: 110000, growthRate: 0.07, description: 'Oversee all accounting operations and financial reporting for organizations.' },
        ],
      },
      {
        name: 'Management Information Systems',
        degreeType: 'B.B.A.',
        description: 'IT management, data analytics, and enterprise systems with Fortune 500 internship placements. Bridge business and technology with cybersecurity and cloud computing coursework.',
        pathways: [
          { year: 1, title: 'Business & Tech Foundations', courses: ['MIS 2113 Intro to MIS', 'ECON 1113 Microeconomics', 'CS 1313 Programming for Non-Majors', 'ENGL 1113 Composition I'], description: 'Introduction to information systems, basic programming, and business.' },
          { year: 2, title: 'Core MIS', courses: ['MIS 3013 Systems Analysis', 'MIS 3113 Database Management', 'MIS 3213 Business Analytics', 'ACCT 2113 Accounting I'], description: 'Learn to analyze business requirements, design databases, and work with data.' },
          { year: 3, title: 'Enterprise Systems', courses: ['MIS 4013 Enterprise Architecture', 'MIS 4113 Cybersecurity', 'MIS 4213 Cloud Computing', 'MIS Elective'], description: 'Enterprise IT strategy, security, and cloud platforms; many complete Fortune 500 internships.' },
          { year: 4, title: 'Capstone', courses: ['MIS 4513 MIS Capstone', 'MIS Elective', 'Business Elective', 'Free Elective'], description: 'IT consulting capstone with a real-world business client.' },
        ],
        careers: [
          { title: 'IT Consultant', medianSalary: 88000, growthRate: 0.11, description: 'Advise businesses on technology strategy and system implementations.' },
          { title: 'Business Analyst', medianSalary: 82000, growthRate: 0.14, description: 'Bridge business needs and technology solutions at enterprise companies.' },
        ],
      },
      {
        name: 'Marketing',
        degreeType: 'B.B.A.',
        description: 'Study consumer behavior, digital marketing, brand management, and marketing analytics. Features a student-run advertising agency and case competitions.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['MKT 3013 Marketing', 'ECON 1113 Microeconomics', 'MATH 1743 Business Calculus', 'ENGL 1113 Composition I'], description: 'Introduction to marketing principles and business fundamentals.' },
          { year: 2, title: 'Marketing Core', courses: ['MKT 3113 Consumer Behavior', 'MKT 3213 Marketing Research', 'MKT 3313 Digital Marketing', 'MIS 2113 Business Statistics'], description: 'Study consumer psychology, market research methods, and digital marketing strategy.' },
          { year: 3, title: 'Specialization', courses: ['MKT 4113 Brand Management', 'MKT 4213 Sales Management', 'MKT 4313 Marketing Analytics', 'MKT Elective'], description: 'Advanced brand strategy, sales, and data-driven marketing decisions.' },
          { year: 4, title: 'Capstone', courses: ['MKT 4513 Marketing Strategy Capstone', 'MKT Elective', 'Business Elective', 'Free Elective'], description: 'Strategic marketing plan capstone for a real company. Strong placement in CPG, tech, and media.' },
        ],
        careers: [
          { title: 'Marketing Manager', medianSalary: 80000, growthRate: 0.10, description: 'Develop and execute marketing strategies to drive brand awareness and revenue growth.' },
          { title: 'Digital Marketing Specialist', medianSalary: 65000, growthRate: 0.18, description: 'Manage SEO, paid media, social campaigns, and email marketing for organizations.' },
        ],
      },
      {
        name: 'Energy Management',
        degreeType: 'B.B.A.',
        description: 'The only undergraduate energy management program in the nation at a major business school. Covers petroleum land, energy trading, sustainability, and regulatory policy. Uniquely positioned in Oklahoma\'s energy capital.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ECON 1113 Microeconomics', 'ACCT 2113 Accounting I', 'MATH 1743 Business Calculus', 'EM 1003 Intro to Energy Industry'], description: 'Business foundations with introduction to the global energy landscape.' },
          { year: 2, title: 'Energy Core', courses: ['EM 2113 Petroleum Land Management', 'EM 2213 Energy Accounting', 'FIN 3303 Corporate Finance', 'EM 2313 Energy Law'], description: 'Land management, energy-specific accounting, and the legal framework of energy production.' },
          { year: 3, title: 'Advanced Energy', courses: ['EM 3113 Energy Trading', 'EM 3213 Energy Policy & Regulation', 'EM 3313 Renewable Energy Business', 'EM Elective'], description: 'Commodity trading, energy policy, and the business of renewables and sustainability.' },
          { year: 4, title: 'Capstone', courses: ['EM 4113 Energy Capstone', 'EM Elective', 'Business Elective', 'Free Elective'], description: 'Industry capstone with Oklahoma energy companies; outstanding job placement in oil, gas, and renewables.' },
        ],
        careers: [
          { title: 'Petroleum Landman', medianSalary: 85000, growthRate: 0.04, description: 'Negotiate mineral rights leases and manage land records for energy companies.' },
          { title: 'Energy Trader', medianSalary: 110000, growthRate: 0.06, description: 'Trade crude oil, natural gas, and renewable energy credits on commodity exchanges.' },
        ],
      },
      {
        name: 'Sports Business',
        degreeType: 'B.B.A.',
        description: 'Combine business fundamentals with sports industry expertise. Strategic partnerships with OU Athletics, the Oklahoma City Thunder, and OKC Dodgers provide unmatched internship access.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['MGT 2013 Intro to Business', 'ECON 1113 Microeconomics', 'MATH 1743 Business Calculus', 'ENGL 1113 Composition I'], description: 'Core business and economics with introduction to the sports industry.' },
          { year: 2, title: 'Sports Business Core', courses: ['MGT 3013 Sports Business', 'MKT 3013 Marketing', 'FIN 3303 Corporate Finance', 'MGT 3113 Organizational Behavior'], description: 'Sports industry overview, marketing, and finance fundamentals.' },
          { year: 3, title: 'Industry Focus', courses: ['MGT 4013 Sports Marketing', 'MGT 4113 Sports Revenue & Finance', 'MGT 4213 Sports Analytics', 'MGT Elective'], description: 'Deep dive into sports marketing, revenue generation, and data analytics in athletics.' },
          { year: 4, title: 'Capstone', courses: ['MGT 4513 Sports Business Capstone', 'MGT 4970 Internship', 'Business Elective', 'Free Elective'], description: 'Capstone and required internship with OU Athletics, pro teams, or sports agencies.' },
        ],
        careers: [
          { title: 'Sports Marketing Manager', medianSalary: 70000, growthRate: 0.10, description: 'Manage marketing and promotions for professional teams, college athletics, or sports brands.' },
          { title: 'Athletic Director (with experience)', medianSalary: 95000, growthRate: 0.07, description: 'Oversee operations of collegiate or professional athletic programs.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. GALLOGLY COLLEGE OF ENGINEERING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'Gallogly College of Engineering',
    description: 'The largest engineering program in Oklahoma, organized into seven schools offering hands-on experiential learning. Offers 14 undergraduate programs with particular strength in aerospace, petroleum, computer science, and environmental engineering.',
    totalStudents: 4300,
    majors: [
      {
        name: 'Aerospace Engineering',
        degreeType: 'B.S.',
        description: 'Aircraft and spacecraft design, propulsion, and UAV systems with ties to Tinker Air Force Base and the FAA Mike Monroney Aeronautical Center in Oklahoma City.',
        pathways: [
          { year: 1, title: 'Engineering Foundations', courses: ['AME 1113 Intro to Aerospace', 'MATH 1823 Calculus I', 'PHYS 2514 Physics I', 'ENGR 1410 Engineering Graphics'], description: 'Introduction to flight, physics, and engineering drawing.' },
          { year: 2, title: 'Aerodynamics & Structures', courses: ['AME 2213 Aerodynamics I', 'AME 3353 Aerospace Structures', 'AME 2533 Dynamics', 'MATH 2924 Calculus IV'], description: 'Study how aircraft fly and how structures withstand flight loads.' },
          { year: 3, title: 'Propulsion & Controls', courses: ['AME 4163 Propulsion', 'AME 4313 Flight Controls', 'AME 4283 Aeroelasticity', 'AME Elective'], description: 'Design jet engines, control systems, and analyze aeroelastic behavior.' },
          { year: 4, title: 'Senior Design', courses: ['AME 4553 Senior Design I', 'AME 4563 Senior Design II', 'AME Elective', 'Free Elective'], description: 'Design a complete aircraft or spacecraft system. Teams have won national AIAA competitions.' },
        ],
        careers: [
          { title: 'Aerospace Engineer', medianSalary: 122000, growthRate: 0.08, description: 'Design aircraft, spacecraft, satellites, and UAV systems for defense and commercial aviation.' },
          { title: 'Flight Test Engineer', medianSalary: 100000, growthRate: 0.07, description: 'Test aircraft performance and safety — Tinker AFB provides unique opportunities near campus.' },
        ],
      },
      {
        name: 'Computer Science',
        degreeType: 'B.S.',
        description: 'Software engineering, data science, and cybersecurity with research in weather informatics and AI. Strong partnerships with the National Weather Center for computational meteorology.',
        pathways: [
          { year: 1, title: 'Programming Foundations', courses: ['CS 1323 Programming I', 'CS 1324 Programming II', 'MATH 1823 Calculus I', 'ENGL 1113 Composition I'], description: 'Learn Python and C++, plus math foundations.' },
          { year: 2, title: 'Core CS', courses: ['CS 2413 Data Structures', 'CS 2334 Software Design', 'CS 2613 Computer Architecture', 'MATH 3333 Linear Algebra'], description: 'Data structures, OOP design, and how computers work at the hardware level.' },
          { year: 3, title: 'Specialization', courses: ['CS 3113 Operating Systems', 'CS 4013 Algorithms', 'CS 4613 Machine Learning', 'CS Elective'], description: 'Choose tracks in AI, security, data science, or weather informatics.' },
          { year: 4, title: 'Senior Capstone', courses: ['CS 4273 Software Engineering Capstone', 'CS Elective', 'CS Elective', 'Free Elective'], description: 'Team software project with industry partner; OU CS grads work across Oklahoma and national tech companies.' },
        ],
        careers: [
          { title: 'Software Engineer', medianSalary: 108000, growthRate: 0.22, description: 'Design and build software systems across web, mobile, and enterprise platforms.' },
          { title: 'Data Engineer', medianSalary: 112000, growthRate: 0.25, description: 'Build data pipelines and infrastructure — OU\'s weather informatics is world-renowned.' },
        ],
      },
      {
        name: 'Mechanical Engineering',
        degreeType: 'B.S.',
        description: 'Broad engineering discipline covering thermal-fluid systems, solid mechanics, dynamics, and manufacturing. Students work in the AME machine shop and compete in Formula SAE.',
        pathways: [
          { year: 1, title: 'Engineering Foundations', courses: ['AME 1113 Intro to Engineering', 'MATH 1823 Calculus I', 'PHYS 2514 Physics I', 'ENGR 1410 Engineering Graphics'], description: 'Math, physics, and engineering graphics foundations.' },
          { year: 2, title: 'Core Mechanics', courses: ['AME 2113 Statics', 'AME 2213 Mechanics of Materials', 'AME 2533 Dynamics', 'AME 2633 Thermodynamics'], description: 'Study forces, material behavior, motion, and heat transfer.' },
          { year: 3, title: 'Advanced Systems', courses: ['AME 3113 Fluid Mechanics', 'AME 3313 Heat Transfer', 'AME 3723 Machine Design', 'AME 3523 Systems & Controls'], description: 'Design thermal-fluid systems, machines, and control systems.' },
          { year: 4, title: 'Senior Design', courses: ['AME 4553 Senior Design I', 'AME 4563 Senior Design II', 'AME Elective', 'Free Elective'], description: 'Industry-sponsored capstone design project. Strong placement in energy, aerospace, and manufacturing.' },
        ],
        careers: [
          { title: 'Mechanical Engineer', medianSalary: 95000, growthRate: 0.07, description: 'Design mechanical systems for manufacturing, energy, aerospace, and automotive industries.' },
          { title: 'HVAC Engineer', medianSalary: 85000, growthRate: 0.06, description: 'Design heating, ventilation, and air conditioning systems for buildings and industrial facilities.' },
        ],
      },
      {
        name: 'Chemical Engineering',
        degreeType: 'B.S.',
        description: 'Process design, reaction engineering, and thermodynamics with strong ties to Oklahoma\'s energy and chemical manufacturing industries. AIChE student chapter is consistently award-winning.',
        pathways: [
          { year: 1, title: 'Engineering Foundations', courses: ['CHE 1013 Intro to Chemical Engineering', 'CHEM 1315 General Chemistry I', 'MATH 1823 Calculus I', 'PHYS 2514 Physics I'], description: 'Chemistry, math, and physics foundations with introduction to chemical engineering.' },
          { year: 2, title: 'Core Chemical Engineering', courses: ['CHE 2113 Material & Energy Balances', 'CHE 2213 Thermodynamics I', 'CHEM 3053 Organic Chemistry I', 'MATH 3413 Differential Equations'], description: 'Mass and energy balance calculations, thermodynamics, and organic chemistry.' },
          { year: 3, title: 'Transport & Reactions', courses: ['CHE 3113 Transport Phenomena', 'CHE 3213 Reaction Engineering', 'CHE 3313 Separations', 'CHE 3413 Thermodynamics II'], description: 'Study fluid flow, heat/mass transfer, reactor design, and distillation operations.' },
          { year: 4, title: 'Senior Design', courses: ['CHE 4113 Process Design I', 'CHE 4123 Process Design II', 'CHE 4213 Process Control', 'CHE Elective'], description: 'Design a complete chemical plant; strong placement in Oklahoma energy and chemical companies.' },
        ],
        careers: [
          { title: 'Chemical Engineer', medianSalary: 105000, growthRate: 0.08, description: 'Design chemical manufacturing processes for energy, pharmaceutical, and materials companies.' },
          { title: 'Process Engineer', medianSalary: 95000, growthRate: 0.06, description: 'Optimize industrial processes for refineries and chemical plants across Oklahoma.' },
        ],
      },
      {
        name: 'Electrical Engineering',
        degreeType: 'B.S.',
        description: 'Study circuits, electronics, power systems, and signal processing. Research in radar systems and remote sensing with the Advanced Radar Research Center.',
        pathways: [
          { year: 1, title: 'Engineering Foundations', courses: ['ECE 1113 Intro to Electrical Engineering', 'MATH 1823 Calculus I', 'PHYS 2514 Physics I', 'ENGR 1410 Engineering Graphics'], description: 'Physics, math, and introduction to electrical engineering concepts.' },
          { year: 2, title: 'Circuits & Electronics', courses: ['ECE 2113 Circuit Analysis', 'ECE 2213 Electronics I', 'ECE 2613 Digital Logic', 'MATH 3413 Differential Equations'], description: 'Analog circuits, electronic devices, and digital logic design.' },
          { year: 3, title: 'Advanced EE', courses: ['ECE 3113 Signals & Systems', 'ECE 3213 Electromagnetics', 'ECE 3313 Power Systems', 'ECE Elective'], description: 'Signal processing, electromagnetic fields, and power system analysis.' },
          { year: 4, title: 'Senior Design', courses: ['ECE 4553 Senior Design I', 'ECE 4563 Senior Design II', 'ECE Elective', 'Free Elective'], description: 'Industry-sponsored design project; many work with the Advanced Radar Research Center.' },
        ],
        careers: [
          { title: 'Electrical Engineer', medianSalary: 100000, growthRate: 0.07, description: 'Design electrical systems, circuits, and power distribution for industry and government.' },
          { title: 'Radar / RF Engineer', medianSalary: 110000, growthRate: 0.09, description: 'Design radar and radio frequency systems — OU is a national leader in radar research.' },
        ],
      },
      {
        name: 'Biomedical Engineering',
        degreeType: 'B.S.',
        description: 'Apply engineering to medicine and biology — medical devices, biomaterials, tissue engineering, and medical imaging. Close collaboration with the OU Health Sciences Center.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['BME 1013 Intro to Biomedical Engineering', 'BIOL 1114 Intro to Zoology', 'CHEM 1315 General Chemistry I', 'MATH 1823 Calculus I'], description: 'Biology, chemistry, and math foundations for biomedical engineering.' },
          { year: 2, title: 'Core Engineering', courses: ['BME 2113 Biomechanics', 'BME 2213 Bioelectricity', 'CHEM 3053 Organic Chemistry I', 'MATH 3413 Differential Equations'], description: 'Study forces on biological tissues and electrical properties of cells.' },
          { year: 3, title: 'Biomedical Systems', courses: ['BME 3113 Biomaterials', 'BME 3213 Medical Imaging', 'BME 3313 Tissue Engineering', 'BME Elective'], description: 'Design medical devices, study biomaterials, and learn medical imaging technologies.' },
          { year: 4, title: 'Senior Design', courses: ['BME 4553 Senior Design I', 'BME 4563 Senior Design II', 'BME Elective', 'Free Elective'], description: 'Design a medical device or biomedical system; collaborate with physicians at OU Medical Center.' },
        ],
        careers: [
          { title: 'Biomedical Engineer', medianSalary: 97000, growthRate: 0.10, description: 'Design medical devices, prosthetics, and diagnostic equipment for healthcare companies.' },
          { title: 'Clinical Engineer', medianSalary: 88000, growthRate: 0.08, description: 'Manage medical technology in hospitals, ensuring equipment safety and effectiveness.' },
        ],
      },
      {
        name: 'Civil Engineering',
        degreeType: 'B.S.',
        description: 'Design infrastructure — bridges, roads, water systems, and buildings. Emphasis on resilient design for Oklahoma\'s severe weather, including tornado-resistant structures.',
        pathways: [
          { year: 1, title: 'Engineering Foundations', courses: ['CEES 1113 Intro to Civil Engineering', 'MATH 1823 Calculus I', 'PHYS 2514 Physics I', 'ENGR 1410 Engineering Graphics'], description: 'Math, physics, and introduction to civil infrastructure systems.' },
          { year: 2, title: 'Core Civil', courses: ['CEES 2113 Statics', 'CEES 2213 Mechanics of Materials', 'CEES 2313 Surveying', 'CEES 2413 Fluid Mechanics'], description: 'Structural analysis, material properties, land surveying, and hydraulics.' },
          { year: 3, title: 'Advanced Design', courses: ['CEES 3113 Structural Analysis', 'CEES 3213 Geotechnical Engineering', 'CEES 3313 Transportation Engineering', 'CEES 3413 Water Resources'], description: 'Design structures, foundations, road networks, and water management systems.' },
          { year: 4, title: 'Senior Design', courses: ['CEES 4553 Senior Design I', 'CEES 4563 Senior Design II', 'CEES Elective', 'Free Elective'], description: 'Comprehensive infrastructure design project; strong placement in Oklahoma and regional firms.' },
        ],
        careers: [
          { title: 'Civil Engineer', medianSalary: 89000, growthRate: 0.07, description: 'Design roads, bridges, and infrastructure for government agencies and engineering firms.' },
          { title: 'Structural Engineer', medianSalary: 95000, growthRate: 0.06, description: 'Design buildings and structures to withstand loads — critical in tornado-prone Oklahoma.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. GAYLORD COLLEGE OF JOURNALISM & MASS COMMUNICATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'Gaylord College of Journalism & Mass Communication',
    description: 'One of the nation\'s premier journalism schools, housed in the $75 million Gaylord Hall with professional-grade broadcast studios, newsrooms, and editing suites. Five undergraduate majors preparing students for careers across media and communications.',
    totalStudents: 1800,
    majors: [
      {
        name: 'Journalism',
        degreeType: 'B.A.',
        description: 'Print, broadcast, and digital journalism with professional newsroom experience and award-winning student media including The Oklahoma Daily and OU Nightly.',
        pathways: [
          { year: 1, title: 'Media Foundations', courses: ['JMC 1013 Intro to Mass Communication', 'JMC 2013 Media Writing', 'ENGL 1113 Composition I', 'COMM 1113 Public Speaking'], description: 'Develop strong writing, communication, and media literacy skills.' },
          { year: 2, title: 'Journalism Core', courses: ['JMC 2033 News Reporting', 'JMC 2073 Visual Communication', 'JMC 3013 Media Law', 'JMC 3023 Media Ethics'], description: 'Learn news gathering, reporting, media law, and ethics in the Gaylord newsroom.' },
          { year: 3, title: 'Advanced Reporting', courses: ['JMC 3413 Broadcast Journalism', 'JMC 3623 Data Journalism', 'JMC 4013 Investigative Reporting', 'JMC Elective'], description: 'Investigative reporting, data-driven journalism, and broadcast production.' },
          { year: 4, title: 'Professional Capstone', courses: ['JMC 4723 Senior Capstone', 'JMC 4970 Internship', 'JMC Elective', 'Free Elective'], description: 'Professional internship and capstone project; OU student media has won national awards.' },
        ],
        careers: [
          { title: 'Reporter / Journalist', medianSalary: 55000, growthRate: 0.06, description: 'Cover news for TV stations, newspapers, digital outlets, or wire services.' },
          { title: 'Data Journalist', medianSalary: 68000, growthRate: 0.15, description: 'Use data analysis and visualization to tell data-driven news stories.' },
        ],
      },
      {
        name: 'Public Relations',
        degreeType: 'B.A.',
        description: 'Strategic communications, crisis management, and brand storytelling with agency-style client work. Students run Lindsey + Asp, the student-run PR agency.',
        pathways: [
          { year: 1, title: 'Communication Foundations', courses: ['JMC 1013 Intro to Mass Communication', 'PR 2013 Intro to Public Relations', 'ENGL 1113 Composition I', 'COMM 1113 Public Speaking'], description: 'Foundational communication, writing, and public relations concepts.' },
          { year: 2, title: 'PR Core', courses: ['PR 3003 PR Writing', 'PR 3013 PR Research', 'MKT 3013 Marketing', 'JMC 3013 Media Law'], description: 'Master PR writing, media relations, research methods, and marketing integration.' },
          { year: 3, title: 'Strategic PR', courses: ['PR 4013 PR Campaigns', 'PR 4023 Crisis Communication', 'PR 4033 Digital PR & Social Media', 'JMC Elective'], description: 'Plan real campaigns, manage crises, and build digital PR strategies for clients.' },
          { year: 4, title: 'Agency Experience', courses: ['PR 4043 PR Agency Practicum', 'JMC 4970 Internship', 'PR Elective', 'Free Elective'], description: 'Run a student PR agency serving real clients; many intern at national firms.' },
        ],
        careers: [
          { title: 'PR Specialist', medianSalary: 62000, growthRate: 0.08, description: 'Manage media relations, write press releases, and protect brand reputation.' },
          { title: 'Communications Director', medianSalary: 85000, growthRate: 0.10, description: 'Lead communications strategy for organizations, companies, or government agencies.' },
        ],
      },
      {
        name: 'Advertising',
        degreeType: 'B.A.',
        description: 'Creative strategy, media planning, and brand management. Students compete in national AAF competitions and manage real client campaigns in the Gaylord creative labs.',
        pathways: [
          { year: 1, title: 'Media Foundations', courses: ['JMC 1013 Intro to Mass Communication', 'ADV 2013 Intro to Advertising', 'ENGL 1113 Composition I', 'ART 1013 Art History Survey'], description: 'Introduction to mass media, advertising industry, and visual design principles.' },
          { year: 2, title: 'Advertising Core', courses: ['ADV 3013 Advertising Copywriting', 'ADV 3113 Advertising Design', 'ADV 3213 Media Planning', 'MKT 3013 Marketing'], description: 'Creative copywriting, graphic design for ads, and media buying strategy.' },
          { year: 3, title: 'Advanced Campaigns', courses: ['ADV 4013 Advertising Campaigns', 'ADV 4113 Digital Advertising', 'ADV 4213 Account Management', 'JMC Elective'], description: 'Full campaign development, digital ad platforms, and client account management.' },
          { year: 4, title: 'Professional Capstone', courses: ['ADV 4313 National Student Advertising Competition', 'JMC 4970 Internship', 'ADV Elective', 'Free Elective'], description: 'Compete nationally in AAF NSAC competition and complete industry internship.' },
        ],
        careers: [
          { title: 'Advertising Account Executive', medianSalary: 65000, growthRate: 0.08, description: 'Manage client relationships and oversee campaign execution at advertising agencies.' },
          { title: 'Media Planner / Buyer', medianSalary: 60000, growthRate: 0.10, description: 'Plan and purchase advertising space across TV, digital, print, and outdoor media.' },
        ],
      },
      {
        name: 'Creative Media Production',
        degreeType: 'B.A.',
        description: 'Video production, audio storytelling, and multimedia content creation using state-of-the-art facilities including HD broadcast studios and post-production suites.',
        pathways: [
          { year: 1, title: 'Media Foundations', courses: ['JMC 1013 Intro to Mass Communication', 'CMP 1013 Intro to Media Production', 'ENGL 1113 Composition I', 'ART 1013 Art History Survey'], description: 'Introduction to media storytelling, production basics, and visual communication.' },
          { year: 2, title: 'Production Core', courses: ['CMP 2013 Video Production', 'CMP 2113 Audio Production', 'CMP 2213 Digital Storytelling', 'JMC 2073 Visual Communication'], description: 'Hands-on camera work, audio engineering, and multimedia storytelling techniques.' },
          { year: 3, title: 'Advanced Production', courses: ['CMP 3013 Documentary Production', 'CMP 3113 Motion Graphics', 'CMP 3213 Advanced Video', 'JMC Elective'], description: 'Produce documentaries, create motion graphics, and develop advanced editing skills.' },
          { year: 4, title: 'Portfolio Capstone', courses: ['CMP 4013 Senior Production Capstone', 'JMC 4970 Internship', 'CMP Elective', 'Free Elective'], description: 'Senior project creating a professional-quality media piece; internship at broadcast or production studio.' },
        ],
        careers: [
          { title: 'Video Producer', medianSalary: 60000, growthRate: 0.12, description: 'Create video content for broadcast, streaming, social media, and corporate communications.' },
          { title: 'Multimedia Journalist', medianSalary: 52000, growthRate: 0.08, description: 'Report news using video, audio, and digital tools across multiple platforms.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. JEANNINE RAINBOLT COLLEGE OF EDUCATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'Jeannine Rainbolt College of Education',
    description: 'Oklahoma\'s premier teacher-preparation college, CAEP-accredited, where all undergraduate majors lead to a B.S. in Education and Oklahoma Teacher Certification. Features early field experiences beginning freshman year.',
    totalStudents: 1200,
    majors: [
      {
        name: 'Elementary Education',
        degreeType: 'B.S.Ed.',
        description: 'Prepare to teach grades 1-5 with certification in all core subjects. Extensive classroom experience beginning freshman year through student teaching.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['EDUC 1113 Intro to Education', 'EDUC 1213 Human Development', 'ENGL 1113 Composition I', 'MATH 1503 Math for Teachers I'], description: 'Introduction to teaching, child development, and field observations in local schools.' },
          { year: 2, title: 'Pedagogy Core', courses: ['EDUC 2113 Teaching Diverse Learners', 'EDUC 2213 Educational Psychology', 'EDUC 2313 Classroom Management', 'MATH 1603 Math for Teachers II'], description: 'Learn pedagogy, classroom management, and how to teach diverse student populations.' },
          { year: 3, title: 'Methods Courses', courses: ['EDUC 3113 Reading/Language Arts Methods', 'EDUC 3213 Math Methods', 'EDUC 3313 Science Methods', 'EDUC 3413 Social Studies Methods'], description: 'Content-specific teaching methods with practicum experiences in partner schools.' },
          { year: 4, title: 'Student Teaching', courses: ['EDUC 4117 Student Teaching I', 'EDUC 4127 Student Teaching II', 'EDUC 4213 Capstone Seminar', 'EDUC Elective'], description: 'Full-semester student teaching placement. Graduates are highly recruited across Oklahoma.' },
        ],
        careers: [
          { title: 'Elementary School Teacher', medianSalary: 48000, growthRate: 0.04, description: 'Teach core subjects to elementary students in public or private schools.' },
          { title: 'Instructional Coordinator', medianSalary: 66000, growthRate: 0.07, description: 'Develop curriculum and train teachers at the district or state level.' },
        ],
      },
      {
        name: 'Special Education',
        degreeType: 'B.S.Ed.',
        description: 'Train to work with students with mild/moderate disabilities across K-12 settings. High-demand field with excellent job placement. Dual certification options available.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['EDSP 2113 Intro to Special Education', 'EDUC 1113 Intro to Education', 'EDUC 1213 Human Development', 'ENGL 1113 Composition I'], description: 'Introduction to disability categories, special education law, and inclusive practices.' },
          { year: 2, title: 'Assessment & Methods', courses: ['EDSP 3113 Behavior Management', 'EDSP 3213 Assessment in Special Education', 'EDUC 2213 Educational Psychology', 'EDSP 3313 Teaching Students with Disabilities'], description: 'Learn behavior intervention, assessment, and evidence-based instructional strategies.' },
          { year: 3, title: 'Advanced Methods', courses: ['EDSP 4113 Transition Planning', 'EDSP 4213 Assistive Technology', 'EDSP 4313 Collaboration in Special Education', 'EDSP Elective'], description: 'Post-secondary transition planning, assistive technology, and inclusive collaboration.' },
          { year: 4, title: 'Student Teaching', courses: ['EDSP 4117 Student Teaching', 'EDSP 4213 Capstone', 'EDSP Elective', 'Free Elective'], description: 'Student teaching in inclusive and resource room settings. 100% job placement rate.' },
        ],
        careers: [
          { title: 'Special Education Teacher', medianSalary: 52000, growthRate: 0.04, description: 'Teach students with disabilities using individualized education plans (IEPs) in K-12 schools.' },
          { title: 'Behavior Analyst (with BCBA)', medianSalary: 72000, growthRate: 0.25, description: 'Develop behavior intervention plans for students with autism and other behavioral challenges.' },
        ],
      },
      {
        name: 'Mathematics Education',
        degreeType: 'B.S.Ed.',
        description: 'Prepare to teach mathematics in grades 6-12 with strong content knowledge and pedagogical skills. High-demand certification area with scholarship support.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['MATH 1823 Calculus I', 'MATH 2423 Calculus II', 'EDUC 1113 Intro to Education', 'ENGL 1113 Composition I'], description: 'Calculus sequence and introduction to the teaching profession.' },
          { year: 2, title: 'Math & Education Core', courses: ['MATH 2924 Calculus IV', 'MATH 3333 Linear Algebra', 'EDUC 2213 Educational Psychology', 'MATH 2813 Statistics'], description: 'Advanced mathematics alongside educational theory and psychology.' },
          { year: 3, title: 'Teaching Methods', courses: ['EDMA 3113 Methods of Teaching Mathematics', 'MATH 3113 Abstract Algebra', 'MATH 3213 Geometry', 'EDUC 3213 Reading in Content Areas'], description: 'Math-specific pedagogy, abstract algebra, and geometry for secondary teaching.' },
          { year: 4, title: 'Student Teaching', courses: ['EDMA 4117 Student Teaching', 'EDUC 4213 Capstone Seminar', 'MATH Elective', 'Free Elective'], description: 'Full-semester student teaching in 6-12 math classrooms. Math teachers are in critical shortage.' },
        ],
        careers: [
          { title: 'High School Math Teacher', medianSalary: 52000, growthRate: 0.04, description: 'Teach algebra, geometry, calculus, and statistics in secondary schools.' },
          { title: 'Curriculum Specialist', medianSalary: 68000, growthRate: 0.07, description: 'Design mathematics curriculum and assessments at the district or state level.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. WEITZENHOFFER FAMILY COLLEGE OF FINE ARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'Weitzenhoffer Family College of Fine Arts',
    description: 'Home to nationally recognized programs in music, art, dance, drama, and the only School of Musical Theatre in the nation. Founded through the generosity of Broadway producer A. Max Weitzenhoffer with four state-of-the-art performance halls.',
    totalStudents: 900,
    majors: [
      {
        name: 'Musical Theatre Performance',
        degreeType: 'B.F.A.',
        description: 'The only School of Musical Theatre in the nation, offering conservatory-style training with a 5:1 student-to-teacher ratio and a self-imposed cap of 50 students. Alumni perform consistently on Broadway and in national tours.',
        pathways: [
          { year: 1, title: 'Triple-Threat Foundations', courses: ['MT 1113 Acting for Musical Theatre I', 'MT 1213 Singing for Musical Theatre I', 'MT 1313 Dance for Musical Theatre I', 'MT 1413 Musical Theatre History'], description: 'Begin intensive conservatory training in acting, singing, and dance.' },
          { year: 2, title: 'Performance Development', courses: ['MT 2113 Acting II', 'MT 2213 Singing II', 'MT 2313 Jazz Dance', 'MT 2413 Musical Theatre Styles'], description: 'Develop advanced performance skills and explore different musical theatre styles and eras.' },
          { year: 3, title: 'Mainstage Performance', courses: ['MT 3113 Advanced Acting', 'MT 3213 Audition Technique', 'MT 3313 Advanced Dance', 'MT 3413 Production Workshop'], description: 'Perform in Weitzenhoffer mainstage productions and learn professional audition technique.' },
          { year: 4, title: 'Professional Launch', courses: ['MT 4113 Senior Showcase', 'MT 4213 Business of Theatre', 'MT 4313 Senior Performance', 'MT Elective'], description: 'Senior showcase for New York and LA industry professionals. Many book roles before graduation.' },
        ],
        careers: [
          { title: 'Broadway / Musical Theatre Performer', medianSalary: 65000, growthRate: 0.05, description: 'Perform in Broadway shows, national tours, and regional theatre productions.' },
          { title: 'Film / Television Actor', medianSalary: 58000, growthRate: 0.08, description: 'Transition from stage to screen — OU MT alumni work across Broadway, film, and TV.' },
        ],
      },
      {
        name: 'Studio Art',
        degreeType: 'B.F.A.',
        description: 'Intensive studio practice in painting, sculpture, ceramics, printmaking, and photography. Exhibition opportunities in the Fred Jones Jr. Museum of Art and student galleries.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['ART 1123 Drawing I', 'ART 1133 2D Design', 'ART 1143 3D Design', 'ART 1013 Art History Survey'], description: 'Build fundamental skills in drawing, 2D and 3D composition, and art history.' },
          { year: 2, title: 'Media Exploration', courses: ['ART 2123 Painting I', 'ART 2223 Sculpture I', 'ART 2323 Ceramics I', 'ART 2423 Printmaking I'], description: 'Explore multiple studio media to discover your primary artistic direction.' },
          { year: 3, title: 'Concentration', courses: ['ART 3123 Advanced Painting', 'ART 3223 Advanced Sculpture', 'ART 3013 Contemporary Art History', 'ART Elective'], description: 'Focus on a primary medium with regular critiques and professional development.' },
          { year: 4, title: 'Senior Exhibition', courses: ['ART 4113 BFA Senior Studio', 'ART 4213 BFA Exhibition', 'ART Elective', 'Free Elective'], description: 'Prepare and mount a professional solo exhibition; many continue to MFA programs.' },
        ],
        careers: [
          { title: 'Professional Artist', medianSalary: 52000, growthRate: 0.04, description: 'Create and sell artwork through galleries, commissions, and exhibitions.' },
          { title: 'Art Director', medianSalary: 75000, growthRate: 0.06, description: 'Lead visual design for advertising agencies, publishers, or entertainment companies.' },
        ],
      },
      {
        name: 'Music Education',
        degreeType: 'B.M.E.',
        description: 'Prepare to teach instrumental or vocal music in K-12 schools. Combines rigorous performance training with pedagogy. OU music education graduates lead top programs across Oklahoma and the nation.',
        pathways: [
          { year: 1, title: 'Music Foundations', courses: ['MUTH 1513 Music Theory I', 'MUTH 1523 Music Theory II', 'MUSC 1012 Applied Lessons', 'MUED 1013 Intro to Music Education'], description: 'Music theory, ear training, and applied lessons on primary instrument or voice.' },
          { year: 2, title: 'Core Music', courses: ['MUTH 2513 Music Theory III', 'MUSC 2012 Applied Lessons', 'MUED 2113 Teaching Music in Elementary', 'MUHI 3613 Music History'], description: 'Advanced theory, music history, and elementary music teaching methods.' },
          { year: 3, title: 'Teaching Methods', courses: ['MUED 3113 Instrumental Methods', 'MUED 3213 Choral Methods', 'MUED 3313 Marching Band Techniques', 'MUSC 3012 Applied Lessons'], description: 'Conducting, rehearsal techniques, and methods for instrumental and choral settings.' },
          { year: 4, title: 'Student Teaching', courses: ['MUED 4117 Student Teaching', 'MUED 4213 Capstone', 'MUSC 4012 Applied Lessons', 'Free Elective'], description: 'Full-semester student teaching in both elementary and secondary music classrooms.' },
        ],
        careers: [
          { title: 'Band / Orchestra Director', medianSalary: 52000, growthRate: 0.04, description: 'Lead instrumental music programs at middle schools and high schools.' },
          { title: 'Choir Director', medianSalary: 50000, growthRate: 0.04, description: 'Direct choral programs and teach vocal music in schools and community organizations.' },
        ],
      },
      {
        name: 'Drama',
        degreeType: 'B.F.A.',
        description: 'Helmerich School of Drama offering concentrations in acting, design/technology, and dramaturgy. Produce 8-10 shows per year in multiple performance venues.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['DRA 1113 Acting I', 'DRA 1213 Stagecraft', 'DRA 1313 Theatre History I', 'DRA 1413 Voice & Movement'], description: 'Introduction to acting, technical theatre, theatre history, and voice training.' },
          { year: 2, title: 'Core Development', courses: ['DRA 2113 Acting II', 'DRA 2213 Scene Design', 'DRA 2313 Costume Design', 'DRA 2413 Theatre History II'], description: 'Deepen acting skills and explore design/technology tracks.' },
          { year: 3, title: 'Advanced Work', courses: ['DRA 3113 Advanced Acting / Scene Study', 'DRA 3213 Directing', 'DRA 3313 Lighting Design', 'DRA Elective'], description: 'Advanced scene study, directing, and technical design with mainstage production roles.' },
          { year: 4, title: 'Senior Showcase', courses: ['DRA 4113 Senior Thesis Performance', 'DRA 4213 Senior Portfolio', 'DRA Elective', 'Free Elective'], description: 'Senior thesis production and professional portfolio presentation.' },
        ],
        careers: [
          { title: 'Theatre Actor', medianSalary: 48000, growthRate: 0.05, description: 'Perform in regional, national, and Broadway theatre productions.' },
          { title: 'Scenic / Lighting Designer', medianSalary: 55000, growthRate: 0.06, description: 'Design sets, lighting, or costumes for theatre, film, and live events.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. COLLEGE OF ATMOSPHERIC & GEOGRAPHIC SCIENCES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'College of Atmospheric & Geographic Sciences',
    description: 'Home to the #1 ranked meteorology program in the nation for severe weather and mesoscale research. Located adjacent to the National Weather Center on campus, housing NOAA, the Storm Prediction Center, and the National Severe Storms Laboratory.',
    totalStudents: 1030,
    majors: [
      {
        name: 'Meteorology',
        degreeType: 'B.S.',
        description: 'The nation\'s premier meteorology program, ranking #1 for severe storms research. Students forecast real weather daily and have access to NOAA, the Storm Prediction Center, and the Oklahoma Mesonet — all housed in the National Weather Center on campus.',
        pathways: [
          { year: 1, title: 'Atmospheric Foundations', courses: ['METR 1014 Intro to Meteorology', 'MATH 1823 Calculus I', 'PHYS 2514 Physics I', 'CS 1313 Programming'], description: 'Weather fundamentals, calculus, physics, and programming for atmospheric data analysis.' },
          { year: 2, title: 'Core Meteorology', courses: ['METR 3113 Atmospheric Dynamics I', 'METR 3213 Atmospheric Thermodynamics', 'METR 3313 Synoptic Meteorology I', 'MATH 2924 Calculus IV'], description: 'Atmospheric physics, thermodynamics, and synoptic weather analysis with daily forecasting exercises.' },
          { year: 3, title: 'Severe Weather & Forecasting', courses: ['METR 4113 Mesoscale Meteorology', 'METR 4213 Radar Meteorology', 'METR 4313 Synoptic II', 'METR 3413 Atmospheric Dynamics II'], description: 'Study severe storms, radar analysis, and advanced forecasting. Many students chase storms with faculty.' },
          { year: 4, title: 'Senior Research', courses: ['METR 4513 Senior Capstone', 'METR 4970 Research', 'METR Elective', 'Free Elective'], description: 'Independent research at the National Weather Center; graduates enter NWS, broadcast, and private forecasting.' },
        ],
        careers: [
          { title: 'NWS Meteorologist', medianSalary: 78000, growthRate: 0.06, description: 'Forecast weather, issue severe weather warnings, and protect lives at National Weather Service offices.' },
          { title: 'Broadcast Meteorologist', medianSalary: 62000, growthRate: 0.05, description: 'Present weather forecasts on television and digital media — OU alumni dominate broadcast meteorology nationally.' },
          { title: 'Research Scientist', medianSalary: 90000, growthRate: 0.08, description: 'Conduct atmospheric research at NOAA, universities, or private weather companies.' },
        ],
      },
      {
        name: 'Geography',
        degreeType: 'B.A.',
        description: 'Study human and physical geography with strengths in GIS/remote sensing, climatology, and environmental geography. Access to OU\'s GIS lab and the Center for Spatial Analysis.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['GEOG 1113 Physical Geography', 'GEOG 1123 Cultural Geography', 'MATH 1503 College Algebra', 'ENGL 1113 Composition I'], description: 'Introduction to physical earth systems and human cultural landscapes.' },
          { year: 2, title: 'Core Geography', courses: ['GEOG 3113 Cartography', 'GEOG 3213 Intro to GIS', 'GEOG 3313 Climatology', 'GEOG 3413 Urban Geography'], description: 'Map-making, geographic information systems, climate science, and urban analysis.' },
          { year: 3, title: 'Advanced Topics', courses: ['GEOG 4113 Advanced GIS', 'GEOG 4213 Remote Sensing', 'GEOG 4313 Environmental Geography', 'GEOG Elective'], description: 'Satellite remote sensing, advanced spatial analysis, and environmental applications.' },
          { year: 4, title: 'Senior Research', courses: ['GEOG 4513 Senior Seminar', 'GEOG 4970 Research', 'GEOG Elective', 'Free Elective'], description: 'Senior research project using GIS; graduates enter urban planning, environmental consulting, and government.' },
        ],
        careers: [
          { title: 'GIS Analyst', medianSalary: 65000, growthRate: 0.10, description: 'Create maps and analyze spatial data for government, utilities, and environmental firms.' },
          { title: 'Urban / Regional Planner', medianSalary: 78000, growthRate: 0.07, description: 'Plan land use, transportation, and development for cities and regional organizations.' },
        ],
      },
      {
        name: 'Aviation',
        degreeType: 'B.S.',
        description: 'One of a few university aviation programs in the country, training professional pilots with FAA-approved flight training. Proximity to Max Westheimer Airport (OU\'s on-campus airport) and the FAA Aeronautical Center.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['AVN 1013 Intro to Aviation', 'AVN 1113 Private Pilot Ground', 'AVN 1213 Private Pilot Flight', 'METR 1014 Intro to Meteorology'], description: 'Earn private pilot certificate while studying aviation fundamentals and weather.' },
          { year: 2, title: 'Instrument & Advanced', courses: ['AVN 2113 Instrument Ground', 'AVN 2213 Instrument Flight', 'AVN 2313 Commercial Ground', 'AVN 2413 Aviation Safety'], description: 'Instrument rating and commercial pilot training with aviation safety principles.' },
          { year: 3, title: 'Commercial Operations', courses: ['AVN 3113 Commercial Flight', 'AVN 3213 Multi-Engine', 'AVN 3313 Aviation Management', 'AVN 3413 Flight Instructor Certification'], description: 'Complete commercial license, multi-engine rating, and begin flight instructor certification.' },
          { year: 4, title: 'Professional Preparation', courses: ['AVN 4113 Airline Operations', 'AVN 4213 Advanced Navigation', 'AVN 4970 Internship', 'AVN Elective'], description: 'Airline preparation, advanced navigation, and industry internships. Build hours toward ATP certification.' },
        ],
        careers: [
          { title: 'Airline Pilot', medianSalary: 130000, growthRate: 0.06, description: 'Fly commercial aircraft for major and regional airlines — massive pilot shortage drives demand.' },
          { title: 'Corporate / Charter Pilot', medianSalary: 95000, growthRate: 0.08, description: 'Fly private aircraft for corporations and charter companies.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. MEWBOURNE COLLEGE OF EARTH & ENERGY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'Mewbourne College of Earth & Energy',
    description: 'A top-5 petroleum engineering and geosciences program housed in the Sarkeys Energy Center. Leverages Oklahoma\'s position as a major energy-producing state with industry partnerships throughout the Mid-Continent region.',
    totalStudents: 420,
    majors: [
      {
        name: 'Petroleum Engineering',
        degreeType: 'B.S.',
        description: 'A top-5 nationally ranked petroleum engineering program with industry partnerships throughout Oklahoma\'s energy sector. Students gain hands-on experience with drilling simulators and field trips to active operations.',
        pathways: [
          { year: 1, title: 'Engineering Foundations', courses: ['PE 1113 Intro to Petroleum Engineering', 'MATH 1823 Calculus I', 'CHEM 1315 General Chemistry', 'ENGR 1410 Engineering Graphics'], description: 'Math, chemistry, and first look at the petroleum industry.' },
          { year: 2, title: 'Core Engineering', courses: ['PE 2012 Drilling Engineering', 'PE 2532 Rock & Fluid Properties', 'PHYS 2514 Physics I', 'MATH 2924 Calculus IV'], description: 'Drilling principles, reservoir rock analysis, and applied physics.' },
          { year: 3, title: 'Reservoir & Production', courses: ['PE 3113 Production Engineering', 'PE 3243 Reservoir Engineering', 'PE 3143 Well Logging', 'PE 4043 Reservoir Simulation'], description: 'Design production systems and simulate reservoir behavior.' },
          { year: 4, title: 'Senior Design', courses: ['PE 4901 Senior Design I', 'PE 4911 Senior Design II', 'PE Elective', 'Free Elective'], description: 'Industry capstone with Oklahoma energy companies; outstanding placement and starting salaries.' },
        ],
        careers: [
          { title: 'Petroleum Engineer', medianSalary: 131000, growthRate: 0.08, description: 'Design and optimize oil and gas extraction operations for energy companies.' },
          { title: 'Drilling Engineer', medianSalary: 115000, growthRate: 0.06, description: 'Plan and oversee well drilling operations — Oklahoma is a major energy hub.' },
        ],
      },
      {
        name: 'Geology',
        degreeType: 'B.S.',
        description: 'Study Earth\'s structure, processes, and history with specializations in petroleum geology, environmental geology, and paleontology. Fieldwork across Oklahoma\'s diverse geological terrain.',
        pathways: [
          { year: 1, title: 'Earth Science Foundations', courses: ['GEOL 1114 Physical Geology', 'GEOL 1124 Historical Geology', 'CHEM 1315 General Chemistry', 'MATH 1823 Calculus I'], description: 'Introduction to rocks, minerals, plate tectonics, and Earth history.' },
          { year: 2, title: 'Core Geology', courses: ['GEOL 2114 Mineralogy', 'GEOL 2214 Sedimentology', 'GEOL 2314 Paleontology', 'PHYS 2514 Physics I'], description: 'Study minerals, sedimentary processes, fossils, and physics for geoscience applications.' },
          { year: 3, title: 'Advanced Geology', courses: ['GEOL 3114 Structural Geology', 'GEOL 3214 Petrology', 'GEOL 3314 Field Methods', 'GEOL Elective'], description: 'Rock deformation, igneous/metamorphic petrology, and geological field mapping.' },
          { year: 4, title: 'Senior Research', courses: ['GEOL 4970 Research', 'GEOL 4113 Geomorphology', 'GEOL Elective', 'Free Elective'], description: 'Senior research project; specializations in petroleum, environmental, or paleontology tracks.' },
        ],
        careers: [
          { title: 'Geologist', medianSalary: 83000, growthRate: 0.05, description: 'Study Earth materials and processes for oil and gas, mining, or environmental companies.' },
          { title: 'Environmental Geologist', medianSalary: 75000, growthRate: 0.07, description: 'Assess contamination, groundwater resources, and geological hazards.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. DAVID L. BOREN COLLEGE OF INTERNATIONAL STUDIES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'oklahoma',
    name: 'David L. Boren College of International Studies',
    description: 'Named for former OU president and U.S. Senator David L. Boren, this college offers interdisciplinary international programs with required study abroad. OU consistently ranks among the top public universities for study abroad participation.',
    totalStudents: 500,
    majors: [
      {
        name: 'International Studies',
        degreeType: 'B.A.',
        description: 'Interdisciplinary study of global issues combining political science, economics, history, and language. Required study abroad with options across 90+ countries.',
        pathways: [
          { year: 1, title: 'Global Foundations', courses: ['IAS 1003 Intro to International Studies', 'PSC 1113 American Government', 'ECON 1113 Microeconomics', 'Language 1115 First Year Language'], description: 'Introduction to global issues, American government, economics, and begin foreign language study.' },
          { year: 2, title: 'Regional Focus', courses: ['IAS 2003 Global Issues', 'HIST 1613 Western Civilization', 'PSC 3213 International Relations', 'Language 2113 Second Year Language'], description: 'Choose a regional specialization and develop language proficiency.' },
          { year: 3, title: 'Study Abroad', courses: ['IAS 3970 Study Abroad', 'Language 3113 Advanced Language', 'IAS Elective', 'Regional Elective'], description: 'Required semester abroad in your region of focus; intensive language and cultural immersion.' },
          { year: 4, title: 'Senior Thesis', courses: ['IAS 4513 Senior Thesis', 'IAS 4013 International Organizations', 'IAS Elective', 'Free Elective'], description: 'Original research thesis on an international topic. Graduates enter diplomacy, NGOs, and international business.' },
        ],
        careers: [
          { title: 'Foreign Service Officer', medianSalary: 82000, growthRate: 0.05, description: 'Represent the U.S. abroad as a diplomat at embassies and consulates worldwide.' },
          { title: 'International Development Specialist', medianSalary: 65000, growthRate: 0.07, description: 'Work for NGOs, USAID, or the World Bank on international development programs.' },
        ],
      },
      {
        name: 'International Security Studies',
        degreeType: 'B.A.',
        description: 'Study national security, intelligence, terrorism, and conflict resolution. Unique program preparing students for careers in defense, intelligence agencies, and security policy.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['IAS 1003 Intro to International Studies', 'PSC 1113 American Government', 'HIST 1493 American History since 1865', 'Language 1115 First Year Language'], description: 'American government, modern history, and begin building foreign language competency.' },
          { year: 2, title: 'Security Core', courses: ['ISS 2003 Intro to Security Studies', 'PSC 3213 International Relations', 'PSC 3113 Comparative Politics', 'Language 2113 Second Year Language'], description: 'Study international security theory, geopolitics, and comparative political systems.' },
          { year: 3, title: 'Advanced Security', courses: ['ISS 3113 Terrorism & Counterterrorism', 'ISS 3213 Intelligence & National Security', 'ISS 3313 Conflict Resolution', 'ISS Elective'], description: 'Analyze terrorism, intelligence gathering, and conflict resolution strategies.' },
          { year: 4, title: 'Capstone', courses: ['ISS 4513 Senior Capstone', 'ISS 4970 Internship', 'ISS Elective', 'Free Elective'], description: 'Capstone project and internship at government agencies, think tanks, or defense contractors.' },
        ],
        careers: [
          { title: 'Intelligence Analyst', medianSalary: 85000, growthRate: 0.08, description: 'Analyze intelligence data for the CIA, NSA, DIA, or private sector security firms.' },
          { title: 'Defense Policy Analyst', medianSalary: 78000, growthRate: 0.06, description: 'Research and advise on defense and national security policy for government and think tanks.' },
        ],
      },
    ],
  },
]
