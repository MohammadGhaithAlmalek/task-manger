import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { authConstants } from './auth.constant';
import { JwtTokenPayload } from './auth.interface';
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 1.
      ignoreExpiration: false, // 2.
      secretOrKey: authConstants.secret, // 3.
    });
  }
  validate(payload: { sub: number; email: string }): JwtTokenPayload {
    return { userId: Number(payload.sub), email: payload.email };
  }
}
