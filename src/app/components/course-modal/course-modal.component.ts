import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-course-modal',
  standalone: true,
  imports: [ MatFormFieldModule,MatDialogModule,FormsModule,ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './course-modal.component.html',
  styleUrl: './course-modal.component.css'
})
export class CourseModalComponent {
  courseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: any },
    private fb: FormBuilder
  ) {
    this.courseForm = this.fb.group({
      title: [data.course.title, Validators.required],
      description: [data.course.description, Validators.required]
    });
  }

  onSave(): void {
    if (this.courseForm.valid) {
      this.dialogRef.close(this.courseForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}