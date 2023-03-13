/** 自定义redis缓存key，用于反射 */
export const REDIS_CACHE_KEY = '@@redis_cache_key';
/** 自定义redis缓存过期key，用于反射 */
export const REDIS_CACHE_EX_SECOND_KEY = '@@redis_cache_ex_second_key';

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
