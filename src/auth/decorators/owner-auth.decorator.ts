import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Owner } from '@prisma/client';

//Ownerの情報を取得するカスタムデコレーター
export const OwnerAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return { owner: req.owner };
  },
);

export type OwnerAuthParam = {
  owner: Owner
};
