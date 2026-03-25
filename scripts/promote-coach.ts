import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

async function main() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
  if (!connectionString) throw new Error('DIRECT_URL or DATABASE_URL not set')

  const pool = new Pool({ connectionString })
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) })

  const email = process.argv[2]
  const schoolSlug = process.argv[3]

  if (!email || !schoolSlug) {
    console.log('Usage: npx tsx scripts/promote-coach.ts <email> <school-slug>')
    console.log('Example: npx tsx scripts/promote-coach.ts coach@example.com texas-tech')
    console.log('')
    console.log('Available schools:')
    const schools = await prisma.school.findMany({ select: { slug: true, name: true } })
    schools.forEach(s => console.log(`  ${s.slug} — ${s.name}`))
    await pool.end()
    process.exit(1)
  }

  const school = await prisma.school.findUnique({ where: { slug: schoolSlug } })
  if (!school) {
    console.error(`School with slug "${schoolSlug}" not found.`)
    const schools = await prisma.school.findMany({ select: { slug: true, name: true } })
    console.log('Available schools:')
    schools.forEach(s => console.log(`  ${s.slug} — ${s.name}`))
    await pool.end()
    process.exit(1)
  }

  const user = await prisma.user.findFirst({ where: { email } })
  if (!user) {
    console.error(`User with email "${email}" not found. They must register first.`)
    await pool.end()
    process.exit(1)
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { role: 'coach_admin', schoolId: school.id },
  })

  console.log(`✅ Promoted ${email} to coach_admin for ${school.name} (${school.slug})`)
  await pool.end()
}

main().catch((e) => { console.error(e); process.exit(1) })
