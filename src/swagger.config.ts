import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public swaggerInitializeOptions() {
    return this.builder
      .setTitle('Attendance SERVER')
      .setDescription('Attendance API document 입니다.')
      .setVersion('0.0.1')
      .build();
  }
}
