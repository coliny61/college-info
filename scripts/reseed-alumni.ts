import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { seedAlumni } from '../src/data/seed-alumni'

async function main() {
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

  // Clear and re-seed alumni only
  await prisma.notableAlumni.deleteMany()
  await seedAlumni(prisma, schoolMap)

  console.log('Alumni re-seeded successfully')
  await prisma.$disconnect()
  pool.end()
}

main().catch(console.error)
