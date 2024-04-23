import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('generateToken', () => {
    it('should generate token successfully', async () => {
      const mockToken = 'mockedToken';
      jest.spyOn(jwtService, 'sign').mockReturnValue(mockToken);

      const result = await controller.generateToken();

      expect(result).toEqual({ token: mockToken });
    });
  });
});
