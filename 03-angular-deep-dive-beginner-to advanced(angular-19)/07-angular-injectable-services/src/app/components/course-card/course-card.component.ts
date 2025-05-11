import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit, Optional,
  Output,
  QueryList, Self, SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import {Course} from '../../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
import {UsersService} from "../../services/users.service";
import {DummyService} from "../../services/dummy.service";
import {OptionalService} from "../../services/optional.service";
import {SelfService} from "../../services/self.service";
import {SkipSelfService} from "../../services/skip-self.service";

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: false,
  providers: [
    UsersService,
    SelfService, // we need to set provider here because of @Self
  ],
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();

    constructor(
      @Optional() private optionalService: OptionalService,
      @Self() private selfService: SelfService,
      @SkipSelf() private skipSelfService: SkipSelfService,
      private dummyService: DummyService,
      private usersService: UsersService) {
      // ERROR NullInjectorError: R3InjectorError(_AppModule)[_OptionalService -> _OptionalService]:
      console.log('CourseCardComponent ngOnInit called > this.optionalService', this.optionalService);
      // self service is usually inherited from parent component normally, but we want to make this instance different from parent one
      console.log('CourseCardComponent ngOnInit called > this.selfService', this.selfService);
      // we want to make this instance is inherited from parent
      console.log('AppComponent ngOnInit called > this.skipSelfService ', this.skipSelfService);

      console.log('CourseCardComponent ngOnInit called > this.usersService', this.usersService);
      console.log('CourseCardComponent ngOnInit called > this.dummyService', this.dummyService);
    }

    ngOnInit() {
      console.log('ngOnInit CourseCardComponent');
    }

    onSaveClicked(description:string) {
        this.courseEmitter.emit({...this.course, description});
    }
}
