import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { EditRentalHoseSystemInput } from "./edit-rental-house-system-input";

export class EditRentalHouseInput extends EditRentalHoseSystemInput {
  @IsOptional()
  @IsArray()
  rental_house_photos: string[]
}