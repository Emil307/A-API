import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchParamsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search?: string | null;
}
