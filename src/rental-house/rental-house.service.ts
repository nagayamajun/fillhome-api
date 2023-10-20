import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRentalHouseInput } from './dto/create-rental-house-input';
import { PrismaPromise, RentalHouse } from '@prisma/client';
import { MansionRoomWithPhotoEntity } from 'src/mansion-room/entities/mansion-room-with-photo.entity';

@Injectable()
export class RentalHouseService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  findAll(): PrismaPromise<RentalHouse[]> {
    return this.prismaService.rentalHouse.findMany({
      include: {
        rental_house_photos: {
          select: {
            id: true,
            image: true
          }
        },
        mansion: {
          include: {
            mansion_rooms: {
              include: {
                mansion_room_photos: true
              }
            }
          }
        }
      }
    });
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

  findOne(id: string) {
    return this.prismaService.rentalHouse.findUnique({ 
      where: { id },
      include: {
        rental_house_photos: {
          select: {
            id: true,
            image: true
          }
        },
        mansion: true
      }
    })
  }

  create(
    {input, owner_id}: {input: CreateRentalHouseInput, owner_id: string} 
  ): PrismaPromise<RentalHouse> {
    return this.prismaService.rentalHouse.create({ data: {...input, owner_id} })
  };

  delete(id: string) {
    return this.prismaService.rentalHouse.delete({ where: { id } })
  }
}

