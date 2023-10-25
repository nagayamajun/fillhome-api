import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OwnerAuth, OwnerAuthParam } from 'src/auth/decorators/owner-auth.decorator';
import { CreateRentalHouse } from './use-case/create-rental-house';
import { CreateRentalHouseSystemInput } from './dto/create-rental-house-system-input';
import { RentalHouseService } from './rental-house.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Params, SearchRentalHouseUseCase } from './use-case/search-rental-house';
import { EditRentalHouseInput } from './dto/edit-rental-house-input';
import { EditRentalHouseUseCase } from './use-case/edit-rental-house-use-case';

@Controller('rental-house')
export class RentalHouseController {
  constructor( 
    private readonly rentalHouseService: RentalHouseService,
    private readonly createRentalHouse: CreateRentalHouse,
    private readonly searchRentalHouseUseCase: SearchRentalHouseUseCase,
    private readonly editRentalHouseUseCase: EditRentalHouseUseCase
  ) {}
  //rentalHouseを全件取得
  @Get()
  async findAll() {
    return this.rentalHouseService.findAll();
  }

  // rentalHouseを検索条件に合わせて返す
  @Get('search')
  async findSearch(
    @Query() params: Params
  ) {
    return this.searchRentalHouseUseCase.handle(params);
  }

  //ownerが持っているrentalHouseを全件取得
  @UseGuards(AuthGuard)
  @Get('/owner')
  async findAllByOwner(
    @OwnerAuth() { owner }: OwnerAuthParam
  ) {
    return this.rentalHouseService.findAllByOwner(owner.id);
  }

  //認証つきでrentalHouseとそこに紐つくroom全件取得
  @UseGuards(AuthGuard)
  @Get(`/owner/:rental_house_id/rental-house-to-rooms`)
  async findOneWithRooms(
    @Param('rental_house_id') id: string
  ) {
    return this.rentalHouseService.findOneWithRooms(id);
  }

  //rentalHouseの作成
  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @OwnerAuth() { owner }: OwnerAuthParam,
    @Body() input: CreateRentalHouseSystemInput
  ): Promise<{id: string}> {
    return this.createRentalHouse.handle(input, owner.id)
  }

  @UseGuards(AuthGuard)
  @Put(":rental_house_id")
  async edit(
    @Param('rental_house_id') rental_house_id: string,
    @Body() input: EditRentalHouseInput
  ) {
    return await this.editRentalHouseUseCase.handle({id: rental_house_id, input })
  }

  @UseGuards(AuthGuard)
  @Delete(':rental_house_id')
  async delete(
    @Param('rental_house_id') rental_house_id: string
  ) {
    return await this.rentalHouseService.delete(rental_house_id);
  }
}
