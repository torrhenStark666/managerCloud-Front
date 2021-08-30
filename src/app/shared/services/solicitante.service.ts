import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Solicitante } from 'src/app/core/model/solicitante/solicitante';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitanteService {


  baseUrl = environment.baseUrl;
  solicitanteSubject: BehaviorSubject<Solicitante[]>;
  solicitantes: Observable<Solicitante[]>;

  solicitantesSubject: BehaviorSubject<Solicitante>;
  solicitante: Observable<Solicitante>;

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private loginService: UsuarioService
  ) {
    this.solicitanteSubject = new BehaviorSubject<Solicitante[]>([]);
    this.solicitantes = this.solicitanteSubject.asObservable();

    this.solicitantesSubject = new BehaviorSubject<Solicitante>(new Solicitante());
    this.solicitante = this.solicitantesSubject.asObservable();
    this.getAll();
  }

  ngOnInit() {

  }

  getAll() {
    this.alert.clear();

    return this
      .http
      .get<Solicitante[]>(`${this.baseUrl}/solicitantes`)
      .subscribe(data => {
        this.solicitanteSubject.next(data);
        let solicitanteLogado = this.solicitanteSubject.value.find(currentSolicitante => currentSolicitante.login.idLogin === this.loginService.userSubject.value.idLogin)
        if(solicitanteLogado && solicitanteLogado.ativo){
          this.solicitantesSubject.next(solicitanteLogado);
        }else{
          this.solicitantesSubject.next(null!);
        }
      },
      err =>{
        this.alert.error((err === "Unknown Error" ? 'Sem conexão com o servidor!' : err));
      });

  }

  getbyId(id: number) {
    return this.http.get<Solicitante>(`${this.baseUrl}/solicitantes/${id}`);
  }

  getByPropierties(solicitante : Solicitante){
    return this.http.post<Solicitante[]>(`${this.baseUrl}/solicitantes/find`, solicitante);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseUrl}/solicitantes/${id}`);
  }

  save(Solicitante: Solicitante) {
    return this.http.post(`${this.baseUrl}/solicitantes`, Solicitante);
  }

  update(Solicitante: Solicitante, id : Number) {
    return this.http.put(`${this.baseUrl}/solicitantes/${id}`, Solicitante);
  }

}
