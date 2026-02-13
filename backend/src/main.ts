import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ensureDatabase } from './config/ensure-database';

async function bootstrap() {
  // Ensure database exists before starting the app
  try {
    await ensureDatabase();
  } catch (error) {
    console.error('Failed to ensure database exists:', error);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
  console.log(`✅ Application is running on: http://localhost:3000`);
}
bootstrap();
