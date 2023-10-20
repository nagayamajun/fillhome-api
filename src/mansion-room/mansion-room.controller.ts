import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MansionRoomService } from './mansion-room.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateMansionRoom } from 'src/mansion-room/use-case/create-mansion-room';
import { CreateMansionRoomSystemInput } from './dto/create-mansion-room-system-input';
import { FindRoomWithRentalHouse } from './use-case/find-room-with-rental-house';
import { MansionRoomEntity } from './entities/mansion-room.entity';

@Controller('mansion-room')
export class MansionRoomController {
  constructor(
    private readonly mansionRoomService: MansionRoomService,
    private readonly createMansionRoom: CreateMansionRoom,
    private readonly findRoomWithRentalHouse: FindRoomWithRentalHouse
  ) {}

  @Get('/:id')
  async findOne(
    @Param('id') id: string
    ): Promise<MansionRoomEntity> {
    const data = await this.mansionRoomService.findOneWithPhoto(id);
    return data
  }

  //roomとその親に当たるrental_houseを取得する。
  @Get('/rental-house/:rental_house_id/room/:id')
  async findRoomAndRentalHouse(
    @Param('rental_house_id') rental_house_id: string,
    @Param('id') id: string,
  ) {
    return await this.findRoomWithRentalHouse.handle({
      rental_house_id: rental_house_id,
      room_id: id
    });
  }

  @UseGuards(AuthGuard)
  @Post('/create/:mansion_id')
  async create(
    @Param('mansion_id') mansion_id: string,
    @Body() input: CreateMansionRoomSystemInput
  ): Promise<{id: string}> {
    return await this.createMansionRoom.handle({input, mansion_id});
  }

}
