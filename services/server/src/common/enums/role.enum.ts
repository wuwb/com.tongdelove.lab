/**
 * 角色枚举类型
 */
export enum RoleEnum {
  Normal,
  Default,

  JuniorAuthor,
  MidLevelAuthor,
  SeniorAuthor,

  User,
  Admin,
  SuperAdmin,
}

/**
 * 角色描素
 */
export const RoleMessage = {
  0: '正常分配的角色',
  1: '系统默认的角色',
}
