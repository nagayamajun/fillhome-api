import { MansionRoomEntity } from "./mansion-room.entity";
import { PhotoEntity } from "src/photo/entities/photo.entity";

export class MansionRoomWithPhotoEntity extends MansionRoomEntity{
  mansion_room_photos: PhotoEntity[]
}