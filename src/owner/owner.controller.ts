import { Controller, Get, UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { OwnerAuth, OwnerAuthParam } from 'src/auth/decorators/owner-auth.decorator';
import { OwnerEntity } from './entities/owner.entity';

@Controller('owner')
export class OwnerController {
  constructor(
    private readonly ownerService: OwnerService,
  ) {}

  // FirebaseUIDからownerを取得する。
  @UseGuards(AuthGuard)
  @Get('/firebase-uid')
  async findByFirebaseUID(
    @OwnerAuth() { owner }: OwnerAuthParam,
  ): Promise<OwnerEntity> {
    return await this.ownerService.findByFirebaseUid(owner.firebase_uid);
  }

}
