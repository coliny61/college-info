import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { seedSchools } from '../src/data/seed-schools'
import { seedAcademics } from '../src/data/seed-academics'
import { seedAthletics } from '../src/data/seed-athletics'
import { seedJerseys } from '../src/data/seed-jerseys'
import { seedNil } from '../src/data/seed-nil'
import { seedAlumni } from '../src/data/seed-alumni'
import { seedRoster } from '../src/data/seed-roster'
import { seedVideos } from '../src/data/seed-videos'
import { seedNilVisibility } from '../src/data/seed-nil-visibility'
import { seedBrandDeals } from '../src/data/seed-brand-deals'

async function main() {
  // Use direct connection (not pooler) for seeding
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DIRECT_URL or DATABASE_URL is not set')
  }

  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  console.log('Seeding database...')

  // Clear existing data in dependency order (children first)
  console.log('  Clearing existing data...')
  // Brand deals
  await prisma.schoolBrandDeal.deleteMany()
  await prisma.brandPartner.deleteMany()
  // CRM models
  await prisma.recruitListMember.deleteMany()
  await prisma.recruitList.deleteMany()
  await prisma.recruitNote.deleteMany()
  await prisma.recruitTag.deleteMany()
  await prisma.recruitStatus.deleteMany()
  await prisma.nilFieldVisibility.deleteMany()
  await prisma.schoolVideo.deleteMany()
  // Existing models
  await prisma.rosterPlayer.deleteMany()
  await prisma.recruitProfile.deleteMany()
  await prisma.notableAlumni.deleteMany()
  await prisma.sportNilBreakdown.deleteMany()
  await prisma.nilProgram.deleteMany()
  await prisma.hotspot.deleteMany()
  await prisma.facility.deleteMany()
  await prisma.coach.deleteMany()
  await prisma.sport.deleteMany()
  await prisma.careerOutcome.deleteMany()
  await prisma.degreePathway.deleteMany()
  await prisma.major.deleteMany()
  await prisma.college.deleteMany()
  await prisma.schoolAcademics.deleteMany()
  await prisma.jerseyAsset.deleteMany()
  await prisma.analyticsEvent.deleteMany()
  await prisma.jerseySelection.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.inviteLink.deleteMany()
  await prisma.notificationPreference.deleteMany()
  await prisma.user.deleteMany()
  await prisma.school.deleteMany()
  console.log('  Cleared.')

  // Seed in order
  const schoolMap = await seedSchools(prisma)
  await seedAcademics(prisma, schoolMap)
  await seedAthletics(prisma, schoolMap)
  await seedJerseys(prisma, schoolMap)
  await seedNil(prisma, schoolMap)
  await seedAlumni(prisma, schoolMap)
  await seedRoster(prisma, schoolMap)
  await seedVideos(prisma, schoolMap)
  await seedNilVisibility(prisma, schoolMap)
  await seedBrandDeals(prisma)

  console.log('\nSeeding complete!')
  await pool.end()
}

main().catch((e) => {
  console.error('Seed failed:', e)
  process.exit(1)
})
