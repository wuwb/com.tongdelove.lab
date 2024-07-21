import { PrismaClient } from '@prisma/client'
import * as hasher from 'wordpress-hash-node'
import { customSeed } from './customSeed'
import { User, Prisma } from '@prisma/client'

async function seed(bcryptSalt?) {
  console.log(`Start seeding ...`)

  const client = new PrismaClient()

  const aliceData: Prisma.UserCreateInput = {
    login: 'admin',
    name: 'admin',
    username: 'admin',
    nicename: 'DW_admin',
    email: 'alice@prisma.io',
    displayName: 'Alice',
    isSuper: 1,
    pass: hasher.HashPassword('123456'),
    password: hasher.HashPassword('123456'),
    activationKey: '',
    roles: {
      create: [
        {
          name: 'admin',
          description: '管理员',
          key: 'admin',
          value: 'admin',
        },
        {
          name: 'user',
          description: '会员',
          key: 'user',
          value: 'user',
        },
      ],
    },
    // post: {
    //   create: {
    //     title: 'Check out Prisma with Next.js',
    //     content: 'https://www.prisma.io/nextjs',
    //     published: true,
    //   },
    // },
  }

  const alice = await client.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: aliceData,
  })

  const bobData: Prisma.UserCreateInput = {
    id: '2',
    login: 'wenbin',
    name: 'admin',
    username: 'wenbin',
    nicename: 'DW_wenbin',
    email: 'bob@prisma.io',
    displayName: 'Bob',
    pass: hasher.HashPassword('123456'),
    password: hasher.HashPassword('123456'),
    activationKey: '',
    roles: {
      connectOrCreate: [
        {
          where: {
            name: 'user',
          },
          create: {
            name: 'user',
            description: '会员',
            key: 'user',
            value: 'user',
          },
        },
      ],
    },
    // post: {
    //   create: [
    //     {
    //       title: 'Follow Prisma on Twitter',
    //       content: 'https://twitter.com/prisma',
    //       published: true,
    //     },
    //     {
    //       title: 'Follow Nexus on Twitter',
    //       content: 'https://twitter.com/nexusgql',
    //       published: true,
    //     },
    //   ],
    // },
  }

  const bob = await client.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: bobData,
  })
  console.log({ alice, bob })

  // const demoCompany = await client.company.upsert({
  //     create: {
  //         id: '1',
  //         name: '测试公司',
  //         enName: '',
  //         formerName: '',
  //         type: 1,
  //         registryAt: new Date().toISOString(),
  //         registryAddress: '',
  //         identifier: '',
  //         legalEntity: '',
  //         property: 0,
  //         chairman: 0,
  //         location: '',
  //         address: '',
  //         hasBranch: 0,
  //         staffSize: 1,
  //         registeredCapital: 0,
  //         website: '',
  //         email: '',
  //     },
  //     update: {},
  //     where: {
  //         id: '1',
  //     }
  // });
  // console.log({ demoCompany });

  console.info('Seeding database with custom seed...')
  customSeed()

  console.info('Seeded database successfully')

  console.log(`Seeding finished.`)
  await client.$disconnect()
}

seed()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    console.log('finally ')
  })
