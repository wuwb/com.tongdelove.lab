export interface CodemartTask {
  id: number;
  name: string; // 名称
  description: string; // 描述
  price: string; // 价格
  bargain: true, // 是否可以议价
  duration: number; // 项目周期
  applyCount: number; // 申请数量
  visitCount: number;
  pubTime: string; // 发布时间

  createdAt: string; // 创建时间
  ownerId: number;
  cover: string;
  roles: string; // 需求角色
  status: string; // 状态
  developerType: string; // 开发者类型
  statusText: string;
  typeText: string;
  types: any;
  specificRole: string;
  labels: any;
}

