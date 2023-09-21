import { AuthService } from "../auth.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { EXIST_MAIL_ADDRESS, FAIL_TO_CREATE_TOKEN } from "src/common/message";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { CreateOwnerSystemInput } from "src/owner/dto/create-owner.system-input";
import { CreateOwner } from "src/owner/use-case/create-owner";
import { CreateOwnerInput } from "src/owner/dto/create-owner.input";
import { OwnerWithTokenEntity } from "../entities/OwnerWithToken.entity";

@Injectable()
export class SignupOwnerWithEmail {
  constructor(
    private readonly authService: AuthService,
    private readonly createOwner: CreateOwner,
  ) {}

  async handle(
    input: CreateOwnerSystemInput
  ): Promise<OwnerWithTokenEntity | null> {
    //Firebaseの認証ユーザーを定義
    const authOwner: UserRecord = await this.authService
      .createOwner({
        email: input.email, password: input.password
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-exists') {
          throw new BadRequestException(EXIST_MAIL_ADDRESS)
        }
        throw error
      });

    //firebaseを用いてtokenの作成
    const token = await this.authService
      .createCustomToken(authOwner.uid)
      .catch((error) => {
        throw new Error(FAIL_TO_CREATE_TOKEN)
      });

    //DBの保存に失敗した時Firebase上からも削除する
    //awaitがtopレベルで呼びたいのでtry-catch
    try {
      const createOwnerInput: CreateOwnerInput = {
        firebase_uid: authOwner.uid,
        email: input.email,
        last_name: input.last_name,
        first_name: input.first_name,
        phone_number: input.phone_number,
      };
      const owner = await this.createOwner.handle(createOwnerInput);

      return { ...owner, token }
    } catch (error) {
      await this.authService.deleteOwner(authOwner.uid)
      throw error 
    }    
  }
}