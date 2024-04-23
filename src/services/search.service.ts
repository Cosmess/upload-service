// search.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from '../domain/upload/upload.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadRepository: Repository<Upload>,
  ) {}

  async findByexternal_reference(external_reference: string): Promise<Upload[]> {
    return this.uploadRepository.find({ where: { external_reference } });
  }
}

export class searchService  {}