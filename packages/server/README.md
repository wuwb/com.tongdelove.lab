# README

## TODO

-   项目启动的时候向 posthog.com 发送统计信息

### 请求处理流程

request：收到请求
middleware：中间件过滤（跨域、来源校验等处理）
guard：守卫过滤（鉴权）

interceptor:before：数据流拦截器（本应用为空，即：无处理）
pipe：参数提取（校验）器
controller：业务控制器
service：业务服务
interceptor:after：数据流拦截器（格式化数据、错误）

filter：捕获以上所有流程中出现的异常，如果任何一个环节抛出异常，则返回错误

### 鉴权处理流程

guard：守卫 分析请求
guard.canActivate：继承处理
JwtStrategy.validate：调用 鉴权服务
guard.handleRequest：根据鉴权服务返回的结果作判断处理，通行或拦截

### 鉴权级别

任何高级操作（CUD）都会校验必须的 Token（代码见 auth.guard.ts ）
涉及表数据读取的 GET 请求会智能校验 Token，无 Token 或 Token 验证生效则通行，否则不通行（代码见 humanized-auth.guard.ts ）

### 参数校验逻辑（代码见 query-params.decorator.ts ）

普通用户使用高级查询参数将被视为无权限，返回 403
任何用户的请求参数不合法，将被校验器拦截，返回 400
错误过滤器（代码见 error.filter.ts ）

### 拦截器 interceptors

缓存拦截器：自定义这个拦截器是是要弥补框架不支持 ttl 参数的缺陷
数据流转换拦截器：当控制器所需的 Promise service 成功响应时，将在此被转换为标准的数据结构
数据流异常拦截器：当控制器所需的 Promise service 发生错误时，错误将在此被捕获
日志拦截器：代替默认的全局日志

### 装饰器扩展 decorators

缓存装饰器：用于配置 cache key / cache ttl
控制器响应装饰器：用于输出规范化的信息，如 message 和 翻页参数数据
请求参数提取器：用户自动校验和格式化请求参数，包括 query/params/辅助信息

### 守卫 guards

默认所有非 GET 请求会使用 Auth 守卫鉴权
所有涉及到多角色请求的 GET 接口会使用 HumanizedJwtAuthGuard 进行鉴权

### 中间件 middlewares

CORS 中间件，用于处理跨域访问
Origin 中间件，用于拦截各路不明请求

### 管道 pipes

validation.pipe 用于验证所有基于 class-validate 的验证类

### 业务模块 modules

-   公告
-   文章
-   分类
-   标签
-   评论
-   配置
-   Auth：全局鉴权、Token、用户（Admin）
-   Like：点赞评论、文章、主站
-   Archive：全站数据缓存
-   扩展模块
    -   统计：业务数据统计业务
    -   备份：数据库备份业务（定时、手动）
    -   其他：其他第三方 token 等服务

### 核心辅助模块 processors

-   数据库
    -   连接数据库和异常自动重试
-   缓存 / Redis
    -   基本的缓存数据 Set、Get
    -   扩展的 Promise 工作模式（双向同步/被动更新）
    -   扩展的 Interval 工作模式（超时更新/定时更新）
-   辅助 / Helper
    -   搜索引擎实时更新服务：根据入参主动提交搜索引擎收录，支持百度、Google 服务；分别会在动态数据 进行 CUD 的时候调用对应方法
    -   评论过滤服务：使用 akismet 过滤 spam；暴露三个方法：校验 spam、提交 spam、提交 ham
    -   邮件服务：根据入参发送邮件；程序启动时会自动校验客户端有效性，校验成功则根据入参发送邮件
    -   IP 地理查询服务：根据入参查询 IP 物理位置；控制器内优先使用阿里云 IP 查询服务，当服务无效，使用本地 GEO 库查询，使用 ip.cn 等备用方案
    -   第三方云存储服务：生成云存储上传 Token（目前服务为 Aliyun OSS），后期可以添加 SDK 的更多支持，比如管理文件
    -   Google 证书（鉴权）服务：用于生成各 Google 应用的服务端证书

## 参考

- https://github.com/surmon-china/nodepress
- https://github.com/kuangshp/nestjs-mysql-api
    - 推荐
- https://github.com/hantsy/nestjs-rest-sample.git
- https://github.com/shen100/mili
- https://github.com/EvertonSerpa/Fullstack-Modulo5-Bootcamp-BackEnd
- https://rxresu.me/zh/wenbin/wuwenbin/build
- https://resume.innei.ren/
- https://gitee.com/doramart/DoraCMS
- https://www.html-js.cn/dr-admin
- https://github.com/hackycy/sf-nest-admin/blob/dev/src/modules/admin/system/user/user.service.ts
- https://github.com/kuizuo/kz-nest-admin/blob/main/src/entities/base.entity.ts
- https://github.com/notadd/nt-addon-pay 支付
- https://github.com/galaxy-s10/vue3-blog-server
