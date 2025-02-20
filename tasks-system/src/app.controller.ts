import { Controller, Get, Req, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGaurd } from './auth/jwt-guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('profile')
  @UseGuards(JwtAuthGaurd)
  getProfile(
    @Req()
    request,
  ) {
    return request.user;
  }
}
