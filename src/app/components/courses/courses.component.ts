import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatOptionModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatIconModule,MatSnackBarModule 
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  userId: any;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private snackBar: MatSnackBar // ✅ הוספת MatSnackBar
  ) {
  }

  ngOnInit(): void {
    
    this.courseService.getCourses().subscribe((data: any[]) => {
      this.courses = data;
    });
  }

  courseDetailes(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }

  enroll(courseId: number): void {
      this.showMessage('✅ נרשמת בהצלחה לקורס!');
    
  }

  leave(courseId: number): void {
    this.showMessage('❌ עזבת את הקורס בהצלחה.');
 
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'סגור', {
      duration: 3000, // 3 שניות
      verticalPosition: 'top', 
      horizontalPosition: 'center'
    });
  }
}
