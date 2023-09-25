import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { MansionRoomService } from './mansion-room.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateMansionRoom } from 'src/mansion-room/use-case/create-mansion-room';
import { OwnerAuth, OwnerAuthParam } from 'src/auth/decorators/owner-auth.decorator';
import { CreateMansionRoomSystemInput } from './dto/create-mansion-room-system-input';

@Controller('mansion-room')
export class MansionRoomController {
  constructor(
    private readonly mansionRoomService: MansionRoomService,
    private readonly createMansionRoom: CreateMansionRoom,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/create/:mansion_id')
  async create(
    @Param('mansion_id') mansion_id: string,
    @Body() input: CreateMansionRoomSystemInput
  ) {
    return this.createMansionRoom.handle({input, mansion_id});
  }

}
