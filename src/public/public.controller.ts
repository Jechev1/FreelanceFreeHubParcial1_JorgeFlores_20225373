import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServicesService } from 'src/services/services.service';

@ApiTags('public')
@Controller('public')
export class PublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('services')
  @ApiOperation({ summary: 'Listar todos los servicios disponibles (sin autenticación)' })
  findAll() {
    return this.servicesService.findAll();
  }
}
