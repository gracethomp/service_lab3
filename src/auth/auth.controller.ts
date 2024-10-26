import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

export class SignInResponseDto {
  access_token: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Авторизація користувача' })
  @ApiResponse({
    status: 200,
    description: 'Успішна авторизація',
    type: SignInResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Невірні дані',
  })
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
