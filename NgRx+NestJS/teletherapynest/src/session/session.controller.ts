import { Controller, Get, UseGuards, Request, Body, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SessionDTO } from './session.dto';

@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {}

    @Get('getSessions')
    @UseGuards(JwtAuthGuard)
    async getSessionsForUser(@Request() req){
        return await this.sessionService.getSessionsForUser(req.user.userId, req.user.role);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('createSession')
    async createSession(@Body() sesDTO: SessionDTO){
        return await this.sessionService.createSession(sesDTO);
    }

    @UseGuards(JwtAuthGuard)
    @Post('signup')
    async signUpForSession(@Body() ids){
        return await this.sessionService.signUpForSession(ids.sessionId, ids.userId);
    }
}
