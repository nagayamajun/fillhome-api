import { PhotoEntity } from "src/photo/entities/photo.entity";
import { RentalHouseEntity } from "./rental-house.entity";

export class RentalHouseWithPhotoEntity extends RentalHouseEntity{
  rental_house_photos: PhotoEntity[]
}