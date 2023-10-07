import { IsNotEmpty, IsString } from "class-validator";

export class CreateOwnerSystemInput {
  @IsNotEmpty({ message: 'メールアドレスは必須です。' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'パスワードは必須です。' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: '氏名は必須です。' })
  @IsString()
  first_name: string;

  @IsNotEmpty({ message: '苗字は必須です。' })
  @IsString()
  last_name: string;

  @IsNotEmpty({ message: '電話番号は必須です。' })
  @IsString()
  phone_number: string;
}