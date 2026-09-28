import { Injectable, Logger } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import {
  opensourceProject,
  opensourceProjectCategroy,
  opensourceProjectField,
} from '@/core/database/drizzle/schema'

@Injectable()
export class OpensourceService {
  constructor(private readonly drizzle: DrizzleService) {
    //
  }

  async listCategories() {
    return this.drizzle.db
      .select()
      .from(opensourceProjectCategroy)
  }

  async getCategory(cid: string) {
    return this.drizzle.db
      .select()
      .from(opensourceProjectField)
      .where(eq(opensourceProjectField.cid, cid))
  }

  async getProjects(cid: string, fid: string) {
    const categroy = await this.drizzle.db
      .select()
      .from(opensourceProjectCategroy)
      .where(eq(opensourceProjectCategroy.id, cid))
      .limit(1)
      .then((rows) => rows[0] ?? null)
    const field = await this.drizzle.db
      .select()
      .from(opensourceProjectField)
      .where(eq(opensourceProjectField.cid, cid))
    const projects = await this.drizzle.db
      .select()
      .from(opensourceProject)
      .where(eq(opensourceProject.cid, cid))

    return {
      categroy,
      field,
      projects,
    }
  }
}
