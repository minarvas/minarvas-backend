import { Injectable } from '@nestjs/common';

@Injectable()
export class UserNameGenerator {
  generate() {
    return 'John Doe';
  }
}
