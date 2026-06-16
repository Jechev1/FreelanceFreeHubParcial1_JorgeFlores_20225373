import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Service } from 'src/services/service.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.userRepository.count();
    if (count > 0) return;

    const users = await this.userRepository.save([
      { email: 'juan@freelance.com', name: 'Juan Pérez', password: '1234' },
      { email: 'maria@freelance.com', name: 'María López', password: '1234' },
    ]);

    await this.serviceRepository.save([
      {
        title: 'Diseño de logo profesional',
        category: 'Diseño',
        description: 'Incluye 3 propuestas, revisiones ilimitadas y archivos editables en AI y PNG.',
        price: 150,
        provider: users[0],
      },
      {
        title: 'Desarrollo de landing page',
        category: 'Desarrollo',
        description: 'Landing page responsive con React, animaciones y formulario de contacto.',
        price: 300,
        provider: users[0],
      },
      {
        title: 'Redacción de artículos SEO',
        category: 'Redacción',
        description: 'Artículo de 1000 palabras optimizado para SEO con palabras clave definidas.',
        price: 50,
        provider: users[1],
      },
    ]);

    this.logger.log('Seed completado: 2 usuarios y 3 servicios creados');
  }
}
