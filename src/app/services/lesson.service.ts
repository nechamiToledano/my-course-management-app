import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient,private userService:UserService) {}

  private getHeaders(): HttpHeaders {
    return this.userService.getHeaders()

  }

  // ✅ Get all lessons of a specific course
  getLessons(courseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers: this.getHeaders() });
  }

  // ✅ Get a lesson by ID
  getLessonById(courseId: number, lessonId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }

  // ✅ Create a new lesson (Teachers only)
  createLesson(courseId: number, lessonData: { title: string; content: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lessonData, { headers: this.getHeaders() });
  }

  // ✅ Update a lesson by ID (Teachers only)
  updateLesson(courseId: number, lessonId: number, lessonData: { title: string; content: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lessonData, { headers: this.getHeaders() });
  }

  // ✅ Delete a lesson by ID (Teachers only)
  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }
}
