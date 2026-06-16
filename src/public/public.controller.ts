import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServicesService } from 'src/services/services.service';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('services')
  @ApiOperation({ summary: 'Listar todos los servicios disponibles (sin autenticación)' })
  @ApiResponse({ status: 200, description: 'Lista de servicios con nombre del freelancer.' })
  findAll() {
    return this.servicesService.findAll();
  }
}
