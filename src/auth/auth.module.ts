import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OwnerService } from 'src/owner/owner.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { AuthUtil } from './auth.util';
import { SignupOwnerWithEmail } from './use-case/signup-owner-with-email';
import { CreateOwner } from 'src/owner/use-case/create-owner';
import { CreateOwnerPolicy } from 'src/owner/policy/create-owner-policy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthUtil,
    PrismaService,
    OwnerService,
    JwtService,
    SignupOwnerWithEmail,
    CreateOwner,
    CreateOwnerPolicy
  ]
})
export class AuthModule {}
