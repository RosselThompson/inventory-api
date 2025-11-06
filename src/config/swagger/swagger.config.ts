import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  constructor(private readonly app: INestApplication) {}

  init() {
    const options = new DocumentBuilder()
      .setTitle('Deal Ops API')
      .setDescription('Contains the documentation for using the endpoints')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(this.app, options);
    SwaggerModule.setup('/api/docs', this.app, document);
  }
}
