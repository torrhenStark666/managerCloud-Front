import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { TipoProduto } from 'src/app/core/model/tipoProduto/tipo-produto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit, OnDestroy {

  listSubscription!: Subscription;
  list: TipoProduto[] = []

  constructor(
    private base: BaseService<TipoProduto>,
    private alert: AlertService,
    private router: Router
  ) {
    base.type = 'tipos-produtos';
  }

  ngOnInit(): void {
    this.base.type = 'tipos-produtos';
    this.listSubscription = this.base.observable.subscribe(
      (res) => {
        this.list = res
        console.log(JSON.stringify(res));
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
    this.router.navigate(['Compras/Produtos/tipo/edit/', id]);
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
