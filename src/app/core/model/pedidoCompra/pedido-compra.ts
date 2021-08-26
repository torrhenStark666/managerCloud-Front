import { Fornecedor } from '../fornecedor/fornecedor';
import { ItemPedidoCompra } from '../ItemPedidoCompra/item-pedido-compra';
import { CondicaoPagamento } from '../condicaoPagamento/condicao-pagamento';
import { FormaPagamento } from '../formaPagamento/forma-pagamento';
import { Solicitante } from '../solicitante/solicitante';

export enum SituacaoCompra {
    'SOLICITADO' = 'SOLICITADO',
    'LIBERADO' = 'LIBERADO',
    'PARCIALMENTE_LIBERADO' = 'PARCIALMENTE_LIBERADO',
    'NEGADO' = 'NEGADO',
    'ENTREGUE' = 'ENTREGUE',
    'PARCIALMENTE_ENTREGUE' = 'PARCIALMENTE_ENTREGUE',
}

export namespace SituacaoCompra {

    export function values() {
      return Object.keys(SituacaoCompra).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }

export class PedidoCompra {

    idPedidoCompra!: number;
    fornecedor!: Fornecedor;
    itensPedidoCompra!: ItemPedidoCompra[];
    condicaoPagamento!: CondicaoPagamento;
    formaPagamento!: FormaPagamento;
    solicitante!: Solicitante;
    contaContabil!: number;
    sifFob!: number;
    valorFrete!: number;
    dataPrevistaEntrega!: Date;
    valorTotal!: number;
    situacao!: SituacaoCompra;
    dataSolicitacao!: Date;
    dataEntrega!: Date;
    excluido: boolean = false;
    collapsed: boolean = true;

}
