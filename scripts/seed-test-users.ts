/**
 * Creates 4 test users in Supabase Auth + Prisma.
 *
 * Usage: npx tsx scripts/seed-test-users.ts
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, DIRECT_URL
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const TEST_USERS = [
  {
    email: 'recruit@test.com',
    password: 'test1234',
    role: 'recruit',
    displayName: 'Marcus Johnson',
  },
  {
    email: 'parent@test.com',
    password: 'test1234',
    role: 'parent',
    displayName: 'David Johnson',
    // Will be linked to recruit after creation
  },
  {
    email: 'coach@test.com',
    password: 'test1234',
    role: 'coach_admin',
    displayName: 'Coach Williams',
    // Will be linked to Texas Tech school
    schoolSlug: 'texas-tech',
  },
  {
    email: 'super@test.com',
    password: 'test1234',
    role: 'super_admin',
    displayName: 'Platform Admin',
  },
]

async function main() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local\n' +
      'Get the service role key from Supabase Dashboard → Settings → API → service_role key'
    )
    process.exit(1)
  }

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
  if (!connectionString) {
    console.error('Missing DIRECT_URL or DATABASE_URL in .env.local')
    process.exit(1)
  }

  // Supabase admin client (uses service role key to bypass RLS)
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  // Prisma client
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  console.log('Creating test users...\n')

  const createdUsers: Record<string, string> = {} // email → id

  for (const testUser of TEST_USERS) {
    // Check if user already exists in Supabase
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const existing = existingUsers?.users?.find((u) => u.email === testUser.email)

    let userId: string

    if (existing) {
      console.log(`  [skip] ${testUser.email} already exists in Supabase Auth`)
      userId = existing.id
    } else {
      // Create in Supabase Auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: testUser.email,
        password: testUser.password,
        email_confirm: true,
        user_metadata: {
          display_name: testUser.displayName,
          role: testUser.role,
        },
      })

      if (error) {
        console.error(`  [error] ${testUser.email}: ${error.message}`)
        continue
      }
      userId = data.user.id
      console.log(`  [created] ${testUser.email} in Supabase Auth (${userId})`)
    }

    createdUsers[testUser.email] = userId

    // Upsert in Prisma
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: testUser.email,
        role: testUser.role as any,
        displayName: testUser.displayName,
      },
      create: {
        id: userId,
        email: testUser.email,
        role: testUser.role as any,
        displayName: testUser.displayName,
      },
    })
    console.log(`  [synced] ${testUser.email} in Prisma users table`)
  }

  // Link coach to Texas Tech school
  const coachId = createdUsers['coach@test.com']
  if (coachId) {
    const texasTech = await prisma.school.findUnique({ where: { slug: 'texas-tech' } })
    if (texasTech) {
      await prisma.user.update({
        where: { id: coachId },
        data: { schoolId: texasTech.id },
      })
      console.log(`\n  [linked] coach@test.com → Texas Tech`)
    }
  }

  // Link parent to recruit + set family code
  const recruitId = createdUsers['recruit@test.com']
  const parentId = createdUsers['parent@test.com']
  if (recruitId) {
    // Set family code on recruit
    await prisma.user.update({
      where: { id: recruitId },
      data: { familyCode: 'MJ-7X4K' },
    })
    console.log(`  [set] recruit@test.com familyCode → MJ-7X4K`)

    // Create recruit profile
    await prisma.recruitProfile.upsert({
      where: { userId: recruitId },
      update: {},
      create: {
        userId: recruitId,
        sport: 'Football',
        position: 'Quarterback',
        height: "6'2\"",
        weight: 195,
        graduationYear: 2027,
        gpa: 3.8,
        satScore: 1280,
        actScore: 29,
        highSchool: 'Southlake Carroll',
        city: 'Southlake',
        state: 'TX',
        bio: 'Three-year varsity starter and team captain. Led team to state semifinals as a junior. Strong arm with excellent pocket awareness.',
      },
    })
    console.log(`  [created] RecruitProfile for recruit@test.com`)

    if (parentId) {
      await prisma.user.update({
        where: { id: parentId },
        data: { linkedRecruitId: recruitId },
      })
      console.log(`  [linked] parent@test.com → recruit@test.com`)
    }
  }

  console.log('\n✓ Test users ready!\n')
  console.log('Login credentials:')
  console.log('  recruit@test.com  / test1234  → /recruit')
  console.log('  parent@test.com   / test1234  → /parent')
  console.log('  coach@test.com    / test1234  → /admin')
  console.log('  super@test.com    / test1234  → /super-admin')

  await pool.end()
}

main().catch((e) => {
  console.error('Failed:', e)
  process.exit(1)
})
