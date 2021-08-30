import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { Usuario } from '../model/login/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private login: Usuario;
  private token: String;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginService: UsuarioService
  ) {
    const user = this.loginService.userSubject.value;
    if (!user.role || !user.ativo) {
      if (this.authenticationService.currentUserValue) {
        this.loginService.getLogin(this.authenticationService.currentUserValue!)
      }
    }
    this.login = this.loginService.currentUserValue;
    this.token = this.authenticationService.authValue!;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let currentUser = this.loginService.currentUserValue;
    let token = this.authenticationService.authValue;

    if (currentUser && token) {
      if (currentUser.role) {

        let list = currentUser
          .role
          .modulos
          .filter((currentModule) => {
            return currentModule.descricao.toString() === route.url[0].path.toUpperCase();
          });
        if ((list.length === 1) || route.url[0].path.toUpperCase() === 'PERFIL') {
          return true;
        }
      }else{
        this.router.navigate(['/Authentication'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
    this.router.navigate(['/Authentication'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
