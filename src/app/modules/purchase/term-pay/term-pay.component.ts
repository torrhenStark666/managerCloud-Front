import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CondicaoPagamento } from 'src/app/core/model/condicaoPagamento/condicao-pagamento';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-term-pay',
  templateUrl: './term-pay.component.html',
  styleUrls: ['./term-pay.component.css']
})
export class TermPayComponent implements OnInit, OnDestroy {

  listSubscription!: Subscription;
  list: CondicaoPagamento[] = [];

  constructor(
    private base : BaseService<CondicaoPagamento>,
    private alert : AlertService,
    private router : Router
  ) {
    this.base.type = 'condicao-pagamentos';
   }

  ngOnInit(): void {
    this.base.type = 'condicao-pagamentos';
    this.listSubscription = this.base.observable.subscribe(
      (res) => {
        this.list = res;
      },
      (err) => {
        this.alert.error("Ocorreu um erro tentar listar esses objetos.");
      });
    this.base.type = 'condicao-pagamentos';
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
    this.router.navigate(['/Compras/Pagamentos/term/edit/', id]);
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
