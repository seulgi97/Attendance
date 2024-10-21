import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UtilsService } from './utils.service';

@Module({
  imports: [],
  providers: [UtilsService, ConfigService],
  exports: [UtilsService],
})
export class UtilsModule {}
