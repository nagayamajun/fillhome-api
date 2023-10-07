import { BadRequestException, Injectable } from "@nestjs/common";
import { NOT_FOUND_DATE_IN_AVAILABLE_DATES } from "src/common/message";
import { MansionRoomService } from "src/mansion-room/mansion-room.service";

@Injectable()
export class CheckDateInAvailableDates {
  
  async handle(
    {available_dates, stay_date}: { available_dates: string[], stay_date: string }
  ) {
    const isDateInAvailableDates = available_dates.includes(stay_date);
    //予約したい日がavailableDateに存在していたら次の処理
    if (isDateInAvailableDates) return

    if (!isDateInAvailableDates) {
      throw new BadRequestException(NOT_FOUND_DATE_IN_AVAILABLE_DATES);
    }
  }
}