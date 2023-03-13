import { FreelancerService } from '@/modules/freelancer/freelancer.service';
import { CodemartService } from '@/modules/spider/tasks/catcher/codemart.service';
import { OschinaService } from '@/modules/spider/tasks/catcher/oschina.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

// 定时统计每一个用户获得的点赞数
// 统计每一个用户的关注数、粉丝数
// 统计每一个用户发表的文章数，每一个用户的文章阅读数

@Injectable()
export class GlobalScheduleService {
    private readonly logger = new Logger(GlobalScheduleService.name);

    constructor(
        public readonly freelancerService: FreelancerService,
        private readonly codemartService: CodemartService,
        private readonly oschinaService: OschinaService,
    ) { }

    // @Cron('45 * * * * *')
    async handleGetGithubOrganization() {
        this.logger.debug('Called when the current second is 45');
    }

    // @Cron('*/10 * * * *') // 10分钟执行一次
    async handlespiderCodemart() {
        this.logger.log('执行 handlespiderCodemart');
        // await this.codemartService.spiderCodemart();
    }

    // @Cron('*/10 * * * *')
    async handlespiderOschina() {
        this.logger.log('执行 handlespiderOschina');
        // await this.oschinaService.spider();
    }
}
