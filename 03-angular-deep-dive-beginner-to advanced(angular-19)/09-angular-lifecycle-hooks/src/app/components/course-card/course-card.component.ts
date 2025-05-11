import {
  AfterContentChecked, AfterViewChecked,
  Attribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit, Optional,
  Output,
  Self, SimpleChanges, SkipSelf,
} from '@angular/core';
import {Course} from '../../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
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

  constructor(
    @Attribute('type') type: string,) {
    console.log('CourseCardComponent type: ', type);
  }

  ngOnInit() {
    console.log('ngOnInit CourseCardComponent');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges CourseCardComponent', changes);
  }


  // called by angular once component is fully loaded
  // last minute changes can be done here
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked CourseCardComponent');
    this.course.description = 'ngAfterContentChecked was called';
    this.course.category = 'ADVANCED';
    // we can also impact projected component: let's change icon
    // this.course.iconUrl = './assets/images/material_design.png';
    this.course.iconUrl = '';
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked CourseCardComponent');
    // not rendering new value: view is already rendered
    this.course.description = 'ngAfterViewChecked was called';
    // we can add scrolling logic here for example

  }

  // called when component is destroyed: used to unsubscribe.
  ngOnDestroy() {
    console.log('ngOnDestroy CourseCardComponent');
  }

  onSaveClicked(description:string) {
    this.courseEmitter.emit({...this.course, description});
  }

  // default change detection
  onTitleChanged(value: string) {
    this.course.description = value;
  }
}
