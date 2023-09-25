import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRentalHouseInput {

  @IsNotEmpty({ message: '建物名は必須項目です。' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: '住所は必須項目です。' })
  @IsString()
  address: string;

  @IsNotEmpty({ message: '最寄駅は必須項目です。' })
  @IsString()
  nearest_station: string;

  @IsNotEmpty({ message: '何階建は必須項目です。' })
  @IsNumber()
  max_floor_number: string;

  @IsNotEmpty({ message: '築年数は必須です。' })
  @IsNumber()
  building_age: string;

  @IsNotEmpty({ message: '建物の種類は必須項目です。' })
  structure_type: any;
  
}

// @IsNotEmpty({ message: ''})
// @IsString()
// rental_house_photos: string[]