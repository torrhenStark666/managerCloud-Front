import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormaPagamento } from 'src/app/core/model/formaPagamento/forma-pagamento';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-form-pay',
  templateUrl: './form-pay.component.html',
  styleUrls: ['./form-pay.component.css']
})
export class FormPayComponent implements OnInit, OnDestroy {

  listSubscription!: Subscription;
  list: FormaPagamento[] = []

  constructor(
    private base : BaseService<FormaPagamento>,
    private alert : AlertService,
    private router : Router
  ) {
    base.type = 'formas-pagamentos';
   }

  ngOnInit(): void {

    this.listSubscription = this.base.observable.subscribe(
      (res) => {
        this.list = res
      },
      (err) => {
        this.alert.error("Ocorreu um erro tentar listar esses objetos.");
      });
    this.base.type = 'formas-pagamentos';
    const subscription = this.base.getAll()?.pipe(first()).subscribe(
      (res) => {
        this.list = res
      },
      (err) => {
        console.log(err);
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
    this.router.navigate(['Compras/Pagamentos/forma/edit/', id]);
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
