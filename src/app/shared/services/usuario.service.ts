import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/core/model/login/usuario';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl = environment.baseUrl;
  loginSubject: BehaviorSubject<Usuario[]>;
  login: Observable<Usuario[]>;

  userSubject : BehaviorSubject<Usuario>;
  user : Observable<Usuario>;

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private authService: AuthenticationService
  ) {

    this.loginSubject = new BehaviorSubject<Usuario[]>([]);
    this.login = this.loginSubject.asObservable();

    this.userSubject = new BehaviorSubject<Usuario>(new Usuario());
    this.user = this.userSubject.asObservable();

   }

   public get currentUserValue(): Usuario {
    return this.userSubject.value;
  }

  getAll() {
    this.alert.clear();
    return this
      .http
        .get<Usuario[]>(`${ this.baseUrl }/logins`)
          .subscribe(data =>{
            this.loginSubject.next(data);
          },
          err =>{
            this.alert.error((err === "Unknown Error" ? 'Sem conexão com o servidor!' : err));
          });

  }

  getbyId(id: number) {
    return this.http.get<Usuario>(`${this.baseUrl}/logins/${id}`);
  }

  getLogin(login : Usuario){
    console.log('está aqui no getLogin')
    return this.http
      .post<Usuario>(`${this.baseUrl}/logins/findLogin`, login)
      .toPromise()
      .then( data =>{
        console.log('deu bom o getLogin')
        this.userSubject.next(data);
      })

  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/logins/${id}`);
  }

  save(login: Usuario) {
    return this.http.post(`${this.baseUrl}/logins`, login);
  }

  update(login: Usuario) {
    return this.http.put(`${this.baseUrl}/logins/${login.idLogin}`, login);
  }
}
