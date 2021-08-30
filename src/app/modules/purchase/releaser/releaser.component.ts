import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Liberador } from 'src/app/core/model/liberador/liberador';
import { AlertService } from 'src/app/shared/services/alert.service';
import { LiberadorService } from 'src/app/shared/services/liberador.service';

@Component({
  selector: 'app-releaser',
  templateUrl: './releaser.component.html',
  styleUrls: ['./releaser.component.css']
})
export class ReleaserComponent implements OnInit, OnDestroy {


  listSubscription!: Subscription;
  list: Liberador[] = []

  constructor(
    private base: LiberadorService,
    private alert: AlertService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.listSubscription = this.base.liberadores.subscribe(
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
