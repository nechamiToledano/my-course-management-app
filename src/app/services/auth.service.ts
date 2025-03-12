import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient,private userService:UserService) {}

  setUserId(id: number): void {
    if (typeof window !== 'undefined' && window.localStorage) {

    localStorage.setItem('userId',JSON.stringify( id));}
  }
  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {

    localStorage.setItem('token',token);}
  }
  setRole(role: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {

    localStorage.setItem('role',role);}
  }


  register(user: { name: string, role: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }


  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Use this method to handle login/register and set token after successful response
  handleAuthResponse(response: any): void {
    if (response && response.userId&&response.token&&response.role) {
      this.setUserId(response.userId);
      this.setToken(response.token);
      this.setRole(response.role);


    }
    else console.log('Invalid');
    
  }
}
