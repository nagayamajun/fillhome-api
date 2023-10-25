import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRentalHouseInput } from './dto/create-rental-house-input';
import { PrismaPromise, RentalHouse } from '@prisma/client';
import { EditRentalHoseSystemInput } from './dto/edit-rental-house-system-input';

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
  };

  findSearch({ search, offset, limit }: {search?: string, offset: number, limit: number}): PrismaPromise<RentalHouse[]> {
    return this.prismaService.rentalHouse.findMany({
      where: {
        name: {
          contains: search
        } 
      },
      skip: offset,
      take: limit,
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
    })
  }

  findCount(search?: string) {
    return this.prismaService.rentalHouse.count({
      where: {
        name: {
          contains: search
        }
      }
    })
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

  edit(
    { id, input }: { id: string, input: EditRentalHoseSystemInput}
  ) {
    return this.prismaService.rentalHouse.update({
      where: { id },
      data: { ...input }
    })
  }
}

