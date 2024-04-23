// src/models/search.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  external_reference: string;
}
