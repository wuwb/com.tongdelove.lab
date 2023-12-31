import { Test } from '@nestjs/testing';
import { RoleController } from './role.controller';
import { RoleService } from './services/role.service';

describe('CatsController', () => {
    let roleController: RoleController;
    let roleService: RoleService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [RoleController],
            providers: [RoleService],
        }).compile();

        roleService = moduleRef.get(RoleService);
        roleController = moduleRef.get(RoleController);
    });

    describe('findRoles', () => {
        it('should return an array of role', async () => {
            const result = ['test'];

            jest.spyOn(roleService, 'findRoles').mockImplementation(() => result);

            expect(
                await roleController.findRoles({
                    page: 1,
                    limit: 10,
                }),
            ).toBe(result);
        });
    });
});
