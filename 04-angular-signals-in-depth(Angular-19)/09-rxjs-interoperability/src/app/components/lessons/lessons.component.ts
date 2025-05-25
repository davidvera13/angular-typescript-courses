import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {Lesson} from '../../models/lesson.model';
import {LessonsService} from '../../services/lessons.service';
import {LessonDetailComponent} from './lesson-detail/lesson-detail.component';


@Component({
    selector: 'lessons',
  imports: [
    LessonDetailComponent
  ],
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss'
})
export class LessonsComponent {
  // master detail design pattern will be implemented
  displayMode = signal<'master' | 'detail'>('master');
  lessons = signal<Lesson[]>([]);
  selectedLesson = signal<Lesson | null>(null);

  // default value emitted for viewchild signal is undefined
  searchInput = viewChild.required<ElementRef>('search')

  lessonService = inject(LessonsService);

  // we pass value defined with template reference value #search
  async onSearchClassic(query: string) {
    console.log('onSearchClassic() query: ', query);
    await this.sendQuery(query)

  }

  // we'll use signal template query
  async onSearch() {
    const query = this.searchInput()?.nativeElement.value;
    console.log('onSearch() query: ', query);
    await this.sendQuery(query)
  }

  async sendQuery(query: string) {
    const results = await this.lessonService.loadLessons({query});
    this.lessons.set(results);
    console.log(results);
  }

  onDetailsSelected(lesson: Lesson) {
    this.displayMode.set('detail');
    this.selectedLesson.set(lesson)
  }

  onCancel() {
    this.displayMode.set('master');
  }

  onLessonUpdated(updatedLesson: Lesson) {
    this.lessons.update(lessons => lessons
      .map(lesson => lesson.id === updatedLesson.id ? updatedLesson: lesson));
  }
}
