import { prisma } from '@/server/db/prisma'
import { Prisma, UserPermissionRole } from '@prisma/client'

export const UserPublicArgs = Prisma.validator<Prisma.UserDefaultArgs>()({
  select: {
    id: true,
    name: true,
    image: true,
    about: true,
    interests: true,
    tagline: true,
    language: true,
    location: true,
    createdAt: true,
    isPublic: true,
    role: true,
  },
})

export async function getUserPublicById(id: string) {
  return prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      ...UserPublicArgs.select,
    },
  })
}

export async function isAdmin(userId: string) {
  if (userId.trim() === '') {
    return false
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      deletedAt: null,
    },
    select: {
      role: true,
    },
  })

  return user?.role === UserPermissionRole.ADMIN ? true : false
}
