import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  @ApiProperty()
  body: string;

  @IsOptional()
  @ApiProperty()
  predecessorId?: number;
}
