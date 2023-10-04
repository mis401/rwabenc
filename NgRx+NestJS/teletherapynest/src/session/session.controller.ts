import { Controller, Get, UseGuards, Request, Body, Post, Param } from '@nestjs/common';
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

    @Get('getSession/:id')
    @UseGuards(JwtAuthGuard)
    async getSession(@Param('id') id: number) {
        return await this.sessionService.getSession(id);
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

    @UseGuards(JwtAuthGuard)
    @Post('cancel')
    async cancelSession(@Body('sessions') sessions: number[], @Body('userId') userId: number){
        return await this.sessionService.cancelSession(sessions, userId);
    }
}
