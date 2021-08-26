import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin': '*'
      }
    });

   let currentUser = this.authenticationService.currentUserValue;
        let tokien = this.authenticationService.authValue;

    if (currentUser && tokien) {
            request = request.clone({
                setHeaders: {
                    Authorization: tokien
                }
            });
        }
    return next.handle(request);
  }
}
