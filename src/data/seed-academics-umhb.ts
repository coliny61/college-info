// seed-academics-umhb.ts — All University of Mary Hardin-Baylor colleges, majors, pathways & career outcomes

export interface MajorDef {
  name: string
  degreeType: string
  description: string
  pathways: Array<{ year: number; title: string; courses: string[]; description: string }>
  careers: Array<{ title: string; medianSalary: number; growthRate: number; description: string }>
}

export interface CollegeDef {
  slug: string
  name: string
  description: string
  totalStudents: number
  majors: MajorDef[]
}

export const umhbColleges: CollegeDef[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. COLLEGE OF NURSING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'umhb',
    name: 'College of Nursing',
    description: 'Prepares compassionate, skilled nurses through rigorous clinical training and faith-integrated care at partner hospitals across Central Texas.',
    totalStudents: 650,
    majors: [
      {
        name: 'Nursing',
        degreeType: 'B.S.N.',
        description: 'Four-year pre-licensure program with clinical rotations at Baylor Scott & White and other Central Texas facilities.',
        pathways: [
          { year: 1, title: 'Pre-Nursing Foundation', courses: ['BIOL 1401 Anatomy & Physiology I', 'CHEM 1305 General Chemistry', 'ENGL 1301 Composition I', 'PSYC 1301 General Psychology'], description: 'Science and general education prerequisites for nursing admission.' },
          { year: 2, title: 'Nursing Fundamentals', courses: ['NURS 2301 Fundamentals of Nursing', 'NURS 2310 Health Assessment', 'BIOL 1402 Anatomy & Physiology II', 'BIOL 2420 Microbiology'], description: 'Introduction to patient care, health assessment skills, and clinical foundations.' },
          { year: 3, title: 'Clinical Immersion', courses: ['NURS 3301 Medical-Surgical Nursing', 'NURS 3320 Pediatric Nursing', 'NURS 3330 Maternal-Newborn Nursing', 'NURS 3315 Pharmacology'], description: 'Hospital-based clinical rotations across medical-surgical, pediatric, and obstetric units.' },
          { year: 4, title: 'Advanced Practice & NCLEX Prep', courses: ['NURS 4301 Community Health Nursing', 'NURS 4310 Leadership in Nursing', 'NURS 4320 Critical Care Nursing', 'NURS 4330 NCLEX Review'], description: 'Advanced clinical experiences, leadership capstone, and preparation for the NCLEX-RN licensure exam.' },
        ],
        careers: [
          { title: 'Registered Nurse', medianSalary: 81220, growthRate: 0.06, description: 'Provide direct patient care in hospitals, clinics, and community health settings.' },
          { title: 'ICU/Critical Care Nurse', medianSalary: 86000, growthRate: 0.06, description: 'Specialize in caring for critically ill patients in intensive care units.' },
          { title: 'Nurse Educator', medianSalary: 77440, growthRate: 0.07, description: 'Teach nursing students in academic and clinical settings.' },
        ],
      },
      {
        name: 'Nursing (MSN)',
        degreeType: 'M.S.N.',
        description: 'Graduate nursing program with concentrations in family nurse practitioner and nurse educator tracks.',
        pathways: [
          { year: 1, title: 'Core Graduate Studies', courses: ['NURS 5301 Advanced Pathophysiology', 'NURS 5310 Advanced Pharmacology', 'NURS 5320 Advanced Health Assessment', 'NURS 5330 Research Methods'], description: 'Advanced science core and evidence-based practice foundations.' },
          { year: 2, title: 'Specialization & Clinical Hours', courses: ['NURS 6301 Family Primary Care I', 'NURS 6310 Family Primary Care II', 'NURS 6320 Clinical Practicum I', 'NURS 6330 Clinical Practicum II'], description: 'Concentration coursework with 600+ clinical hours in chosen specialty.' },
          { year: 3, title: 'Capstone', courses: ['NURS 6340 DNP/MSN Capstone Project', 'NURS 6350 Advanced Clinical Practicum'], description: 'Scholarly project and final clinical hours for certification eligibility.' },
          { year: 4, title: 'Certification Prep', courses: ['NURS 6360 Certification Review', 'NURS 6370 Professional Role Transition'], description: 'Board certification preparation and transition to advanced practice role.' },
        ],
        careers: [
          { title: 'Family Nurse Practitioner', medianSalary: 121610, growthRate: 0.40, description: 'Diagnose and treat patients across the lifespan in primary care settings.' },
          { title: 'Clinical Nurse Specialist', medianSalary: 98000, growthRate: 0.09, description: 'Improve patient outcomes through evidence-based practice and staff education.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. COLLEGE OF EDUCATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'umhb',
    name: 'College of Education',
    description: 'Develops educators and leaders through hands-on field experiences in Central Texas schools and faith-based mentoring.',
    totalStudents: 480,
    majors: [
      {
        name: 'Elementary Education',
        degreeType: 'B.S.Ed.',
        description: 'Prepares teachers for EC-6 certification with extensive classroom field experiences starting sophomore year.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['EDUC 1301 Intro to Education', 'PSYC 1301 General Psychology', 'ENGL 1301 Composition I', 'MATH 1314 College Algebra'], description: 'Introduction to teaching profession and general education core.' },
          { year: 2, title: 'Pedagogy Core', courses: ['EDUC 2310 Child Development', 'EDUC 2320 Foundations of Literacy', 'EDUC 2330 Educational Technology', 'Field Experience I'], description: 'Developmental theory and early classroom observations in local schools.' },
          { year: 3, title: 'Methods & Field Work', courses: ['EDUC 3310 Math Methods EC-6', 'EDUC 3320 Science Methods EC-6', 'EDUC 3330 Social Studies Methods', 'EDUC 3340 Reading Methods'], description: 'Subject-specific teaching methods with weekly field placements.' },
          { year: 4, title: 'Student Teaching & Certification', courses: ['EDUC 4610 Student Teaching', 'EDUC 4310 Classroom Management', 'TExES Prep Seminar'], description: 'Full-semester student teaching and TExES certification exam preparation.' },
        ],
        careers: [
          { title: 'Elementary School Teacher', medianSalary: 61690, growthRate: 0.04, description: 'Teach core subjects to students in grades K-6.' },
          { title: 'Curriculum Specialist', medianSalary: 66490, growthRate: 0.07, description: 'Design and implement curriculum standards for school districts.' },
          { title: 'Instructional Coordinator', medianSalary: 66970, growthRate: 0.07, description: 'Develop instructional materials and coordinate teaching standards.' },
        ],
      },
      {
        name: 'Special Education',
        degreeType: 'B.S.Ed.',
        description: 'Trains educators to support students with diverse learning needs through individualized instruction and behavioral strategies.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['EDUC 1301 Intro to Education', 'SPED 1301 Intro to Special Education', 'PSYC 1301 General Psychology', 'ENGL 1301 Composition I'], description: 'Overview of special education law, disability categories, and inclusion.' },
          { year: 2, title: 'Assessment & Behavior', courses: ['SPED 2310 Assessment in Special Education', 'SPED 2320 Behavior Management', 'EDUC 2310 Child Development', 'Field Experience I'], description: 'Learn diagnostic assessment, IEP development, and positive behavior interventions.' },
          { year: 3, title: 'Instructional Strategies', courses: ['SPED 3310 Methods for Learning Disabilities', 'SPED 3320 Methods for Intellectual Disabilities', 'SPED 3330 Assistive Technology', 'SPED 3340 Transition Planning'], description: 'Specialized instructional methods for diverse disability categories.' },
          { year: 4, title: 'Student Teaching & Certification', courses: ['SPED 4610 Student Teaching in Special Education', 'SPED 4310 Collaboration & Consultation', 'TExES Prep Seminar'], description: 'Student teaching in special education settings and TExES certification prep.' },
        ],
        careers: [
          { title: 'Special Education Teacher', medianSalary: 62950, growthRate: 0.04, description: 'Teach and support students with disabilities in K-12 settings.' },
          { title: 'Behavior Analyst (with BCBA)', medianSalary: 72000, growthRate: 0.22, description: 'Design behavior intervention plans for individuals with developmental disabilities.' },
        ],
      },
      {
        name: 'Kinesiology',
        degreeType: 'B.S.',
        description: 'Study human movement, exercise science, and sport with tracks in athletic training, exercise science, and sport management.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['KINE 1301 Intro to Kinesiology', 'BIOL 1401 Anatomy & Physiology I', 'CHEM 1305 General Chemistry', 'ENGL 1301 Composition I'], description: 'Science foundations and introduction to the field of kinesiology.' },
          { year: 2, title: 'Movement Science Core', courses: ['KINE 2310 Biomechanics', 'KINE 2320 Exercise Physiology', 'BIOL 1402 Anatomy & Physiology II', 'KINE 2330 Motor Learning'], description: 'Core courses in how the human body moves, adapts, and performs.' },
          { year: 3, title: 'Specialization', courses: ['KINE 3310 Exercise Testing & Prescription', 'KINE 3320 Sports Nutrition', 'KINE 3330 Strength & Conditioning', 'KINE Elective'], description: 'Choose a concentration in exercise science, coaching, or sport management.' },
          { year: 4, title: 'Capstone & Internship', courses: ['KINE 4610 Kinesiology Internship', 'KINE 4310 Research Methods', 'KINE 4320 Senior Seminar'], description: 'Professional internship at fitness facilities, athletic departments, or clinics.' },
        ],
        careers: [
          { title: 'Exercise Physiologist', medianSalary: 51350, growthRate: 0.10, description: 'Develop fitness and rehabilitation programs based on exercise science principles.' },
          { title: 'Athletic Trainer', medianSalary: 53840, growthRate: 0.17, description: 'Prevent, diagnose, and treat muscle and bone injuries in athletic settings.' },
          { title: 'Strength & Conditioning Coach', medianSalary: 48000, growthRate: 0.13, description: 'Design training programs to improve athletic performance.' },
        ],
      },
      {
        name: 'Educational Leadership',
        degreeType: 'M.Ed.',
        description: 'Graduate program preparing experienced educators for principal certification and school administration roles.',
        pathways: [
          { year: 1, title: 'Leadership Core', courses: ['EDLD 5301 Instructional Leadership', 'EDLD 5310 School Law', 'EDLD 5320 School Finance', 'EDLD 5330 Organizational Theory'], description: 'Foundations of educational leadership, legal frameworks, and school finance.' },
          { year: 2, title: 'Applied Leadership', courses: ['EDLD 6301 Campus Leadership Practicum', 'EDLD 6310 Data-Driven Decision Making', 'EDLD 6320 Human Resources in Education', 'EDLD 6330 Capstone Project'], description: 'Field-based practicum hours and capstone project for principal certification.' },
          { year: 3, title: 'Certification', courses: ['EDLD 6340 Principal Certification Prep', 'TExES Principal Exam Review'], description: 'Preparation for the TExES Principal certification examination.' },
          { year: 4, title: 'Advanced Practice', courses: ['EDLD 6350 Superintendent Certification', 'EDLD 6360 District Leadership'], description: 'Optional superintendent track for those pursuing district-level leadership.' },
        ],
        careers: [
          { title: 'School Principal', medianSalary: 101320, growthRate: 0.05, description: 'Lead and manage a school campus including staff, budget, and academic programs.' },
          { title: 'Assistant Superintendent', medianSalary: 110000, growthRate: 0.05, description: 'Oversee district-level operations and academic programs.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. COLLEGE OF BUSINESS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'umhb',
    name: 'College of Business',
    description: 'ACBSP-accredited programs integrating ethical business practice with real-world application through internships and community partnerships.',
    totalStudents: 520,
    majors: [
      {
        name: 'Business Administration',
        degreeType: 'B.B.A.',
        description: 'Broad-based business degree covering management, marketing, finance, and operations with local business partnerships.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['BUSI 1301 Intro to Business', 'ACCT 2301 Financial Accounting', 'ECON 2301 Microeconomics', 'MATH 1324 Business Math'], description: 'Core business and economics foundations.' },
          { year: 2, title: 'Business Core', courses: ['ACCT 2302 Managerial Accounting', 'ECON 2302 Macroeconomics', 'BUSI 2310 Business Statistics', 'BUSI 2320 Business Communications'], description: 'Accounting, economics, and analytical skills for business decision-making.' },
          { year: 3, title: 'Advanced Business', courses: ['MGMT 3310 Principles of Management', 'MKTG 3310 Principles of Marketing', 'FINA 3310 Corporate Finance', 'BUSI 3310 Business Law'], description: 'Functional area courses in management, marketing, and finance.' },
          { year: 4, title: 'Capstone & Internship', courses: ['BUSI 4310 Strategic Management', 'BUSI 4610 Business Internship', 'BUSI Elective', 'Professional Elective'], description: 'Strategic management capstone and professional internship experience.' },
        ],
        careers: [
          { title: 'Business Analyst', medianSalary: 62000, growthRate: 0.11, description: 'Analyze business processes and recommend improvements.' },
          { title: 'Operations Manager', medianSalary: 75000, growthRate: 0.06, description: 'Oversee daily business operations and improve efficiency.' },
          { title: 'Management Trainee', medianSalary: 52000, growthRate: 0.07, description: 'Rotational program preparing graduates for leadership roles.' },
        ],
      },
      {
        name: 'Accounting',
        degreeType: 'B.B.A.',
        description: 'CPA-track program with strong pass rates, preparing students for careers in public accounting, corporate finance, and audit.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ACCT 2301 Financial Accounting', 'ECON 2301 Microeconomics', 'MATH 1324 Business Math', 'ENGL 1301 Composition I'], description: 'Introduction to accounting principles and business fundamentals.' },
          { year: 2, title: 'Accounting Core', courses: ['ACCT 2302 Managerial Accounting', 'ACCT 3310 Intermediate Accounting I', 'ACCT 3320 Intermediate Accounting II', 'BUSI 2310 Business Statistics'], description: 'Intermediate accounting theory and practice for financial reporting.' },
          { year: 3, title: 'Advanced Accounting', courses: ['ACCT 3330 Cost Accounting', 'ACCT 3340 Tax Accounting', 'ACCT 3350 Auditing', 'ACCT 3360 Accounting Information Systems'], description: 'Tax, audit, cost, and systems courses building CPA exam readiness.' },
          { year: 4, title: 'CPA Prep & Capstone', courses: ['ACCT 4310 Advanced Auditing', 'ACCT 4320 Advanced Tax', 'ACCT 4610 Accounting Internship', 'BUSI 4310 Strategic Management'], description: 'Advanced coursework and internship; many students pursue 150 credit hours for CPA eligibility.' },
        ],
        careers: [
          { title: 'Certified Public Accountant', medianSalary: 79880, growthRate: 0.06, description: 'Provide audit, tax, and advisory services for organizations.' },
          { title: 'Financial Analyst', medianSalary: 73000, growthRate: 0.09, description: 'Analyze financial data and guide business investment decisions.' },
        ],
      },
      {
        name: 'Management',
        degreeType: 'B.B.A.',
        description: 'Focuses on organizational leadership, human resources, and entrepreneurship in small to mid-size business contexts.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['BUSI 1301 Intro to Business', 'ACCT 2301 Financial Accounting', 'ECON 2301 Microeconomics', 'ENGL 1301 Composition I'], description: 'Business and economics foundations.' },
          { year: 2, title: 'Business Core', courses: ['MGMT 2310 Organizational Behavior', 'BUSI 2310 Business Statistics', 'ECON 2302 Macroeconomics', 'BUSI 2320 Business Communications'], description: 'Core business courses with focus on organizational behavior.' },
          { year: 3, title: 'Management Specialization', courses: ['MGMT 3310 Principles of Management', 'MGMT 3320 Human Resource Management', 'MGMT 3330 Entrepreneurship', 'MGMT 3340 Project Management'], description: 'HR, entrepreneurship, and project management skills for leading organizations.' },
          { year: 4, title: 'Capstone & Internship', courses: ['MGMT 4310 Leadership & Ethics', 'MGMT 4610 Management Internship', 'BUSI 4310 Strategic Management', 'MGMT Elective'], description: 'Leadership capstone and professional internship in management roles.' },
        ],
        careers: [
          { title: 'Human Resources Manager', medianSalary: 67000, growthRate: 0.07, description: 'Manage recruitment, employee relations, and organizational development.' },
          { title: 'Project Manager', medianSalary: 72000, growthRate: 0.06, description: 'Plan and oversee projects from initiation to completion.' },
          { title: 'Small Business Owner', medianSalary: 55000, growthRate: 0.04, description: 'Launch and manage entrepreneurial ventures.' },
        ],
      },
      {
        name: 'Marketing',
        degreeType: 'B.B.A.',
        description: 'Covers digital marketing, consumer behavior, and brand strategy with hands-on campaigns for local businesses.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['BUSI 1301 Intro to Business', 'ACCT 2301 Financial Accounting', 'ECON 2301 Microeconomics', 'ENGL 1301 Composition I'], description: 'Business fundamentals and communication skills.' },
          { year: 2, title: 'Marketing Foundations', courses: ['MKTG 2310 Consumer Behavior', 'BUSI 2310 Business Statistics', 'MKTG 2320 Digital Marketing Fundamentals', 'BUSI 2320 Business Communications'], description: 'Consumer psychology and digital marketing foundations.' },
          { year: 3, title: 'Marketing Strategy', courses: ['MKTG 3310 Principles of Marketing', 'MKTG 3320 Marketing Research', 'MKTG 3330 Social Media Marketing', 'MKTG 3340 Brand Management'], description: 'Research methods, social media strategy, and brand development.' },
          { year: 4, title: 'Capstone & Internship', courses: ['MKTG 4310 Marketing Strategy', 'MKTG 4610 Marketing Internship', 'BUSI 4310 Strategic Management', 'MKTG Elective'], description: 'Capstone marketing plan for a real client and professional internship.' },
        ],
        careers: [
          { title: 'Marketing Coordinator', medianSalary: 53000, growthRate: 0.10, description: 'Coordinate marketing campaigns and manage brand communications.' },
          { title: 'Digital Marketing Specialist', medianSalary: 58000, growthRate: 0.13, description: 'Plan and execute digital advertising, SEO, and social media strategies.' },
          { title: 'Market Research Analyst', medianSalary: 63920, growthRate: 0.13, description: 'Analyze market trends and consumer data to guide business decisions.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. COLLEGE OF SCIENCES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'umhb',
    name: 'College of Sciences',
    description: 'Strong pre-professional programs in biology and chemistry with small class sizes and undergraduate research opportunities.',
    totalStudents: 440,
    majors: [
      {
        name: 'Biology',
        degreeType: 'B.S.',
        description: 'Pre-med and pre-health focused biology program with hands-on lab research and field study in Central Texas ecosystems.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['BIOL 1406 General Biology I', 'BIOL 1407 General Biology II', 'CHEM 1311 General Chemistry I', 'MATH 1314 College Algebra'], description: 'Core biology and chemistry with lab components.' },
          { year: 2, title: 'Organismal Biology', courses: ['BIOL 2401 Anatomy & Physiology I', 'BIOL 2402 Anatomy & Physiology II', 'CHEM 1312 General Chemistry II', 'BIOL 2420 Microbiology'], description: 'Human anatomy, physiology, and microbiology for pre-health students.' },
          { year: 3, title: 'Advanced Biology', courses: ['BIOL 3310 Genetics', 'BIOL 3320 Cell Biology', 'BIOL 3330 Ecology', 'BIOL 3340 Biochemistry'], description: 'Upper-level courses in genetics, cell biology, and ecology.' },
          { year: 4, title: 'Research & Capstone', courses: ['BIOL 4310 Senior Research', 'BIOL 4320 Senior Seminar', 'BIOL Elective', 'MCAT/GRE Prep'], description: 'Undergraduate research project and preparation for graduate or medical school.' },
        ],
        careers: [
          { title: 'Physician (with M.D.)', medianSalary: 229300, growthRate: 0.03, description: 'Diagnose and treat patients after completing medical school and residency.' },
          { title: 'Medical Laboratory Scientist', medianSalary: 57800, growthRate: 0.07, description: 'Perform lab tests that help diagnose diseases and monitor treatments.' },
          { title: 'Research Scientist', medianSalary: 68000, growthRate: 0.08, description: 'Conduct biological research in academic or industry laboratories.' },
        ],
      },
      {
        name: 'Chemistry',
        degreeType: 'B.S.',
        description: 'ACS-aligned curriculum preparing students for graduate school, pharmacy, or careers in chemical industry.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CHEM 1311 General Chemistry I', 'CHEM 1312 General Chemistry II', 'MATH 2413 Calculus I', 'PHYS 2325 Physics I'], description: 'General chemistry, calculus, and physics foundations.' },
          { year: 2, title: 'Organic & Analytical', courses: ['CHEM 2311 Organic Chemistry I', 'CHEM 2312 Organic Chemistry II', 'CHEM 2320 Analytical Chemistry', 'MATH 2414 Calculus II'], description: 'Organic chemistry and quantitative analysis techniques.' },
          { year: 3, title: 'Physical & Advanced', courses: ['CHEM 3310 Physical Chemistry I', 'CHEM 3320 Physical Chemistry II', 'CHEM 3330 Instrumental Analysis', 'CHEM 3340 Biochemistry'], description: 'Thermodynamics, kinetics, and advanced analytical instrumentation.' },
          { year: 4, title: 'Research & Capstone', courses: ['CHEM 4310 Senior Research', 'CHEM 4320 Senior Seminar', 'CHEM Elective', 'Professional Elective'], description: 'Year-long research project and professional development.' },
        ],
        careers: [
          { title: 'Chemist', medianSalary: 80680, growthRate: 0.06, description: 'Analyze substances and develop new materials or processes in labs.' },
          { title: 'Pharmacist (with Pharm.D.)', medianSalary: 132750, growthRate: 0.02, description: 'Dispense medications and advise patients on drug therapies.' },
        ],
      },
      {
        name: 'Mathematics',
        degreeType: 'B.S.',
        description: 'Develops analytical and problem-solving skills for careers in education, actuarial science, and data analysis.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['MATH 2413 Calculus I', 'MATH 2414 Calculus II', 'CSCI 1301 Intro to Computer Science', 'ENGL 1301 Composition I'], description: 'Calculus sequence and computational thinking foundations.' },
          { year: 2, title: 'Core Mathematics', courses: ['MATH 2415 Calculus III', 'MATH 2310 Linear Algebra', 'MATH 2320 Discrete Mathematics', 'MATH 2330 Differential Equations'], description: 'Multivariable calculus, linear algebra, and proof-based mathematics.' },
          { year: 3, title: 'Advanced Topics', courses: ['MATH 3310 Abstract Algebra', 'MATH 3320 Real Analysis', 'MATH 3330 Probability & Statistics', 'MATH Elective'], description: 'Rigorous proof courses in algebra and analysis with applied statistics.' },
          { year: 4, title: 'Capstone', courses: ['MATH 4310 Senior Research', 'MATH 4320 Senior Seminar', 'MATH Elective', 'Professional Elective'], description: 'Research project and preparation for graduate school or industry.' },
        ],
        careers: [
          { title: 'Actuary', medianSalary: 113990, growthRate: 0.21, description: 'Analyze financial risk using mathematics, statistics, and financial theory.' },
          { title: 'Data Analyst', medianSalary: 65000, growthRate: 0.23, description: 'Interpret data to help organizations make better decisions.' },
          { title: 'Mathematics Teacher', medianSalary: 61690, growthRate: 0.04, description: 'Teach mathematics at the secondary school level.' },
        ],
      },
      {
        name: 'Computer Science',
        degreeType: 'B.S.',
        description: 'Covers software development, algorithms, and systems with emphasis on practical projects and local tech internships.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CSCI 1301 Intro to Computer Science', 'CSCI 1302 Programming Fundamentals', 'MATH 2413 Calculus I', 'ENGL 1301 Composition I'], description: 'Programming fundamentals in Python/Java and mathematical reasoning.' },
          { year: 2, title: 'Core Computer Science', courses: ['CSCI 2310 Data Structures', 'CSCI 2320 Computer Organization', 'CSCI 2330 Discrete Mathematics', 'MATH 2414 Calculus II'], description: 'Data structures, algorithms, and computer architecture.' },
          { year: 3, title: 'Advanced Topics', courses: ['CSCI 3310 Database Systems', 'CSCI 3320 Operating Systems', 'CSCI 3330 Software Engineering', 'CSCI 3340 Computer Networks'], description: 'Systems, databases, and software engineering methodologies.' },
          { year: 4, title: 'Capstone & Internship', courses: ['CSCI 4310 Senior Project', 'CSCI 4610 CS Internship', 'CSCI Elective', 'CSCI Elective'], description: 'Year-long software project and professional internship.' },
        ],
        careers: [
          { title: 'Software Developer', medianSalary: 132270, growthRate: 0.25, description: 'Design and build software applications and systems.' },
          { title: 'Database Administrator', medianSalary: 101000, growthRate: 0.08, description: 'Manage and secure organizational databases.' },
          { title: 'IT Systems Administrator', medianSalary: 80600, growthRate: 0.03, description: 'Maintain and configure computer systems and networks.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. COLLEGE OF HUMANITIES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'umhb',
    name: 'College of Humanities',
    description: 'Liberal arts programs fostering critical thinking, communication, and cultural understanding in a faith-integrated environment.',
    totalStudents: 380,
    majors: [
      {
        name: 'English',
        degreeType: 'B.A.',
        description: 'Study literature, writing, and rhetoric with opportunities in creative writing, teaching certification, and professional communication.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ENGL 1301 Composition I', 'ENGL 1302 Composition II', 'ENGL 2310 Intro to Literature', 'HIST 1301 US History I'], description: 'Writing skills and introduction to literary analysis.' },
          { year: 2, title: 'Literary Survey', courses: ['ENGL 2320 British Literature I', 'ENGL 2330 British Literature II', 'ENGL 2340 American Literature', 'ENGL 2350 World Literature'], description: 'Survey of major literary traditions and critical reading.' },
          { year: 3, title: 'Advanced Studies', courses: ['ENGL 3310 Shakespeare', 'ENGL 3320 Creative Writing', 'ENGL 3330 Literary Criticism', 'ENGL Elective'], description: 'In-depth study of major authors, creative writing, and critical theory.' },
          { year: 4, title: 'Capstone', courses: ['ENGL 4310 Senior Thesis', 'ENGL 4320 Advanced Writing', 'ENGL Elective', 'Professional Elective'], description: 'Senior thesis and preparation for graduate school or professional careers.' },
        ],
        careers: [
          { title: 'Technical Writer', medianSalary: 59500, growthRate: 0.07, description: 'Create clear documentation for technical products and services.' },
          { title: 'Content Strategist', medianSalary: 62000, growthRate: 0.10, description: 'Develop and manage content across digital platforms.' },
          { title: 'English Teacher', medianSalary: 61690, growthRate: 0.04, description: 'Teach English language arts at the secondary school level.' },
        ],
      },
      {
        name: 'History',
        degreeType: 'B.A.',
        description: 'Explore American, European, and world history with emphasis on primary source research and analytical writing.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['HIST 1301 US History I', 'HIST 1302 US History II', 'ENGL 1301 Composition I', 'POLS 2301 American Government'], description: 'US history survey and foundational writing skills.' },
          { year: 2, title: 'World History', courses: ['HIST 2310 Western Civilization I', 'HIST 2320 Western Civilization II', 'HIST 2330 World History', 'HIST 2340 Historical Methods'], description: 'Comparative civilizations and introduction to historical research methods.' },
          { year: 3, title: 'Topical Studies', courses: ['HIST 3310 Civil War Era', 'HIST 3320 20th Century America', 'HIST 3330 Latin American History', 'HIST Elective'], description: 'Focused seminars in American and regional history topics.' },
          { year: 4, title: 'Research & Capstone', courses: ['HIST 4310 Senior Research Seminar', 'HIST 4320 Historiography', 'HIST Elective', 'Professional Elective'], description: 'Original research paper and historiographic analysis.' },
        ],
        careers: [
          { title: 'Museum Curator', medianSalary: 52000, growthRate: 0.12, description: 'Manage museum collections and develop educational exhibits.' },
          { title: 'History Teacher', medianSalary: 61690, growthRate: 0.04, description: 'Teach history and social studies at the secondary level.' },
        ],
      },
      {
        name: 'Psychology',
        degreeType: 'B.A.',
        description: 'Study human behavior and mental processes with preparation for graduate school in counseling, clinical psychology, or social work.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['PSYC 1301 General Psychology', 'PSYC 1302 Developmental Psychology', 'MATH 1342 Statistics', 'ENGL 1301 Composition I'], description: 'Introduction to psychology and statistical methods.' },
          { year: 2, title: 'Core Psychology', courses: ['PSYC 2310 Abnormal Psychology', 'PSYC 2320 Social Psychology', 'PSYC 2330 Research Methods', 'PSYC 2340 Biological Psychology'], description: 'Core areas of psychological study and research design.' },
          { year: 3, title: 'Applied Psychology', courses: ['PSYC 3310 Counseling Theories', 'PSYC 3320 Cognitive Psychology', 'PSYC 3330 Personality Theory', 'PSYC 3340 Psychological Testing'], description: 'Applied coursework in counseling, cognition, and assessment.' },
          { year: 4, title: 'Capstone & Practicum', courses: ['PSYC 4310 Senior Research', 'PSYC 4610 Psychology Practicum', 'PSYC Elective', 'GRE Prep'], description: 'Research project, field practicum, and graduate school preparation.' },
        ],
        careers: [
          { title: 'Licensed Professional Counselor', medianSalary: 53710, growthRate: 0.18, description: 'Provide mental health counseling after completing a graduate degree and licensure.' },
          { title: 'Human Resources Specialist', medianSalary: 64240, growthRate: 0.08, description: 'Apply psychological principles to recruitment and employee development.' },
          { title: 'Research Assistant', medianSalary: 47000, growthRate: 0.10, description: 'Assist with psychological research in academic or clinical settings.' },
        ],
      },
      {
        name: 'Criminal Justice',
        degreeType: 'B.S.',
        description: 'Prepares students for law enforcement, corrections, and legal careers with coursework in criminology, law, and forensics.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CRIJ 1301 Intro to Criminal Justice', 'CRIJ 1310 Intro to Policing', 'PSYC 1301 General Psychology', 'ENGL 1301 Composition I'], description: 'Overview of the criminal justice system and its three pillars.' },
          { year: 2, title: 'Core Studies', courses: ['CRIJ 2310 Criminology', 'CRIJ 2320 Criminal Law', 'CRIJ 2330 Corrections', 'CRIJ 2340 Juvenile Justice'], description: 'Crime causation theories, legal foundations, and correctional systems.' },
          { year: 3, title: 'Specialization', courses: ['CRIJ 3310 Criminal Investigation', 'CRIJ 3320 Forensic Science', 'CRIJ 3330 Victimology', 'CRIJ 3340 Ethics in Criminal Justice'], description: 'Applied skills in investigation, forensics, and ethical decision-making.' },
          { year: 4, title: 'Capstone & Internship', courses: ['CRIJ 4310 Senior Seminar', 'CRIJ 4610 CJ Internship', 'CRIJ Elective', 'Professional Elective'], description: 'Field internship with law enforcement or legal agencies and capstone project.' },
        ],
        careers: [
          { title: 'Police Officer', medianSalary: 65790, growthRate: 0.03, description: 'Protect communities and enforce laws at the local or state level.' },
          { title: 'Probation Officer', medianSalary: 60250, growthRate: 0.04, description: 'Supervise offenders in the community and support rehabilitation.' },
          { title: 'Federal Agent', medianSalary: 82000, growthRate: 0.03, description: 'Investigate federal crimes for agencies such as the FBI, DEA, or ATF.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. COLLEGE OF VISUAL & PERFORMING ARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'umhb',
    name: 'College of Visual & Performing Arts',
    description: 'Nurtures artistic talent through performance, design, and creative expression with intimate class sizes and frequent performance opportunities.',
    totalStudents: 330,
    majors: [
      {
        name: 'Music',
        degreeType: 'B.M.',
        description: 'Performance and music education tracks with ensembles, private lessons, and recital requirements each semester.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['MUSI 1301 Music Theory I', 'MUSI 1302 Music Theory II', 'MUSI 1310 Aural Skills I', 'MUSI 1100 Applied Lessons'], description: 'Music theory, ear training, and private instruction on primary instrument.' },
          { year: 2, title: 'Intermediate Studies', courses: ['MUSI 2301 Music Theory III', 'MUSI 2302 Music Theory IV', 'MUSI 2310 Music History I', 'MUSI 2100 Applied Lessons'], description: 'Advanced theory, music history, and continued ensemble participation.' },
          { year: 3, title: 'Advanced Performance', courses: ['MUSI 3310 Music History II', 'MUSI 3320 Conducting', 'MUSI 3330 Form & Analysis', 'MUSI 3100 Applied Lessons'], description: 'Conducting, analysis, and preparation for junior recital.' },
          { year: 4, title: 'Senior Recital & Capstone', courses: ['MUSI 4310 Senior Recital', 'MUSI 4320 Music Pedagogy', 'MUSI 4100 Applied Lessons', 'MUSI Elective'], description: 'Full senior recital performance and professional preparation.' },
        ],
        careers: [
          { title: 'Music Director', medianSalary: 55000, growthRate: 0.05, description: 'Direct musical ensembles in churches, schools, or community organizations.' },
          { title: 'Music Teacher', medianSalary: 61690, growthRate: 0.04, description: 'Teach music in K-12 schools with state certification.' },
          { title: 'Performer/Session Musician', medianSalary: 46000, growthRate: 0.05, description: 'Perform in orchestras, bands, or recording studios.' },
        ],
      },
      {
        name: 'Graphic Design',
        degreeType: 'B.F.A.',
        description: 'Hands-on studio program covering visual communication, branding, UI/UX, and print design with portfolio-driven outcomes.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ART 1310 Design Fundamentals', 'ART 1320 Drawing I', 'ART 1330 Color Theory', 'ART 1340 Digital Tools'], description: 'Visual fundamentals, drawing skills, and introduction to design software.' },
          { year: 2, title: 'Core Design', courses: ['GDES 2310 Typography', 'GDES 2320 Digital Illustration', 'GDES 2330 Layout & Composition', 'ART 2310 Art History I'], description: 'Typography, illustration, and page layout for print and screen.' },
          { year: 3, title: 'Applied Design', courses: ['GDES 3310 Branding & Identity', 'GDES 3320 Web & UI Design', 'GDES 3330 Motion Graphics', 'GDES 3340 Package Design'], description: 'Brand systems, web design, motion graphics, and packaging.' },
          { year: 4, title: 'Portfolio & Capstone', courses: ['GDES 4310 Senior Portfolio', 'GDES 4610 Design Internship', 'GDES 4320 Senior Exhibition', 'GDES Elective'], description: 'Professional portfolio development, internship, and senior exhibition.' },
        ],
        careers: [
          { title: 'Graphic Designer', medianSalary: 57990, growthRate: 0.03, description: 'Create visual concepts for print and digital media.' },
          { title: 'UI/UX Designer', medianSalary: 80000, growthRate: 0.16, description: 'Design user interfaces and experiences for websites and apps.' },
          { title: 'Art Director', medianSalary: 104920, growthRate: 0.06, description: 'Lead the visual style and creative direction of media projects.' },
        ],
      },
      {
        name: 'Theatre',
        degreeType: 'B.A.',
        description: 'Comprehensive theatre program with tracks in acting, directing, and technical theatre with multiple productions each semester.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['THEA 1310 Intro to Theatre', 'THEA 1320 Acting I', 'THEA 1330 Stagecraft', 'ENGL 1301 Composition I'], description: 'Introduction to performance, technical theatre, and theatrical traditions.' },
          { year: 2, title: 'Core Theatre', courses: ['THEA 2310 Acting II', 'THEA 2320 Theatre History I', 'THEA 2330 Scenic Design', 'THEA 2340 Lighting Design'], description: 'Intermediate acting and introduction to design disciplines.' },
          { year: 3, title: 'Advanced Studies', courses: ['THEA 3310 Directing', 'THEA 3320 Theatre History II', 'THEA 3330 Playwriting', 'THEA 3340 Costume Design'], description: 'Directing, playwriting, and advanced design work with mainstage productions.' },
          { year: 4, title: 'Senior Production & Capstone', courses: ['THEA 4310 Senior Project', 'THEA 4320 Stage Management', 'THEA 4610 Theatre Internship', 'THEA Elective'], description: 'Lead a senior production or design project and professional internship.' },
        ],
        careers: [
          { title: 'Stage Manager', medianSalary: 48000, growthRate: 0.05, description: 'Coordinate all aspects of theatrical productions from rehearsal to performance.' },
          { title: 'Theatre Teacher', medianSalary: 57000, growthRate: 0.04, description: 'Teach drama and direct productions in K-12 schools.' },
          { title: 'Actor', medianSalary: 46000, growthRate: 0.08, description: 'Perform in theatre, film, television, or commercial productions.' },
        ],
      },
    ],
  },
]
