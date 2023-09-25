import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [
    PhotoService,
    PrismaService
  ]
})
export class PhotoModule {}
