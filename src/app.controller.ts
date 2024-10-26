import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('send')
  async sendMessage(@Body('message') message: string) {
    await this.appService.sendMessage(message);
    return 'Message sent';
  }

  @Get('receive')
  async receiveMessage() {
    const message = await this.appService.receiveMessage();
    return `Received message: ${message}`;
  }
}
