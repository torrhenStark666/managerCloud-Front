import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  baseUrl = environment.baseUrl;
  subject : BehaviorSubject<T[]>;
  observable : Observable<T[]>;
  type : String = "";

  constructor(
    private http : HttpClient,
    private alert : AlertService,
  ) {
    this.subject = new BehaviorSubject<T[]>([]);
    this.observable = this.subject.asObservable();
  }

  checkType(){
    return this.type === ""
  }

  getType(){

  }

  getAll(){
    if(this.checkType()){
      return null;
    }

    return this
        .http
        .get<T[]>(`${ this.baseUrl }/${this.type}`)
        .subscribe(data =>{
          this.subject.next(data);
        },
        err =>{
          this.alert.error((err === "Unknown Error" ? 'Sem conexão com o servidor!' : err));
        });
  }

  getbyId(id : number){
    if(this.checkType()){
      return null;
    }

    return this.http.get<T>(`${ this.baseUrl }/${this.type}/${id}`);
  }

  delete(id: number) {

    if(this.checkType()){
      return null;
    }

    return this.http.delete(`${ this.baseUrl }/${this.type}/${id}`);
  }

  save(obj : T){

    if(this.checkType()){
      return null;
    }

    return this.http.post<T>(`${ this.baseUrl }/${this.type}`, obj);
  }

  update(obj : T, id : number){

    if(this.checkType()){
      return null;
    }

    return this.http.put<T>(`${ this.baseUrl }/${this.type}/${id}`, obj);
  }

}
