// seed-academics-ttu.ts — All Texas Tech University colleges, majors, pathways & career outcomes
// Source: texastech.edu, catalog.ttu.edu (2025-2026 academic year)

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

export const ttuColleges: CollegeDef[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. DAVIS COLLEGE OF AGRICULTURAL SCIENCES & NATURAL RESOURCES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'Davis College of Agricultural Sciences & Natural Resources',
    description: 'One of the most comprehensive agricultural colleges in Texas, offering programs across agribusiness, animal science, plant science, landscape architecture, and natural resources management with access to research farms and rangelands across West Texas.',
    totalStudents: 2479,
    majors: [
      {
        name: 'Animal Science',
        degreeType: 'B.S.',
        description: 'Study animal biology, nutrition, reproduction, and management with options in pre-veterinary science, industry, and equine science. Access to TTU research feedlots and the Burnett Center for Cattle Research.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ANSC 1401 Intro to Animal Science', 'BIOL 1403 Biology I', 'CHEM 1307 General Chemistry I', 'ENGL 1301 Composition I'], description: 'Introduction to livestock species, basic biology, and chemistry foundations.' },
          { year: 2, title: 'Animal Biology Core', courses: ['ANSC 2301 Feeds & Feeding', 'ANSC 2401 Anatomy & Physiology', 'ANSC 2305 Livestock Evaluation', 'CHEM 1308 General Chemistry II'], description: 'Study nutrition, anatomy, and livestock judging with hands-on lab work.' },
          { year: 3, title: 'Specialization', courses: ['ANSC 3301 Animal Reproduction', 'ANSC 3401 Meat Science', 'ANSC 3305 Animal Genetics', 'ANSC Elective'], description: 'Choose pre-vet, industry, or equine track with advanced coursework in reproduction, genetics, and meat science.' },
          { year: 4, title: 'Capstone & Career Prep', courses: ['ANSC 4301 Senior Seminar', 'ANSC 4310 Beef Cattle Production', 'ANSC Elective', 'Professional Elective'], description: 'Capstone research or internship; many students complete feedlot or ranch management internships in West Texas.' },
        ],
        careers: [
          { title: 'Animal Scientist', medianSalary: 68000, growthRate: 0.06, description: 'Research animal genetics, nutrition, and production systems for universities, government, or industry.' },
          { title: 'Veterinarian (with DVM)', medianSalary: 119000, growthRate: 0.19, description: 'Diagnose and treat animals — the pre-vet track prepares students for veterinary school admission.' },
          { title: 'Livestock Production Manager', medianSalary: 58000, growthRate: 0.05, description: 'Manage cattle, swine, or poultry operations across Texas ranches and feedlots.' },
        ],
      },
      {
        name: 'Agribusiness',
        degreeType: 'B.S.',
        description: 'Combines agricultural knowledge with business principles to prepare graduates for careers in farm management, commodity trading, agricultural finance, and food industry supply chains.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['AAEC 1305 Intro to Agribusiness', 'ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'MATH 1320 Business Math'], description: 'Business and economics foundations with introduction to the agricultural economy.' },
          { year: 2, title: 'Agribusiness Core', courses: ['AAEC 2305 Agricultural Economics', 'AAEC 2310 Farm Management', 'FIN 3320 Corporate Finance', 'MKT 3350 Marketing'], description: 'Agricultural markets, farm financial management, and marketing fundamentals.' },
          { year: 3, title: 'Advanced Applications', courses: ['AAEC 3315 Commodity Futures', 'AAEC 3320 Agricultural Policy', 'AAEC 3340 Agribusiness Marketing', 'MGT 3370 Management'], description: 'Commodity trading, government policy impacts, and agribusiness marketing strategies.' },
          { year: 4, title: 'Industry Capstone', courses: ['AAEC 4310 Agribusiness Capstone', 'AAEC 4320 International Trade', 'AAEC Elective', 'Professional Elective'], description: 'Capstone project with agribusiness companies; strong placement in Texas agricultural sector.' },
        ],
        careers: [
          { title: 'Farm/Ranch Manager', medianSalary: 62000, growthRate: 0.05, description: 'Oversee day-to-day operations of agricultural production facilities.' },
          { title: 'Agricultural Loan Officer', medianSalary: 72000, growthRate: 0.04, description: 'Evaluate and manage agricultural loans for banks and lending institutions.' },
          { title: 'Commodity Trader', medianSalary: 85000, growthRate: 0.07, description: 'Buy and sell agricultural commodities on behalf of trading firms and cooperatives.' },
        ],
      },
      {
        name: 'Agricultural Communications',
        degreeType: 'B.S.',
        description: 'Prepare for careers in agricultural journalism, public relations, and marketing communications that connect producers with consumers and tell the story of agriculture.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ACOM 1301 Intro to Ag Communications', 'MCOM 1301 Intro to Mass Media', 'ENGL 1301 Composition I', 'COMM 2300 Public Speaking'], description: 'Communication fundamentals with agricultural context.' },
          { year: 2, title: 'Media Production', courses: ['ACOM 2305 Ag Writing', 'ACOM 2310 Ag Photography', 'ACOM 2315 Digital Media for Agriculture', 'MCOM 2340 Digital Content Creation'], description: 'Writing, photography, and digital content creation for agricultural audiences.' },
          { year: 3, title: 'Strategic Communications', courses: ['ACOM 3310 Ag PR & Advocacy', 'ACOM 3315 Ag Marketing Communications', 'ACOM 3320 Risk & Crisis Communication', 'ACOM Elective'], description: 'Public relations, marketing campaigns, and crisis communication in agriculture.' },
          { year: 4, title: 'Capstone', courses: ['ACOM 4310 Senior Capstone', 'ACOM 4320 Ag Media Internship', 'ACOM Elective', 'Professional Elective'], description: 'Professional internship and capstone campaign; graduates work in farm media, commodity organizations, and food companies.' },
        ],
        careers: [
          { title: 'Agricultural Communications Specialist', medianSalary: 52000, growthRate: 0.07, description: 'Create content and manage communications for agricultural organizations and companies.' },
          { title: 'Agricultural Marketing Manager', medianSalary: 65000, growthRate: 0.10, description: 'Develop marketing strategies for agricultural products, cooperatives, and food brands.' },
        ],
      },
      {
        name: 'Natural Resources Management',
        degreeType: 'B.S.',
        description: 'Study wildlife, fisheries, range science, and conservation with fieldwork across the diverse ecosystems of West Texas. Concentrations in wildlife biology, conservation law enforcement, fisheries, and ranch management.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['NRM 1301 Intro to Natural Resources', 'BIOL 1403 Biology I', 'CHEM 1307 General Chemistry I', 'MATH 1451 Calculus I'], description: 'Biological and chemical foundations with introduction to natural resources.' },
          { year: 2, title: 'Ecology Core', courses: ['NRM 2301 Wildlife Management', 'NRM 2305 Plant Identification', 'NRM 2310 Conservation Biology', 'BIOL 1404 Biology II'], description: 'Wildlife management, plant ecology, and conservation principles with field labs.' },
          { year: 3, title: 'Specialization', courses: ['NRM 3310 Range Management', 'NRM 3315 Fisheries Biology', 'NRM 3320 Wildlife Habitat', 'NRM Elective'], description: 'Choose concentration in wildlife, fisheries, range, or conservation law enforcement.' },
          { year: 4, title: 'Field Capstone', courses: ['NRM 4310 Senior Capstone', 'NRM 4315 GIS for Natural Resources', 'NRM Elective', 'Professional Elective'], description: 'Field research capstone with Texas Parks & Wildlife or USDA partnerships.' },
        ],
        careers: [
          { title: 'Wildlife Biologist', medianSalary: 63000, growthRate: 0.05, description: 'Study and manage wildlife populations for state agencies, federal agencies, or conservation organizations.' },
          { title: 'Conservation Officer', medianSalary: 55000, growthRate: 0.04, description: 'Enforce fish and wildlife laws as a Texas Game Warden or federal agent.' },
          { title: 'Range Manager', medianSalary: 60000, growthRate: 0.05, description: 'Manage rangeland ecosystems for livestock production and conservation on Texas ranches.' },
        ],
      },
      {
        name: 'Landscape Architecture',
        degreeType: 'B.L.A.',
        description: 'A professionally accredited program in site design, urban planning, and environmental design. The only LAAB-accredited program in West Texas, with studio-intensive coursework and design-build projects.',
        pathways: [
          { year: 1, title: 'Design Foundations', courses: ['LA 1401 Design Fundamentals', 'LA 1301 Intro to Landscape Architecture', 'MATH 1320 College Algebra', 'ENGL 1301 Composition I'], description: 'Foundational design, drawing, and spatial thinking skills.' },
          { year: 2, title: 'Site Design', courses: ['LA 2401 Site Design Studio', 'LA 2301 Plant Materials', 'LA 2305 Site Engineering', 'LA 2310 History of Landscape Architecture'], description: 'Design studios focused on site planning, grading, drainage, and plant selection.' },
          { year: 3, title: 'Advanced Design', courses: ['LA 3401 Urban Design Studio', 'LA 3301 Construction Technology', 'LA 3305 Environmental Design', 'LA Elective'], description: 'Complex urban and environmental design projects with professional software.' },
          { year: 4, title: 'Capstone Studio', courses: ['LA 4401 Comprehensive Design Studio', 'LA 4301 Professional Practice', 'LA Elective', 'Professional Elective'], description: 'Year-long capstone project; students complete design-build installations and professional internships.' },
        ],
        careers: [
          { title: 'Landscape Architect', medianSalary: 73000, growthRate: 0.04, description: 'Design parks, gardens, campuses, and urban spaces for landscape architecture firms.' },
          { title: 'Urban Planner', medianSalary: 78000, growthRate: 0.07, description: 'Plan land use and community development for cities and planning agencies.' },
        ],
      },
      {
        name: 'Plant and Soil Science',
        degreeType: 'B.S.',
        description: 'Study crop production, soil management, horticulture, and viticulture with unique concentrations in turfgrass science and Texas High Plains wine production.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['PSS 1401 Intro to Plant Science', 'CHEM 1307 General Chemistry I', 'BIOL 1403 Biology I', 'MATH 1320 College Algebra'], description: 'Chemistry, biology, and introduction to plant systems.' },
          { year: 2, title: 'Soil & Crop Science', courses: ['PSS 2301 Soils', 'PSS 2305 Crop Science', 'PSS 2310 Plant Physiology', 'CHEM 1308 General Chemistry II'], description: 'Soil chemistry, crop production systems, and how plants grow.' },
          { year: 3, title: 'Specialization', courses: ['PSS 3310 Turfgrass Management', 'PSS 3315 Viticulture & Enology', 'PSS 3320 Irrigation Science', 'PSS Elective'], description: 'Choose concentration in crop science, horticulture, turfgrass, or viticulture and enology.' },
          { year: 4, title: 'Capstone', courses: ['PSS 4310 Senior Capstone', 'PSS 4315 Precision Agriculture', 'PSS Elective', 'Professional Elective'], description: 'Research capstone with access to TTU research farms and the Texas Wine Marketing Research Institute.' },
        ],
        careers: [
          { title: 'Agronomist', medianSalary: 60000, growthRate: 0.05, description: 'Advise farmers on crop management, soil health, and sustainable practices.' },
          { title: 'Turfgrass Manager', medianSalary: 55000, growthRate: 0.06, description: 'Manage golf courses, sports fields, and commercial landscapes across Texas.' },
          { title: 'Viticulturist / Winemaker', medianSalary: 58000, growthRate: 0.08, description: 'Manage vineyards and produce wine — the Texas High Plains is the largest wine grape growing region in Texas.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. HUCKABEE COLLEGE OF ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'Huckabee College of Architecture',
    description: 'A design-intensive program emphasizing sustainability, digital fabrication, and West Texas vernacular architecture. Students work in dedicated studios from day one with small class sizes and strong faculty mentorship.',
    totalStudents: 738,
    majors: [
      {
        name: 'Architecture',
        degreeType: 'B.S.',
        description: 'A pre-professional architecture degree with intensive design studios, digital fabrication, and sustainable design coursework. Prepares students for the M.Arch professional degree or entry-level positions in architecture firms.',
        pathways: [
          { year: 1, title: 'Design Foundations', courses: ['ARCH 1411 Design Studio I', 'ARCH 1412 Design Studio II', 'ARCH 1301 Intro to Architecture', 'MATH 1451 Calculus I'], description: 'Foundational design thinking, drawing, model-making, and spatial composition.' },
          { year: 2, title: 'Architectural Design', courses: ['ARCH 2411 Design Studio III', 'ARCH 2412 Design Studio IV', 'ARCH 2301 Structures I', 'ARCH 2305 History of Architecture I'], description: 'Building design studios with structures, history, and environmental systems.' },
          { year: 3, title: 'Advanced Studios', courses: ['ARCH 3411 Design Studio V', 'ARCH 3412 Design Studio VI', 'ARCH 3301 Building Systems', 'ARCH 3305 Digital Design Methods'], description: 'Complex building design, digital fabrication, and building technology integration.' },
          { year: 4, title: 'Comprehensive Design', courses: ['ARCH 4411 Comprehensive Design Studio', 'ARCH 4301 Professional Practice', 'ARCH Elective', 'ARCH Elective'], description: 'Comprehensive design project integrating all skills; many students study abroad in Italy or Mexico.' },
        ],
        careers: [
          { title: 'Architectural Designer', medianSalary: 62000, growthRate: 0.05, description: 'Design buildings and spaces at architecture firms — most continue to M.Arch for licensure.' },
          { title: 'Licensed Architect (with M.Arch)', medianSalary: 88000, growthRate: 0.05, description: 'Design and oversee construction of buildings after completing the M.Arch and licensure exams.' },
          { title: 'Urban Designer', medianSalary: 75000, growthRate: 0.06, description: 'Plan and design urban spaces, streetscapes, and mixed-use developments.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. COLLEGE OF ARTS & SCIENCES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'College of Arts & Sciences',
    description: 'The largest and most diverse college at Texas Tech, offering over 30 undergraduate programs across the natural sciences, social sciences, humanities, and interdisciplinary studies. Home to nationally ranked programs in geosciences, psychology, and creative writing.',
    totalStudents: 8057,
    majors: [
      {
        name: 'Biology',
        degreeType: 'B.S.',
        description: 'A comprehensive biology program with research opportunities in genetics, ecology, and biomedicine. The Biological Sciences building features state-of-the-art research labs and the Natural Science Research Laboratory.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['BIOL 1403 Biology I', 'BIOL 1404 Biology II', 'CHEM 1307 General Chemistry I', 'MATH 1451 Calculus I'], description: 'Core biology, chemistry, and math foundations for all life science tracks.' },
          { year: 2, title: 'Intermediate Biology', courses: ['BIOL 2401 Genetics', 'BIOL 2402 Cell Biology', 'CHEM 2305 Organic Chemistry I', 'PHYS 2401 Physics I'], description: 'Genetics, cell biology, organic chemistry, and physics for pre-med and research tracks.' },
          { year: 3, title: 'Upper-Division', courses: ['BIOL 3416 Ecology', 'BIOL 3401 Molecular Biology', 'BIOL 3410 Microbiology', 'BIOL Elective'], description: 'Choose ecology, molecular, or biomedical tracks with laboratory research opportunities.' },
          { year: 4, title: 'Research Capstone', courses: ['BIOL 4301 Senior Seminar', 'BIOL 4100 Undergraduate Research', 'BIOL Elective', 'BIOL Elective'], description: 'Independent research project with faculty mentor; strong preparation for medical and graduate school.' },
        ],
        careers: [
          { title: 'Physician (with MD)', medianSalary: 229000, growthRate: 0.03, description: 'Diagnose and treat patients — biology is the top pre-med major at TTU.' },
          { title: 'Research Biologist', medianSalary: 66000, growthRate: 0.05, description: 'Conduct biological research at universities, biotech firms, or government agencies.' },
          { title: 'Biotech Research Associate', medianSalary: 58000, growthRate: 0.10, description: 'Work in biotechnology labs developing pharmaceuticals, diagnostics, or agricultural products.' },
        ],
      },
      {
        name: 'Biochemistry',
        degreeType: 'B.S.',
        description: 'Study the chemistry of living systems at the molecular level. Strong pre-med and pre-pharmacy track with research opportunities in drug development and protein chemistry.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CHEM 1307 General Chemistry I', 'CHEM 1308 General Chemistry II', 'BIOL 1403 Biology I', 'MATH 1451 Calculus I'], description: 'Chemistry and biology foundations for molecular life sciences.' },
          { year: 2, title: 'Organic & Analytical', courses: ['CHEM 2305 Organic Chemistry I', 'CHEM 2306 Organic Chemistry II', 'CHEM 3301 Analytical Chemistry', 'PHYS 2401 Physics I'], description: 'Organic chemistry, analytical methods, and physics for health science preparation.' },
          { year: 3, title: 'Biochemistry Core', courses: ['CHEM 3305 Biochemistry I', 'CHEM 3306 Biochemistry II', 'CHEM 4301 Physical Chemistry', 'BIOL 2401 Genetics'], description: 'Protein structure, enzyme kinetics, metabolic pathways, and molecular genetics.' },
          { year: 4, title: 'Research & Capstone', courses: ['CHEM 4100 Undergraduate Research', 'CHEM 4310 Advanced Biochemistry', 'CHEM Elective', 'Professional Elective'], description: 'Independent research in faculty labs; excellent preparation for medical school, pharmacy, or PhD programs.' },
        ],
        careers: [
          { title: 'Pharmacist (with PharmD)', medianSalary: 132000, growthRate: 0.02, description: 'Dispense medications and counsel patients — biochemistry is a top pre-pharmacy major.' },
          { title: 'Biochemist', medianSalary: 79000, growthRate: 0.06, description: 'Research chemical processes in living organisms at pharmaceutical or biotech companies.' },
        ],
      },
      {
        name: 'Chemistry',
        degreeType: 'B.S.',
        description: 'ACS-certified chemistry program covering analytical, organic, inorganic, and physical chemistry with extensive laboratory training and undergraduate research opportunities.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CHEM 1307 General Chemistry I', 'CHEM 1308 General Chemistry II', 'MATH 1451 Calculus I', 'MATH 1452 Calculus II'], description: 'General chemistry and calculus foundations.' },
          { year: 2, title: 'Core Chemistry', courses: ['CHEM 2305 Organic Chemistry I', 'CHEM 2306 Organic Chemistry II', 'CHEM 3301 Analytical Chemistry', 'PHYS 2401 Physics I'], description: 'Organic synthesis, analytical methods, and laboratory techniques.' },
          { year: 3, title: 'Advanced Chemistry', courses: ['CHEM 4301 Physical Chemistry I', 'CHEM 4302 Physical Chemistry II', 'CHEM 3310 Inorganic Chemistry', 'CHEM Elective'], description: 'Quantum mechanics, thermodynamics, and inorganic chemistry with ACS-certified lab hours.' },
          { year: 4, title: 'Research Capstone', courses: ['CHEM 4100 Undergraduate Research', 'CHEM 4320 Instrumental Analysis', 'CHEM Elective', 'Professional Elective'], description: 'Year-long research project; ACS certification qualifies graduates for industry positions without a graduate degree.' },
        ],
        careers: [
          { title: 'Chemist', medianSalary: 80000, growthRate: 0.06, description: 'Analyze chemical compounds and develop new materials in industrial or research labs.' },
          { title: 'Quality Control Analyst', medianSalary: 55000, growthRate: 0.05, description: 'Test products for quality and safety compliance in manufacturing and pharmaceutical settings.' },
        ],
      },
      {
        name: 'Psychology',
        degreeType: 'B.A.',
        description: 'Study human behavior, cognition, and mental health with research opportunities in the Psychology Building\'s experimental labs. One of the most popular majors at Texas Tech.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['PSY 1300 Intro to Psychology', 'PSY 1301 Psychology of Adjustment', 'ENGL 1301 Composition I', 'MATH 2300 Statistical Methods'], description: 'Introduction to major areas of psychology and statistical foundations.' },
          { year: 2, title: 'Core Psychology', courses: ['PSY 2400 Research Methods', 'PSY 3301 Developmental Psychology', 'PSY 3305 Abnormal Psychology', 'PSY 3310 Social Psychology'], description: 'Research methods, developmental, abnormal, and social psychology.' },
          { year: 3, title: 'Specialization', courses: ['PSY 3320 Cognitive Psychology', 'PSY 3325 Behavioral Neuroscience', 'PSY 3330 Personality', 'PSY Elective'], description: 'Choose clinical, cognitive, or neuroscience tracks with lab-based research.' },
          { year: 4, title: 'Capstone & Prep', courses: ['PSY 4300 Senior Seminar', 'PSY 4100 Research Practicum', 'PSY Elective', 'Professional Elective'], description: 'Honors thesis or research practicum; prepares for graduate programs in clinical, counseling, or I/O psychology.' },
        ],
        careers: [
          { title: 'Clinical Psychologist (with PhD/PsyD)', medianSalary: 90000, growthRate: 0.06, description: 'Assess and treat mental health conditions — requires doctoral degree after the B.A.' },
          { title: 'Human Resources Specialist', medianSalary: 64000, growthRate: 0.08, description: 'Apply psychology principles to recruiting, training, and workplace well-being.' },
          { title: 'Research Coordinator', medianSalary: 52000, growthRate: 0.10, description: 'Coordinate psychological or clinical research studies at universities and hospitals.' },
        ],
      },
      {
        name: 'Political Science',
        degreeType: 'B.A.',
        description: 'Study American government, international relations, and public policy with strong pre-law preparation and internship opportunities at the Texas State Capitol.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['POLS 1301 American Government I', 'POLS 1302 American Government II', 'ENGL 1301 Composition I', 'HIST 2300 US History I'], description: 'American government, history, and foundational writing skills.' },
          { year: 2, title: 'Core Political Science', courses: ['POLS 2300 Intro to Political Science', 'POLS 2310 International Relations', 'POLS 2320 Comparative Politics', 'POLS 2330 Research Methods'], description: 'Core subfields: international relations, comparative politics, and research methods.' },
          { year: 3, title: 'Specialization', courses: ['POLS 3310 Constitutional Law', 'POLS 3320 Public Policy', 'POLS 3330 Political Philosophy', 'POLS Elective'], description: 'Pre-law track through constitutional law and political theory courses.' },
          { year: 4, title: 'Capstone', courses: ['POLS 4300 Senior Seminar', 'POLS 4310 Internship', 'POLS Elective', 'Professional Elective'], description: 'Legislative internship or research thesis; many graduates attend law school.' },
        ],
        careers: [
          { title: 'Attorney (with JD)', medianSalary: 135000, growthRate: 0.06, description: 'Practice law after completing law school — political science is the top pre-law major.' },
          { title: 'Policy Analyst', medianSalary: 62000, growthRate: 0.06, description: 'Research and analyze public policies for government agencies or think tanks.' },
          { title: 'Legislative Aide', medianSalary: 48000, growthRate: 0.05, description: 'Support elected officials with research, constituent services, and policy development.' },
        ],
      },
      {
        name: 'Economics',
        degreeType: 'B.S.',
        description: 'Quantitative economics with strong foundations in econometrics, data analysis, and economic theory. Excellent preparation for graduate school or careers in finance and consulting.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ECO 2301 Microeconomics', 'ECO 2302 Macroeconomics', 'MATH 1451 Calculus I', 'ENGL 1301 Composition I'], description: 'Economic principles and calculus foundations.' },
          { year: 2, title: 'Intermediate Theory', courses: ['ECO 3311 Intermediate Microeconomics', 'ECO 3312 Intermediate Macroeconomics', 'MATH 1452 Calculus II', 'ISQS 2340 Statistics'], description: 'Formal economic models, calculus-based analysis, and statistical methods.' },
          { year: 3, title: 'Econometrics & Applications', courses: ['ECO 4311 Econometrics', 'ECO 4320 Labor Economics', 'ECO 4330 International Economics', 'ECO Elective'], description: 'Regression analysis, causal inference, and applied economics fields.' },
          { year: 4, title: 'Capstone', courses: ['ECO 4301 Senior Seminar', 'ECO Elective', 'ECO Elective', 'Professional Elective'], description: 'Research capstone using real-world data; strong placement in finance, consulting, and PhD programs.' },
        ],
        careers: [
          { title: 'Economist', medianSalary: 105000, growthRate: 0.06, description: 'Analyze economic data and trends for government, consulting firms, or financial institutions.' },
          { title: 'Data Analyst', medianSalary: 72000, growthRate: 0.23, description: 'Use statistical and econometric skills to analyze business data and inform decision-making.' },
        ],
      },
      {
        name: 'English',
        degreeType: 'B.A.',
        description: 'Study literature, creative writing, and rhetoric in one of the top creative writing programs in the Southwest. Home to Iron Horse Literary Review and the TTU Press.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ENGL 1301 Composition I', 'ENGL 1302 Composition II', 'ENGL 2301 Intro to Literary Studies', 'Humanities Elective'], description: 'Foundational writing and literary analysis skills.' },
          { year: 2, title: 'Literary Traditions', courses: ['ENGL 2303 British Literature I', 'ENGL 2304 British Literature II', 'ENGL 2305 American Literature', 'ENGL 2310 World Literature'], description: 'Survey of major literary traditions and critical approaches.' },
          { year: 3, title: 'Specialization', courses: ['ENGL 3301 Creative Writing', 'ENGL 3310 Shakespeare', 'ENGL 3320 Literary Theory', 'ENGL Elective'], description: 'Choose creative writing, literature, or rhetoric track with workshop courses.' },
          { year: 4, title: 'Capstone', courses: ['ENGL 4300 Senior Seminar', 'ENGL 4310 Advanced Creative Writing', 'ENGL Elective', 'Professional Elective'], description: 'Senior thesis or creative portfolio; graduates pursue teaching, writing, publishing, or law.' },
        ],
        careers: [
          { title: 'Technical Writer', medianSalary: 79000, growthRate: 0.07, description: 'Create technical documentation, user guides, and instructional content for companies.' },
          { title: 'Editor / Content Manager', medianSalary: 63000, growthRate: 0.05, description: 'Edit and manage content for publishers, media companies, or corporate communications.' },
        ],
      },
      {
        name: 'History',
        degreeType: 'B.A.',
        description: 'Study the American West, military history, and global civilizations with archival research at the Southwest Collection, one of the premier regional archives in the nation.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['HIST 2300 US History I', 'HIST 2301 US History II', 'ENGL 1301 Composition I', 'POLS 1301 American Government I'], description: 'American history survey and foundational writing skills.' },
          { year: 2, title: 'World & Thematic', courses: ['HIST 2310 World Civilizations I', 'HIST 2311 World Civilizations II', 'HIST 3300 Historical Methods', 'HIST Elective'], description: 'Global history and introduction to historical research methods.' },
          { year: 3, title: 'Specialization', courses: ['HIST 3310 History of the American West', 'HIST 3320 Military History', 'HIST 3330 Public History', 'HIST Elective'], description: 'Focus on regional, military, or public history with Southwest Collection archives access.' },
          { year: 4, title: 'Capstone', courses: ['HIST 4300 Senior Seminar', 'HIST Elective', 'HIST Elective', 'Professional Elective'], description: 'Research thesis using primary sources; prepares for graduate school, teaching, or public history careers.' },
        ],
        careers: [
          { title: 'Museum Curator / Archivist', medianSalary: 56000, growthRate: 0.12, description: 'Preserve and interpret historical collections at museums and archives.' },
          { title: 'High School History Teacher', medianSalary: 58000, growthRate: 0.04, description: 'Teach history and social studies at the secondary level with additional certification.' },
        ],
      },
      {
        name: 'Mathematics',
        degreeType: 'B.S.',
        description: 'Rigorous mathematical training in analysis, algebra, and applied math with growing data science track. Small class sizes in upper-division courses and strong preparation for actuarial exams.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['MATH 1451 Calculus I', 'MATH 1452 Calculus II', 'CS 1400 Intro to Computer Science', 'ENGL 1301 Composition I'], description: 'Calculus sequence and introduction to programming.' },
          { year: 2, title: 'Core Mathematics', courses: ['MATH 2450 Calculus III', 'MATH 2360 Linear Algebra', 'MATH 3310 Abstract Algebra I', 'MATH 3342 Probability & Statistics'], description: 'Multivariable calculus, linear algebra, and transition to proof-based mathematics.' },
          { year: 3, title: 'Advanced Topics', courses: ['MATH 4310 Real Analysis I', 'MATH 4320 Differential Equations', 'MATH 3350 Number Theory', 'MATH Elective'], description: 'Choose pure, applied, or data science track with proof-based analysis courses.' },
          { year: 4, title: 'Capstone', courses: ['MATH 4301 Senior Seminar', 'MATH Elective', 'MATH Elective', 'Professional Elective'], description: 'Research thesis or applied project; strong preparation for PhD programs or actuarial careers.' },
        ],
        careers: [
          { title: 'Actuary', medianSalary: 113000, growthRate: 0.21, description: 'Analyze financial risk using statistics and probability for insurance and finance companies.' },
          { title: 'Data Scientist', medianSalary: 108000, growthRate: 0.28, description: 'Apply mathematical models and machine learning to extract insights from large datasets.' },
          { title: 'Mathematician / Statistician', medianSalary: 96000, growthRate: 0.31, description: 'Develop mathematical theories and statistical methods for research or industry applications.' },
        ],
      },
      {
        name: 'Geosciences',
        degreeType: 'B.S.',
        description: 'Study geology, geophysics, and environmental science with fieldwork across West Texas. Concentrations in environmental geology, geology, and geophysics with strong oil and gas industry connections.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['GEOS 1401 Physical Geology', 'GEOS 1402 Historical Geology', 'CHEM 1307 General Chemistry I', 'MATH 1451 Calculus I'], description: 'Introduction to rocks, minerals, Earth history, and chemistry foundations.' },
          { year: 2, title: 'Core Geosciences', courses: ['GEOS 2301 Mineralogy', 'GEOS 2305 Sedimentology', 'GEOS 2310 Structural Geology', 'PHYS 2401 Physics I'], description: 'Mineral identification, sedimentary processes, and rock deformation with field labs.' },
          { year: 3, title: 'Specialization', courses: ['GEOS 3310 Petroleum Geology', 'GEOS 3315 Geophysics', 'GEOS 3320 Hydrogeology', 'GEOS Elective'], description: 'Choose geology, geophysics, or environmental track with Permian Basin field trips.' },
          { year: 4, title: 'Field Capstone', courses: ['GEOS 4301 Field Camp', 'GEOS 4310 Senior Thesis', 'GEOS Elective', 'Professional Elective'], description: 'Six-week summer field camp and senior research; geosciences majors have strong placement in oil & gas.' },
        ],
        careers: [
          { title: 'Geologist', medianSalary: 83000, growthRate: 0.05, description: 'Study the Earth for energy exploration, mining, or environmental consulting firms.' },
          { title: 'Environmental Consultant', medianSalary: 72000, growthRate: 0.08, description: 'Assess environmental impacts and remediation plans for contaminated sites.' },
          { title: 'Geophysicist', medianSalary: 97000, growthRate: 0.05, description: 'Use seismic data and instruments to map subsurface geology for energy companies.' },
        ],
      },
      {
        name: 'Physics',
        degreeType: 'B.S.',
        description: 'Study fundamental physics from mechanics to quantum theory with research opportunities in astrophysics and quantum science. Small cohort with strong faculty mentorship.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['PHYS 2401 Physics I', 'PHYS 2402 Physics II', 'MATH 1451 Calculus I', 'MATH 1452 Calculus II'], description: 'Calculus-based mechanics, electricity & magnetism, and mathematics.' },
          { year: 2, title: 'Intermediate Physics', courses: ['PHYS 3301 Modern Physics', 'PHYS 3305 Classical Mechanics', 'MATH 2450 Calculus III', 'MATH 2360 Linear Algebra'], description: 'Quantum mechanics introduction, Lagrangian mechanics, and advanced mathematics.' },
          { year: 3, title: 'Advanced Topics', courses: ['PHYS 4301 Quantum Mechanics', 'PHYS 4305 Electrodynamics', 'PHYS 4310 Thermal Physics', 'PHYS Elective'], description: 'Formal quantum theory, Maxwell\'s equations, and thermodynamics.' },
          { year: 4, title: 'Research Capstone', courses: ['PHYS 4100 Undergraduate Research', 'PHYS 4320 Astrophysics', 'PHYS Elective', 'Professional Elective'], description: 'Year-long research project; TTU physics produces graduates who enter top PhD programs.' },
        ],
        careers: [
          { title: 'Physicist', medianSalary: 95000, growthRate: 0.08, description: 'Conduct physics research at national labs, universities, or defense contractors.' },
          { title: 'Medical Physicist', medianSalary: 127000, growthRate: 0.06, description: 'Apply physics to radiation therapy and medical imaging in hospitals.' },
        ],
      },
      {
        name: 'Kinesiology',
        degreeType: 'B.S.',
        description: 'Study human movement, exercise science, and sports performance. Excellent pre-physical therapy and pre-athletic training preparation with access to the Exercise & Sport Sciences Center.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['KIN 1301 Intro to Kinesiology', 'BIOL 1403 Biology I', 'CHEM 1307 General Chemistry I', 'MATH 2300 Statistics'], description: 'Biological foundations and introduction to exercise science.' },
          { year: 2, title: 'Movement Science', courses: ['KIN 2301 Anatomy & Physiology I', 'KIN 2302 Anatomy & Physiology II', 'KIN 2310 Biomechanics', 'KIN 2315 Motor Learning'], description: 'Human anatomy, biomechanics, and how the body learns movement.' },
          { year: 3, title: 'Exercise Science', courses: ['KIN 3310 Exercise Physiology', 'KIN 3315 Exercise Testing', 'KIN 3320 Sports Nutrition', 'KIN Elective'], description: 'Advanced exercise physiology, fitness assessment, and sport nutrition.' },
          { year: 4, title: 'Clinical Prep', courses: ['KIN 4310 Senior Practicum', 'KIN 4315 Rehabilitation Science', 'KIN Elective', 'Professional Elective'], description: 'Clinical practicum hours at athletic training facilities; prepares for DPT or athletic training programs.' },
        ],
        careers: [
          { title: 'Physical Therapist (with DPT)', medianSalary: 97000, growthRate: 0.15, description: 'Help patients recover from injuries and improve mobility — requires Doctor of Physical Therapy degree.' },
          { title: 'Strength & Conditioning Coach', medianSalary: 52000, growthRate: 0.13, description: 'Design training programs for athletes at universities, professional teams, or fitness facilities.' },
          { title: 'Athletic Trainer', medianSalary: 53000, growthRate: 0.17, description: 'Prevent and treat injuries for athletes at schools, colleges, or professional organizations.' },
        ],
      },
      {
        name: 'Sport Management',
        degreeType: 'B.S.',
        description: 'Prepare for careers in sports business, event management, and athletic administration with experiential learning through Big 12 events and Texas Tech Athletics partnerships.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['SM 1301 Intro to Sport Management', 'ECO 2301 Microeconomics', 'ENGL 1301 Composition I', 'COMM 2300 Public Speaking'], description: 'Introduction to the sports industry and business fundamentals.' },
          { year: 2, title: 'Sport Business Core', courses: ['SM 2310 Sport Marketing', 'SM 2315 Sport Finance', 'SM 2320 Sport Law', 'MGT 3370 Management'], description: 'Marketing, finance, and legal aspects of the sports industry.' },
          { year: 3, title: 'Advanced Applications', courses: ['SM 3310 Event Management', 'SM 3315 Facility Management', 'SM 3320 Sport Analytics', 'SM Elective'], description: 'Plan and execute events, manage facilities, and analyze performance data.' },
          { year: 4, title: 'Capstone & Internship', courses: ['SM 4310 Senior Seminar', 'SM 4320 Sport Management Internship', 'SM Elective', 'Professional Elective'], description: 'Full-semester internship with professional or collegiate sports organizations.' },
        ],
        careers: [
          { title: 'Sports Marketing Manager', medianSalary: 72000, growthRate: 0.10, description: 'Develop marketing strategies and sponsorship deals for sports organizations and brands.' },
          { title: 'Athletic Director', medianSalary: 78000, growthRate: 0.07, description: 'Oversee athletic programs, budgets, and compliance at high schools or colleges.' },
          { title: 'Event Coordinator', medianSalary: 55000, growthRate: 0.08, description: 'Plan and manage sporting events, tournaments, and stadium operations.' },
        ],
      },
      {
        name: 'Criminology',
        degreeType: 'B.A.',
        description: 'Study crime, criminal justice systems, and social deviance with internship opportunities at local, state, and federal law enforcement agencies.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['SOC 1301 Intro to Sociology', 'CRIM 1300 Intro to Criminology', 'ENGL 1301 Composition I', 'POLS 1301 American Government'], description: 'Social science foundations and introduction to crime and justice.' },
          { year: 2, title: 'Criminology Core', courses: ['CRIM 2310 Criminal Justice System', 'CRIM 2320 Theories of Crime', 'CRIM 2330 Research Methods', 'SOC 2310 Social Problems'], description: 'Criminal justice processes, criminological theory, and research methods.' },
          { year: 3, title: 'Specialization', courses: ['CRIM 3310 Corrections', 'CRIM 3320 Policing', 'CRIM 3330 Juvenile Justice', 'CRIM Elective'], description: 'Choose law enforcement, corrections, or juvenile justice specialization.' },
          { year: 4, title: 'Capstone', courses: ['CRIM 4300 Senior Seminar', 'CRIM 4310 Internship', 'CRIM Elective', 'Professional Elective'], description: 'Internship with law enforcement agency and capstone research project.' },
        ],
        careers: [
          { title: 'FBI / Federal Agent', medianSalary: 85000, growthRate: 0.03, description: 'Investigate federal crimes — TTU criminology alumni serve in the FBI, DEA, and US Marshals.' },
          { title: 'Police Officer', medianSalary: 66000, growthRate: 0.03, description: 'Protect communities and enforce laws at municipal or state law enforcement agencies.' },
          { title: 'Probation Officer', medianSalary: 60000, growthRate: 0.04, description: 'Supervise offenders and support rehabilitation in community corrections programs.' },
        ],
      },
      {
        name: 'Sociology',
        degreeType: 'B.A.',
        description: 'Study social structures, inequality, and human behavior through research-based analysis. Prepares students for social services, public policy, or graduate programs.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['SOC 1301 Intro to Sociology', 'SOC 1302 Social Problems', 'ENGL 1301 Composition I', 'PSY 1300 Intro to Psychology'], description: 'Introduction to sociological concepts and social issues.' },
          { year: 2, title: 'Core Sociology', courses: ['SOC 2310 Research Methods', 'SOC 2320 Social Statistics', 'SOC 2330 Social Stratification', 'SOC Elective'], description: 'Research methods, data analysis, and study of social inequality.' },
          { year: 3, title: 'Specialization', courses: ['SOC 3310 Race & Ethnicity', 'SOC 3320 Medical Sociology', 'SOC 3330 Urban Sociology', 'SOC Elective'], description: 'Advanced coursework in race, health, or urban studies with applied research.' },
          { year: 4, title: 'Capstone', courses: ['SOC 4300 Senior Seminar', 'SOC 4310 Internship or Research', 'SOC Elective', 'Professional Elective'], description: 'Research thesis or internship with social service agencies.' },
        ],
        careers: [
          { title: 'Social Worker (with MSW)', medianSalary: 55000, growthRate: 0.09, description: 'Help individuals and families navigate social services and mental health systems.' },
          { title: 'Market Research Analyst', medianSalary: 68000, growthRate: 0.19, description: 'Study consumer behavior and market conditions using sociological research methods.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. JERRY S. RAWLS COLLEGE OF BUSINESS ADMINISTRATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'Jerry S. Rawls College of Business Administration',
    description: 'An AACSB-accredited business school recognized for energy commerce, personal financial planning, and entrepreneurship. Home to the Williams-Rawls Energy Trading Center with Bloomberg Terminals and the Institute for Personal Financial Planning.',
    totalStudents: 5829,
    majors: [
      {
        name: 'Energy Commerce',
        degreeType: 'B.B.A.',
        description: 'A unique program combining business and energy industry knowledge, preparing students for leadership in the oil, gas, and renewable energy sectors. One of only a handful of energy business programs in the nation.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'MATH 1320 Business Math', 'ENGL 1301 Composition I'], description: 'Foundational business, economics, and accounting courses.' },
          { year: 2, title: 'Energy Industry Core', courses: ['EC 3301 Energy Markets & Policy', 'EC 3310 Oil & Gas Accounting', 'FIN 3320 Corporate Finance', 'MGT 3370 Business Law'], description: 'Study energy markets, commodity trading, and energy-sector finance.' },
          { year: 3, title: 'Energy Specialization', courses: ['EC 3315 Land Management', 'EC 4320 Energy Trading & Risk', 'EC 4330 Renewable Energy Business', 'MKT 3350 Marketing'], description: 'Deep-dive into land management, energy trading, and renewables.' },
          { year: 4, title: 'Industry Capstone', courses: ['EC 4340 Energy Commerce Capstone', 'EC 4350 Energy Law & Regulation', 'Business Elective', 'Professional Elective'], description: 'Capstone project with Permian Basin companies; most students intern during senior year.' },
        ],
        careers: [
          { title: 'Energy Trader', medianSalary: 105000, growthRate: 0.09, description: 'Buy and sell energy commodities (oil, gas, electricity) on behalf of trading firms and utilities.' },
          { title: 'Landman', medianSalary: 78000, growthRate: 0.05, description: 'Negotiate mineral rights leases and manage land acquisition for energy companies.' },
          { title: 'Energy Consultant', medianSalary: 88000, growthRate: 0.11, description: 'Advise companies on energy strategy, market trends, and regulatory compliance.' },
        ],
      },
      {
        name: 'Finance',
        degreeType: 'B.B.A.',
        description: 'Investment analysis, corporate finance, and financial markets with Bloomberg Terminal access and CFA preparation through the Rawls Financial Planning program.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'MATH 1320 Business Math', 'BLAW 2361 Legal Environment'], description: 'Build knowledge in economics, accounting, and business law.' },
          { year: 2, title: 'Finance Core', courses: ['FIN 3320 Corporate Finance', 'FIN 3322 Investments', 'ACCT 2301 Accounting II', 'ISQS 2340 Business Statistics'], description: 'Master corporate valuation, investment analysis, and financial statements.' },
          { year: 3, title: 'Advanced Finance', courses: ['FIN 4325 Financial Modeling', 'FIN 4330 Portfolio Management', 'FIN 4335 Derivatives', 'FIN Elective'], description: 'Bloomberg Terminal work, portfolio construction, and options pricing.' },
          { year: 4, title: 'Career Preparation', courses: ['FIN 4340 Senior Seminar', 'FIN Elective', 'Business Elective', 'CFA Prep Elective'], description: 'Prepare for CFA Level I, capstone projects, and industry placement.' },
        ],
        careers: [
          { title: 'Financial Analyst', medianSalary: 83000, growthRate: 0.09, description: 'Analyze financial data and create models to guide business investment decisions.' },
          { title: 'Investment Banking Analyst', medianSalary: 100000, growthRate: 0.07, description: 'Advise companies on mergers, acquisitions, and capital raising at major banks.' },
          { title: 'Portfolio Manager', medianSalary: 120000, growthRate: 0.08, description: 'Manage investment portfolios for institutional investors or high-net-worth clients.' },
        ],
      },
      {
        name: 'Accounting',
        degreeType: 'B.B.A.',
        description: 'Comprehensive accounting education covering financial, managerial, tax, and audit practices with strong Big Four recruiting and CPA exam preparation.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ACCT 2300 Accounting I', 'ECO 2301 Microeconomics', 'MATH 1320 Business Math', 'ENGL 1301 Composition I'], description: 'Introduction to financial accounting and business fundamentals.' },
          { year: 2, title: 'Accounting Core', courses: ['ACCT 2301 Accounting II', 'ACCT 3301 Intermediate Accounting I', 'ACCT 3302 Intermediate Accounting II', 'BLAW 2361 Business Law'], description: 'Financial reporting, cost accounting, and business law.' },
          { year: 3, title: 'Advanced Accounting', courses: ['ACCT 3303 Cost Accounting', 'ACCT 3305 Tax Accounting', 'ACCT 4305 Auditing', 'ACCT Elective'], description: 'Taxation, auditing, and management accounting with case-based learning.' },
          { year: 4, title: 'CPA Preparation', courses: ['ACCT 4310 Advanced Accounting', 'ACCT 4315 Accounting Information Systems', 'Business Elective', 'Professional Elective'], description: 'Prepare for CPA exam; most students pursue 150-hour requirement through integrated M.S.A.' },
        ],
        careers: [
          { title: 'CPA / Public Accountant', medianSalary: 78000, growthRate: 0.06, description: 'Audit financial statements and advise clients on tax and financial matters at public accounting firms.' },
          { title: 'Corporate Accountant', medianSalary: 72000, growthRate: 0.06, description: 'Manage financial reporting, budgets, and compliance for corporations.' },
          { title: 'Tax Advisor', medianSalary: 82000, growthRate: 0.05, description: 'Specialize in tax planning and compliance for businesses and individuals.' },
        ],
      },
      {
        name: 'Marketing',
        degreeType: 'B.B.A.',
        description: 'Study consumer behavior, brand strategy, digital marketing, and sales management with experiential learning through the Texas Tech Marketing Association and client-based projects.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'ENGL 1301 Composition I', 'COMM 2300 Public Speaking'], description: 'Economics, accounting, and communication foundations.' },
          { year: 2, title: 'Marketing Core', courses: ['MKT 3350 Principles of Marketing', 'MKT 3352 Consumer Behavior', 'MKT 3354 Marketing Research', 'ISQS 2340 Statistics'], description: 'Consumer psychology, market research methods, and marketing fundamentals.' },
          { year: 3, title: 'Specialization', courses: ['MKT 4350 Digital Marketing', 'MKT 4352 Brand Management', 'MKT 4354 Sales Management', 'MKT Elective'], description: 'Digital strategy, branding, and professional selling with client-based projects.' },
          { year: 4, title: 'Capstone', courses: ['MKT 4360 Marketing Strategy Capstone', 'MKT Elective', 'Business Elective', 'Professional Elective'], description: 'Comprehensive marketing strategy capstone with real business clients.' },
        ],
        careers: [
          { title: 'Marketing Manager', medianSalary: 76000, growthRate: 0.10, description: 'Develop and execute marketing strategies for brands and products.' },
          { title: 'Digital Marketing Specialist', medianSalary: 62000, growthRate: 0.16, description: 'Manage digital campaigns across social media, SEO, and email marketing channels.' },
          { title: 'Sales Manager', medianSalary: 82000, growthRate: 0.05, description: 'Lead sales teams and develop strategies to grow revenue.' },
        ],
      },
      {
        name: 'Management',
        degreeType: 'B.B.A.',
        description: 'Study leadership, organizational behavior, and human resource management with real-world consulting projects and internship opportunities across Texas industries.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'MATH 1320 Business Math', 'ENGL 1301 Composition I'], description: 'Business and economics foundations.' },
          { year: 2, title: 'Management Core', courses: ['MGT 3370 Principles of Management', 'MGT 3373 Organizational Behavior', 'MGT 3375 Human Resource Management', 'FIN 3320 Corporate Finance'], description: 'Leadership, organizational behavior, and people management.' },
          { year: 3, title: 'Advanced Management', courses: ['MGT 4370 Strategic Management', 'MGT 4373 Entrepreneurship', 'MGT 4375 Negotiations', 'MGT Elective'], description: 'Strategy, entrepreneurship, and negotiation skills.' },
          { year: 4, title: 'Capstone', courses: ['MGT 4380 Management Capstone', 'MGT Elective', 'Business Elective', 'Professional Elective'], description: 'Consulting capstone with a real business; prepares for management or entrepreneurial careers.' },
        ],
        careers: [
          { title: 'Operations Manager', medianSalary: 72000, growthRate: 0.06, description: 'Oversee daily operations and improve efficiency at businesses and organizations.' },
          { title: 'Human Resources Manager', medianSalary: 78000, growthRate: 0.07, description: 'Manage recruiting, employee relations, and organizational development.' },
          { title: 'Entrepreneur', medianSalary: 70000, growthRate: 0.08, description: 'Start and manage new business ventures — the Rawls entrepreneurship program provides mentorship and funding.' },
        ],
      },
      {
        name: 'Information Technology',
        degreeType: 'B.B.A.',
        description: 'STEM-designated business technology program covering data analytics, cybersecurity, and enterprise systems. Bridges business strategy and technology implementation.',
        pathways: [
          { year: 1, title: 'Business & Tech Foundations', courses: ['ISQS 1301 Intro to IT', 'ECO 2301 Microeconomics', 'MATH 1320 Business Math', 'ENGL 1301 Composition I'], description: 'Introduction to information systems and business fundamentals.' },
          { year: 2, title: 'Core IT', courses: ['ISQS 3340 Database Management', 'ISQS 3344 Systems Analysis', 'ISQS 3348 Business Programming', 'ISQS 2340 Statistics'], description: 'Database design, systems analysis, and programming for business applications.' },
          { year: 3, title: 'Advanced IT', courses: ['ISQS 4340 Cybersecurity', 'ISQS 4344 Data Analytics', 'ISQS 4348 Cloud Computing', 'ISQS Elective'], description: 'Cybersecurity, data analytics, and cloud platforms — STEM-designated courses.' },
          { year: 4, title: 'Capstone', courses: ['ISQS 4350 IT Capstone', 'ISQS Elective', 'Business Elective', 'Professional Elective'], description: 'Technology consulting capstone with enterprise clients.' },
        ],
        careers: [
          { title: 'IT Consultant', medianSalary: 88000, growthRate: 0.11, description: 'Advise businesses on technology strategy and digital transformation.' },
          { title: 'Business Intelligence Analyst', medianSalary: 80000, growthRate: 0.14, description: 'Build dashboards and analytics solutions to drive data-informed business decisions.' },
          { title: 'Cybersecurity Analyst', medianSalary: 102000, growthRate: 0.32, description: 'Protect business systems from cyber threats — one of the fastest-growing tech fields.' },
        ],
      },
      {
        name: 'Supply Chain Management',
        degreeType: 'B.B.A.',
        description: 'Study logistics, procurement, and operations management with hands-on experience in the supply chain operations of Texas industries including energy, agriculture, and manufacturing.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'MATH 1320 Business Math', 'ENGL 1301 Composition I'], description: 'Economics, accounting, and business math foundations.' },
          { year: 2, title: 'SCM Core', courses: ['SCM 3350 Intro to Supply Chain', 'SCM 3352 Logistics & Transportation', 'MGT 3370 Management', 'ISQS 2340 Statistics'], description: 'Supply chain fundamentals, logistics networks, and operations management.' },
          { year: 3, title: 'Advanced SCM', courses: ['SCM 4350 Procurement & Sourcing', 'SCM 4352 Supply Chain Analytics', 'SCM 4354 Quality Management', 'SCM Elective'], description: 'Strategic sourcing, data-driven supply chain optimization, and quality control.' },
          { year: 4, title: 'Capstone', courses: ['SCM 4360 SCM Capstone', 'SCM Elective', 'Business Elective', 'Professional Elective'], description: 'Supply chain consulting project with industry partner.' },
        ],
        careers: [
          { title: 'Supply Chain Analyst', medianSalary: 68000, growthRate: 0.08, description: 'Optimize supply chain operations using data analysis and process improvement.' },
          { title: 'Logistics Manager', medianSalary: 78000, growthRate: 0.09, description: 'Manage transportation, warehousing, and distribution operations for companies.' },
          { title: 'Procurement Manager', medianSalary: 82000, growthRate: 0.07, description: 'Source materials and negotiate contracts with suppliers for organizations.' },
        ],
      },
      {
        name: 'General Business',
        degreeType: 'B.B.A.',
        description: 'A flexible business degree allowing students to customize their curriculum across multiple business disciplines. Available online and with a construction management concentration.',
        pathways: [
          { year: 1, title: 'Business Foundations', courses: ['ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'MATH 1320 Business Math', 'ENGL 1301 Composition I'], description: 'Core business and economics foundations.' },
          { year: 2, title: 'Business Core', courses: ['FIN 3320 Corporate Finance', 'MKT 3350 Marketing', 'MGT 3370 Management', 'ISQS 2340 Statistics'], description: 'Survey all major business functions: finance, marketing, and management.' },
          { year: 3, title: 'Elective Focus', courses: ['Business Elective', 'Business Elective', 'Business Elective', 'Business Elective'], description: 'Choose electives across finance, marketing, management, and IT to build a custom business skill set.' },
          { year: 4, title: 'Capstone', courses: ['MGT 4370 Strategic Management', 'Business Elective', 'Business Elective', 'Professional Elective'], description: 'Strategic management capstone integrating all business disciplines.' },
        ],
        careers: [
          { title: 'Business Manager', medianSalary: 68000, growthRate: 0.06, description: 'Manage teams and operations across various business functions.' },
          { title: 'Project Manager', medianSalary: 74000, growthRate: 0.07, description: 'Plan and execute projects using organizational and leadership skills.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. COLLEGE OF EDUCATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'College of Education',
    description: 'Prepare to become a certified Texas teacher through the innovative TechTeach clinically intensive program. Students spend significant time in real classrooms from their first year, with certification in elementary, middle, and secondary education.',
    totalStudents: 608,
    majors: [
      {
        name: 'Education (EC-6 Generalist)',
        degreeType: 'B.S.',
        description: 'Earn Texas teacher certification for Early Childhood through Grade 6 with ESL and Special Education endorsements through the TechTeach program. Clinically intensive with classroom experience from Year 1.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['EDUC 1301 Intro to Education', 'EDUC 1310 Human Development', 'ENGL 1301 Composition I', 'MATH 1320 College Algebra'], description: 'Introduction to teaching profession with early field observations in local schools.' },
          { year: 2, title: 'Teaching Core', courses: ['EDUC 2310 Literacy Development', 'EDUC 2315 Educational Psychology', 'EDUC 2320 Classroom Management', 'EDUC 2325 Diversity in Education'], description: 'Foundational pedagogy, literacy instruction, and classroom management with weekly school placements.' },
          { year: 3, title: 'Methods & Practicum', courses: ['EDUC 3310 Math Teaching Methods', 'EDUC 3315 Science Teaching Methods', 'EDUC 3320 ESL Methods', 'EDUC 3325 Special Education Methods'], description: 'Subject-specific teaching methods with extended practicum in partner schools.' },
          { year: 4, title: 'Student Teaching', courses: ['EDUC 4310 Student Teaching Residency', 'EDUC 4315 Certification Exam Prep', 'EDUC Elective', 'Professional Elective'], description: 'Full-semester student teaching residency in a Texas classroom; complete TExES certification exams.' },
        ],
        careers: [
          { title: 'Elementary School Teacher', medianSalary: 60000, growthRate: 0.04, description: 'Teach all core subjects to children in grades PreK-6 at public or private schools.' },
          { title: 'ESL Teacher', medianSalary: 58000, growthRate: 0.06, description: 'Teach English language learners — high demand in Texas with its large bilingual population.' },
          { title: 'Special Education Teacher', medianSalary: 62000, growthRate: 0.04, description: 'Support students with disabilities in inclusive or specialized classroom settings.' },
        ],
      },
      {
        name: 'Education (Secondary Math 7-12)',
        degreeType: 'B.S.',
        description: 'Earn Texas teacher certification to teach mathematics in grades 7-12. Combines strong math content with pedagogy and clinical experience.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['MATH 1451 Calculus I', 'MATH 1452 Calculus II', 'EDUC 1301 Intro to Education', 'ENGL 1301 Composition I'], description: 'Advanced mathematics and introduction to the teaching profession.' },
          { year: 2, title: 'Math & Education Core', courses: ['MATH 2450 Calculus III', 'MATH 2360 Linear Algebra', 'EDUC 2315 Educational Psychology', 'EDUC 2320 Classroom Management'], description: 'Continue mathematics coursework while building pedagogical foundations.' },
          { year: 3, title: 'Teaching Methods', courses: ['EDUC 3330 Secondary Math Methods', 'MATH 3342 Probability & Statistics', 'MATH 3310 Abstract Algebra', 'EDUC 3325 Adolescent Development'], description: 'Learn to teach mathematical concepts effectively with extended classroom practicum.' },
          { year: 4, title: 'Student Teaching', courses: ['EDUC 4310 Student Teaching Residency', 'EDUC 4315 Certification Exam Prep', 'MATH Elective', 'Professional Elective'], description: 'Full-semester residency in a Texas secondary math classroom; complete TExES certification exams.' },
        ],
        careers: [
          { title: 'High School Math Teacher', medianSalary: 62000, growthRate: 0.04, description: 'Teach algebra, geometry, calculus, and statistics at the secondary level — high demand subject area.' },
          { title: 'Instructional Coach', medianSalary: 65000, growthRate: 0.06, description: 'Support other teachers in improving math instruction as a campus or district coach.' },
        ],
      },
      {
        name: 'Multidisciplinary Science (7-12)',
        degreeType: 'B.S.',
        description: 'Earn Texas composite science certification to teach all science subjects (biology, chemistry, physics, earth science) in grades 7-12.',
        pathways: [
          { year: 1, title: 'Science Foundations', courses: ['BIOL 1403 Biology I', 'CHEM 1307 General Chemistry I', 'MATH 1451 Calculus I', 'EDUC 1301 Intro to Education'], description: 'Biology, chemistry, and math foundations with early education field experience.' },
          { year: 2, title: 'Broad Science Core', courses: ['PHYS 2401 Physics I', 'GEOS 1401 Physical Geology', 'CHEM 1308 General Chemistry II', 'EDUC 2315 Educational Psychology'], description: 'Physics and earth science coursework to build composite science knowledge.' },
          { year: 3, title: 'Science Teaching Methods', courses: ['EDUC 3335 Secondary Science Methods', 'BIOL 2401 Genetics', 'CHEM 2305 Organic Chemistry', 'EDUC 3325 Adolescent Development'], description: 'Learn to teach science through inquiry-based methods with lab practicums.' },
          { year: 4, title: 'Student Teaching', courses: ['EDUC 4310 Student Teaching Residency', 'EDUC 4315 Certification Exam Prep', 'Science Elective', 'Professional Elective'], description: 'Full-semester student teaching in a Texas science classroom; complete TExES composite science exams.' },
        ],
        careers: [
          { title: 'High School Science Teacher', medianSalary: 62000, growthRate: 0.04, description: 'Teach biology, chemistry, physics, or earth science at the secondary level — high demand area.' },
          { title: 'STEM Education Coordinator', medianSalary: 68000, growthRate: 0.08, description: 'Develop and coordinate STEM programs and curricula for school districts.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. EDWARD E. WHITACRE JR. COLLEGE OF ENGINEERING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'Edward E. Whitacre Jr. College of Engineering',
    description: 'One of the largest engineering colleges in Texas, offering 9 ABET-accredited undergraduate programs with strong industry ties to the energy, technology, and defense sectors. Home to the National Wind Institute and the Petroleum Engineering program ranked among the top nationally.',
    totalStudents: 4827,
    majors: [
      {
        name: 'Petroleum Engineering',
        degreeType: 'B.S.',
        description: 'Design and optimize extraction of oil and gas resources, with access to the Permian Basin — the most productive oilfield in the United States. Ranked among the top 15 petroleum engineering programs nationally.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['PETR 1305 Intro to Petroleum Engineering', 'MATH 1451 Calculus I', 'CHEM 1307 General Chemistry', 'ENGL 1301 Composition I'], description: 'Build foundations in math, chemistry, and engineering principles.' },
          { year: 2, title: 'Core Engineering', courses: ['PETR 2304 Drilling Engineering', 'PETR 2306 Reservoir Rock Properties', 'PHYS 2401 Physics I', 'MATH 2450 Calculus III'], description: 'Develop drilling and reservoir fundamentals with applied physics.' },
          { year: 3, title: 'Specialization', courses: ['PETR 3310 Production Engineering', 'PETR 3315 Well Logging', 'PETR 3320 Reservoir Simulation', 'PETR 3306 Petrophysics'], description: 'Specialize in production, well evaluation, and reservoir modeling.' },
          { year: 4, title: 'Capstone & Industry Prep', courses: ['PETR 4330 Senior Design Project', 'PETR 4310 Enhanced Oil Recovery', 'PETR 4320 Completions Engineering', 'Professional Elective'], description: 'Apply knowledge in industry capstone project; many students complete Permian Basin internships.' },
        ],
        careers: [
          { title: 'Petroleum Engineer', medianSalary: 131000, growthRate: 0.08, description: 'Design drilling plans, optimize production, and manage reservoir development for oil & gas operators.' },
          { title: 'Reservoir Engineer', medianSalary: 126000, growthRate: 0.06, description: 'Model subsurface reservoirs and forecast production using simulation software.' },
          { title: 'Completions Engineer', medianSalary: 118000, growthRate: 0.07, description: 'Design and optimize well completion strategies for maximum hydrocarbon recovery.' },
        ],
      },
      {
        name: 'Mechanical Engineering',
        degreeType: 'B.S.',
        description: 'Design, analyze, and manufacture mechanical systems with hands-on wind energy research and robotics lab experience at the National Wind Institute.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ME 1105 Intro to Mechanical Engineering', 'MATH 1451 Calculus I', 'PHYS 2401 Physics I', 'ENGR 1315 Engineering Graphics'], description: 'Engineering fundamentals, calculus, and hands-on CAD drafting.' },
          { year: 2, title: 'Core Mechanics', courses: ['ME 2301 Statics', 'ME 2322 Dynamics', 'ME 2330 Thermodynamics I', 'ME 2350 Mechanics of Materials'], description: 'Master classical mechanics, thermodynamics, and material behavior.' },
          { year: 3, title: 'Design & Systems', courses: ['ME 3360 Machine Design', 'ME 3370 Heat Transfer', 'ME 3341 Fluid Mechanics', 'ME 3380 Control Systems'], description: 'Design machines, analyze thermal-fluid systems, and learn control theory.' },
          { year: 4, title: 'Senior Design', courses: ['ME 4370 Senior Design I', 'ME 4371 Senior Design II', 'ME Technical Elective', 'ME Technical Elective'], description: 'Year-long capstone design project with industry sponsors; emphasis on wind energy and robotics.' },
        ],
        careers: [
          { title: 'Mechanical Engineer', medianSalary: 95000, growthRate: 0.10, description: 'Design and test mechanical devices, tools, and engines across manufacturing, automotive, and energy sectors.' },
          { title: 'Wind Energy Engineer', medianSalary: 88000, growthRate: 0.17, description: 'Design and optimize wind turbine systems — Texas Tech is in the heart of US wind energy country.' },
          { title: 'HVAC Engineer', medianSalary: 82000, growthRate: 0.06, description: 'Design heating, ventilation, and air conditioning systems for buildings.' },
        ],
      },
      {
        name: 'Computer Science',
        degreeType: 'B.S.',
        description: 'Software development, algorithms, cybersecurity, and AI with research opportunities in the Whitacre College computing labs. ABET-accredited with strong industry placement.',
        pathways: [
          { year: 1, title: 'Programming Foundations', courses: ['CS 1400 Intro to Computer Science', 'CS 1401 Programming Principles I', 'MATH 1451 Calculus I', 'MATH 2360 Linear Algebra'], description: 'Learn programming in Python and Java, plus the math foundations for computing.' },
          { year: 2, title: 'Core CS', courses: ['CS 2413 Data Structures', 'CS 2350 Computer Architecture', 'CS 2365 Object-Oriented Programming', 'MATH 3342 Probability & Statistics'], description: 'Data structures, computer organization, and software engineering fundamentals.' },
          { year: 3, title: 'Specialization', courses: ['CS 3364 Algorithms', 'CS 3375 Operating Systems', 'CS 3365 Software Engineering', 'CS Elective (AI/Security/Data)'], description: 'Choose specialization tracks in AI, cybersecurity, or data science.' },
          { year: 4, title: 'Capstone & Career Prep', courses: ['CS 4365 Senior Software Project', 'CS Elective', 'CS Elective', 'Professional Development'], description: 'Build production software in a team and prepare for industry or grad school.' },
        ],
        careers: [
          { title: 'Software Engineer', medianSalary: 110000, growthRate: 0.22, description: 'Design, develop, and maintain software systems across web, mobile, and cloud platforms.' },
          { title: 'Cybersecurity Analyst', medianSalary: 102000, growthRate: 0.32, description: 'Protect systems and networks from cyber threats — one of the fastest-growing fields in tech.' },
          { title: 'Data Scientist', medianSalary: 108000, growthRate: 0.28, description: 'Extract insights from large datasets using machine learning, statistics, and programming.' },
        ],
      },
      {
        name: 'Electrical Engineering',
        degreeType: 'B.S.',
        description: 'Study circuits, electronics, power systems, and telecommunications with research in renewable energy and semiconductor design.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['EE 1305 Intro to Electrical Engineering', 'MATH 1451 Calculus I', 'PHYS 2401 Physics I', 'ENGR 1315 Engineering Graphics'], description: 'Physics, math, and introduction to electrical systems.' },
          { year: 2, title: 'Circuits & Electronics', courses: ['EE 2301 Circuit Analysis I', 'EE 2302 Circuit Analysis II', 'EE 2325 Electronics I', 'MATH 2450 Calculus III'], description: 'Master circuit theory, analog electronics, and signal analysis.' },
          { year: 3, title: 'Systems & Specialization', courses: ['EE 3350 Signals & Systems', 'EE 3360 Electromagnetic Theory', 'EE 3370 Power Systems', 'EE Elective'], description: 'Choose power systems, communications, or electronics track.' },
          { year: 4, title: 'Senior Design', courses: ['EE 4370 Senior Design I', 'EE 4371 Senior Design II', 'EE Technical Elective', 'EE Technical Elective'], description: 'Year-long capstone project with industry sponsors in energy, telecom, or defense.' },
        ],
        careers: [
          { title: 'Electrical Engineer', medianSalary: 100000, growthRate: 0.07, description: 'Design electrical systems, power grids, and electronic devices for utilities and tech companies.' },
          { title: 'Power Systems Engineer', medianSalary: 95000, growthRate: 0.09, description: 'Design and maintain electrical power generation and distribution systems.' },
        ],
      },
      {
        name: 'Civil Engineering',
        degreeType: 'B.S.',
        description: 'Design and build infrastructure including roads, bridges, water systems, and buildings. Strong focus on Texas infrastructure needs and environmental sustainability.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CE 1305 Intro to Civil Engineering', 'MATH 1451 Calculus I', 'CHEM 1307 General Chemistry', 'ENGR 1315 Engineering Graphics'], description: 'Engineering fundamentals with introduction to civil engineering practice.' },
          { year: 2, title: 'Core Engineering', courses: ['CE 2301 Statics', 'CE 2322 Mechanics of Materials', 'CE 2330 Surveying', 'MATH 2450 Calculus III'], description: 'Structural mechanics, surveying, and engineering mathematics.' },
          { year: 3, title: 'Specialization', courses: ['CE 3310 Structural Analysis', 'CE 3320 Geotechnical Engineering', 'CE 3330 Hydraulic Engineering', 'CE 3340 Transportation Engineering'], description: 'Structural, geotechnical, water resources, and transportation engineering.' },
          { year: 4, title: 'Senior Design', courses: ['CE 4370 Senior Design I', 'CE 4371 Senior Design II', 'CE Technical Elective', 'CE Technical Elective'], description: 'Comprehensive civil engineering capstone integrating structural, environmental, and transportation design.' },
        ],
        careers: [
          { title: 'Civil Engineer', medianSalary: 89000, growthRate: 0.08, description: 'Design roads, bridges, and water systems for engineering firms and government agencies.' },
          { title: 'Structural Engineer', medianSalary: 95000, growthRate: 0.06, description: 'Analyze and design structures to withstand loads and environmental forces.' },
          { title: 'Transportation Engineer', medianSalary: 85000, growthRate: 0.07, description: 'Plan and design highway, rail, and transit systems for Texas and beyond.' },
        ],
      },
      {
        name: 'Chemical Engineering',
        degreeType: 'B.S.',
        description: 'Study chemical processes, reactor design, and materials science with applications in energy, pharmaceuticals, and environmental engineering.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CHE 1305 Intro to Chemical Engineering', 'CHEM 1307 General Chemistry I', 'MATH 1451 Calculus I', 'PHYS 2401 Physics I'], description: 'Chemistry, physics, and math foundations for chemical engineering.' },
          { year: 2, title: 'Core ChemE', courses: ['CHE 2301 Material & Energy Balances', 'CHE 2310 Thermodynamics', 'CHEM 2305 Organic Chemistry I', 'MATH 2450 Calculus III'], description: 'Mass and energy balances, thermodynamics, and organic chemistry.' },
          { year: 3, title: 'Process Engineering', courses: ['CHE 3310 Transport Phenomena', 'CHE 3320 Reaction Engineering', 'CHE 3330 Separation Processes', 'CHE 3340 Process Control'], description: 'Heat/mass transfer, reactor design, and separations with laboratory coursework.' },
          { year: 4, title: 'Senior Design', courses: ['CHE 4370 Senior Design I', 'CHE 4371 Senior Design II', 'CHE Technical Elective', 'Professional Elective'], description: 'Design a complete chemical plant — teams work on real-world process design projects.' },
        ],
        careers: [
          { title: 'Chemical Engineer', medianSalary: 105000, growthRate: 0.08, description: 'Design chemical manufacturing processes for energy, pharmaceutical, and materials companies.' },
          { title: 'Process Engineer', medianSalary: 92000, growthRate: 0.06, description: 'Optimize manufacturing processes for efficiency, safety, and quality.' },
        ],
      },
      {
        name: 'Industrial Engineering',
        degreeType: 'B.S.',
        description: 'Optimize complex systems and processes using operations research, statistics, and human factors engineering. Apply engineering to healthcare, manufacturing, and logistics.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['IE 1305 Intro to Industrial Engineering', 'MATH 1451 Calculus I', 'PHYS 2401 Physics I', 'ENGR 1315 Engineering Graphics'], description: 'Engineering fundamentals and introduction to systems optimization.' },
          { year: 2, title: 'Core IE', courses: ['IE 2301 Engineering Statistics', 'IE 2310 Manufacturing Processes', 'IE 2320 Operations Research I', 'MATH 2450 Calculus III'], description: 'Statistical methods, manufacturing, and linear programming.' },
          { year: 3, title: 'Systems Optimization', courses: ['IE 3310 Operations Research II', 'IE 3320 Quality Control', 'IE 3330 Simulation', 'IE 3340 Human Factors'], description: 'Advanced optimization, statistical quality control, and ergonomic design.' },
          { year: 4, title: 'Senior Design', courses: ['IE 4370 Senior Design I', 'IE 4371 Senior Design II', 'IE Technical Elective', 'Professional Elective'], description: 'Capstone project optimizing real-world systems for industry clients.' },
        ],
        careers: [
          { title: 'Industrial Engineer', medianSalary: 90000, growthRate: 0.10, description: 'Design efficient systems for manufacturing, healthcare, and logistics organizations.' },
          { title: 'Quality Engineer', medianSalary: 78000, growthRate: 0.07, description: 'Ensure product quality through statistical process control and quality management systems.' },
          { title: 'Operations Research Analyst', medianSalary: 85000, growthRate: 0.23, description: 'Use mathematical models to solve complex operational problems.' },
        ],
      },
      {
        name: 'Computer Engineering',
        degreeType: 'B.S.',
        description: 'Bridge hardware and software design, studying embedded systems, digital logic, and computer architecture. Combines electrical engineering and computer science.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CpE 1305 Intro to Computer Engineering', 'CS 1401 Programming Principles I', 'MATH 1451 Calculus I', 'PHYS 2401 Physics I'], description: 'Programming, physics, and math foundations.' },
          { year: 2, title: 'Hardware & Software Core', courses: ['EE 2301 Circuit Analysis I', 'CS 2413 Data Structures', 'CpE 2301 Digital Logic Design', 'MATH 2450 Calculus III'], description: 'Digital circuits, data structures, and circuit analysis.' },
          { year: 3, title: 'Systems Design', courses: ['CpE 3310 Embedded Systems', 'CpE 3320 Computer Architecture', 'EE 2325 Electronics I', 'CpE Elective'], description: 'Embedded systems programming, microprocessor design, and real-time computing.' },
          { year: 4, title: 'Senior Design', courses: ['CpE 4370 Senior Design I', 'CpE 4371 Senior Design II', 'CpE Technical Elective', 'Professional Elective'], description: 'Design an embedded system or computer hardware/software project with industry sponsors.' },
        ],
        careers: [
          { title: 'Embedded Systems Engineer', medianSalary: 105000, growthRate: 0.12, description: 'Design firmware and software for embedded devices in IoT, automotive, and defense industries.' },
          { title: 'Hardware Engineer', medianSalary: 115000, growthRate: 0.05, description: 'Design computer chips, circuit boards, and electronic hardware at tech companies.' },
        ],
      },
      {
        name: 'Construction Engineering',
        degreeType: 'B.S.',
        description: 'Manage construction projects from planning to completion, combining civil engineering knowledge with project management and construction technology.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ConE 1305 Intro to Construction Engineering', 'MATH 1451 Calculus I', 'PHYS 2401 Physics I', 'ENGR 1315 Engineering Graphics'], description: 'Engineering fundamentals and introduction to the construction industry.' },
          { year: 2, title: 'Construction Core', courses: ['ConE 2301 Construction Materials', 'CE 2301 Statics', 'ConE 2310 Estimating', 'MATH 2450 Calculus III'], description: 'Construction materials, structural mechanics, and cost estimation.' },
          { year: 3, title: 'Project Management', courses: ['ConE 3310 Construction Scheduling', 'ConE 3320 Construction Methods', 'ConE 3330 Construction Safety', 'CE 3310 Structural Analysis'], description: 'Scheduling, building methods, safety management, and structural design.' },
          { year: 4, title: 'Senior Design', courses: ['ConE 4370 Senior Design I', 'ConE 4371 Senior Design II', 'ConE Technical Elective', 'Professional Elective'], description: 'Manage a simulated construction project from bid to completion.' },
        ],
        careers: [
          { title: 'Construction Manager', medianSalary: 98000, growthRate: 0.08, description: 'Plan, budget, and oversee construction projects from start to finish.' },
          { title: 'Project Engineer', medianSalary: 78000, growthRate: 0.07, description: 'Coordinate engineering tasks on construction sites for general contractors.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. HONORS COLLEGE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'Honors College',
    description: 'A highly selective interdisciplinary program offering unique degree concentrations that bridge the sciences and humanities. Most honors students double-major; the Honors College provides a standalone liberal arts credential for students seeking an integrative education.',
    totalStudents: 56,
    majors: [
      {
        name: 'Honors Sciences and the Humanities',
        degreeType: 'B.S.',
        description: 'An interdisciplinary STEM degree integrating scientific inquiry with humanities perspectives. Concentrations in Humanities-Driven STEM, Medicine & Global Health, and Environmental Science & Humanities.',
        pathways: [
          { year: 1, title: 'Honors Foundations', courses: ['HNRS 1301 Great Questions I', 'HNRS 1302 Great Questions II', 'BIOL 1403 Biology I', 'MATH 1451 Calculus I'], description: 'Interdisciplinary seminars exploring fundamental questions alongside science foundations.' },
          { year: 2, title: 'Integration', courses: ['HNRS 2310 Science & Society', 'HNRS 2320 Ethics of Technology', 'CHEM 1307 General Chemistry', 'Humanities Elective'], description: 'Explore the intersections of science, ethics, and human culture.' },
          { year: 3, title: 'Concentration', courses: ['HNRS 3310 Concentration Seminar', 'HNRS 3320 Research Methods', 'Science Elective', 'Humanities Elective'], description: 'Deep work in chosen concentration — global health, environmental science, or STEM humanities.' },
          { year: 4, title: 'Thesis', courses: ['HNRS 4310 Honors Thesis I', 'HNRS 4311 Honors Thesis II', 'HNRS Elective', 'Professional Elective'], description: 'Year-long honors thesis combining scientific research with humanistic inquiry.' },
        ],
        careers: [
          { title: 'Physician (with MD)', medianSalary: 229000, growthRate: 0.03, description: 'The Medicine & Global Health concentration is ideal preparation for medical school.' },
          { title: 'Policy Analyst', medianSalary: 62000, growthRate: 0.06, description: 'Bridge science and policy — work at think tanks, government agencies, or nonprofits.' },
          { title: 'Research Scientist', medianSalary: 85000, growthRate: 0.08, description: 'Conduct interdisciplinary research at universities or research institutions.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. COLLEGE OF HEALTH & HUMAN SCIENCES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'College of Health & Human Sciences',
    description: 'Renamed from the College of Human Sciences in 2024, this college offers programs in personal financial planning (top 5 nationally), interior design, hospitality, nutrition, human development, and addiction recovery. Combines health sciences with design and consumer sciences.',
    totalStudents: 2928,
    majors: [
      {
        name: 'Personal Financial Planning',
        degreeType: 'B.S.',
        description: 'One of the top-ranked financial planning programs in the nation, accredited by CFP Board. Prepares students to sit for the Certified Financial Planner exam immediately upon graduation.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['PFP 1301 Intro to Personal Finance', 'ECO 2301 Microeconomics', 'ACCT 2300 Accounting I', 'MATH 1320 College Algebra'], description: 'Financial literacy, economics, and accounting foundations.' },
          { year: 2, title: 'Planning Core', courses: ['PFP 2310 Financial Planning Process', 'PFP 2320 Insurance Planning', 'PFP 2330 Investment Planning', 'FIN 3320 Corporate Finance'], description: 'Core CFP topics: insurance, investments, and the financial planning process.' },
          { year: 3, title: 'Advanced Planning', courses: ['PFP 3310 Tax Planning', 'PFP 3320 Retirement Planning', 'PFP 3330 Estate Planning', 'PFP 3340 Employee Benefits'], description: 'Tax strategy, retirement distribution planning, and estate transfer techniques.' },
          { year: 4, title: 'CFP Capstone', courses: ['PFP 4310 Comprehensive Financial Plan', 'PFP 4320 Financial Planning Practicum', 'PFP Elective', 'Professional Elective'], description: 'Create a comprehensive financial plan for a real client; prepare for the CFP exam.' },
        ],
        careers: [
          { title: 'Certified Financial Planner', medianSalary: 95000, growthRate: 0.15, description: 'Help individuals plan their financial futures — investments, retirement, tax, and estate planning.' },
          { title: 'Wealth Management Advisor', medianSalary: 110000, growthRate: 0.12, description: 'Manage comprehensive financial strategies for high-net-worth families.' },
          { title: 'Financial Analyst', medianSalary: 83000, growthRate: 0.09, description: 'Analyze financial data and provide investment recommendations for firms or clients.' },
        ],
      },
      {
        name: 'Interior Design',
        degreeType: 'B.I.D.',
        description: 'A CIDA-accredited professional interior design degree with intensive studio coursework, building codes, and commercial design projects.',
        pathways: [
          { year: 1, title: 'Design Foundations', courses: ['ID 1401 Interior Design Studio I', 'ID 1301 Intro to Interior Design', 'ART 1301 Drawing Fundamentals', 'ENGL 1301 Composition I'], description: 'Foundational drawing, spatial thinking, and design principles.' },
          { year: 2, title: 'Residential Design', courses: ['ID 2401 Interior Design Studio III', 'ID 2301 Materials & Finishes', 'ID 2310 Building Systems', 'ID 2320 Design History'], description: 'Residential design projects with material selection and building system knowledge.' },
          { year: 3, title: 'Commercial Design', courses: ['ID 3401 Interior Design Studio V', 'ID 3301 Building Codes', 'ID 3310 Lighting Design', 'ID Elective'], description: 'Commercial and healthcare design projects with lighting and code compliance.' },
          { year: 4, title: 'Professional Studio', courses: ['ID 4401 Senior Design Studio', 'ID 4301 Professional Practice', 'ID Elective', 'Professional Elective'], description: 'Comprehensive capstone project; students present to industry professionals.' },
        ],
        careers: [
          { title: 'Interior Designer', medianSalary: 61000, growthRate: 0.04, description: 'Design functional and aesthetic interior spaces for residential and commercial clients.' },
          { title: 'Healthcare Designer', medianSalary: 72000, growthRate: 0.06, description: 'Design hospitals, clinics, and senior living facilities for optimal patient outcomes.' },
        ],
      },
      {
        name: 'Restaurant, Hotel, and Institutional Management',
        degreeType: 'B.S.',
        description: 'Prepare for leadership in the hospitality industry through coursework in hotel operations, food service management, and tourism with hands-on experience in TTU\'s on-campus hospitality lab.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['RHIM 1301 Intro to Hospitality', 'RHIM 1310 Food Production', 'ECO 2301 Microeconomics', 'ENGL 1301 Composition I'], description: 'Introduction to the hospitality industry and food production basics.' },
          { year: 2, title: 'Operations Core', courses: ['RHIM 2310 Lodging Operations', 'RHIM 2320 Food & Beverage Management', 'RHIM 2330 Hospitality Accounting', 'MKT 3350 Marketing'], description: 'Hotel operations, restaurant management, and hospitality accounting.' },
          { year: 3, title: 'Management', courses: ['RHIM 3310 Revenue Management', 'RHIM 3320 Hospitality Law', 'RHIM 3330 Event Planning', 'RHIM Elective'], description: 'Revenue optimization, legal issues, and event management.' },
          { year: 4, title: 'Capstone & Internship', courses: ['RHIM 4310 Hospitality Capstone', 'RHIM 4320 Industry Internship', 'RHIM Elective', 'Professional Elective'], description: 'Management internship at hotels, resorts, or restaurant groups.' },
        ],
        careers: [
          { title: 'Hotel General Manager', medianSalary: 68000, growthRate: 0.07, description: 'Oversee all operations of hotels and resorts.' },
          { title: 'Food & Beverage Director', medianSalary: 62000, growthRate: 0.09, description: 'Manage restaurant operations, menus, and food service at hotels or restaurant groups.' },
          { title: 'Event Manager', medianSalary: 55000, growthRate: 0.08, description: 'Plan and execute events at hotels, convention centers, and event venues.' },
        ],
      },
      {
        name: 'Nutritional Sciences',
        degreeType: 'B.S.',
        description: 'Study human nutrition, dietetics, and food science with a dietetics track that leads to the Registered Dietitian credential. Research in sports nutrition and community health.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['NUTR 1301 Intro to Nutrition', 'BIOL 1403 Biology I', 'CHEM 1307 General Chemistry I', 'MATH 2300 Statistics'], description: 'Nutrition basics with biology and chemistry foundations.' },
          { year: 2, title: 'Nutrition Science', courses: ['NUTR 2310 Nutrition Through the Lifecycle', 'NUTR 2320 Food Science', 'CHEM 2305 Organic Chemistry I', 'BIOL 2401 Anatomy & Physiology'], description: 'Lifecycle nutrition, food science, and organic chemistry.' },
          { year: 3, title: 'Clinical Nutrition', courses: ['NUTR 3310 Medical Nutrition Therapy I', 'NUTR 3320 Medical Nutrition Therapy II', 'NUTR 3330 Community Nutrition', 'NUTR Elective'], description: 'Clinical dietetics, disease-specific nutrition therapy, and community health programs.' },
          { year: 4, title: 'Supervised Practice', courses: ['NUTR 4310 Dietetics Practicum', 'NUTR 4320 Sports Nutrition', 'NUTR Elective', 'Professional Elective'], description: 'Supervised practice hours in clinical settings; prepares for the RD exam.' },
        ],
        careers: [
          { title: 'Registered Dietitian', medianSalary: 66000, growthRate: 0.11, description: 'Counsel patients on nutrition and develop meal plans in hospitals, clinics, or private practice.' },
          { title: 'Sports Nutritionist', medianSalary: 60000, growthRate: 0.13, description: 'Optimize athletic performance through nutrition planning for teams and individual athletes.' },
        ],
      },
      {
        name: 'Human Development and Family Sciences',
        degreeType: 'B.S.',
        description: 'Study human development across the lifespan, family dynamics, and community interventions. Excellent preparation for counseling, social work, or family therapy graduate programs.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['HDFS 1301 Intro to Human Development', 'PSY 1300 Intro to Psychology', 'SOC 1301 Intro to Sociology', 'ENGL 1301 Composition I'], description: 'Human development, psychology, and sociology foundations.' },
          { year: 2, title: 'Development Core', courses: ['HDFS 2310 Child Development', 'HDFS 2320 Adolescent Development', 'HDFS 2330 Family Relationships', 'HDFS 2340 Research Methods'], description: 'Study development from childhood through adolescence and family systems.' },
          { year: 3, title: 'Specialization', courses: ['HDFS 3310 Adult Development & Aging', 'HDFS 3320 Parenting', 'HDFS 3330 Family Diversity', 'HDFS Elective'], description: 'Advanced study of adult development, parenting practices, and diverse family structures.' },
          { year: 4, title: 'Practicum', courses: ['HDFS 4310 Family Practicum', 'HDFS 4320 Senior Seminar', 'HDFS Elective', 'Professional Elective'], description: 'Field practicum in family services agencies; prepares for graduate programs in counseling or social work.' },
        ],
        careers: [
          { title: 'Family Counselor (with Master\'s)', medianSalary: 58000, growthRate: 0.14, description: 'Help families navigate challenges through therapy and counseling — requires graduate degree.' },
          { title: 'Child Life Specialist', medianSalary: 50000, growthRate: 0.08, description: 'Support children and families coping with illness and hospitalization.' },
          { title: 'Family Services Coordinator', medianSalary: 48000, growthRate: 0.06, description: 'Coordinate support services for families through nonprofit and government agencies.' },
        ],
      },
      {
        name: 'Apparel Design and Manufacturing',
        degreeType: 'B.S.',
        description: 'Design, produce, and market apparel through hands-on studio work in pattern drafting, construction, textile science, and fashion technology.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['ADM 1301 Intro to Fashion Industry', 'ADM 1310 Textiles', 'ART 1301 Drawing Fundamentals', 'ENGL 1301 Composition I'], description: 'Introduction to the fashion industry, textile science, and drawing skills.' },
          { year: 2, title: 'Design Core', courses: ['ADM 2310 Pattern Drafting I', 'ADM 2320 Apparel Construction', 'ADM 2330 Fashion Illustration', 'ADM 2340 History of Fashion'], description: 'Pattern making, garment construction, and fashion illustration techniques.' },
          { year: 3, title: 'Advanced Design', courses: ['ADM 3310 Draping', 'ADM 3320 Computer-Aided Design', 'ADM 3330 Manufacturing Processes', 'ADM Elective'], description: 'Advanced draping, digital design tools, and manufacturing processes.' },
          { year: 4, title: 'Portfolio Capstone', courses: ['ADM 4310 Senior Collection', 'ADM 4320 Fashion Show Production', 'ADM Elective', 'Professional Elective'], description: 'Design and produce a senior collection showcased in the annual fashion show.' },
        ],
        careers: [
          { title: 'Fashion Designer', medianSalary: 58000, growthRate: 0.03, description: 'Create original clothing, accessories, and footwear designs for brands or own labels.' },
          { title: 'Technical Designer', medianSalary: 62000, growthRate: 0.05, description: 'Ensure garments are manufactured to design specifications and quality standards.' },
        ],
      },
      {
        name: 'Counseling and Addiction Recovery Sciences',
        degreeType: 'B.S.',
        description: 'Prepare for careers in substance abuse counseling, mental health support, and recovery services. One of the few undergraduate addiction science programs in Texas.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['CARS 1301 Intro to Addiction Studies', 'PSY 1300 Intro to Psychology', 'SOC 1301 Intro to Sociology', 'ENGL 1301 Composition I'], description: 'Introduction to addiction science with psychology and sociology foundations.' },
          { year: 2, title: 'Addiction Science', courses: ['CARS 2310 Pharmacology of Addiction', 'CARS 2320 Counseling Theories', 'CARS 2330 Ethics in Counseling', 'PSY 3305 Abnormal Psychology'], description: 'Drug pharmacology, counseling approaches, and professional ethics.' },
          { year: 3, title: 'Clinical Skills', courses: ['CARS 3310 Group Counseling', 'CARS 3320 Family Systems & Addiction', 'CARS 3330 Assessment & Diagnosis', 'CARS Elective'], description: 'Group facilitation, family counseling, and clinical assessment skills.' },
          { year: 4, title: 'Practicum', courses: ['CARS 4310 Clinical Practicum', 'CARS 4320 Case Management', 'CARS Elective', 'Professional Elective'], description: 'Supervised practicum at treatment centers; prepares for LCDC certification.' },
        ],
        careers: [
          { title: 'Substance Abuse Counselor', medianSalary: 48000, growthRate: 0.22, description: 'Help individuals overcome addiction through counseling and recovery programs — high demand field.' },
          { title: 'Mental Health Technician', medianSalary: 42000, growthRate: 0.11, description: 'Support patients in psychiatric and substance abuse treatment facilities.' },
          { title: 'Recovery Program Coordinator', medianSalary: 52000, growthRate: 0.15, description: 'Develop and manage recovery programs at treatment centers and community organizations.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. COLLEGE OF MEDIA & COMMUNICATION
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'College of Media & Communication',
    description: 'A nationally ranked communication school with state-of-the-art broadcast studios, a student-run media network, and strong placement in sports media, advertising, and strategic communications.',
    totalStudents: 1765,
    majors: [
      {
        name: 'Journalism',
        degreeType: 'B.A.',
        description: 'Develop professional reporting skills across print, broadcast, and digital platforms with real-world experience covering campus and community news.',
        pathways: [
          { year: 1, title: 'Media Foundations', courses: ['MCOM 1301 Intro to Mass Media', 'MCOM 1300 Media Writing', 'ENGL 1301 Composition I', 'COMM 2300 Public Speaking'], description: 'Develop writing, speaking, and media literacy foundations.' },
          { year: 2, title: 'Reporting Core', courses: ['JOUR 2310 News Reporting', 'JOUR 2320 Multimedia Journalism', 'MCOM 2320 Media Ethics', 'MCOM 2330 Media Law'], description: 'Beat reporting, multimedia storytelling, and media ethics and law.' },
          { year: 3, title: 'Advanced Journalism', courses: ['JOUR 3310 Broadcast Journalism', 'JOUR 3320 Data Journalism', 'JOUR 3330 Investigative Reporting', 'JOUR Elective'], description: 'TV reporting, data-driven journalism, and investigative reporting techniques.' },
          { year: 4, title: 'Professional Capstone', courses: ['JOUR 4310 Senior Capstone', 'JOUR 4320 Internship', 'JOUR Elective', 'Professional Elective'], description: 'Professional internship and capstone portfolio; graduates work at TV stations, newspapers, and digital outlets.' },
        ],
        careers: [
          { title: 'Reporter / Journalist', medianSalary: 52000, growthRate: 0.06, description: 'Cover news for TV stations, newspapers, digital outlets, or wire services.' },
          { title: 'Data Journalist', medianSalary: 65000, growthRate: 0.15, description: 'Use data analysis and visualization to tell data-driven news stories.' },
        ],
      },
      {
        name: 'Advertising',
        degreeType: 'B.A.',
        description: 'Study creative advertising, media planning, and campaign strategy with portfolio-building projects and agency-style client work.',
        pathways: [
          { year: 1, title: 'Media Foundations', courses: ['MCOM 1301 Intro to Mass Media', 'MCOM 1300 Media Writing', 'ENGL 1301 Composition I', 'ART 1301 Drawing Fundamentals'], description: 'Media literacy, writing, and visual communication foundations.' },
          { year: 2, title: 'Advertising Core', courses: ['ADV 2310 Principles of Advertising', 'ADV 2320 Creative Strategy', 'ADV 2330 Media Planning', 'MCOM 2340 Digital Content'], description: 'Advertising strategy, creative concepting, and media buying fundamentals.' },
          { year: 3, title: 'Campaign Development', courses: ['ADV 3310 Ad Campaigns', 'ADV 3320 Copywriting', 'ADV 3330 Art Direction', 'ADV Elective'], description: 'Develop full advertising campaigns with creative and strategic components.' },
          { year: 4, title: 'Portfolio Capstone', courses: ['ADV 4310 Senior Portfolio', 'ADV 4320 Internship', 'ADV Elective', 'Professional Elective'], description: 'Build a professional portfolio and complete an agency internship.' },
        ],
        careers: [
          { title: 'Advertising Account Manager', medianSalary: 65000, growthRate: 0.08, description: 'Manage client relationships and coordinate advertising campaigns at agencies.' },
          { title: 'Creative Director', medianSalary: 95000, growthRate: 0.06, description: 'Lead creative teams in developing advertising concepts and campaigns.' },
          { title: 'Media Planner', medianSalary: 58000, growthRate: 0.09, description: 'Plan and purchase advertising space across TV, digital, print, and social media channels.' },
        ],
      },
      {
        name: 'Public Relations and Strategic Communication Management',
        degreeType: 'B.A.',
        description: 'Develop skills in strategic communications, crisis management, and brand storytelling with client-based projects and agency experience.',
        pathways: [
          { year: 1, title: 'Communication Foundations', courses: ['MCOM 1301 Intro to Mass Media', 'MCOM 1300 Media Writing', 'ENGL 1301 Composition I', 'COMM 2300 Public Speaking'], description: 'Foundational writing, communication, and media literacy.' },
          { year: 2, title: 'PR Core', courses: ['PR 2310 Intro to Public Relations', 'PR 2320 PR Writing', 'PR 2330 PR Research', 'MCOM 2320 Media Ethics'], description: 'PR writing, media relations, and research methods.' },
          { year: 3, title: 'Strategic PR', courses: ['PR 3310 PR Campaigns', 'PR 3320 Crisis Communication', 'PR 3330 Digital PR & Social Media', 'PR Elective'], description: 'Plan campaigns, manage crises, and execute digital PR strategies for real clients.' },
          { year: 4, title: 'Agency Experience', courses: ['PR 4310 PR Agency Practicum', 'PR 4320 Internship', 'PR Elective', 'Professional Elective'], description: 'Run a student PR agency serving real clients; intern at firms or corporate communications departments.' },
        ],
        careers: [
          { title: 'PR Specialist', medianSalary: 62000, growthRate: 0.08, description: 'Manage media relations, write press releases, and protect brand reputation.' },
          { title: 'Communications Director', medianSalary: 85000, growthRate: 0.10, description: 'Lead communications strategy for organizations, companies, or government agencies.' },
        ],
      },
      {
        name: 'Creative Media Industries',
        degreeType: 'B.A.',
        description: 'Study film, television, and digital media production with access to professional-grade studios and equipment. Cover the business and creative sides of media industries.',
        pathways: [
          { year: 1, title: 'Media Foundations', courses: ['MCOM 1301 Intro to Mass Media', 'CMI 1310 Intro to Creative Media', 'MCOM 1300 Media Writing', 'ENGL 1301 Composition I'], description: 'Introduction to media industries and content creation.' },
          { year: 2, title: 'Production Core', courses: ['CMI 2310 Video Production', 'CMI 2320 Audio Production', 'CMI 2330 Screenwriting', 'MCOM 2340 Digital Content'], description: 'Hands-on video, audio, and screenwriting with professional equipment.' },
          { year: 3, title: 'Advanced Production', courses: ['CMI 3310 Film Production', 'CMI 3320 Media Business', 'CMI 3330 Post-Production', 'CMI Elective'], description: 'Produce short films, learn the business of media, and master post-production editing.' },
          { year: 4, title: 'Capstone', courses: ['CMI 4310 Senior Film Project', 'CMI 4320 Internship', 'CMI Elective', 'Professional Elective'], description: 'Produce a senior film or media project and complete an industry internship.' },
        ],
        careers: [
          { title: 'Film / Video Producer', medianSalary: 65000, growthRate: 0.10, description: 'Produce video content for film studios, production companies, or corporate clients.' },
          { title: 'Video Editor', medianSalary: 52000, growthRate: 0.08, description: 'Edit video content for TV, film, social media, and corporate productions.' },
        ],
      },
      {
        name: 'Communication Studies',
        degreeType: 'B.A.',
        description: 'Study interpersonal, organizational, and intercultural communication with applications in corporate training, human resources, and conflict resolution.',
        pathways: [
          { year: 1, title: 'Foundation Year', courses: ['COMM 2300 Public Speaking', 'COMM 1301 Intro to Communication Studies', 'ENGL 1301 Composition I', 'PSY 1300 Intro to Psychology'], description: 'Public speaking, communication theory, and psychology foundations.' },
          { year: 2, title: 'Communication Core', courses: ['COMM 2310 Interpersonal Communication', 'COMM 2320 Organizational Communication', 'COMM 2330 Research Methods', 'COMM Elective'], description: 'Interpersonal and organizational communication theory and practice.' },
          { year: 3, title: 'Advanced Studies', courses: ['COMM 3310 Persuasion', 'COMM 3320 Conflict Resolution', 'COMM 3330 Intercultural Communication', 'COMM Elective'], description: 'Persuasion, negotiation, and intercultural communication skills.' },
          { year: 4, title: 'Capstone', courses: ['COMM 4310 Senior Seminar', 'COMM 4320 Internship', 'COMM Elective', 'Professional Elective'], description: 'Applied communication capstone and professional internship.' },
        ],
        careers: [
          { title: 'Corporate Trainer', medianSalary: 62000, growthRate: 0.09, description: 'Design and deliver training programs for employees at corporations and organizations.' },
          { title: 'Human Resources Specialist', medianSalary: 64000, growthRate: 0.08, description: 'Apply communication skills to recruiting, employee relations, and organizational development.' },
        ],
      },
      {
        name: 'Media Strategies',
        degreeType: 'B.A.',
        description: 'Study the intersection of media, technology, and business strategy. Prepares students for careers in media management, content strategy, and digital platforms.',
        pathways: [
          { year: 1, title: 'Media Foundations', courses: ['MCOM 1301 Intro to Mass Media', 'MCOM 1300 Media Writing', 'ECO 2301 Microeconomics', 'ENGL 1301 Composition I'], description: 'Media industry overview and business foundations.' },
          { year: 2, title: 'Strategy Core', courses: ['MS 2310 Media Analytics', 'MS 2320 Media & Society', 'MS 2330 Digital Platforms', 'ISQS 2340 Statistics'], description: 'Media analytics, audience measurement, and digital platform strategies.' },
          { year: 3, title: 'Advanced Strategy', courses: ['MS 3310 Media Business Models', 'MS 3320 Content Strategy', 'MS 3330 Media Innovation', 'MS Elective'], description: 'Media business models, content planning, and emerging media technologies.' },
          { year: 4, title: 'Capstone', courses: ['MS 4310 Media Strategy Capstone', 'MS 4320 Internship', 'MS Elective', 'Professional Elective'], description: 'Develop a comprehensive media strategy for a real organization.' },
        ],
        careers: [
          { title: 'Content Strategist', medianSalary: 68000, growthRate: 0.12, description: 'Plan and manage content across digital platforms for brands and media companies.' },
          { title: 'Social Media Manager', medianSalary: 58000, growthRate: 0.15, description: 'Manage social media presence and engagement for organizations and brands.' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. J.T. & MARGARET TALKINGTON COLLEGE OF VISUAL & PERFORMING ARTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: 'texas-tech',
    name: 'J.T. & Margaret Talkington College of Visual & Performing Arts',
    description: 'Home to nationally accredited programs in art, music, theatre, and dance. Features world-class performance venues, the Landmark Arts gallery, and the internationally recognized School of Music.',
    totalStudents: 724,
    majors: [
      {
        name: 'Graphic Design',
        degreeType: 'B.F.A.',
        description: 'A studio-intensive program in visual communication design covering branding, typography, UI/UX, and motion graphics. Students build professional portfolios through client-based projects.',
        pathways: [
          { year: 1, title: 'Design Foundations', courses: ['ART 1311 Drawing I', 'ART 1312 2D Design', 'ART 1313 3D Design', 'ART 1301 Art History Survey'], description: 'Foundational drawing, design principles, and art history.' },
          { year: 2, title: 'Graphic Design Core', courses: ['GD 2310 Typography I', 'GD 2320 Digital Imaging', 'GD 2330 Visual Identity', 'ART 2301 Art History II'], description: 'Typography, Adobe Creative Suite, and brand identity design.' },
          { year: 3, title: 'Advanced Design', courses: ['GD 3310 Publication Design', 'GD 3320 UI/UX Design', 'GD 3330 Motion Graphics', 'GD Elective'], description: 'Editorial design, interactive/web design, and animation for portfolio building.' },
          { year: 4, title: 'Portfolio Capstone', courses: ['GD 4310 Senior Portfolio', 'GD 4320 Professional Practice', 'GD Elective', 'Professional Elective'], description: 'Build a professional portfolio and present to design industry professionals.' },
        ],
        careers: [
          { title: 'Graphic Designer', medianSalary: 57000, growthRate: 0.03, description: 'Create visual concepts for branding, marketing, and digital media.' },
          { title: 'UI/UX Designer', medianSalary: 82000, growthRate: 0.16, description: 'Design user interfaces and experiences for websites, apps, and digital products.' },
          { title: 'Art Director', medianSalary: 78000, growthRate: 0.06, description: 'Lead visual direction for advertising campaigns, publications, or digital products.' },
        ],
      },
      {
        name: 'Studio Art',
        degreeType: 'B.F.A.',
        description: 'An intensive studio program with concentrations in painting, sculpture, ceramics, photography, printmaking, and digital narrative arts. Students exhibit in the Landmark Arts gallery.',
        pathways: [
          { year: 1, title: 'Foundations', courses: ['ART 1311 Drawing I', 'ART 1312 2D Design', 'ART 1313 3D Design', 'ART 1301 Art History Survey'], description: 'Drawing, design, and art history foundations across all media.' },
          { year: 2, title: 'Medium Exploration', courses: ['ART 2310 Painting I', 'ART 2320 Sculpture I', 'ART 2330 Ceramics I', 'ART 2340 Photography I'], description: 'Explore multiple studio media before choosing a concentration.' },
          { year: 3, title: 'Concentration', courses: ['Studio Concentration I', 'Studio Concentration II', 'ART 3301 Contemporary Art History', 'ART Elective'], description: 'Deepen skills in chosen studio concentration with critique-based courses.' },
          { year: 4, title: 'Senior Exhibition', courses: ['ART 4310 BFA Studio I', 'ART 4311 BFA Studio II', 'ART 4320 Senior Exhibition', 'Professional Elective'], description: 'Develop a cohesive body of work and present a solo exhibition in the campus gallery.' },
        ],
        careers: [
          { title: 'Fine Artist', medianSalary: 52000, growthRate: 0.06, description: 'Create and sell original artwork through galleries, commissions, or independent practice.' },
          { title: 'Gallery Director / Curator', medianSalary: 55000, growthRate: 0.10, description: 'Manage art galleries, curate exhibitions, and support artists.' },
        ],
      },
      {
        name: 'Music Performance',
        degreeType: 'B.M.',
        description: 'Intensive performance training in instrumental or vocal music through the nationally accredited School of Music. Students perform in university ensembles and solo recitals.',
        pathways: [
          { year: 1, title: 'Music Foundations', courses: ['MUS 1301 Music Theory I', 'MUS 1302 Music Theory II', 'MUS 1310 Aural Skills I', 'Applied Lessons'], description: 'Music theory, ear training, and weekly private instruction.' },
          { year: 2, title: 'Intermediate Music', courses: ['MUS 2301 Music Theory III', 'MUS 2302 Music Theory IV', 'MUS 2310 Music History I', 'Applied Lessons & Ensemble'], description: 'Advanced theory, music history, and performance in university ensembles.' },
          { year: 3, title: 'Advanced Performance', courses: ['MUS 3310 Music History II', 'MUS 3320 Conducting', 'Applied Lessons & Ensemble', 'MUS Elective'], description: 'Conduct ensembles, study advanced repertoire, and prepare junior recital.' },
          { year: 4, title: 'Senior Recital', courses: ['MUS 4310 Senior Recital Preparation', 'Applied Lessons & Ensemble', 'MUS Elective', 'Professional Elective'], description: 'Perform a full senior recital and prepare for graduate school or professional performance career.' },
        ],
        careers: [
          { title: 'Professional Musician', medianSalary: 52000, growthRate: 0.05, description: 'Perform in orchestras, chamber groups, touring ensembles, or as a solo artist.' },
          { title: 'Music Director', medianSalary: 58000, growthRate: 0.06, description: 'Direct musical performances for churches, community organizations, or performing arts companies.' },
        ],
      },
      {
        name: 'Music Education',
        degreeType: 'B.M.',
        description: 'Earn Texas music teacher certification (K-12) through the School of Music. Combines performance training with pedagogy and classroom methods.',
        pathways: [
          { year: 1, title: 'Music Foundations', courses: ['MUS 1301 Music Theory I', 'MUS 1302 Music Theory II', 'MUS 1310 Aural Skills I', 'EDUC 1301 Intro to Education'], description: 'Music theory and introduction to the teaching profession.' },
          { year: 2, title: 'Music & Education Core', courses: ['MUS 2301 Music Theory III', 'MUS 2310 Music History I', 'Applied Lessons & Ensemble', 'EDUC 2315 Educational Psychology'], description: 'Continue musical development while building educational foundations.' },
          { year: 3, title: 'Teaching Methods', courses: ['MUED 3310 Instrumental Methods', 'MUED 3320 Choral Methods', 'MUED 3330 General Music Methods', 'MUS 3320 Conducting'], description: 'Learn to teach band, choir, and general music with practicum hours in local schools.' },
          { year: 4, title: 'Student Teaching', courses: ['MUED 4310 Student Teaching', 'MUED 4320 Music Ed Seminar', 'MUS Elective', 'Professional Elective'], description: 'Full-semester student teaching in Texas public schools; complete TExES music certification exams.' },
        ],
        careers: [
          { title: 'Band / Orchestra Director', medianSalary: 58000, growthRate: 0.04, description: 'Direct school bands and orchestras — Texas has one of the strongest band traditions in the nation.' },
          { title: 'Choir Director', medianSalary: 55000, growthRate: 0.04, description: 'Direct school or community choirs and vocal ensembles.' },
        ],
      },
      {
        name: 'Theatre Arts',
        degreeType: 'B.F.A.',
        description: 'Intensive training in acting, design/technology, or musical theatre through the School of Theatre and Dance. Students perform and design for mainstage productions.',
        pathways: [
          { year: 1, title: 'Theatre Foundations', courses: ['THEA 1301 Intro to Theatre', 'THEA 1310 Acting I', 'THEA 1320 Stagecraft', 'ENGL 1301 Composition I'], description: 'Introduction to performance, technical theatre, and dramatic literature.' },
          { year: 2, title: 'Core Training', courses: ['THEA 2310 Acting II', 'THEA 2320 Voice & Movement', 'THEA 2330 Theatre History', 'THEA 2340 Design Fundamentals'], description: 'Intermediate acting, voice training, and theatre design with mainstage production work.' },
          { year: 3, title: 'Specialization', courses: ['THEA 3310 Advanced Acting / Design', 'THEA 3320 Directing', 'THEA 3330 Musical Theatre / Tech Theatre', 'THEA Elective'], description: 'Specialize in acting, design/technology, or musical theatre with production roles.' },
          { year: 4, title: 'Senior Showcase', courses: ['THEA 4310 Senior Showcase / Design Project', 'THEA 4320 Professional Preparation', 'THEA Elective', 'Professional Elective'], description: 'Senior showcase for industry professionals or senior design portfolio presentation.' },
        ],
        careers: [
          { title: 'Actor', medianSalary: 46000, growthRate: 0.08, description: 'Perform in theatre, film, television, and commercial productions.' },
          { title: 'Stage / Production Manager', medianSalary: 55000, growthRate: 0.06, description: 'Coordinate all aspects of theatrical and event productions.' },
          { title: 'Scenic / Lighting Designer', medianSalary: 52000, growthRate: 0.05, description: 'Design sets, lighting, or costumes for theatre, film, and event productions.' },
        ],
      },
      {
        name: 'Dance',
        degreeType: 'B.F.A.',
        description: 'Rigorous training in ballet, modern, and contemporary dance with choreography and performance opportunities. Students perform in faculty and student choreography concerts.',
        pathways: [
          { year: 1, title: 'Dance Foundations', courses: ['DANC 1310 Ballet I', 'DANC 1320 Modern Dance I', 'DANC 1301 Intro to Dance', 'DANC 1330 Dance Conditioning'], description: 'Daily technique classes in ballet and modern with dance history and conditioning.' },
          { year: 2, title: 'Technique & Theory', courses: ['DANC 2310 Ballet II', 'DANC 2320 Modern Dance II', 'DANC 2330 Choreography I', 'DANC 2340 Kinesiology for Dance'], description: 'Intermediate technique, first choreography course, and dance science.' },
          { year: 3, title: 'Advanced Training', courses: ['DANC 3310 Advanced Ballet / Modern', 'DANC 3320 Choreography II', 'DANC 3330 Dance History', 'DANC Elective'], description: 'Advanced technique and choreography with performance in concert productions.' },
          { year: 4, title: 'Senior Concert', courses: ['DANC 4310 Senior Choreography', 'DANC 4320 Senior Concert', 'DANC Elective', 'Professional Elective'], description: 'Create and perform an original choreographic work in the senior dance concert.' },
        ],
        careers: [
          { title: 'Professional Dancer', medianSalary: 42000, growthRate: 0.06, description: 'Perform with dance companies, on Broadway, in music videos, or at commercial events.' },
          { title: 'Choreographer', medianSalary: 48000, growthRate: 0.06, description: 'Create original dance works for companies, musicals, film, or television.' },
          { title: 'Dance Teacher', medianSalary: 45000, growthRate: 0.04, description: 'Teach dance technique and choreography at studios, schools, or universities.' },
        ],
      },
    ],
  },
]
