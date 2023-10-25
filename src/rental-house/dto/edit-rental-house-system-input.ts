import { IsNumber, IsOptional, IsString } from "class-validator";

export class EditRentalHoseSystemInput {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  nearest_station: string;

  @IsOptional()
  @IsNumber()
  max_floor_number: number;

  @IsOptional()
  @IsNumber()
  building_age: number ;

  @IsOptional()
  structure_type: number;
}