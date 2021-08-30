import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Cor } from 'src/app/core/model/cor/cor';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit, OnDestroy {

  listSubscription!: Subscription;
  list: Cor[] = []

  constructor(
    private base : BaseService<Cor>,
    private alert : AlertService,
    private router : Router
  ) {
    base.type = 'cores';
   }

  ngOnInit(): void {

    this.listSubscription = this.base.observable.subscribe(
      (res) => {
        this.list = res
      },
      (err) => {
        this.alert.error("Ocorreu um erro tentar listar esses objetos.");
      });
    this.base.type = 'cores';
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
    this.router.navigate(['Compras/Produtos/cores/edit/', id]);
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
