import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as admin from 'firebase-admin';
import { OwnerService } from 'src/owner/owner.service';
import { INVALID_TOKEN, NOT_FOUND_TOKEN } from 'src/common/message';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly ownerService: OwnerService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization)
      throw new UnauthorizedException(NOT_FOUND_TOKEN);

    const token = request.headers.authorization.split(' ')[1];

    const promise = admin
      .auth()
      .verifyIdToken(token)
      .then(async (decodedToken) => {
        request['firebaseAuth'] = decodedToken;

        //firebaseUIDからEmployeeを取得し、headerにownerを追加する
        const owner = await this.ownerService.findByFirebaseUid(
          decodedToken.uid,
        );
        request['owner'] = owner;

        //decodedTokenとemployeeが確認できた際にtrueを返す。
        return !!decodedToken && !!owner;
      })
      .catch(() => {
        throw new UnauthorizedException(INVALID_TOKEN);
      });

    return promise;
  }
}
