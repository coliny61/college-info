import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { seedAlumni } from '../src/data/seed-alumni'
import { seedRoster } from '../src/data/seed-roster'

async function main() {
  // Use session pooler if direct URL is unreachable
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error('No database URL found')
  }

  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  // Build school map
  const schools = await prisma.school.findMany()
  const schoolMap: Record<string, any> = {}
  for (const s of schools) {
    schoolMap[s.slug] = s
  }

  // Clear and re-seed alumni + roster + athletics (scheme data)
  console.log('Clearing roster and alumni...')
  await prisma.rosterPlayer.deleteMany()
  await prisma.notableAlumni.deleteMany()

  // Re-seed coaching staff and scheme data
  console.log('Clearing coaches and sports...')
  await prisma.hotspot.deleteMany()
  await prisma.facility.deleteMany()
  await prisma.coach.deleteMany()
  await prisma.sport.deleteMany()

  // Re-seed
  const { seedAthletics } = await import('../src/data/seed-athletics')
  await seedAthletics(prisma, schoolMap)
  await seedAlumni(prisma, schoolMap)
  await seedRoster(prisma, schoolMap)

  console.log('Football data re-seeded successfully')
  await prisma.$disconnect()
  pool.end()
}

main().catch(console.error)
