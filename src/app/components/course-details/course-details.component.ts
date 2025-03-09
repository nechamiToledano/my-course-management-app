import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LessonService } from '../../services/lesson.service';


@Component({
  selector: 'app-course-details',
  standalone: true,
  imports:[    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
        MatFormFieldModule,
        MatInputModule, // ✅ Added
        MatOptionModule,
        MatSelectModule, // ✅ Added
        MatButtonModule, // ✅ Added
        ReactiveFormsModule,
        MatIconModule
     
  ],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseId: number=0;
  courseDetails: any = {};
  lessons: any[] = [];
  selectedLesson: any = null;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private lessonService: LessonService

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId =params['id'];

      if (isNaN(this.courseId) || this.courseId <= 0) {
        console.error('Invalid course ID:', this.courseId);
        return;
      }
  
      this.loadCourseDetails();
      this.loadLessons();
    });
  }
  
  loadCourseDetails(): void {
    this.courseService.getCourseById(this.courseId).subscribe(data => {
      this.courseDetails = data;
    });
  }

  loadLessons(): void {
    this.lessonService.getLessons(this.courseId).subscribe(data => {
      this.lessons = data;
    });
  }

  downloadMaterial(lessonId: number): void {
    this.courseService.downloadMaterial(this.courseId, lessonId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `lesson-${lessonId}-material`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
