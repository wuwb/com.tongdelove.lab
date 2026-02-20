import { Injectable } from '@nestjs/common'

type CommoditiesPriceQuery = {
  type: string
  time?: Date
}

@Injectable()
export class CommoditiesService {
  constructor() {}

  async getPrice(commoditiesId: string, startTime?, endTime?) {
    let timeQuery

    // if (startTime) {
    //   timeQuery = Raw(
    //     (alias) => {
    //       return `${alias} >= :startTime`
    //     },
    //     {
    //       startTime: startTime,
    //     }
    //   )
    // }

    // if (endTime) {
    //   timeQuery = Raw(
    //     (alias) => {
    //       return `${alias} <= :endTime`
    //     },
    //     {
    //       endTime: endTime,
    //     }
    //   )
    // }

    // if (startTime && endTime) {
    //   timeQuery = Raw(
    //     (alias) => {
    //       return `${alias} >= :startTime` && `${alias} <= :endTime`
    //     },
    //     {
    //       startTime: startTime,
    //       endTime: endTime,
    //     }
    //   )
    // }

    // let query: CommoditiesPriceQuery = {
    //   type: commoditiesId,
    // }

    // if (!timeQuery) {
    //   query.time = timeQuery
    // }

    // return this.commoditiesPriceRepository.find({
    //   where: query,
    // })
  }
}
