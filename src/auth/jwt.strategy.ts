import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as dayjs from 'dayjs';

type JwtPayloadType = {
  userId: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    await this.userService.reportUserActiveForMonth(
      payload.sub,
      dayjs().month() + 1,
      dayjs().year(),
    );
    return { userId: payload.sub, email: payload.email } as JwtPayloadType;
  }
}

export { JwtPayloadType };
