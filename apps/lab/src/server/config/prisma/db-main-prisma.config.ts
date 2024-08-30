import { PrismaManager, PrismaClientDbMain } from '@tongdelove/prisma'

const isDev = process.env?.NODE_ENV === 'development'

export const getPrismaClientDbMain: () => PrismaClientDbMain = () => {
  const url = process.env?.DIRECT_URL ?? null

  if (!url) {
    throw new Error(
      `[Error] Cannot create prisma client instance, missing env variable DIRECT_URL.`
    )
  }

  return PrismaManager.getDevSafeInstance('db-main', () => {
    const prismaClient = new PrismaClientDbMain({
      datasources: {
        db: {
          url: url,
        },
      },
      errorFormat: isDev ? 'pretty' : 'colorless',
      log: [
        {
          level: 'query',
          emit: 'event',
        },
        {
          level: 'error',
          emit: 'stdout',
        },
        {
          level: 'info',
          emit: 'stdout',
        },
        {
          level: 'warn',
          emit: 'stdout',
        },
      ],
    })
    if (isDev) {
      prismaClient.$on('query', (e) => {
        console.log('Query: ' + e.query)
        console.log('Duration: ' + e.duration + 'ms')
      })
    }
    return prismaClient
  })
}
