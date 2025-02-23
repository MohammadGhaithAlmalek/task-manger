import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  //Configure the swagger module here
  const config = new DocumentBuilder() //1
    .setTitle('task-manger')
    .setDescription('The task manger Api documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config); //2
  SwaggerModule.setup('api', app, document); //3
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
