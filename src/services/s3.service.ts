import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });
  }

  async uploadFile(file: any, filePath: string): Promise<string> {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: filePath,
      Body: file,
    };

    const { Key } = await this.s3.upload(params).promise();
    return Key;
  }

  async getFileUrl(filePath: string): Promise<string> {
    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: filePath,
    };

    // Obter o URL assinado do arquivo no S3 válido por 1 hora
    const url = await this.s3.getSignedUrlPromise('getObject', params);

    return url;
  }
}