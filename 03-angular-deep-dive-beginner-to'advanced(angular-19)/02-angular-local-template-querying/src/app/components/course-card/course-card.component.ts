import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../../model/course';
import {NgClass, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'course-card',
  imports: [
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit {
  @Input({ required: true}) course!: Course;
  @Input({ required: true}) index!: number;
  @Input() count!: number;
  @Output('courseSelected') courseSelectedEmitter: EventEmitter<Course> ;

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
