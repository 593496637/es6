import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: '完成第 14 课' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title!: string;
}
