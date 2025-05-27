import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Course} from '../model/course';
import {MatDialog,  MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {filter, tap} from 'rxjs/operators';
import {NgForOf} from "@angular/common";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  imports: [
    NgForOf,
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    RouterLink
  ],
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[] = [];

  @Output()
  private coursesChanged = new EventEmitter();

  constructor(private dialog: MatDialog) {

  }

  ngOnInit() {

  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
        tap(() => this.coursesChanged.emit())
      )
      .subscribe();
    }

}
