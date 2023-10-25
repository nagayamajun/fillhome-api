import { Injectable } from "@nestjs/common";
import { RentalHouseService } from "../rental-house.service";
import { EditRentalHouseInput } from "../dto/edit-rental-house-input";
import { PhotoService } from "src/photo/photo.service";

@Injectable()
export class EditRentalHouseUseCase {
  constructor(
    private readonly rentalHouseService: RentalHouseService,
    private readonly photoService: PhotoService
  ) {}

  async handle ({id, input}: {id: string, input: EditRentalHouseInput}): Promise<void> {
    const { rental_house_photos, ...rest } = input;

    const rentalHouse = await this.rentalHouseService.edit({id, input: {...rest}});

    await Promise.all(
      rental_house_photos.map(async (photo: string) => {
        await this.photoService.createWithRentalHouse({ rental_house_id: rentalHouse.id, image: photo });
      }
    )).catch(async(error) => {
      //rentalHouseを削除する
      await this.rentalHouseService.delete(rentalHouse.id);
    })

  }
}