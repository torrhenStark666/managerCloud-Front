import { Produto } from '../produto/produto';
import { Cor } from '../cor/cor';
import { SituacaoCompra } from '../pedidoCompra/pedido-compra';
import { Liberador } from '../liberador/liberador';
import { Solicitante } from '../solicitante/solicitante';

export class ItemPedidoCompra {

    idItemPedidoCompra!: number;
    liberador!: Liberador;
    solicitante!: Solicitante;
    produto!: Produto;
    cor!: Cor;
    quantidade!: number;
    nivel!: number;
    situacao!: SituacaoCompra;
    valor!: number;
    dataSituacao!: Date;
    excluido!: boolean;

}
