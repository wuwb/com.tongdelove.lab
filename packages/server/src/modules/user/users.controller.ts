import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    Query,
    ForbiddenException,
    Delete,
    UseGuards,
    Request,
    Logger,
    ValidationPipe,
    NotFoundException,
    Patch,
    Req,
} from '@nestjs/common';
import axios from 'axios';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { UserDecorator } from '@/common/decorators/user.decorator';
import { UserConstants } from '@/common/constants';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/processors/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Prisma, User } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@ApiTags('user')
@Controller('api/user')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {
    }

    // jwt 登录后获取用户信息
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        this.logger.debug('-------------------');
        this.logger.debug('req.user: ', req.user);
        this.logger.debug('-------------------');
        return req.user;
    }

    async add(@Body() dto: CreateUserDto): Promise<void> {
        await this.userService.tcreate(dto);
    }

    @Post()
    async create(@Body() data: Prisma.UserCreateInput): Promise<User> {
        return await this.userService.create({
            data,
            select: {
                createdAt: true,
                firstName: true,
                id: true,
                lastName: true,
                roles: true,
                updatedAt: true,
            }
        });
    }

    @Get()
    async findMany(@Query() query): Promise<User[]> {
        return this.userService.findMany({
            ...query,
            select: {
                createdAt: true,
                firstName: true,
                id: true,
                lastName: true,
                roles: true,
                updatedAt: true,
            },
        });
    }

    @Get('/:id')
    async getUser(@Param('id') id: string) {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Get('/:id/votes')
    getVotes(
        @Param('username') username,
        @Query() query: {
            skip: number,
            voteType: 'up' | 'down'
        },
    ) {
        // return this.userService.getVotes({
        //     username,
        //     query,
        // });
    }

    @Delete(':/id')
    removeUser(@Param('id') id: string) {
        return this.userService.removeById(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.updateById(id, body);
    }

    // @Post('users')
    // public async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    //     const users = await this.userService.addUser(createUserDTO);
    //     return res.status(HttpStatus.OK).json(createUserDTO);
    // }

    // @Get()
    // @UseGuards(AuthGuard('bearer'))
    // @Render('index.njk')
    // async findAll() {
    //     return this.userService.getUsers();
    // }

    // @Get(':id')
    // findOne(@Param('id', new ParseIntPipe()) id) {
    //     // return new Users({
    //     //     id: 1,
    //     //     firstName: 'Wenbin',
    //     //     lastName: 'Test',
    //     //     password: 'password',
    //     //     role: new RoleEntity({
    //     //         id: 1,
    //     //         name: 'admin',
    //     //     }),
    //     // });
    // }

    // @Post('users')
    // public async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    //     const users = await this.userService.addUser(createUserDTO);
    //     return res.status(HttpStatus.OK).json(createUserDTO);
    // }
    @Get('/signup')
    async getSignupPage(@UserDecorator() user, @Res() res) {
        console.log('user: ', user);
        if (user) {
            // 如果已登录，那么跳到首页
            // todo redirect to redirect url
            res.redirect('/');
            return;
        }
        return res.render('pages/signup');
    }

    @Get('/signin')
    async getSigninPage(@UserDecorator() user, @Query() query, @Res() res) {
        if (user) {
            res.redirect('/');
            return;
        }
        let ref = query.ref || '/';
        ref = encodeURIComponent(ref);
        return res.render('pages/signin', {
            loginReferer: ref,
            captchaDisabled: this.configService.get('geetestCaptcha.disabled'),
        });
    }

    // github

    @Get('/signin/github')
    async githubSign(@Res() res) {
        const authorizeURL = this.configService.get('github.authorizeURL');
        const clientID = this.configService.get('github.clientID');
        res.status(302);
        // res.redirect(util.format(authorizeURL, clientID));
    }

    @Get('/signup/github')
    async githubSiup(@Res() res) {
        const authorizeURL = this.configService.get('github.authorizeURL');
        const clientID = this.configService.get('github.clientID');
        res.status(302);
        // res.redirect(util.format(authorizeURL, clientID));
    }

    @Get('/auth/github/callback')
    async githubAuthCallback(@Query('code') code: string, @Res() res) {
        if (!code) {
            // throw new MyHttpException({
            //   errorCode: ErrorCode.Forbidden.CODE,
            // });
            throw new ForbiddenException();
        }
        const result = await axios.post(
            this.configService.get('github.accessTokenURL', ''),
            {
                client_id: this.configService.get('github.clientID'),
                client_secret: this.configService.get('github.clientSecret'),
                code,
            },
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );

        // if (!(result.status === 200) && !result.data.error)) {
        //   res.status(302);
        //   res.redirect('/signup');
        //   return;
        // }
        // const urlData = url.parse(userResult.data.avatar_url);
        // const pathname = path.join('/avatar/github/', urlData.pathname);
        // const avatarURL: string = await this.ossService.uploadFromStreamURL(userResult.data.avatar_url, pathname);
        //
        // const user: User = await this.userService.upsertGithubUser(userResult.data, avatarURL);
        // await this.setToken(res, user);
        res.status(302);
        res.redirect('/');
    }



    // 模糊查询
    @Get('/fuzzy')
    async fuzzyQueryByUsername(@Query('usernmae') username: string) {
        if (!username) {
            return [];
        }
        if (username.length > UserConstants.USERNAME_MAX_LENGTH) {
            username = username.slice(0, UserConstants.USERNAME_MAX_LENGTH);
        }
        //
    }

    @Get('/search')
    searchUserByUsername(@Query('seawrchValue') searchValue: string) {
        // return this.userService.searchUserByUsername({ searchValue });
    }





    // @Get(':id')
    // getUser(
    //   @Param('id', ParseObjectIdPipe) id: string,
    //   @Query(withPosts, new DefaultValuePipe(false)) withPosts?: boolean
    // ) {
    //   return this.userService.user(id, withPosts);
    // }

    // 用户关注了那些人
    @Get('/:id/follows')
    async userFollows(
        @CurrentUser() user,
        @Param('id') id: string,
    ) {
        //
    }

    // 用户有哪些粉丝
    @Get('/:id/followers')
    async userFollowers(
        @CurrentUser() user,
        @Param('userId') userId: string,
    ) {
        // 判断用户是否不存在，
        // 不存在报错
    }

    // 更新用户信息

    // 删除关注

    // 退出
    @Delete('/signout')
    async signout(@CurrentUser() user) {
        if (!user) {
            return {};
        }
        // redis 中删除 token 和 user 信息
        await Promise.all([]);
        return {};
    }

    // 用户的登录信息
    @UseGuards(AuthGuard('jwt'))
    @Get('/logininfo')
    async loginUserInfo(@CurrentUser() user) {
        this.logger.debug('-------------------');
        this.logger.debug('user: ', user);
        this.logger.debug('-------------------');
        return user;
    }


}
