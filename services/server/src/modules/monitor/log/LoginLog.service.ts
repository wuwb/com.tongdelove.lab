import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { LoginLogCreateReqDTO } from './dto/LoginLogCreateReq.dto'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { loginLog } from '@/core/database/drizzle/schema'

@Injectable()
export class LoginLogService {
  constructor(private readonly drizzle: DrizzleService) {}

  create(data: LoginLogCreateReqDTO) {
    this.drizzle.db.insert(loginLog).values({
      id: randomUUID(),
      ...data,
    })
  }

  async addLoginInfo(req, msg, key) {}
}
