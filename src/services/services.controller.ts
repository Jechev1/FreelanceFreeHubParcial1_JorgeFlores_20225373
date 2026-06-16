import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServicesService } from './services.service';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Publicar un nuevo servicio freelance (requiere JWT)' })
  @ApiBody({ type: CreateServiceDto })
  @ApiResponse({ status: 201, description: 'Servicio creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos en el body.' })
  @ApiResponse({ status: 401, description: 'Token JWT no proporcionado o inválido.' })
  createService(@Req() req: any, @Body() body: CreateServiceDto) {
    return this.servicesService.create(body, req.user.id);
  }
}
