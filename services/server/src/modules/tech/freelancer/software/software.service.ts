import { DingdingService } from '@/core/sms/dingding/dingding.service'
import { WebhookService } from '@/core/sms/webhook/webhook.service'
import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { SourceEnum } from '@prisma/client'

@Injectable()
export class FreelancerSoftwareService {}
