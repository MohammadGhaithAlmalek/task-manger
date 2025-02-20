import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly UsersService: UsersService,
    private AuthService: AuthService,
  ) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.UsersService.create(createUserDto);
  }
  @Post('login')
  login(@Body() loginDto: loginDto) {
    return this.AuthService.login(loginDto);
  }
}
