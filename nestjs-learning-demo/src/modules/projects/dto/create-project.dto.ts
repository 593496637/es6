import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';
import { Trim } from '../../../common/decorators/trim.decorator';

export class CreateProjectDto {
  @ApiProperty({ example: '学习 NestJS' })
  @Trim()
  @IsString()
  @Length(2, 100)
  name!: string;

  @ApiPropertyOptional({
    example: '通过 TaskFlow 完成整套课程',
    nullable: true,
  })
  @Trim()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string | null;
}
