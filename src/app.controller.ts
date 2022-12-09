import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getHello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('bye')
  sayHello(): string {
    return this.appService.sayGoodbye();
  }

  @Get('slow')
  slowRequest(): string {
    return this.appService.sayGoodbye();
  }
}

// eyJrIjoiYWNlODZlMzUxNzA2NTNmNzE4MzZmZmE3YzIwNTdiMzA1OTIwNjg1NCIsIm4iOiJhcHBsaWNhdGlvbi1tb25pdG9yaW5nLXRlc3QiLCJpZCI6NzU4NTg4fQ==