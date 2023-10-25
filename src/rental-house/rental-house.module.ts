import { Module } from '@nestjs/common';
import { RentalHouseController } from './rental-house.controller';
import { RentalHouseService } from './rental-house.service';
import { PrismaService } from 'src/prisma.service';
import { PhotoService } from 'src/photo/photo.service';
import { CreateRentalHouse } from './use-case/create-rental-house';
import { OwnerService } from 'src/owner/owner.service';
import { MansionService } from 'src/mansion/mansion.service';
import { SearchRentalHouseUseCase } from './use-case/search-rental-house';
import { EditRentalHouseUseCase } from './use-case/edit-rental-house-use-case';

@Module({
  controllers: [RentalHouseController],
  providers: [
    RentalHouseService,
    PrismaService,
    PhotoService,
    CreateRentalHouse,
    OwnerService,
    MansionService,
    SearchRentalHouseUseCase,
    EditRentalHouseUseCase
  ]
})
export class RentalHouseModule {}
