export interface OschinaTask {
  id: number

  projectNo: string // 项目id
  name: string // 项目名称
  imagePath: string // 项目图片

  budgetMin: number // 最小预算
  budgetMax: number // 最大预算
  budgetMinByYuan: string // 最小预算
  budgetMaxByYuan: string // 最大预算

  cycle: number // 开发周期
  cycleName: string // 开发周期单位

  // 纯远程社区，放弃驻场功能
  residentRequire: number // 是否需要驻场
  isTendencyDistrict: number // 是否有区域偏好
  tendencyProvince: string // 偏好省份
  tendencyCity: string // 偏好城市
  tendencyType: number // 偏好类型

  // 搜集 prd，后期用于分析
  prdId: null
  prd: null

  attachmentVisible: number // 1、附件是否可见
  attachmentCount: number // 附件数量

  depositHostingStatus: number // 订金托管状态
  depositMoney: number // 订金金额

  serviceFee: null // 服务费
  serviceFeeByYuan: string
  serviceFeePayStatus: number
  serviceFeePayTime: null

  payType: number // 支付类型？

  status: number // 状态
  subStatus: number
  statusLastTime: string // 状态更新时间

  publishTime: string // 发布时间
  publishStatus: number // 发布状态
  canApplyByPulishTime: boolean // 是否发布后马上可以申请？

  visible: number // 1、是否可见？
  isInternal: null // 是否内部项目？

  applyCount: number // 申请数量
  viewCount: number // 查看数量

  auditStatus: number // 审核状态
  auditReason: null // 审核原因
  auditTime: null // 审核时间

  handleStatus: number // 处理状态？
  handleTime: null // 处理时间？

  userId: number // 加密，随时间变化
  userAccountId: number // 加密，随时间变化
  userAccountNickname: string // 发布需求的用户的昵称
  userAccountIconPath: string // 用户头像
  contactId: null // 联系人 id，官方分配的客服？
  specialistId: null // 专家 id，官方分配的专家

  type: number // 类型，软件项目、悬赏任务
  application: string // 应用类型
  tags: null // 标签列表

  skillList: any[] // 所需技能列表
  roleList: any[] // 角色列表
  projectType: any[] // 项目类型

  top: number
  supportClients: null

  createdAt: null // 创建时间
  updatedAt: null // 更新时间
  createdBy: null // 创建者
  updatedBy: null // 修改者
}
