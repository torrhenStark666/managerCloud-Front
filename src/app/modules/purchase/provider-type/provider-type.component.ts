import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { TipoFornecedor } from 'src/app/core/model/tipoFornecedor/tipo-fornecedor';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-provider-type',
  templateUrl: './provider-type.component.html',
  styleUrls: ['./provider-type.component.css']
})
export class ProviderTypeComponent implements OnInit, OnDestroy {


  listSubscription!: Subscription;
  list: TipoFornecedor[] = []

  constructor(
    private base: BaseService<TipoFornecedor>,
    private alert: AlertService,
    private router: Router
  ) {
    base.type = 'tipos-fornecedores';
  }

  ngOnInit(): void {
    this.base.type = 'tipos-fornecedores';
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

  update(id: number) {
    this.router.navigate(['Compras/Fornecedores/tipo/edit/', id]);
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
