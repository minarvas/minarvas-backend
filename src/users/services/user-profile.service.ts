import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfileService {
  generate() {
    return 'John Doe';
  }
}
