import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignInResponseDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async signIn(gmail: string, pass: string): Promise<SignInResponseDto> {
    const user = await this.usersService.findByEmail(gmail);
    const isPassportCorrect = await this.checkPassword(pass, user.password);
    if (!isPassportCorrect) {
      throw new UnauthorizedException();
    }
    const payload = { user: user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
