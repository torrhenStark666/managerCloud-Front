import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Liberador } from 'src/app/core/model/liberador/liberador';
import { Usuario } from 'src/app/core/model/login/usuario';
import { PedidoCompra, SituacaoCompra } from 'src/app/core/model/pedidoCompra/pedido-compra';
import { Solicitante } from 'src/app/core/model/solicitante/solicitante';
import { AlertService } from 'src/app/shared/services/alert.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LiberadorService } from 'src/app/shared/services/liberador.service';
import { SolicitanteService } from 'src/app/shared/services/solicitante.service';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  listSubscription!: Subscription;
  list: PedidoCompra[] = [];
  situacaoCompra = SituacaoCompra;
  solicitante!: Solicitante;
  liberador!: Liberador;
  login!: Usuario;

  constructor(
    private base: BaseService<PedidoCompra>,
    private liberadorService: LiberadorService,
    private solicitanteService: SolicitanteService,
    private loginService: UsuarioService,
    private alert: AlertService,
    private router: Router
  ) {
    this.base.type = 'pedido-compras';
    this.solicitanteService.solicitante.subscribe(data => {
      if(data.idSolicitante){
        this.solicitante = data;
      }
    });
    this.liberadorService.liberador.subscribe(data => {
      if(data.idLiberador){
        this.liberador = data;
      }
    });
    this.solicitanteService.getAll();
    this.liberadorService.getAll();
    this.login = this.loginService.userSubject.value;
  }

  ngOnInit(): void {

    this.base.type = 'pedido-compras';
    this.listSubscription = this.base.observable.subscribe(
      (res) => {
        this.list = res
      },
      (err) => {
        this.alert.error("Ocorreu um erro tentar listar esses objetos.");
      })
    const subscriptionBase = this.base.getAll()?.pipe(first()).subscribe(
      (res) => {
        this.list = res
      },
      (err) => {
        this.alert.error("Ocorreu um erro tentar listar esses objetos.");
      },
      () => {
        subscriptionBase?.unsubscribe();
      });

  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }

  details(id: number) {

  }

  update(id: number) {
    this.router.navigate(['/Compras/edit/:id', id]);
  }

  delete(id: number) {

    const filter = this.list.filter((value) => { return value.idPedidoCompra === id });

    if (filter.length > 0) {
      if (filter[0].situacao === SituacaoCompra.SOLICITADO) {
        this.alert.error("O pedido não está na situação SOLICITADO");
        return;
      }
    }

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
  public desfazerCompleto(pedidoCompra: PedidoCompra) {
    this.base.type = 'pedido-compras';
    if (pedidoCompra.situacao === SituacaoCompra.LIBERADO ||
      pedidoCompra.situacao === SituacaoCompra.NEGADO ||
      pedidoCompra.situacao === SituacaoCompra.PARCIALMENTE_LIBERADO) {

      pedidoCompra.itensPedidoCompra.forEach(value => {
        value.situacao = SituacaoCompra.SOLICITADO;
        value.dataSituacao = new Date();
      });

      pedidoCompra.situacao = SituacaoCompra.SOLICITADO;

      this.base.update(pedidoCompra, pedidoCompra.idPedidoCompra)?.pipe(first()).subscribe(
        data =>{ },
        err =>{ }
      );

      return;

    }
    if (pedidoCompra.situacao === SituacaoCompra.ENTREGUE) {

      pedidoCompra.dataEntrega = null!;
      pedidoCompra.situacao = SituacaoCompra.LIBERADO;

      pedidoCompra.itensPedidoCompra.forEach(value => {
        value.situacao = SituacaoCompra.LIBERADO;
        value.dataSituacao = new Date();

      });


      this.base.update(pedidoCompra, pedidoCompra.idPedidoCompra)?.pipe(first()).subscribe(
        data =>{ },
        err =>{ }
      );

      return;

    }

    if (pedidoCompra.situacao === SituacaoCompra.PARCIALMENTE_ENTREGUE) {

      pedidoCompra.dataEntrega = null!;
      pedidoCompra.situacao = SituacaoCompra.PARCIALMENTE_LIBERADO;

      pedidoCompra.itensPedidoCompra.forEach(value => {

        if (value.situacao === SituacaoCompra.ENTREGUE) {
          value.situacao = SituacaoCompra.LIBERADO;
          value.dataSituacao = new Date();
        }

      });
      this.base.type = 'pedido-compras';
      this.base.update(pedidoCompra, pedidoCompra.idPedidoCompra)?.pipe(first()).subscribe(
        data =>{ },
        err =>{ }
      );

      return;

    }

  }

  public entregarCompleto(pedidoCompra: PedidoCompra) {
    if (pedidoCompra.situacao === SituacaoCompra.LIBERADO ||
      pedidoCompra.situacao === SituacaoCompra.PARCIALMENTE_LIBERADO) {

      pedidoCompra.itensPedidoCompra.forEach(value => {

        if (value.situacao === SituacaoCompra.LIBERADO) {
          value.situacao = SituacaoCompra.ENTREGUE;
          value.dataSituacao = new Date();
        }

      });

      if (pedidoCompra.situacao === SituacaoCompra.LIBERADO) {
        pedidoCompra.situacao = SituacaoCompra.ENTREGUE;
      } else {
        pedidoCompra.situacao = SituacaoCompra.PARCIALMENTE_ENTREGUE;
      }

      pedidoCompra.dataEntrega = new Date();
      this.base.type = 'pedido-compras';
      this.base.update(pedidoCompra, pedidoCompra.idPedidoCompra)?.pipe(first()).subscribe(
        data =>{ },
        err =>{ }
      );

      return;
    }
  }

  public liberarCompleto(pedidoCompra: PedidoCompra) {
    if (this.liberador.valorDisponivel !== null) {
      if (this.liberador.valorDisponivel <= pedidoCompra.valorTotal) {
        this.alert.error('Valor do Pedido maior que o valor disponível para o Liberador.');
        return;
      } else {
        this.liberador.valorDisponivel -= pedidoCompra.valorTotal;
      }
    }

    pedidoCompra.situacao = SituacaoCompra.LIBERADO;
    pedidoCompra.itensPedidoCompra.forEach(value => {
      value.liberador = this.liberador;
      value.situacao = SituacaoCompra.LIBERADO;
      value.dataSituacao = new Date();
    });
    this.base.type = 'pedido-compras';
    this.base.update(pedidoCompra, pedidoCompra.idPedidoCompra)?.pipe(first()).subscribe(
      data =>{ },
      err =>{ }
    );

  }

  public negarCompleto(pedidoCompra: PedidoCompra) {

    pedidoCompra.situacao = SituacaoCompra.NEGADO;
    pedidoCompra.itensPedidoCompra.forEach(value => {
      value.liberador = this.liberador;
      value.situacao = SituacaoCompra.NEGADO;
      value.dataSituacao = new Date();
    });
    this.base.type = 'pedido-compras';
    this.base.update(pedidoCompra, pedidoCompra.idPedidoCompra)?.pipe(first()).subscribe(
      data =>{ },
      err =>{ }
    );

  }

  verificarSituacao(pedidoCompra: PedidoCompra) {

    let countLiberado = 0;
    let countNegado = 0;
    let countEntregue = 0;
    let countSolicitado = 0;

    pedidoCompra.itensPedidoCompra.forEach(value => {
      if (value.situacao === SituacaoCompra.LIBERADO) {
        countLiberado++;
      } else if (value.situacao === SituacaoCompra.NEGADO) {
        countNegado++;
      } else if (value.situacao === SituacaoCompra.ENTREGUE) {
        countEntregue++;
      } else if (value.situacao === SituacaoCompra.SOLICITADO) {
        countSolicitado++;
      }
    });

    if (countEntregue > 0 && countEntregue != pedidoCompra.itensPedidoCompra.length) {
      pedidoCompra.situacao = SituacaoCompra.PARCIALMENTE_ENTREGUE;
    } else if (countEntregue === pedidoCompra.itensPedidoCompra.length) {
      pedidoCompra.situacao = SituacaoCompra.ENTREGUE;
    } else if (countNegado === pedidoCompra.itensPedidoCompra.length) {
      pedidoCompra.dataEntrega = null!;
      pedidoCompra.situacao = SituacaoCompra.NEGADO;
    } else if (countLiberado > 0 && countLiberado != pedidoCompra.itensPedidoCompra.length) {
      pedidoCompra.dataEntrega = null!;
      pedidoCompra.situacao = SituacaoCompra.PARCIALMENTE_LIBERADO;
    } else if (countLiberado === pedidoCompra.itensPedidoCompra.length) {
      pedidoCompra.dataEntrega = null!;
      pedidoCompra.situacao = SituacaoCompra.LIBERADO;
    } else {
      pedidoCompra.dataEntrega = null!;
      pedidoCompra.situacao = SituacaoCompra.SOLICITADO;
    }

  }
}
