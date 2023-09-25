import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRentalHouseInput } from './dto/create-rental-house-input';
import { PrismaPromise, RentalHouse } from '@prisma/client';

@Injectable()
export class RentalHouseService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  findAll(): PrismaPromise<RentalHouse[]> {
    return this.prismaService.rentalHouse.findMany();
  }

  findAllByOwner(owner_id: string): PrismaPromise<RentalHouse[]> {
    return this.prismaService.rentalHouse.findMany({
      where: {
        owner_id
      },
      include: {
        rental_house_photos: {
          select: {
            id: true,
            image : true
          }
        },
        mansion: true
      }
    })
  }

  //リファクタ: ネストが深すぎるからuse-caseに切り分ける
  findOneWithRooms(id: string) {
    return this.prismaService.rentalHouse.findUnique({
      where: { id },
      include: {
        rental_house_photos: true,
        mansion: {
          include: {
            mansion_rooms: {
              include: {
                mansion_room_photos: true
              }
            }
          }
        }
      },
    })
  }

  create(
    // input: CreateRentalHouseInput & { owner_id: string }
    // owner_id: string,
    input: any //型後で作る
  ): PrismaPromise<RentalHouse> {
    return this.prismaService.rentalHouse.create({ data: input })
  };

  delete(id: string) {
    return this.prismaService.rentalHouse.delete({ where: { id } })
  }
}
