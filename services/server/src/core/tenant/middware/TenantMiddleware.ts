import { Logger, NestMiddleware } from '@nestjs/common'
import { IncomingMessage, ServerResponse } from 'http'
import { TenantContextHolder } from '../context/TenantContextHolder'

export class TenantMiddleware implements NestMiddleware {
  async use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    const tenantId = this.getTenantIdFromRequest(req) // 获取请求中的租户 ID

    if (tenantId !== undefined) {
      TenantContextHolder.setTenantId(tenantId)
    }
    next()
  }

  getTenantIdFromRequest(req) {
    // 从请求 header 中获取 tenantId
    let tenantId = req.headers['tenant-id']

    // 从请求参数中获取 tenantId
    if (!tenantId) {
      tenantId = req.query.tenantId
    }
    if (!tenantId) {
      tenantId = req.body.tenantId
    }
    // 从 cookies 中获取 tenantId
    if (!tenantId) {
      tenantId = req.cookies.tenantId
    }
    return tenantId
  }
}
