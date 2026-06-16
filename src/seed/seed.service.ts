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
      { email: 'carlos@freelance.com', name: 'Carlos Ramírez', password: '1234' },
      { email: 'ana@freelance.com', name: 'Ana Gómez', password: '1234' },
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
        title: 'Diseño de banner para redes sociales',
        category: 'Diseño',
        description: 'Pack de 5 banners para Instagram, Facebook y Twitter en formato editable.',
        price: 80,
        provider: users[0],
      },
      {
        title: 'Redacción de artículos SEO',
        category: 'Redacción',
        description: 'Artículo de 1000 palabras optimizado para SEO con palabras clave definidas.',
        price: 50,
        provider: users[1],
      },
      {
        title: 'Gestión de redes sociales',
        category: 'Marketing',
        description: 'Manejo de Instagram y Facebook con 3 publicaciones semanales y reporte mensual.',
        price: 120,
        provider: users[1],
      },
      {
        title: 'Traducción inglés - español',
        category: 'Redacción',
        description: 'Traducción profesional de documentos hasta 5000 palabras con entrega en 48h.',
        price: 60,
        provider: users[1],
      },
      {
        title: 'Desarrollo de API REST con NestJS',
        category: 'Desarrollo',
        description: 'Diseño e implementación de API REST con autenticación JWT, Swagger y PostgreSQL.',
        price: 500,
        provider: users[2],
      },
      {
        title: 'Automatización con Python',
        category: 'Desarrollo',
        description: 'Scripts de automatización para tareas repetitivas, reportes y scraping de datos.',
        price: 200,
        provider: users[2],
      },
      {
        title: 'Campaña de email marketing',
        category: 'Marketing',
        description: 'Diseño y envío de campaña por email con segmentación, plantilla y reporte de métricas.',
        price: 90,
        provider: users[3],
      },
      {
        title: 'Edición de video profesional',
        category: 'Diseño',
        description: 'Edición completa de video con efectos, música, subtítulos y exportación en 4K.',
        price: 250,
        provider: users[3],
      },
    ]);

    this.logger.log('Seed completado: 2 usuarios y 3 servicios creados');
  }
}
