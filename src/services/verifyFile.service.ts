import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MulterFile } from 'multer';
import { extname } from 'path';

@Injectable()
export class VerifyFileService {
  constructor() {}

  async verifyFile(file: MulterFile): Promise<void> {

     // Verifica o tipo do arquivo (PDF)
     const allowedExtensions = ['.pdf'];
     const fileExt = extname(file.originalname).toLowerCase();
     if (!allowedExtensions.includes(fileExt)) {
       throw new HttpException('Apenas arquivos PDF são permitidos', HttpStatus.BAD_REQUEST);
     }

     
    // Verifica o tamanho do arquivo (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new HttpException('O tamanho do arquivo excede o limite máximo (5MB)', HttpStatus.BAD_REQUEST);
    }
  }
}
