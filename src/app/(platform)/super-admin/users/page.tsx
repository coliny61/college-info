import { prisma } from '@/lib/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function SuperAdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      school: { select: { name: true } },
    },
    take: 100,
  })

  const roleBadgeColor: Record<string, string> = {
    recruit: 'bg-blue-500/10 text-blue-400',
    parent: 'bg-purple-500/10 text-purple-400',
    coach_admin: 'bg-emerald/10 text-emerald',
    super_admin: 'bg-red-500/10 text-red-400',
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Users</h1>
        <p className="mt-2 text-muted-foreground">
          All users on the platform.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No users yet. Users will appear here once they register.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.displayName}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleBadgeColor[user.role] ?? ''}`}
                    >
                      {user.role.replace('_', ' ')}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.school?.name ?? '—'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
