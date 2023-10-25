import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { CreateReservation } from './use-case/create-reservation';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
// import { OwnerAuth } from 'src/auth/decorators/owner-auth.decorator';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly createReservation: CreateReservation,
    // private readonly roomService
  ) {}

  @Post('/:mansion_room_id')
  async create(
    @Param('mansion_room_id') mansion_room_id: string,
    @Body() input: CreateReservationInput
  ) {
    return await this.createReservation.handle({input, mansion_room_id})
  }

  // @UseGuards(AuthGuard)
  // @Get('/owner')
  // async findByBelongToOwner(
  //   @OwnerAuth() { owner }
  // ) {
  //   return await this
  // }
}
