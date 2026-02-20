import {
  Get,
  Controller,
  Res,
  Render,
  Logger,
  HttpCode,
  Header,
  Req,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { User } from '@/common/decorators/user.decorator';
// import { LoginService } from '@/modules/login/login.service';
// import { UserService } from '@/modules/system/user/user.service';

@ApiTags('app')
@Controller('api/app')
// @UseInterceptors(ClassSerializerInterceptor)
// @UseInterceptors(CacheInterceptor)
export class AppController {
  private readonly logger = new Logger(AppController.name)

  constructor(
    private readonly appService: AppService
    // private readonly userService: UserService,
    // private readonly loginService: LoginService,
    // private readonly configService: ConfigService,
    // private readonly authService: AuthService,
    // private readonly linksService: LinksService,
    // private readonly photoService: PhotoService,
  ) {}

  @Get('/')
  appInfo() {
    return 'ok'
  }

  @Get('/favicon.ico')
  favicon() {}

  // @Get('/self')
  // findAll(): Observable<AxiosResponse<any>> {
  //   return this.httpService.get('https://baidu.com');
  // }

  // 页面
  @Get()
  @Render('pages/index')
  async index() {
    // throw new Error('index');
    return {}
  }

  @Get('about')
  @Render('pages/about')
  async about() {
    return {}
  }

  @Get('tools/blood')
  @Render('pages/tools/blood')
  async blood() {
    return {}
  }

  // 接口
  @Get('api')
  getRoot(): string {
    return this.appService.root()
  }

  @Get('dashboard')
  @Render('pages/admin/app')
  // @UseGuards(ActiveGuard, RolesGuard)
  // @Roles(UserRole.Editor, UserRole.Admin, UserRole.SuperAdmin)
  async adminIndex(@Req() req) {
    return {
      adminPageURL: '/',
    }
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
