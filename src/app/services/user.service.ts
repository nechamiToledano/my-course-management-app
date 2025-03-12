import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'console';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';
  
  constructor(private http: HttpClient) {}

   getHeaders(): HttpHeaders {
    const token = this.getToken();
    return token
    ? new HttpHeaders().set('Authorization', `Bearer ${token}`)
    : new HttpHeaders();  }

  getUserId(): number | null {
    
    const userId = localStorage.getItem('userId');
    return userId ? JSON.parse(userId) : null;
  }
  getToken(){
  const token = localStorage.getItem('token');
  
    return token;
}

  getRole() {
  const role = localStorage.getItem('role');
    return role;
}

  // Only accessible to admin
  getUsers(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.apiUrl, { headers });
  }

  getUserById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  updateUser(id: number, userData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, userData, { headers });
  }

  removeUser(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
