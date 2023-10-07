import { BadRequestException, Injectable } from "@nestjs/common";
import { OwnerService } from "../owner.service";
import { EXIST_MAIL_ADDRESS } from "src/common/message";

@Injectable()
export class CreateOwnerPolicy {
  constructor(
    private readonly ownerService: OwnerService
  ) {}

  async handle(email: string): Promise<void> {
    const owner = await this.ownerService.findByEmail(email);
    //Ownerが存在していなかったら次の処理
    if(!owner) return;

    //存在していたらエラー投げる
    if (owner.firebase_uid) {
      throw new BadRequestException(EXIST_MAIL_ADDRESS);
    }
  }
}