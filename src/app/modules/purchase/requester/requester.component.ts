import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Solicitante } from 'src/app/core/model/solicitante/solicitante';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SolicitanteService } from 'src/app/shared/services/solicitante.service';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.css']
})
export class RequesterComponent implements OnInit, OnDestroy {

  listSubscription!: Subscription;
  list: Solicitante[] = []

  constructor(
    private base: SolicitanteService,
    private alert: AlertService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.listSubscription = this.base.solicitantes.subscribe(
      (res) => {
        this.list = res
        console.log(JSON.stringify(res));
      },
      (err) => {
        this.alert.error("Ocorreu um erro tentar listar esses objetos.");
      });

    this.base.getAll();

  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }

  update(id: number) {
    this.router.navigate(['Compras/Solicitantes/edit/', id]);
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
