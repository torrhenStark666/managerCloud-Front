import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from 'src/app/core/model/login/usuario';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;
  private authSubject: BehaviorSubject<string | null>;
  public auth: Observable<string | null>;
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private router: Router,
  ) {

    let login = new Usuario();
    login.login = localStorage.getItem('currentUser') || "";

    this.currentUserSubject = new BehaviorSubject<Usuario | null>(login);
    this.currentUser = this.currentUserSubject.asObservable();

    this.authSubject = new BehaviorSubject<string | null>(localStorage.getItem('Authorization') || '');
    this.auth = this.authSubject.asObservable();

   }

   public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  public get authValue(): string | null {
    return this.authSubject.value;
  }

  cadastrar(usuario : Usuario){
    return this.http
      .post<any>(
        `${this.baseUrl}/auth/signup`,
        usuario,
        {
          responseType: "json",
          observe: 'response'
        }).pipe(map(
          (res : HttpResponse<any>) =>{
            this.router.navigateByUrl('/Authentication');
            return res;
          },
          ( err: string ) =>{
            this.alert.clear();
            this.alert.error(err);
          }
        ))
  }

  autenticar(usuario: Usuario, lembrar: boolean) {
    return this.http
      .post<string>(`${this.baseUrl}/auth`,
        {
          'login': usuario.login,
          'senha': usuario.senha
        },
        {
          responseType: 'json',
          observe: 'response'
        }).pipe(map(
          (res: HttpResponse<string>) => {
            if(!res.body){
              return;
            }

            if (lembrar) {
              localStorage.setItem(res.body.split(':')[0], res.body.split(':')[1]);
              localStorage.setItem('currentUser', usuario.login);
            }
            let token = res.body.split(':')[1];
            this.currentUserSubject.next(usuario);
            this.authSubject.next(token);
            return res;
          },
          ( err: string ) =>{
            this.alert.clear();
            this.alert.error(err);
            this.router.navigateByUrl('/Authentication');
          }
        ))
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Authorization');
    this.currentUserSubject.next(null);
    this.authSubject.next(null);
  }

}
