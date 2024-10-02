import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import {UserRepository} from "../user/repositories/user.repository";
import { ExtractJwt, Strategy } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor(
      private readonly userRepository: UserRepository,
      private readonly configService: ConfigService,  
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), // Ensure JWT_SECRET is defined
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne(payload.sub);  
    if (!user) {
      throw new UnauthorizedException();  
    }
    return user;  
  }
}

