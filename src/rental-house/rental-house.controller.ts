import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OwnerAuth, OwnerAuthParam } from 'src/auth/decorators/owner-auth.decorator';
import { CreateRentalHouse } from './use-case/create-rental-house';
import { CreateRentalHouseSystemInput } from './dto/create-rental-house-system-input';
import { RentalHouseService } from './rental-house.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Owner } from '@prisma/client';

@Controller('rental-house')
export class RentalHouseController {
  constructor( 
    private readonly rentalHouseService: RentalHouseService,
    private readonly createRentalHouse: CreateRentalHouse
  ) {}
  //rentalHouseを全件取得
  @Get()
  async findAll() {
    return this.rentalHouseService.findAll();
  }

  //ownerが持っているrentalHouseを全件取得
  @UseGuards(AuthGuard)
  @Get('/owner')
  async findAllByOwner(
    @OwnerAuth() { owner }
  ) {
    return this.rentalHouseService.findAllByOwner(owner.id);
  }

  //認証つきでrentalHouseとそこに紐つくroom全件取得


  //rentalHouseの作成
  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @OwnerAuth() { owner }: OwnerAuthParam,
    @Body() input: any
    // @Body() input: CreateRentalHouseSystemInput
  ): Promise<void> {
    return this.createRentalHouse.handle(input, owner.id)
  }
}
