import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/v1/auth`;

  constructor( private http: HttpClient, private tokenService: TokenService) { }

  loginAndProfile(email: string, password: string) {
    return this.login(email, password)
    .pipe(
      switchMap(res => this.profile())
    );
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    );
  }

  profile() {
    // 00000000000000000000000000000000000
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // }
    });
  }
}
