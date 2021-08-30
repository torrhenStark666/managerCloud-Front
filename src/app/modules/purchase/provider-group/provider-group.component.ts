import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { GrupoFornecedor } from 'src/app/core/model/grupoFornecedor/grupo-fornecedor';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-provider-group',
  templateUrl: './provider-group.component.html',
  styleUrls: ['./provider-group.component.css']
})
export class ProviderGroupComponent implements OnInit, OnDestroy {

  listSubscription!: Subscription;
  list: GrupoFornecedor[] = []

  constructor(
    private base : BaseService<GrupoFornecedor>,
    private alert : AlertService,
    private router : Router
  ) {
    base.type = 'grupos-fornecedores';
   }

  ngOnInit(): void {

    this.listSubscription = this.base.observable.subscribe(
      (res) => {
        this.list = res
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
      () =>{
        subscription?.unsubscribe();
      });

  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }

  update(id: number){
    this.router.navigate(['Compras/Fornecedores/grupo/edit/', id]);
  }

  delete(id: number) {
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
