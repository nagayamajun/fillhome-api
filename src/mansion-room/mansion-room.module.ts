import { Module } from '@nestjs/common';
import { MansionRoomController } from './mansion-room.controller';
import { MansionRoomService } from './mansion-room.service';
import { PrismaService } from 'src/prisma.service';
import { OwnerService } from 'src/owner/owner.service';
import { CreateMansionRoom } from 'src/mansion-room/use-case/create-mansion-room';
import { MansionService } from 'src/mansion/mansion.service';
import { PhotoService } from 'src/photo/photo.service';

@Module({
  controllers: [MansionRoomController],
  providers: [
    MansionRoomService,
    PrismaService,
    OwnerService,
    CreateMansionRoom,
    MansionService,
    PhotoService,
  ]
})
export class MansionRoomModule {}
