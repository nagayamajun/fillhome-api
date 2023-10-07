import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { REQUIRE_FIELD } from "src/common/message";

export class CreateMansionRoomInput {
  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  layout: string;

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  contract_duration: string;

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  reserve_url: string;

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsNumber()
  thanks_money: number;

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsNumber()
  security_deposit: number;

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsNumber()
  floor_number: number;

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsNumber()
  rent: number;

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsNumber()
  stay_fee: number;

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsNumber()
  maintenance_fee: number;  

  @IsOptional()
  @IsString()
  available_dates: string[];

  // @IsOptional()
  // @IsString()
  // mansion_id
} 