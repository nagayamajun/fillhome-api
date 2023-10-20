import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMansionRoomInput } from './dto/create-mansion-room-input';
import { PrismaPromise } from '@prisma/client';
import { MansionRoomWithPhotoEntity } from './entities/mansion-room-with-photo.entity';

@Injectable()
export class MansionRoomService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  findOne(
    id: string
  ) {
    return this.prismaService.mansionRoom.findUnique({
      where: { id }
    })
  }

  findOneWithPhoto(
    id: string
  ): PrismaPromise<MansionRoomWithPhotoEntity> {
    return this.prismaService.mansionRoom.findUnique({
      where: { id },
      include: {
        mansion_room_photos: {
          select: {
            id: true,
            image: true
          }
        }
      }
    })
  }

  create(
    input: CreateMansionRoomInput,
    mansion_id: string
  ) {
    return this.prismaService.mansionRoom.create({data: {...input, mansion_id}})
  }

  systemUpdate(
    {id, available_dates}: {id: string, available_dates: string[]}
  ) {
    return this.prismaService.mansionRoom.update({
      where: { id },
      data: { available_dates }
    })
  }

  delete(id: string) {
    return this.prismaService.mansionRoom.delete({ where: { id } })
  }
}
