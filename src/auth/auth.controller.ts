import { Body, Controller, Post } from '@nestjs/common';
import { SignupOwnerWithEmail } from './use-case/signup-owner-with-email';
import { CreateOwnerSystemInput } from 'src/owner/dto/create-owner.system-input';
import { OwnerWithTokenEntity } from './entities/OwnerWithToken.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signupOwnerWithEmail: SignupOwnerWithEmail
  ) {}

  @Post('signup')
  async signup(
    @Body() input: CreateOwnerSystemInput
  ): Promise<OwnerWithTokenEntity> {
    return await this.signupOwnerWithEmail.handle(input);
  }
}