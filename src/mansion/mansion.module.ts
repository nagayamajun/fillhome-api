import { Module } from '@nestjs/common';
import { MansionService } from './mansion.service';
import { PrismaService } from 'src/prisma.service';
import { MansionRoomService } from 'src/mansion-room/mansion-room.service';
import { PhotoService } from 'src/photo/photo.service';

@Module({
  providers: [
    MansionService,
    PrismaService,
    MansionRoomService,
    PhotoService
  ]
})
export class MansionModule {}
