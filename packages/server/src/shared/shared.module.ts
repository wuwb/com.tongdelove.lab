import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessEntity } from '@/modules/system/access/entities/access.entity';
import { AccountRoleEntity } from '@/modules/system/account/entities/account-role.entity';

import { QQService } from './services/qq.service';
import { ApiAuthService } from './services/api-auth.service';


// import { GoogleService } from './helper/helper.service.google';
// import { AkismetService } from './helper/helper.service.akismet';
// import { CloudStorageService } from './helper/helper.service.cs';
// import { SeoService } from './helper/helper.service.seo';
import { IPService } from './helper/helper.service.ip';
import { Md5Service } from './helper/helper.service.md5';
import { HelperService } from './helper/helper.service';

const services = [
    // GoogleService,
    // AkismetService,
    // CloudStorageService,
    // SeoService,
    Md5Service,
    IPService,
    HelperService,
];

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            AccessEntity,
            AccountRoleEntity,
        ]),
        HttpModule,
    ],
    providers: [
        QQService,
        ApiAuthService,
        ...services,
    ],
    exports: [
        QQService,
        ApiAuthService,
        ...services,
    ],
})
export class SharedModule { }
