import { OnQueueActive, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

@Processor('urls')
export class UrlsProcessor {
  private readonly logger = new Logger(UrlsProcessor.name)

  @Process()
  async transcode(job: Job<unknown>) {
    this.logger.debug('Start transcoding...')
    this.logger.debug(job.data)
    this.logger.debug('Transcoding completed')
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
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`
    )
  }
}
