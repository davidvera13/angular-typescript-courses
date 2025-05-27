import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {LessonSummary} from "../model/lesson-summary";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit {
  lessons:LessonSummary[];
  constructor(private route:ActivatedRoute) {
  }

  ngOnInit() {
    // we use a resolver: data is loaded before component is loaded ...
    this.lessons = this.route.snapshot.data["lessons"];

  }

}
