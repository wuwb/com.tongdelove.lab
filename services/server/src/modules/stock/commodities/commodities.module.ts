import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commodities } from './commodities.entity';
import { CommoditiesPrice } from './commodities-price.entity';
import { CommoditiesService } from './commodities.service';

/**
 * 商品模块
 */
@Module({
    imports: [TypeOrmModule.forFeature([Commodities, CommoditiesPrice])],
    providers: [CommoditiesService],
    exports: [CommoditiesService],
})
export class CommoditiesModule {}
