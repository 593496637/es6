import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, MaxLength, ValidateIf } from 'class-validator';
import { Trim } from '../../../common/decorators/trim.decorator';

export class UpdateProjectDto {
  @ApiPropertyOptional({ example: '深入学习 NestJS' })
  @Trim()
  @ValidateIf((_object, value: unknown) => value !== undefined)
  @IsString()
  @Length(2, 100)
  name?: string;

  @ApiPropertyOptional({
    example: '完成课程并编写自己的 API',
    nullable: true,
  })
  @Trim()
  @ValidateIf(
    (_object, value: unknown) => value !== undefined && value !== null,
  )
  @IsString()
  @MaxLength(1000)
  description?: string | null;
}
