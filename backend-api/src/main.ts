// APEX AI FITNESS — PRO (NestJS Production Server Bootstrap)
// Ready for AWS ECS / Google Cloud Run / Enterprise Kubernetes deployment.

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v1');
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`[APEX AI FITNESS PRO] Server running on http://localhost:${port}/api/v1`);
}

bootstrap();
