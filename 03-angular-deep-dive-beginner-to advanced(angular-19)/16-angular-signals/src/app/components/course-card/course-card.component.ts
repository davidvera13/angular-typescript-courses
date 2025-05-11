import {
  AfterContentChecked, AfterViewChecked,
  Component, computed, effect,
  EventEmitter, input,
  Input, InputSignal, OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {Course} from '../../model/course';
import {CourseTitleEltComponent} from '../course-title-elt/course-title-elt.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: true,
  imports: [
    NgIf,
    CourseTitleEltComponent
  ]
})
export class CourseCardComponent {

  // course: InputSignal<Course> = input.required<Course>();
  course: InputSignal<Course> = input<Course>(null, { alias: 'singleCourse' });
  cardIndex: InputSignal<number> = input<number>();

  // @Input()
  // course: Course;
  // @Input() type!: string;
  // @Input()
  // cardIndex: number;

  @Output('courseChanged')
  courseEmitter = new EventEmitter<Course>();

  constructor() {
    effect(() => {
      console.log('new course value :', this.course());
    });
  }

  // ngOnInit() {
  //   const description = computed(() => {
  //     const course = this.course();
  //     return course.description + ' (' + course.category + ')';
  //   });
  // }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.course) {
  //     console.log('new course value :', changes.course);
  //   }
  // }



  onSaveClicked(description: string) {
    this.courseEmitter.emit({...this.course(), description});
  }

  onTitleChanged(value: string) {
    this.course().description = value;
  }
}
