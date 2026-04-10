// seed-academics.ts — Creates SchoolAcademics, Colleges, Majors, DegreePathways, CareerOutcomes

import { umhbColleges, type CollegeDef } from './seed-academics-umhb'
import { tamuccColleges } from './seed-academics-tamucc'

export async function seedAcademics(prisma: any, schoolMap: Record<string, any>) {
  // ─── School Academic Stats ──────────────────────────────────────────────────
  const academicStats = [
    { slug: 'umhb', enrollment: 3800, admissionRate: 0.74, satAvg: 1120, actAvg: 23, tuitionInState: 32430, tuitionOutOfState: 32430, graduationRate: 0.56, medianEarnings: 44000, retentionRate: 0.72, studentToFacultyRatio: 17.0, averageClassSize: 22, ranking: null, athleteGraduationRate: 0.72 },
    { slug: 'tamucc', enrollment: 11266, admissionRate: 0.91, satAvg: 1080, actAvg: 22, tuitionInState: 10542, tuitionOutOfState: 22050, graduationRate: 0.43, medianEarnings: 42000, retentionRate: 0.65, studentToFacultyRatio: 19.0, averageClassSize: 28, ranking: null, athleteGraduationRate: 0.65 },
  ]

  for (const stats of academicStats) {
    const { slug, ...data } = stats
    await prisma.schoolAcademics.create({
      data: { schoolId: schoolMap[slug].id, ...data },
    })
  }
  console.log(`  Created ${academicStats.length} SchoolAcademics`)

  // ─── Colleges, Majors, Pathways & Career Outcomes ────────────────────────
  // UMHB colleges imported from seed-academics-umhb.ts (6 colleges, ~25 majors)
  // TAMUCC colleges imported from seed-academics-tamucc.ts (5 colleges, ~25 majors)

  const collegeDefinitions: CollegeDef[] = [...umhbColleges, ...tamuccColleges]

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
