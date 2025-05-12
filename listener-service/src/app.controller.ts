// listener-service/src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('listener')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('all')
  async getAllRecords() {
    return await this.appService.getAllRecords();
  }
}