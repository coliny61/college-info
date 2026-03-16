// seed-academics.ts — Creates SchoolAcademics, Colleges, Majors, DegreePathways, CareerOutcomes

import { ttuColleges, type CollegeDef } from './seed-academics-ttu'
import { ouColleges } from './seed-academics-ou'

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
  // OU colleges imported from seed-academics-ou.ts (~55 majors across 10 colleges)

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
