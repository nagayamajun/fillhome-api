import { IsNotEmpty, IsString } from "class-validator";
import { CreateRentalHouseInput } from "./create-rental-house-input";

export class CreateRentalHouseSystemInput extends CreateRentalHouseInput {
  @IsNotEmpty({ message: ''})
  @IsString()
  rental_house_photos: string[]
}
