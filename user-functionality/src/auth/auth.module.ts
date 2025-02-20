import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constant';
import { JWTStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JWTStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: {
        // 1.
        expiresIn: '1d',
      },
    }),
  ],
})
export class AuthModule {}
