import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ThrottlerGuard } from '@nestjs/throttler';


@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('token')
  async generateToken() {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_ISSUER = process.env.JWT_ISSUER;
    const JWT_EXPIRE = process.env.JWT_EXPIRE;
    const payload = {
    };
    const options = {
      expiresIn: JWT_EXPIRE, 
      issuer: JWT_ISSUER
    };
    const token = this.jwtService.sign(payload, { secret: JWT_SECRET, ...options });
    return { token };
  }
}
