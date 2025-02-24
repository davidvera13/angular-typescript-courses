import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

// we can configure a factory
@Injectable({
  providedIn: 'root', // singleton available in all application
  useClass:   DummyService,
  //useFactory: (http) => new DummyService(http),
  //deps: [HttpClient]
})
export class DummyService {

  constructor(private http: HttpClient) {
    console.log("DummyService constructor called");
  }
}
