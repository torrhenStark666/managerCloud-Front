import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/model/login/usuario';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Usuario = new Usuario();
  lembrar: boolean;
  returnUrl: string;
  loading: boolean = false;
  erro!: String;

  constructor(
    private alert: AlertService,
    private authentication: AuthenticationService,
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.lembrar = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Compras/Fornecedores';
  }

  ngOnInit(): void {

    let currentUser = this.authentication.currentUserValue;

    this.lembrar = false;
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Compras/Fornecedores';
    let tokien = this.authentication.authValue;
    if (tokien) {
      this.loading = !this.loading;
      this.usuarioService.getLogin(currentUser!)
        .then(data => {
          this.router.navigate([this.returnUrl]).finally( () =>{ this.loading = !this.loading; });
        });
    }
  }

  acessar(login : Usuario){

    this.alert.clear();
    this.loading = true;
    this.authentication.autenticar(this.login, this.lembrar)
      .pipe(first())
      .subscribe(
        (data) => {
          this.usuarioService.getLogin(this.login)
            .then(data => {
              this.router.navigate([this.returnUrl]).finally( () =>{ this.loading = !this.loading; });
            });

        },
        error => {
          this.alert.error(error === 'Unknown Error' ? 'Sem Conexão com o Servidor!' : error);
          this.loading = false;
        }
      );
  }

}
