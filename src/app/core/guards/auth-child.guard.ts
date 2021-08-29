import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthChildGuard implements CanActivate {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = this.authenticationService.currentUserValue;
    let tokien = this.authenticationService.authValue;
    console.log(state.url);
    if (currentUser && tokien) {
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
