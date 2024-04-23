import { Datetime } from "aws-sdk/clients/costoptimizationhub";
import { isEmpty, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class UploadDto {
    id: string;

    @IsNotEmpty()
    @IsString()
    external_reference: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    createat: Datetime;
    updatedat: Datetime;
  }
  