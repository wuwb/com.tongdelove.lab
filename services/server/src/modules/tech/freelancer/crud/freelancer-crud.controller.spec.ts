import { PrismaService } from '@/core/database/prisma/prisma.service'
import { FreelancerCrudController } from './freelancer-crud.controller'
import { FreelancerCrudService } from './freelancer-crud.service'

describe('FreelancerCrudController', () => {
  let catsController: FreelancerCrudController
  let freelancerService: FreelancerCrudService
  let prismaService: PrismaService

  beforeEach(() => {
    freelancerService = new FreelancerCrudService(prismaService)
    catsController = new FreelancerCrudController(freelancerService)
  })

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test']

      freelancerService.count({
        where: {},
      })
      // jest.spyOn(freelancerService, 'findAll').mockImplementation(() => result);

      expect(
        await freelancerService.count({
          where: {},
        })
      ).toBe(result)
    })
  })
})
