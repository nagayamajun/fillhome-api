import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { AuthUtil } from './auth/auth.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  
  // FirebaseAdminの初期化
  app.get(AuthUtil).initialize();
  //cors制約
  app.enableCors();
  await app.listen(8000);
}
bootstrap();
