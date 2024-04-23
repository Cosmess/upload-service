import { Controller, Post, UseInterceptors, UploadedFile, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../services/upload.service';
import { VerifyFileService } from '../services/verifyFile.service';
import { UploadDto } from '../model/upload.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly verifyfileService : VerifyFileService,
  ){}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: object, @Body() uploadDto: UploadDto) {

    try {
      await this.verifyfileService.verifyFile(file);
      const result = await this.uploadService.uploadFile(uploadDto, file);
      return { message: 'Upload realizado com sucesso', data: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } 
  } 
}
