import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Store } from 'store';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import jwtDecode from 'jwt-decode';

interface AuthResponse {
  id: number;
  name: string;
  username: string;
  token: string;
}

@Injectable()
export class AuthService {

  auth$: Observable<User>;

  isAuthenticated$: Observable<boolean>;

  tokenTimer: any;

  constructor(private store: Store, private http: HttpClient) {
    this.auth$ = this.store.select<User>('user');
    this.isAuthenticated$ = this.auth$.pipe(
      map(user => !!user)
    )
  }

  createUser(name: string, username: string, password: string) {
    return this.http.post<AuthResponse>('/user/register-user', { name, username, password }).pipe(
      catchError((error) => throwError(() => error)),
      tap((data) => {
        const decodedJwtData: any = this.decodeJwt(data.token);
        this.handleAuth(
          decodedJwtData.id,
          decodedJwtData.name,
          decodedJwtData.username,
          data.token,
          new Date(decodedJwtData.exp * 1000)
        )
      })
    )
  }

  loginUser(username: string, password: string) {
    return this.http.post<AuthResponse>('/auth/login', { username, password }).pipe(
      catchError((error) => throwError(() => error)),
      tap((data) => {
        const decodedJwtData: any = this.decodeJwt(data.token);
        this.handleAuth(
          decodedJwtData.id,
          decodedJwtData.name,
          decodedJwtData.username,
          data.token,
          new Date(decodedJwtData.exp * 1000)
        )
      })
    )
  }

  handleAuth(id: number, name: string, username: string, token: string, expiryDate: Date) {
    const user: User = new User(id, name, username, token, expiryDate);
    this.store.set('user', user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  decodeJwt(token: string) {
    return jwtDecode(token);
  }

  autoLogin() {
    const user: User = JSON.parse(<string>localStorage.getItem('user'));

    if (!user) {
      return this.store.set('user', undefined);
    }

    const loadedUser = new User(
      user.id,
      user.name,
      user.username,
      user.tokenId,
      new Date(user.expiryDate)
    );

    if (loadedUser.token) {
      this.store.set('user', user);

      const durationLeft =
        new Date(user.expiryDate).getTime() - new Date().getTime();
      return this.autoLogout(durationLeft);
    }

   return this.store.set('user', undefined);
  }

  autoLogout(durationLeft: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, durationLeft);
  }

  logout() {
    console.log('User Logged Out');
    this.store.set('user', undefined);
    localStorage.removeItem('user');
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }

    this.tokenTimer = null;
  }
}
