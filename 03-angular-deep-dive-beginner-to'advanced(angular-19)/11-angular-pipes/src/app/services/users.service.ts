import { Injectable } from '@angular/core';

// it's not a tree shakeable service
// we can inject it using provider in component OR module
@Injectable()
export class UsersService {
  constructor() {
    console.log('UsersService constructor');
  }
}
