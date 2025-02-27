import {
  AfterContentChecked, AfterViewChecked,
  Component,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {Course} from '../../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: false,
})
export class CourseCardComponent implements
  OnInit, OnChanges, OnDestroy, AfterContentChecked, AfterViewChecked {

  @Input()
  course: Course;

  // @Input() type!: string;

  @Input()
  cardIndex: number;

  @Output('courseChanged')
  courseEmitter = new EventEmitter<Course>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }


  ngAfterContentChecked() {
  }

  ngAfterViewChecked() {
  }

  ngOnDestroy() {
  }

  onSaveClicked(description: string) {
    this.courseEmitter.emit({...this.course, description});
  }

  onTitleChanged(value: string) {
    this.course.description = value;
  }
}
