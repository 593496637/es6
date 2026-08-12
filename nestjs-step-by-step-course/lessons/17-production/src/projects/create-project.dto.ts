import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'NestJS 学习项目' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;
}
