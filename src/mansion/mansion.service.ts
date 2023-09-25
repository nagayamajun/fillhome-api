import { Injectable } from '@nestjs/common';
import { Mansion, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MansionService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  create(
    rental_house_id: string
  ): PrismaPromise<Mansion> {
    return this.prismaService.mansion.create({
      data: { rental_house_id }
    })
  }
}
