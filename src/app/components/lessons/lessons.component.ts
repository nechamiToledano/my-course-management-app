import { Component, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute } from "@angular/router";
import { LessonService } from "../../services/lesson.service";

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ShortenTitlePipe } from "../../pipes/pipes/shorten-title.pipe";

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,MatListModule,
    ShortenTitlePipe
  ],
  providers: [LessonService],
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  lessons: any[] = [];
  selectedLesson: any = null;
  lessonForm: FormGroup;
  courseId!: number;
  isEditMode = false;

  constructor(
    private lessonService: LessonService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId')) || 1;
    this.getLessons();
  }

  getLessons() {
    this.lessonService.getLessons(this.courseId).subscribe(response => {
      this.lessons = response;
    });
  }

  startCreatingLesson() {
    this.selectedLesson = null;
    this.isEditMode = false;
    this.lessonForm.reset();
  }

  startEditingLesson(lesson: any) {
    this.selectedLesson = lesson;
    this.isEditMode = true;
    this.lessonForm.patchValue(lesson);
  }

  saveLesson() {
    if (this.lessonForm.valid) {
      if (this.isEditMode && this.selectedLesson) {
        this.updateLesson();
      } else {
        this.createLesson();
      }
    }
  }

  createLesson() {
    this.lessonService.createLesson(this.courseId, this.lessonForm.value).subscribe(response => {
      this.lessons.push(response);
      this.selectedLesson = null;
      this.lessonForm.reset();
    });
  }

  updateLesson() {
    this.lessonService.updateLesson(this.courseId, this.selectedLesson.id, this.lessonForm.value).subscribe(response => {
      this.getLessons(); // Refresh lessons
      this.selectedLesson = null;
      this.isEditMode = false;
    });
  }

  deleteLesson(lessonId: number) {
    this.lessonService.deleteLesson(this.courseId, lessonId).subscribe(() => {
      this.lessons = this.lessons.filter(l => l.id !== lessonId);
      this.selectedLesson = null;
    });
  }
}
