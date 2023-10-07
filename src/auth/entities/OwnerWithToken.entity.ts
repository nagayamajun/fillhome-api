import { OwnerEntity } from "src/owner/entities/owner.entity";

export class OwnerWithTokenEntity extends OwnerEntity {
  token!: string;
}