import { Injectable } from "@nestjs/common";
import { OwnerService } from "../owner.service";
import { CreateOwnerInput } from "../dto/create-owner.input";
import { CreateOwnerPolicy } from "../policy/create-owner-policy";

@Injectable()
export class CreateOwner {
  constructor(
    private readonly createOwnerPolicy: CreateOwnerPolicy,
    private readonly ownerService: OwnerService
  ) {}

  async handle(
    input: CreateOwnerInput
  ) {
    await this.createOwnerPolicy.handle(input.email);

    return await this.ownerService.create(input);
  }
}