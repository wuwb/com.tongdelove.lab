import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationsService } from './organizations.service';
import { LoggerModule } from '@/core/logger/logger/logger.module';

@Module({
    imports: [
        LoggerModule,
        TypeOrmModule.forFeature([Organization])
    ],
    providers: [
        OrganizationsService
    ],
    exports: [
        OrganizationsService
    ]
})
export class OrganizationsModule { }
