import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Liberador } from 'src/app/core/model/liberador/liberador';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LiberadorService {

  baseUrl = environment.baseUrl;
  liberadoreSubject: BehaviorSubject<Liberador[]>;
  liberadores: Observable<Liberador[]>;

  liberadorSubject: BehaviorSubject<Liberador>;
  liberador: Observable<Liberador>;

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private loginService : UsuarioService
  ) {
    this.liberadoreSubject = new BehaviorSubject<Liberador[]>([]);
    this.liberadores = this.liberadoreSubject.asObservable();
    this.liberadorSubject = new BehaviorSubject<Liberador>(new Liberador());
    this.liberador = this.liberadorSubject.asObservable();
    this.getAll();
  }

  getAll() {

    this.alert.clear();
    return this
      .http
      .get<Liberador[]>(`${this.baseUrl}/liberadores`)
      .subscribe(data => {
        this.liberadoreSubject.next(data);
        let liberadorLogado = this.liberadoreSubject.value.find(currentLiberador => currentLiberador.login.idLogin === this.loginService.userSubject.value.idLogin)
        if(liberadorLogado && liberadorLogado.ativo){
          this.liberadorSubject.next(liberadorLogado);
        }else{
          this.liberadorSubject.next(null!);
        }
      },
        err => {
          this.alert.error((err === "Unknown Error" ? 'Sem conexão com o servidor!' : err));
        });

  }

  getbyId(id: number) {
    return this.http.get<Liberador>(`${this.baseUrl}/liberadores/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/liberadores/${id}`);
  }

  save(liberador: Liberador) {
    return this.http.post(`${this.baseUrl}/liberadores`, liberador);
  }

  update(liberador: Liberador, id : Number) {
    return this.http.put(`${this.baseUrl}/liberadores/${id}`, liberador);
  }
}
