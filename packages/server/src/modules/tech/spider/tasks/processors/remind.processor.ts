import { FreelancerService } from '@/modules/tech/freelancer/freelancer.service';
import { JOB_REF, OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Inject, Logger } from '@nestjs/common';
import { FreelancerTask } from '@prisma/client';
import { Job } from 'bull';
import { format } from 'date-fns';

@Processor('remind')
export class RemindProcessor {
    private readonly logger = new Logger(RemindProcessor.name);

    constructor(
        @Inject(JOB_REF) jobRef: Job,
        private readonly freelancerService: FreelancerService,

    ) {
        console.log(jobRef);
    }

    @Process()
    async transcode(job: Job<FreelancerTask>) {
        this.logger.debug('Start transcoding...');
        this.logger.debug(job.data);
        job.data.date = format(new Date(job.data.date), 'YYYY-MM-DD HH:ss') as unknown as Date;
        this.freelancerService.remind(job.data);
        this.logger.debug('Transcoding completed');
        // let progress = 0;
        // for (let i = 0; i < 100; i++) {
        //   // await doSomething(job.data);
        //   progress += 1;
        //   await job.progress(progress);
        // }
        // return {};
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }
}
