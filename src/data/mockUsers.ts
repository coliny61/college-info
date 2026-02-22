import type { User } from '@/types';

/**
 * Mock user accounts for development and testing.
 * Covers all three roles: recruit, parent, and admin.
 */
export const MOCK_USERS: User[] = [
  {
    id: 'recruit-1',
    email: 'recruit@test.com',
    displayName: 'Marcus Johnson',
    role: 'recruit',
    avatarUrl: 'https://placeholder.com/avatar-marcus.jpg',
    favorites: ['alabama', 'ohio-state', 'oregon'],
    createdAt: '2024-09-15T10:00:00.000Z',
  },
  {
    id: 'parent-1',
    email: 'parent@test.com',
    displayName: 'David Johnson',
    role: 'parent',
    avatarUrl: 'https://placeholder.com/avatar-david.jpg',
    favorites: ['ohio-state', 'alabama'],
    linkedRecruitId: 'recruit-1',
    createdAt: '2024-09-16T14:30:00.000Z',
  },
  {
    id: 'admin-1',
    email: 'admin@test.com',
    displayName: 'Coach Williams',
    role: 'admin',
    avatarUrl: 'https://placeholder.com/avatar-coach.jpg',
    favorites: [],
    schoolId: 'alabama',
    createdAt: '2024-08-01T09:00:00.000Z',
  },
];
