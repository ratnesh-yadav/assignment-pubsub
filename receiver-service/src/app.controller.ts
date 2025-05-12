import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('receiver')
export class AppController {
  constructor(private readonly appService: AppService) {
    ('')
  }

  @Post()
  async receiveData(@Body() body: any) {
    return await this.appService.handleData(body);
  }

  @Get('all')
async getAll() {
  return this.appService.getAllRecords();
}
}