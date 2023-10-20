import { Injectable } from "@nestjs/common";
import { RentalHouseService } from "../rental-house.service";
import { PhotoService } from "src/photo/photo.service";
import { CreateRentalHouseSystemInput } from "../dto/create-rental-house-system-input";
import { MansionService } from "src/mansion/mansion.service";

@Injectable()
export class CreateRentalHouse {
  constructor(
    private readonly rentalHouseService: RentalHouseService,
    private readonly photoService: PhotoService,
    private readonly mansionService: MansionService
  ) {}

  async handle(
    input: CreateRentalHouseSystemInput,
    owner_id: string
  ): Promise<{ id: string }> {
    const { rental_house_photos, ...rest } = input;
    //rental_houseを作成する
    const rentalHouse = await this.rentalHouseService.create({input: {...rest}, owner_id});

    //写真を生成する
    await Promise.all(
      rental_house_photos.map(async (photo: string) => {
        await this.photoService.createWithRentalHouse({ rental_house_id: rentalHouse.id, image: photo });
      }
    )).catch(async(error) => {
      //rentalHouseを削除する
      await this.rentalHouseService.delete(rentalHouse.id);
    })

    //mansionの中間テーブル作成
    const mansion = await this.mansionService.create(rentalHouse.id);

    return {
      id: rentalHouse.id
    }
  }
}