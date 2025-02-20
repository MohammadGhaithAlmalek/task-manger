import { loginDto } from './dto/login.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from './types';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: loginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...safeUser } = user;
    const payload = { email: safeUser.email, sub: safeUser.id };
    return { user: safeUser, accessToken: this.jwtService.sign(payload) };
  }
}
