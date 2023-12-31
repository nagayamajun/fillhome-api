import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwnerModule } from './owner/owner.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { RentalHouseModule } from './rental-house/rental-house.module';
import { PhotoModule } from './photo/photo.module';
import { MansionModule } from './mansion/mansion.module';
import { MansionRoomModule } from './mansion-room/mansion-room.module';
import { ReservationModule } from './reservation/reservation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
  }), OwnerModule, AuthModule, RentalHouseModule, PhotoModule, MansionModule, MansionRoomModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
