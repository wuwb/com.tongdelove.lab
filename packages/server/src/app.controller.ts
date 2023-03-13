import {
  Get,
  Controller,
  Res,
  Render,
  Request,
  Response,
  ClassSerializerInterceptor,
  UseInterceptors,
  CacheInterceptor,
  Param,
  Query,
  Post,
  UseGuards,
  Req,
  Logger,
  HttpCode,
  Header,
  Inject,
} from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import jsonfile from 'jsonfile';
// import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service';
// import { AuthService } from './processors/auth/auth.service';
// import { CacheService } from './processors/cache/cache.service';
// import { LinksService } from './modules/links/links.service';
// import { PhotoService } from './modules/photo/photo.service';
// import { cal } from './test/cal';
import * as captcha from 'trek-captcha';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDecorator } from './common/decorators/user.decorator';
import * as PKG from '../package.json'
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
@ApiTags('App')
// @UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(CacheInterceptor)
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
    // private readonly configService: ConfigService,
    // private readonly cacheService: CacheService,
    // private readonly authService: AuthService,
    // private readonly linksService: LinksService,
    // private readonly photoService: PhotoService,
  ) { }

  @Get('/')
  appInfo() {
    return {
      name: PKG.name,
      description: PKG.description,
      author: PKG.author,
      homepage: PKG.homepage,
      issues: PKG.issues,
    };
  }

  @Get('/favicon.ico')
  favicon() {

  }

  // @Get('/self')
  // findAll(): Observable<AxiosResponse<any>> {
  //   return this.httpService.get('https://baidu.com');
  // }

  // 页面
  @Get()
  @Render('pages/index')
  async index() {
    // throw new Error('index');
    return {};
  }

  @Get('about')
  @Render('pages/about')
  async about() {
    return {};
  }

  @Get('tools/blood')
  @Render('pages/tools/blood')
  async blood() {
    return {};
  }

  // 接口
  @Get('api')
  getRoot(): string {
    return this.appService.root();
  }

  // fix
  @Get('api/charts/radar.json')
  async a() {
    return {};
  }
  @Get('api/charts/pie.json')
  async b() {
    return {};
  }
  @Get('api/charts/map.json')
  async c() {
    return {};
  }

  // 文字验证码
  @Get('api/get-image-code')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async getImageCode(ctx: ExecutionContext, @UserDecorator() user: any = {}, @Res() res) {
    const { token, buffer } = await captcha();
    user.imageCode = token;
    buffer.pip(res);
  }

  @Get('api/create-qrcode')
  createQrcode() {

  }

  // @Get()
  // @Render('products')
  // async root(@Res() res) {
  //     const links = await this.linkService.getLinks();
  //     const photos = await this.photoService.findAll();
  //     return {
  //         links,
  //         photos,
  //     };
  // }

  // @Get('/test')
  // async test(@Query() query) {
  //     const param = JSON.parse(query.param);
  //     let data1 = [];
  //     if (param.boxes && param.boxes.length > 0) {
  //         data1 = param.boxes.filter((item) => {
  //             if (item) {
  //                 if (item.headCount == 0 && item.bodyCount == 0 && item.footCount == 0) {
  //                     return 0;
  //                 } else {
  //                     return 1;
  //                 }
  //             } else {
  //                 return 0;
  //             }
  //         }).map((item) => {
  //             return {
  //                 boxType: item.type,
  //                 headCount: item.head,
  //                 bodyCount: item.body,
  //                 footCount: item.foot,
  //             };
  //         });
  //     }
  //     const data2: any = [];
  //     for (const key in param.hotbag) {
  //         if (param.hotbag.hasOwnProperty(key)) {
  //             if (param.hotbag[key] !== 0) {
  //                 data2.push({
  //                     hotType: `${key}加热包`,
  //                     hotCount: param.hotbag[key]
  //                 });
  //             }
  //         }
  //     }
  //     const data3: any = [];
  //     for (const key in param.chaoshao) {
  //         if (param.chaoshao.hasOwnProperty(key)) {
  //             if (param.chaoshao[key] !== 0) {
  //                 data3.push({
  //                     type: `${key}`,
  //                     count: param.chaoshao[key],
  //                 });
  //             }
  //         }
  //     }
  //     const data = {} // cal(data1, data2, data3, param.address[0], param.address[1]);
  //     return data;
  // }
}
