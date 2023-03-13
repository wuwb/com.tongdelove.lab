import { DingdingService } from '@/utils/dingding/dingding.service';
import { WebhookService } from '@/utils/webhook/webhook.service';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/processors/prisma/prisma.service';
import { SourceEnum } from "@prisma/client";


@Injectable()
export class FreelancerSoftwareService { }
