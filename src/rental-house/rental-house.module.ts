import { Module } from '@nestjs/common';
import { RentalHouseController } from './rental-house.controller';
import { RentalHouseService } from './rental-house.service';
import { PrismaService } from 'src/prisma.service';
import { PhotoService } from 'src/photo/photo.service';
import { CreateRentalHouse } from './use-case/create-rental-house';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OwnerService } from 'src/owner/owner.service';

@Module({
  controllers: [RentalHouseController],
  providers: [
    RentalHouseService,
    PrismaService,
    PhotoService,
    CreateRentalHouse,
    OwnerService
  ]
})
export class RentalHouseModule {}
