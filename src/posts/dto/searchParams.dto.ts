import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  body?: string | null;
}
