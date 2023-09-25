import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMansionRoomInput } from './dto/create-mansion-room-input';

@Injectable()
export class MansionRoomService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

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
