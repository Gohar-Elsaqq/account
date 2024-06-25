import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInKey = 'isLoggedIn';

  constructor(private http: HttpClient) {}

  login(body: any): Observable<any> {
    const url = `${environment.Account}/login`;
    const header = { 'Content-Type': 'application/json; charset=utf-8' };
    return this.http.post(url, JSON.stringify(body), { headers: header }).pipe(
      tap(() => localStorage.setItem(this.isLoggedInKey, 'true'))
    );
  }

  logout(): void {
    localStorage.removeItem(this.isLoggedInKey);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }
}
