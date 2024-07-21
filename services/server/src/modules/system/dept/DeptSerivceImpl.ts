import { Injectable } from '@nestjs/common'
import { DeptCreateReqVO } from './vo/DeptCreateReqVO'
import { DeptUpdateReqVO } from './vo/DeptUpdateReqVO'
import { DeptListReqVO } from './vo/DeptListReqVO'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { ApiException } from '@/common/exceptions/api.exception'
import { CommonStatusEnum } from '@/common/enums/CommonStatus.enum'
import { TenantContextHolder } from '@/core/tenant/context/TenantContextHolder'

@Injectable()
export class DeptServiceImpl {
  deptCache

  parentDeptCache

  constructor(private prisma: PrismaService) {
    this.initLocalCache()
  }

  async initLocalCache() {
    // 第一步：查询数据
    let depts = await this.prisma.dept.findMany()

    // 第二步：构建缓存
    depts.forEach((dept) => {
      this.deptCache[dept.id] = dept
      this.parentDeptCache[dept.parentId] = dept
    })
  }

  // createDept(reqVO: DeptCreateReqVO) {

  //     this.validateForCreateOrUpdate(null, reqVO.parentId, reqVO.name)

  // }

  // updateDept(reqVO: DeptUpdateReqVO) {

  // }

  // deleteDept(id: string) {

  // }

  // getDept() {

  // }

  // getDeptList() {

  // }

  // getDeptListByNameAndStatus(reqVO: DeptListReqVO) {
  //     return this.prisma.dept.findMany({
  //         where: {
  //             ...reqVO,
  //         }
  //     });
  // }

  // async getDeptListByParentIdFromCache(parentId: string, recursive: boolean): Promise<any[]> {
  //     if (!parentId) {
  //         return [];
  //     }
  //     let result;
  //     this.getDeptsByParentIdFromCache(result, parentId, recursive ? 1000 : 1, this.parentDeptCache);

  //     return result;
  // }

  // getDeptsByParentIdFromCache(result, parentId: string, recursiveCount: number, parentDeptMap) {
  //     // 递归次数为 0，结束！
  //     if (recursiveCount === 0) {
  //         return;
  //     }

  //     // 获得子部门
  //     let deptList = parentDeptMap.filter(dept => dept.id === parentId);
  //     if (deptList.length === 0) {
  //         return;
  //     }

  //     // 针对多租户，过滤掉非当前租户的部门
  //     let tenantId = TenantContextHolder.getTenantId();
  //     if (!tenantId) {
  //         deptList = deptList.filer(dept => dept.tenantId === tenantId)
  //     }
  //     result.concat(deptList);

  //     // 继续递归
  //     // deptList.forEach(dept => this.getDeptsByParentIdFromCache(result, dept.id, recursiveCount - 1, parentDeptMap));
  // }

  // validateForCreateOrUpdate(id: string | null, parentId: string, name: string) {
  //     // 校验自己存在
  //     this.validateDeptExists(id);
  //     // 校验父部门的有效性
  //     // validateParentDeptEnable(id, parentId);
  //     // 校验部门名的唯一性
  //     // validateDeptNameUnique(id, parentId, name);
  // }

  // async validateParentDeptEnable(id: string, parentId: string) {
  //     // if (parentId == null || DeptIdEnum.ROOT.getId().equals(parentId)) {
  //     //     return;
  //     // }
  //     if (!id) {
  //         return;
  //     }
  //     // 不能设置自己为父部门
  //     if (parentId === id) {
  //         throw new ApiException(10001, '错误');
  //     }
  //     // 父岗位不存在
  //     const dept = await this.prisma.dept.findUnique({
  //         where: {
  //             id: parentId,
  //         }
  //     });
  //     if (!dept) {
  //         throw new ApiException(404, 'Parent');
  //     }
  //     // 父部门被禁用
  //     if (dept.status !== CommonStatusEnum.ENABLE) {
  //         throw new ApiException(404, '未启用');
  //     }
  //     // 父部门不能是原来的子部门
  //     const children = await this.getDeptListByParentIdFromCache(id, true);
  //     // if (children.anyMatch(dept => dept.id === parentId)) {
  //     //     throw new ApiException(404, '父部门不能是子部门');
  //     // }
  // }

  // async validateDeptExists(id: string | null) {
  //     if (!id) {
  //         return;
  //     }
  //     const dept = await this.prisma.dept.findUniqueOrThrow({
  //         where: {
  //             id,
  //         }
  //     });
  //     if (!dept) {
  //         throw new ApiException(1002004002, '当前部门不存在');
  //     }
  // }

  // validateDeptNameUnique() {

  // }

  // validateDeptList() {

  // }
}
