import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit, Optional,
  Output,
  Self, SkipSelf,
} from '@angular/core';
import {Course} from '../../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCardComponent implements OnInit {

  @Input()
  course: Course;

  //@Input() type!: string;

  @Input()
  cardIndex: number;

  @Output('courseChanged')
  courseEmitter = new EventEmitter<Course>();

  constructor(
    @Attribute('type') type: string,
  ) {
    console.log('CourseCardComponent type: ', type);
  }

  ngOnInit() {
    console.log('ngOnInit CourseCardComponent');
  }

  onSaveClicked(description:string) {
    this.courseEmitter.emit({...this.course, description});
  }

  // default change detection
  onTitleChanged(value: string) {
    this.course.description = value;
  }
}
