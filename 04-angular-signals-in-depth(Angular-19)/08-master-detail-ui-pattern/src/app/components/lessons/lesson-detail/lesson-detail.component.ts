import {Component, inject, input, output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {Lesson} from '../../../models/lesson.model';
import {LessonsService} from '../../../services/lessons.service';
import {MessagesService} from '../../../services/messages.service';

@Component({
    selector: 'lesson-detail',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './lesson-detail.component.html',
    styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {
  lessonsService = inject(LessonsService);
  messagesService = inject(MessagesService);

  lesson = input.required<Lesson | null>();
  lessonUpdated = output<Lesson>()
  cancel = output()

  onCancel() {
    this.cancel.emit()
  }

  async onSave(value: string) {
    try {
      const lesson = this.lesson();
      const updatedLesson = await this.lessonsService.saveLesson(
        lesson!.id,
        { description: value });
      this.lessonUpdated.emit(updatedLesson)
    } catch (error) {
      console.error(error);
      this.messagesService.showMessage("Error when saving lesson...", 'error');
    }
  }
}
