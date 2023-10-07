import { IsNotEmpty, IsString } from "class-validator"
import { REQUIRE_FIELD } from "src/common/message"

export class CreateReservationInput {
  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  last_name: string

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  first_name: string

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  phone_number: string

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  email: string

  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  address: string
  
  @IsNotEmpty({ message: REQUIRE_FIELD })
  @IsString()
  stay_date: string
}