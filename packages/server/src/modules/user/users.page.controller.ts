import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    Res,
    HttpStatus,
    Render,
} from '@nestjs/common';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersPageController {
    constructor(
        private readonly usersService: UserService,
    ) { }

    @Get('signup')
    @Render('pages/signup')
    async signup() {
        return {
            a: 0
        };
    }

    @Get('signin')
    @Render('pages/signin')
    async signin() {
        return {

        };
    }
}
