import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../model/course';
import {NgClass, NgIf, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';

@Component({
  selector: 'course-card',
  imports: [
    NgIf,
    NgClass,
    NgStyle,
    NgSwitchCase,
    NgSwitchDefault,
    NgSwitch
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit {
  // @Input() title!: string;
  // @Input() iconUrl!: string;
  // new feature: input can be mandatory !
  @Input({ required: true}) course!: Course;
  @Input({ required: true}) index!: number;

  // we can use specific name for event emitter
  @Output('courseSelected') courseSelectedEmitter: EventEmitter<Course> ;
  @Input() count!: number;

  constructor() {
    this.courseSelectedEmitter = new EventEmitter<Course>();
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onCourseViewed() {
    console.log('onCourseViewed, button clicked');
    this.courseSelectedEmitter.emit(this.course);
  }

  isImageVisible() {
    return this.course && this.course.iconUrl;
  }

  setCardClass() {
    return {'beginner': this.course.category === 'BEGINNER', 'course-card': true}
  }

  cardStyles() {
    return {'text-decoration': 'underline'};
  }
}
