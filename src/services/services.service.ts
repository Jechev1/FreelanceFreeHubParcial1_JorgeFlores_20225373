import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateServiceDto, userId: number): Promise<Service> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const service = this.serviceRepository.create({
      ...dto,
      provider: user,
    });

    return this.serviceRepository.save(service);
  }

  async findAll(): Promise<{ id: number; title: string; category: string; price: number; freelancer: string }[]> {
    const services = await this.serviceRepository.find();

    return services.map((s) => ({
      id: s.id,
      title: s.title,
      category: s.category,
      price: Number(s.price),
      freelancer: s.provider.name,
    }));
  }
}
