import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from '../routes/search.controller';
import { NotFoundException } from '@nestjs/common';
import { SearchService } from '../services/search.service';
import { SearchDto } from '../model/search.dto';
import { Upload } from '../domain/upload/upload.entity'; // Importe o modelo Upload
import { JwtService } from '@nestjs/jwt'; // Importe o JwtService


describe('SearchController', () => {
  let controller: SearchController;
  let searchService: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: {
            findByexternal_reference: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {}, // Aqui você pode passar um objeto vazio ou configurar um mock
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    searchService = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('search', () => {
    it('should return search results', async () => {
      const mockResult: Upload[] = [
        // Simule resultados válidos
        { id: '',external_reference: '123',type:'', filePath: 'example.pdf', createat: new Date(), updatedat: new Date() }
      ];
      const mockSearchDto: SearchDto = { external_reference: '123' };
      jest.spyOn(searchService, 'findByexternal_reference').mockResolvedValue(mockResult);

      const result = await controller.search(null, mockSearchDto);

      expect(result).toEqual(mockResult);
    });

    // Outros casos de teste...
  });
});
