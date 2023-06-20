import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let url = environment.apiUrl;
    let httpHeaders = new HttpHeaders();


    return this.authService.auth$.pipe(
      take(1),
      exhaustMap(user => {
        const modifiedUrl = url + request.url;
        

        if(!user) {
          return next.handle(request.clone({ url: modifiedUrl }));
        }

        httpHeaders = httpHeaders.set("Authorization",  user.tokenId as string)
        return next.handle(request.clone({ headers: httpHeaders, url: modifiedUrl }));
      })
    )

    // return next.handle(request);
  }
}
