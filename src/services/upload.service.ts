import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from '../domain/upload/upload.entity';
import { UploadDto } from '../model/upload.dto';
import { S3Service } from '../services/s3.service';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    public uploadRepository: Repository<Upload>,
    private readonly s3Service: S3Service,
  ) {}

  async uploadFile(uploadDto: UploadDto, file: any): Promise<Upload> {
    const { external_reference } = uploadDto;
    let existingUpload: Upload | undefined;
    const filePath = `uploads/${external_reference}_${file.originalname}`;
    const s3Path = await this.s3Service.uploadFile(file.buffer, filePath);

    try {
      existingUpload = await this.uploadRepository.findOneOrFail({ where: { external_reference } });
    } catch (error) {
    }

    if (existingUpload) {
      existingUpload.updatedat = new Date();
      return this.uploadRepository.save(existingUpload);
    } else {
     
      const upload = new Upload();
      upload.external_reference = external_reference;
      upload.filePath = s3Path;
      upload.type = uploadDto.type; 
      return this.uploadRepository.save(upload);
    }
  }
}
