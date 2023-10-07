import { Injectable } from "@nestjs/common";
import { CreateReservationInput } from "../dto/create-reservation.input";
import { MansionRoomService } from "src/mansion-room/mansion-room.service";
import { CheckDateInAvailableDates } from "../policy/check-date-in-available-dates";
import { ReservationService } from "../reservation.service";

@Injectable()
export class CreateReservation {
  constructor(
    private readonly mansionRoomService: MansionRoomService,
    private readonly checkDateInAvailableDates: CheckDateInAvailableDates,
    private readonly reservationService: ReservationService,
  ) {}

  async handle(
    {input, mansion_room_id} :{input: CreateReservationInput, mansion_room_id: string}
  ) {
    const mansionRoom = await this.mansionRoomService.findOne(mansion_room_id);
    //予約したい日がavailable_datesに存在するかチェックする
    await this.checkDateInAvailableDates.handle({available_dates: mansionRoom.available_dates, stay_date: input.stay_date});
    //reservationを作成する
    const reservation = await this.reservationService.create({input, mansion_room_id});

    //mansion_roomのavailable_datesから予約が確定した日を削除する
    //失敗したら作成したreservationを削除してエラー
    const re_available_dates = mansionRoom.available_dates = mansionRoom.available_dates.filter(date => date !== reservation.stay_date);
    await this.mansionRoomService.systemUpdate({id: mansionRoom.id, available_dates: re_available_dates})
      .catch(async (error) => {
        await this.reservationService.delete(reservation.id)
      })

  }
}