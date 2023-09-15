import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('/')
    getUser(@Req() req: Request) {
        return this.userService.findOne(req['user'].userId);
    }

}