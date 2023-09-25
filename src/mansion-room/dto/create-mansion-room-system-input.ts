import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { CreateMansionRoomInput } from "./create-mansion-room-input";
import { REQUIRE_FIELD } from "src/common/message";

export class CreateMansionRoomSystemInput extends CreateMansionRoomInput {
  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  @IsArray()
  mansion_room_photos: string[];
}