import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './core/model/login/usuario';
import { AuthenticationService } from './shared/services/authentication.service';
import { UsuarioService } from './shared/services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser!: Usuario;
  auth!: string;
  title = 'Manager CLOUD';

  constructor(
    private router : Router,
    private authenticationService: AuthenticationService,
    private loginService: UsuarioService
  ){

    this.authenticationService.currentUser.subscribe(x => {this.currentUser = x!});
    this.authenticationService.auth.subscribe(x => this.auth = x!);

  }

  authenticated() {
    const currentUser = this.loginService.currentUserValue;
    const token = this.authenticationService.authValue;

    if (currentUser && token) {
      if(currentUser.role && currentUser.idLogin){
        return true;
      }
      return false;
    }
    // not logged in so redirect to login page with the return url
    return false;
  }

}
