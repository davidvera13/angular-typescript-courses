import {Component, effect, inject, resource, signal} from "@angular/core";
import {Lesson} from '../../models/lesson.model';
import {environment} from '../../../environments/environment.development';
import {MatProgressSpinner} from '@angular/material/progress-spinner';


@Component({
  selector: 'resource-demo',
  templateUrl: './resource-demo.component.html',
  styleUrls: ['./resource-demo.component.scss'],
  imports: [
    MatProgressSpinner
  ]
})
export class ResourceDemoComponent {

  env = environment;

  search = signal<string>('');

  //lessons = signal<Lesson[]>([])
  // async operation
  lessons = resource<Lesson[], { search: string}>({
    request: () => ({
      search: this.search()
    }),
    loader: async ({ request, abortSignal}) => {
      const response = await fetch(`${this.env.apiRoot}/search-lessons?query=${request.search}&courseId=18`, {
        signal: abortSignal,
      });
      const json = await response.json();
      return json.lessons;

    }
  });

  constructor() {
    effect(() => {
      console.log('searching lessons:', this.search() );
    })
  }

  searchLessons(search: string) {
    this.search.set(search);
  }

  reset() {

  }

  reload() {

  }
}
