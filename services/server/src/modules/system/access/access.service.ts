import { Injectable } from '@nestjs/common'
import { CreateAccessDto } from './dto/create.access.dto'
import { UpdateAccessDto } from './dto/update.access.dto'
import { AccessReqDto } from './dto/access.req.dto'

@Injectable()
export class AccessService {
  /**
   * 创建资源
   */
  async createAccess(createAccessDto: CreateAccessDto) {
    // const { moduleName, actionName } = createAccessDto
    // if (moduleName) {
    //   const result = await this.accessRepository.findOne({
    //     where: { moduleName },
    //     select: ['id'],
    //   })
    //   if (result) {
    //     throw new HttpException(
    //       `${moduleName}当前模块名已经存在,不能重复创建`,
    //       HttpStatus.OK
    //     )
    //   }
    // }
    // if (actionName) {
    //   const result = await this.accessRepository.findOne({
    //     where: { actionName },
    //     select: ['id'],
    //   })
    //   if (result) {
    //     throw new HttpException(
    //       `${actionName}当前操作名已经存在,不能重复创建`,
    //       HttpStatus.OK
    //     )
    //   }
    // }
    // const access = this.accessRepository.create(createAccessDto)
    // await this.accessRepository.save(access)
    // return '创建成功'
  }

  /**
     * 根据资源id删除资源
  s   */
  async destroyAccessById(id: string) {
    // if (id <= 8) {
    //   throw new HttpException('系统默认生成的资源不能删除', HttpStatus.OK);
    // }
    // 1.判断是否有角色关联到当前资源
    // const roleAccessResult = await this.roleAccessRepository.findOne({
    //   where: { accessId: id },
    //   select: ['id'],
    // })
    // if (roleAccessResult) {
    //   throw new HttpException(
    //     '当前资源已经被角色绑定不能直接删除',
    //     HttpStatus.OK
    //   )
    // }
    // // 2.查看该节点下是否有子节点
    // const childNode = await this.accessRepository.findOne({
    //   where: { parentId: id },
    //   select: ['id'],
    // })
    // if (childNode) {
    //   throw new HttpException('当前节点下含子节点,不能直接删除', HttpStatus.OK)
    // }
    // const {
    //   raw: { affectedRows },
    // } = await this.accessRepository.softDelete(id)
    // if (affectedRows) {
    //   return '删除成功'
    // } else {
    //   return '删除失败'
    // }
  }

  /**
   * 根据资源id修改资源
   */
  async modifyAccessById(id: string, updateAccessDto: UpdateAccessDto) {
    // // if (id) {
    // //   throw new HttpException('系统默认生成的资源不能修改', HttpStatus.OK);
    // // }
    // const {
    //   raw: { affectedRows },
    // } = await this.accessRepository.update(id, updateAccessDto)
    // if (affectedRows) {
    //   return '修改成功'
    // } else {
    //   return '修改失败'
    // }
  }

  /**
   * 获取全部的菜单给分配角色的时候用
   */
  async accessList() {
    // return this.accessRepository.find({
    //   where: [{ type: '1' }, { type: '2' }],
    //   select: ['id', 'moduleName', 'actionName', 'sort'],
    // })
  }

  /**
   * 分页获取资源
   */
  async accessListPage(accessReqDto: AccessReqDto) {
    // const {
    //   page = PageEnum.PAGE_SIZE,
    //   limit = PageEnum.PAGE_NUMBER,
    //   parentId = 0,
    // } = accessReqDto
    // const [data, total] = await getConnection()
    //   .createQueryBuilder(AccessEntity, 'access')
    //   .where('access.parentId = :parentId', { parentId })
    //   .skip((page - 1) * limit)
    //   .take(limit)
    //   .orderBy({ 'access.sort': 'ASC', 'access.createdAt': 'DESC' })
    //   .printSql()
    //   .getManyAndCount()
    // return {
    //   data,
    //   total,
    //   page,
    //   limit,
    // }
  }
}
