import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { A5Service } from "./tasks/catcher/a5.service";
import { MayigeekService } from "./tasks/catcher/mayigeek.service";
import { OschinaService } from './tasks/catcher/oschina.service';
import { RrkfService } from "./tasks/catcher/rrkf.service";
import { ShixianService } from "./tasks/catcher/shixian.service";
import { YuanjisongService } from "./tasks/catcher/yuanjisong.service";

@Controller('api/spider')
@ApiTags('App')
export class SpiderController {
  constructor(
    private readonly oschinaService: OschinaService,
    private readonly yuanjisongService: YuanjisongService,
    private readonly a5Service: A5Service,
    private readonly mayigeekService: MayigeekService,
    private readonly rrkfService: RrkfService,
    private readonly shixianService: ShixianService,
  ) {

  }

  @Get(':type')
  async getNewData() {

  }

  @Post('oschina')
  async oschina() {
    await this.oschinaService.spider();
  }

  @Post('yuanjisong')
  async yuanjisong() {
    await this.yuanjisongService.spider();
  }

  @Post('a5')
  async a5() {
    await this.a5Service.spider();
  }

  @Post('mayigeek')
  async mayigeek() {
    await this.mayigeekService.spider();
  }

  @Post('rrkf')
  async rrkf() {
    await this.rrkfService.spider();
  }

  @Post('shixian')
  async shixian() {
    await this.shixianService.spider();
  }
}
