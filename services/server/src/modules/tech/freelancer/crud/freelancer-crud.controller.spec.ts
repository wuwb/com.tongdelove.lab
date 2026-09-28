import { FreelancerCrudController } from './freelancer-crud.controller'
import { FreelancerCrudService } from './freelancer-crud.service'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'

describe('FreelancerCrudController', () => {
  let catsController: FreelancerCrudController
  let freelancerService: FreelancerCrudService
  let drizzleService: DrizzleService

  beforeEach(() => {
    freelancerService = new FreelancerCrudService(drizzleService)
    catsController = new FreelancerCrudController(freelancerService)
  })

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test']

      freelancerService.foo()
      // jest.spyOn(freelancerService, 'findAll').mockImplementation(() => result);

      expect(await freelancerService.foo()).toBe(result)
    })
  })
})
