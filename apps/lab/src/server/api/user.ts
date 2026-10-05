import { labUserApi } from '@/server/backend/lab-content.api'

export async function getUserPublicById(id: string) {
  return labUserApi.getUserPublicById(id)
}

export async function isAdmin(userId: string) {
  return labUserApi.isAdmin(userId)
}
