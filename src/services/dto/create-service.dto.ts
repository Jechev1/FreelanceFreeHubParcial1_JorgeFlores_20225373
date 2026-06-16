import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Diseño de logo profesional' })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Diseño', enum: ['Diseño', 'Desarrollo', 'Marketing', 'Redacción'] })
  @IsString()
  category: string;

  @ApiProperty({ example: 'Incluye 3 propuestas, revisiones ilimitadas y archivos editables.' })
  @IsString()
  @MinLength(10)
  description: string;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @IsPositive()
  price: number;
}
