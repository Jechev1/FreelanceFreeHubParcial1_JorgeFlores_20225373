import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login con email y password — retorna JWT' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Login exitoso. Retorna access_token y datos del usuario.' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}
