import {Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
 
 
import * as bcrypt from 'bcrypt';
import {User} from "../schemas/user.schema";
import {UserRepository} from "../user/repositories/user.repository";
 

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string) {

    const user = await this.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(username: string, password: string): Promise<User> {
    const userExists = await this.userRepository.findByUsername(username);
    if (userExists) throw new UnauthorizedException();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user= new User();
    user.username=username;
    user.password = hashedPassword;
    return this.userRepository.create(user);
  }
}
