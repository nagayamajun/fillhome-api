import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePhotoInput {
  @IsString()
  @IsNotEmpty({ message: '必須項目です'})
  rental_house_id: string;

  @IsString()
  @IsOptional()
  image: string;
}
