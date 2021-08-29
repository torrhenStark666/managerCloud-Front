import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Usuario } from '../model/login/usuario';

@Component({
  selector: 'navBar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user! : Usuario;

  constructor(
    private router : Router,
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe( x => this.user = x!)
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/Login']);
  }

}
