import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
 
  getHello(): string {
    return 'Hello World!';
  }

  sayGoodbye(): string {
    return 'Say goodBye!';
  }

  async returnSlowRequest(): Promise<any> {
    if ((Math.floor(Math.random() * 100)) === 0) {
      throw new Error('Internal Error')
  }

  const delaySeconds = Math.floor(Math.random() * (6 - 3)) + 3
  return await new Promise(res => setTimeout(res, delaySeconds * 1000))
  }
}
