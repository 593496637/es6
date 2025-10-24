import { Injectable } from '@nestjs/common';

@Injectable()
export class HiService {
  greet(name = '朋友') {
    return `HI ${name}`;
  }
}
