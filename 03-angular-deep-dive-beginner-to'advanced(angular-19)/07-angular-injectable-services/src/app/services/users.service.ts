import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

let counter = 0;


//@Injectable({
//  providedIn: 'root'
//})
@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
    counter++;
    console.log("UsersService constructor called  #: " +  counter);
  }

  getUserId() {
    return "userId"
  }
}
