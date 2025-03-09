import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class CourseManagementService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient,private userService:UserService) {}
  private getHeaders(): HttpHeaders {
    return this.userService.getHeaders()

  }
  getCourses(): Observable<any> {
    const headers = this.getHeaders()
    return this.http.get(this.apiUrl, { headers });
  }

  addCourse(course: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.post(this.apiUrl, course, { headers });
  }

  updateCourse(courseId: number, course: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.put(`${this.apiUrl}/${courseId}`, course, { headers });
  }

  deleteCourse(courseId: number): Observable<any> {
    const headers = this.getHeaders()
    return this.http.delete(`${this.apiUrl}/${courseId}`, { headers });
  }
   }