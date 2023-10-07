import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PrismaPromise } from '@prisma/client';
import { OwnerEntity } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';

@Injectable()
export class OwnerService {
  constructor(private readonly prismaService: PrismaService) {}

  findByEmail(email: string): PrismaPromise<OwnerEntity> {
    return this.prismaService.owner.findFirst({ where: { email } })
  };

  findByFirebaseUid(firebase_uid: string): PrismaPromise<OwnerEntity> {
    return this.prismaService.owner.findFirst({where: { firebase_uid }})
  };

  create(
    input : CreateOwnerInput
  ): PrismaPromise<OwnerEntity> {
    return this.prismaService.owner.create({data: input});
  };
}
