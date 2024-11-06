import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { CONFIG_APP } from './config/config.export';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('CRYPTORUB API')
    .addServer(CONFIG_APP.ADDRESS)
    .addBearerAuth()
    .addApiKey({ 
      type: 'apiKey', 
      name: 'x-admin-key', 
      in: 'header' 
    }, 
    'ADMIN_KEY')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(CONFIG_APP.SWAGGER_PATH, app, document);
  await app.listen(CONFIG_APP.PORT);
}

bootstrap();
