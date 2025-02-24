import {Component, Inject, InjectionToken, OnInit, Optional, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Course} from './model/course';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {CoursesService} from "./services/courses.service";
import {UsersService} from "./services/users.service";
import {DummyService} from "./services/dummy.service";
import {APP_CONFIG, AppConfig, CONFIG_TOKEN} from "./config";
import {OptionalService} from "./services/optional.service";
import {SelfService} from "./services/self.service";
import {SkipSelfService} from "./services/skip-self.service";

// creating custom provider for service
function usersServiceProvider(http: HttpClient): UsersService {
  return new UsersService(http);
}

const USERS_SERVICE = new InjectionToken<UsersService>("USERS_SERVICE");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
  providers: [
    // we provide a APP_CONFIG
    {
      provide: CONFIG_TOKEN,
      useFactory: ()=> APP_CONFIG
    },
    // // full custom provider
    // {
    //   provide: USERS_SERVICE,
    //   useFactory: usersServiceProvider,
    //   deps: [HttpClient] // we pass the dependency of service for which we create provider
    // },
    // // simplified
    //{
    //  // we can provide class as unique identifier
    //  provide: CoursesService,
    //  // if we pass class name , we don't need useFactory, we'll call used class constructor directly
    //  useClass: UsersService,
    //  // useFactory: usersServiceProvider,
    // // deps: [HttpClient] // we pass the dependency of service for which we create provider
    //},
    // // easy way
    UsersService,
    SkipSelfService,
    SelfService
  ]
})
export class AppComponent implements OnInit {
  //courses = COURSES;
  courses$: Observable<Course[]>;
  //courses!: Course[];

  constructor(
    //private http: HttpClient,
    //@Inject(USERS_SERVICE) private userService: UsersService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    @Optional() private optionalService: OptionalService,
    private selfService: SelfService,
    private skipSelfService: SkipSelfService,
    private dummyService: DummyService,
    private userService: UsersService,
    private coursesService: CoursesService) {
  }

  ngOnInit() {
    // inject token
    console.log('AppComponent ngOnInit called > this.config ', this.config);
    console.log('AppComponent ngOnInit called > this.optionalService ', this.optionalService);
    console.log('AppComponent ngOnInit called > this.selfService ', this.selfService);
    console.log('AppComponent ngOnInit called > this.skipSelfService ', this.skipSelfService);
    // initialization logic
    console.log('AppComponent ngOnInit called > this.coursesService', this.coursesService);
    console.log('AppComponent ngOnInit called > this.usersService', this.userService);
    console.log('AppComponent ngOnInit called > this.dummyService', this.dummyService);
    //const params = new HttpParams()
    //  .set("page", 1)
    //  .set("pageSize", 10);

    //this.http
    //  .get<Course[]>('/api/courses', {params: params})
    //  .subscribe(res => {
    //    console.log(res);
    //    this.courses = res
    //  });

    //this.courses$ = this.http
    // .get<Course[]>('/api/courses', {params: params})
    this.courses$ = this.coursesService.loadCourses();
  }

  onCourseSave(course: Course) {
    this.coursesService.saveCourse(course).subscribe(
      () => console.log('success')
    );

  }
}
