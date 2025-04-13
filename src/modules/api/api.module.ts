import { Module } from '@nestjs/common';
import { ApiController } from './api.contoller';
import { PrinterService } from './printer.service';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [PrinterService],
})
export class ApiModule {}
