import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { ILogin, IRegister } from '../interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  register(registerData: IRegister): Observable<any> {
    return this._httpClient.post<any>(`${baseUrl}/api/users`, registerData);
  }

  login(loginData: ILogin): Observable<any> {
    return this._httpClient.post<any>(`${baseUrl}/api/users/auth`, loginData);
  }

  authorized(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  }
}
