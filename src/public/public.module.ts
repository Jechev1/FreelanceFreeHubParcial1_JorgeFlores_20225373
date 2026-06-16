import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { PublicController } from './public.controller';

@Module({
  imports: [ServicesModule],
  controllers: [PublicController],
})
export class PublicModule {}
