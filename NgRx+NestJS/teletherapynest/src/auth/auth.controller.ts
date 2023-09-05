import { Body, Controller, HttpCode, HttpStatus, HttpVersionNotSupportedException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { CreateUserDTO } from 'src/user/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async logIn(@Request() req) {
        console.log("Logging in");
        return await this.authService.login(req.user);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() newUser: CreateUserDTO) {
        return await this.authService.register(newUser);
    }
}
