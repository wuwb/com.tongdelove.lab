
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Raw } from 'typeorm';
import { Commodities } from './commodities.entity';
import { CommoditiesPrice } from './commodities-price.entity';

type CommoditiesPriceQuery = {
  type: string;
  time?: Date
}

@Injectable()
export class CommoditiesService {

  constructor(
    @InjectRepository(Commodities)
    private readonly commoditiesRepository: Repository<Commodities>,
    @InjectRepository(CommoditiesPrice)
    private readonly commoditiesPriceRepository: Repository<CommoditiesPrice>,
  ) { }

  async getPrice(commoditiesId: string, startTime?, endTime?) {
    let timeQuery;

    if (startTime) {
      timeQuery = Raw((alias) => {
        return `${alias} >= :startTime`
      }, {
        startTime: startTime,
      });
    }

    if (endTime) {
      timeQuery = Raw((alias) => {
        return `${alias} <= :endTime`
      }, {
        endTime: endTime,
      });
    }

    if (startTime && endTime) {
      timeQuery = Raw((alias) => {
        return `${alias} >= :startTime` && `${alias} <= :endTime`
      }, {
        startTime: startTime,
        endTime: endTime,
      });
    }

    let query: CommoditiesPriceQuery = {
      type: commoditiesId,
    };

    if (!timeQuery) {
      query.time = timeQuery;
    }

    return this.commoditiesPriceRepository.find({
      where: query,
    });
  }
}
