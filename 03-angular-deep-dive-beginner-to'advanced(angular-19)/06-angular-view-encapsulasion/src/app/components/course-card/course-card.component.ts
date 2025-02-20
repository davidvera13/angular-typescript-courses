import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, QueryList, TemplateRef, ViewEncapsulation
} from '@angular/core';
import {Course} from '../../model/course';
import {NgClass, NgIf, NgStyle, NgTemplateOutlet} from '@angular/common';
import {CourseImageComponent} from '../course-image/course-image.component';


@Component({
  selector: 'course-card',
  imports: [
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css',
  encapsulation: ViewEncapsulation.Emulated,  // with None host element is useless
})
export class CourseCardComponent implements OnInit, AfterViewInit, AfterContentInit {
  @Input({ required: true}) course!: Course;
  @Input({ required: true}) index!: number;
  @Input() count!: number;

  @Output('courseSelected') courseSelectedEmitter: EventEmitter<Course> ;

  @ContentChild(CourseImageComponent)
  courseImage!: any;

  @ContentChild(CourseImageComponent)
  courseImages!: QueryList<CourseImageComponent>;

  constructor() {
    this.courseSelectedEmitter = new EventEmitter<Course>();
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit', this.courseImage);
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit > this.courseImages', this.courseImages);
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
