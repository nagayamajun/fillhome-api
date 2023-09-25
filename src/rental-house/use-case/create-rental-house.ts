import { Injectable } from "@nestjs/common";
import { RentalHouseService } from "../rental-house.service";
import { PhotoService } from "src/photo/photo.service";
import { CreateRentalHouseSystemInput } from "../dto/create-rental-house-system-input";

@Injectable()
export class CreateRentalHouse {
  constructor(
    private readonly rentalHouseService: RentalHouseService,
    private readonly photoService: PhotoService
  ) {}

  async handle(
    input: any,
    // input: CreateRentalHouseSystemInput,
    owner_id: string
  ): Promise<void> {
    const { rental_house: {rental_house_photos, ...rest} } = input;
    
    //rental_houseを作成する
    const rentalHouse = await this.rentalHouseService.create({owner_id, ...rest});

    //写真を生成する
    await Promise.all(
      rental_house_photos.map(async (photo) => {
        const systemPhoto = await this.photoService.createWithRentalHouse({ rental_house_id: rentalHouse.id, image: photo });
      }
    )).catch(async(error) => {
      //rentalHouseを削除する
      await this.rentalHouseService.delete(rentalHouse.id);
    })

  }
}