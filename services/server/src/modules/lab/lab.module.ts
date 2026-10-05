import { Module } from '@nestjs/common'
import { LabPoemModule } from './poem/poem.module'
import { LabStickerModule } from './sticker/sticker.module'
import { LabFaviconGenModule } from './favicon-gen/favicon-gen.module'
import { LabAppleGuideModule } from './apple-guide/apple-guide.module'
import { LabLinkModule } from './link/link.module'
import { LabUserModule } from './user/user.module'
import { LabPostModule } from './post/post.module'
import { LabAuthAdapterModule } from './auth/auth-adapter.module'

/**
 * lab 站点（原 apps/lab 前端）所需的后端业务模块。
 *
 * 这些能力原先由 apps/lab 通过 Prisma 直连数据库实现，现统一由
 * services/server 使用 Drizzle 提供，前端只做 HTTP 调用。
 */
@Module({
  imports: [
    LabPoemModule,
    LabStickerModule,
    LabFaviconGenModule,
    LabAppleGuideModule,
    LabLinkModule,
    LabUserModule,
    LabPostModule,
    LabAuthAdapterModule,
  ],
})
export class LabModule {}
