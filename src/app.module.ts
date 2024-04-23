import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './routes/upload.controller';
import { AuthController } from './auth/auth.controller'; 
import * as dotenv from 'dotenv';
import { UploadService } from './services/upload.service';
import { S3Service } from '../src/services/s3.service';
import { Upload } from './domain/upload/upload.entity'; // Importe a entidade Upload
import { SearchController } from './routes/search.controller';
import { SearchService } from './services/search.service';
import { VerifyFileService } from './services/verifyFile.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { LoggerMiddleware } from './middleware/LoggerMiddleware';



dotenv.config();

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'medium',
        ttl: 10000,
        limit: 20
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100
      }
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRE) || 3600 },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,  
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }), 
    TypeOrmModule.forFeature([Upload]), // Registre a entidade Upload aqui
  ],
  controllers: [
    AuthController,
    UploadController,
    SearchController
  ],
  providers: [
    S3Service,
    UploadService,
    SearchService,
    VerifyFileService,
    ThrottlerGuard,
    
    
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
