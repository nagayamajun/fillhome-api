import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { CreateReservation } from './use-case/create-reservation';

@Controller('reservation')
export class ReservationController {
  constructor(
    private readonly createReservation: CreateReservation
  ) {}

  @Post('/:mansion_room_id')
  async create(
    @Param('mansion_room_id') mansion_room_id: string,
    @Body() input: CreateReservationInput
  ) {
    return await this.createReservation.handle({input, mansion_room_id})
  }
}
