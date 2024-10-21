import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { BaseAPIDocument } from './swagger.config';
import { ExceptionType400 } from './utils/common';

const fs = require('fs');

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const local = process.env.LOCAL;

  const httpsOptions = Boolean(local)
    ? {
        key: fs.readFileSync(`./src/_secrets/localhost-key.pem`),
        cert: fs.readFileSync('./src/_secrets/localhost.pem'),
      }
    : undefined;

  const app = await NestFactory.create(AppModule, { httpsOptions });
  const httpAdapter = app.get(HttpAdapterHost);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (error: ValidationError[]) => {
        throw new BadRequestException({
          code: 400,
          error: ExceptionType400.MALFORMED_DATA_TYPE,
          resource: error,
        });
      },
    })
  );

  const config = new BaseAPIDocument().swaggerInitializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);
  await app.listen(port);

  // HTTPS 여부에 따라 적절한 메시지 출력
  const protocol = httpsOptions ? 'HTTPS' : 'HTTP';
  console.log(`Server running on ${protocol}://localhost:${port}`);
}
bootstrap();
