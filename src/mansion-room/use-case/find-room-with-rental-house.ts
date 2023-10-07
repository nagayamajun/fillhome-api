import { RentalHouseService } from "src/rental-house/rental-house.service";
import { MansionRoomService } from "../mansion-room.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindRoomWithRentalHouse {
  constructor(
    private readonly mansionRoomService: MansionRoomService,
    private readonly rentalHouseService: RentalHouseService
  ) {}

  async handle(
    { rental_house_id, room_id }: { rental_house_id: string, room_id: string }
  ) {
    //rental-house取得
    const rentalHouse = await this.rentalHouseService.findOne(rental_house_id);
    //room取得
    const mansionRoom = await this.mansionRoomService.findOneWithPhoto(room_id);

    return {
      mansion_room: mansionRoom,
      rental_house: rentalHouse
    }
  }
}