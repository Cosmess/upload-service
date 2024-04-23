import { Controller, Get, UseGuards, Req, Query, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SearchService } from '../services/search.service';
import { S3Service } from '../services/s3.service';
import { SearchDto } from '../model/search.dto';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly s3Service: S3Service,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async search(@Req() req, @Query() searchDto: SearchDto) {

    if (!searchDto.external_reference) {
        throw new NotFoundException('Arquivo não encontrado!');
    }

    const result = await this.searchService.findByexternal_reference(searchDto.external_reference);

    if (result.length > 0) {
        
        const fileUrl = await this.s3Service.getFileUrl(result[0].filePath);
        const updatedResult = result.map(item => ({
          ...item,
          fileUrl: fileUrl
        }));
        
        return updatedResult; 
    } else {
        throw new NotFoundException('Arquivo não encontrado!');
    }
  }
}
