import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CourseService } from "../../services/course.service";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { CourseManagementService } from "../../services/course-management.service";
import { MatDialog } from '@angular/material/dialog';
import { CourseModalComponent } from '../course-modal/course-modal.component';

@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [MatFormFieldModule, MatToolbarModule, MatCardModule, FormsModule, ReactiveFormsModule, 
    MatInputModule, MatButtonModule, RouterModule
  ],
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseManagementComponent implements OnInit {
  courses: any[] = [];
  newCourse: any = { title: '', description: '' };

  constructor(private courseService: CourseService, private snackBar: MatSnackBar, private dialog: MatDialog, private courseManagementService: CourseManagementService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: any[]) => {
      this.courses = data;
    });
  }

  addCourse(): void {
    const dialogRef = this.dialog.open(CourseModalComponent, {
      data: { course: { ...this.newCourse } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseManagementService.addCourse(result).subscribe(() => {
          this.loadCourses();
          this.showSnackbar("✅ Course added successfully!", "Close");
          this.newCourse = { title: '', description: '' };
        });
      }
    });
  }

  editCourse(course: any): void {
    
    const dialogRef = this.dialog.open(CourseModalComponent, {
      data: { course: { ...course } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.courseManagementService.updateCourse(course.id, course).subscribe(() => {
          this.loadCourses();
          this.showSnackbar("✅ Course updated successfully!", "Close");
          this.loadCourses();

        });

      }
      
    });
  }

  deleteCourse(courseId: number): void {
    this.courseManagementService.deleteCourse(courseId).subscribe(() => {
      this.loadCourses();
      this.showSnackbar("🗑 Course deleted successfully!", "Close");
    });
  }

  showSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}