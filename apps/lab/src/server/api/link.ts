import { labLinkApi } from '@/server/backend/lab-content.api'

export async function getLinks() {
  return labLinkApi.getLinks()
}
