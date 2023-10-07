import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservationService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  create(
    {input, mansion_room_id}: {input: any, mansion_room_id: string}
  ) {
    return this.prismaService.reservation.create({
      data: {...input, mansion_room_id}
    })
  }

  delete(
    id: string
  ) {
    return this.prismaService.reservation.delete({
      where: { id }
    })
  }
}
