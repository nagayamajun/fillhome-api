import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PhotoService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  createWithRentalHouse(
    input: { rental_house_id: string, image: string }
  ) {
    return this.prismaService.photo.create({ data: input })
  }
}
