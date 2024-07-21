import { PrismaClient } from '@prisma/client'

export async function customSeed() {
  const client = new PrismaClient()
  const username = 'admin'

  //replace this sample code to populate your database
  //with data that is required for your service to start
  await client.user.update({
    where: { login: username },
    data: {
      login: username,
    },
  })

  client.$disconnect()
}
