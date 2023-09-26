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
    input: any, //ここをCreateMansionRoomInputで指定するとエラーが出る
    mansion_id: string
  ) {
    return this.prismaService.mansionRoom.create({data: {...input, mansion_id}})
  }

  delete(id: string) {
    return this.prismaService.mansionRoom.delete({ where: { id } })
  }
}
