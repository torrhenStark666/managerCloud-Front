import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Produto } from 'src/app/core/model/produto/produto';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {


  listSubscription!: Subscription;
  list: Produto[] = [];

  constructor(
    private base : BaseService<Produto>,
    private alert : AlertService,
    private router : Router
  ) {
    this.base.type = 'produtos';
   }

  ngOnInit(): void {
    this.base.type = 'produtos';
    this.listSubscription = this.base.observable.subscribe(
      (res) => {
        this.list = res;
      },
      (err) => {
        this.alert.error("Ocorreu um erro tentar listar esses objetos.");
      });
    this.base.type = 'produtos';
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
    this.router.navigate(['/Compras/Produtos/edit/', id]);
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
