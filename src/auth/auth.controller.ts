import { Controller, Post, Get, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() postReq) {
        console.log(postReq)
        return this.authService.login(postReq.username, postReq.password)
    }

    @Get('profile')
    async profile(@Request() req, @Body() postReq){
        console.log('-------')
        console.log(req.userId)
        return {} ;
    }
}
