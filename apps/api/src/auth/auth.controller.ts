import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class SignInDto {
  email: string;
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Sign in' })
  async login(@Body() dto: SignInDto) {
    return this.authService.signIn(dto.email, dto.password);
  }
}
