// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.LAB_TONGDELOVE_URL_NON_POOLING
    }
  },
})
console.log('[PrismaClient] [before] new PrismaClient()');
console.log('PrismaClient: ', PrismaClient);


if (process.env.NODE_ENV !== 'production') {
  console.log('[PrismaClient] [before] new PrismaClient()');
  console.log('PrismaClient: ', PrismaClient);
  globalForPrisma.prisma = prisma

  // test
  globalForPrisma.prisma.user.findMany().then((user) => {
    console.log('user: ', user)
  })
}

export default prisma

