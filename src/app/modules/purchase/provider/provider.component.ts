import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Fornecedor } from 'src/app/core/model/fornecedor/fornecedor';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit, OnDestroy {

  listSubscription!: Subscription;
  list: Fornecedor[] = []

  constructor(
    private base : BaseService<Fornecedor>,
    private alert : AlertService,
    private router : Router
  ) {
    this.base.type = 'fornecedores';
   }

  ngOnInit(): void {
    this.base.type = 'fornecedores';
    this.listSubscription = this.base.observable.subscribe(
      (res) => {
        this.list = res;
      },
      (err) => {
        this.alert.error("Ocorreu um erro tentar listar esses objetos.");
      });

    const subscription = this.base.getAll()?.pipe(first()).subscribe(
      (res) => {
        this.list = res
      },
      (err) => {
        this.alert.error("Ocorreu um erro tentar listar esses objetos.");
      },
      () => {
        subscription?.unsubscribe();
      });
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }

  details(id : number){

  }

  update(id : number){
    this.router.navigate(['/Compras/Fornecedores/edit/', id]);
  }

  delete(id : number){
    this.base.delete(id)
    ?.pipe(first())
      .subscribe(
        (res) => {
          this.base.getAll();
        },
        (err) => {
          this.alert.error("Ocorreu um erro teste excluir o item :c");
        });
  }

}
