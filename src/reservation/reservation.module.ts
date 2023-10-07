import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { CreateReservation } from './use-case/create-reservation';
import { CheckDateInAvailableDates } from './policy/check-date-in-available-dates';
import { PrismaService } from 'src/prisma.service';
import { MansionRoomService } from 'src/mansion-room/mansion-room.service';

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationService,
    CreateReservation,
    CheckDateInAvailableDates,
    PrismaService,
    MansionRoomService
  ]
})
export class ReservationModule {}
