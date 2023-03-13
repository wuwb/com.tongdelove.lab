import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

// import { GoogleService } from './helper.service.google';
// import { AkismetService } from './helper.service.akismet';
// import { CloudStorageService } from './helper.service.cs';
// import { SeoService } from './helper.service.seo';
import { IPService } from './helper.service.ip';
import { Md5Service } from './helper.service.md5';
import { HelperService } from './helper.service';
import { QQService } from './qq.service';

const services = [
  // GoogleService,
  // AkismetService,
  // CloudStorageService,
  // SeoService,
  Md5Service,
  IPService,
  HelperService,
  QQService,
];

@Global()
@Module({
  imports: [
    HttpModule,
  ],
  providers: services,
  exports: services,
})
export class HelperModule { }
