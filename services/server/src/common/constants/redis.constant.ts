/* 图片验证码 key */
export const CAPTCHA_IMAGE_KEY = 'captcha:image'

/* 用户信息 */
export const USER_VERSION_KEY = 'admin:user:version' // 存储版本号
export const USER_TOKEN_KEY = 'admin:user:token' // 用户 token
export const USER_USERNAME_KEY = 'admin:userName:token' // 用户名 userName
export const USER_NICKNAME_KEY = 'admin:nickName:token' // 用昵称 nickName
export const USER_DEPTID_KEY = 'admin:deptId:token' // 用部门id  deptId
export const USER_DEPTNAME_KEY = 'admin:deptName:token' // 用部门名称  deptName
export const USER_PERMISSIONS_KEY = 'admin:permissions:token' //权 限标识
export const USER_ROLEKEYS_KEY = 'admin:roleKeys:token' // 角色标识
export const USER_ROLEKS_KEY = 'admin:role:token' // 角色

export const USER_ONLINE_KEY = 'admin:online:token' // 在线用户

export const USER_USERINFO_KEY = 'admin:userinfo:token'

/** 自定义redis缓存key，用于反射 */
export const REDIS_CACHE_KEY = '@@redis_cache_key'
/** 自定义redis缓存过期key，用于反射 */
export const REDIS_CACHE_EX_SECOND_KEY = '@@redis_cache_ex_second_key'

export enum RedisKeys {
  AccessIp = 'access_ip',
  Like = 'like',
  Read = 'read',
  LoginRecord = 'login_record',
  MaxOnlineCount = 'max_online_count',
  IpInfoMap = 'ip_info_map',
  LikeSite = 'like_site',
  /** 后台管理入口页面缓存 */
  AdminPage = 'admin_next_index_entry',
  /** 配置项缓存 */
  ConfigCache = 'config_cache',
  PTYSession = 'pty_session',
  /** HTTP 请求缓存 */
  HTTPCache = 'http_cache',
  /** Snippet 缓存 */
  SnippetCache = 'snippet_cache',

  /** 云函数缓存数据 */
  ServerlessStorage = 'serverless_storage',
}
