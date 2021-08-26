import { ItemPedidoCompra } from '../ItemPedidoCompra/item-pedido-compra';
import { Liberador } from '../liberador/liberador';

export class ItemAutorizado {
    idItemAutorizado!: number;
    itemPedidoCompra!: ItemPedidoCompra;
    liberador!: Liberador;
    dataLiberacao!: Date;
    situacao!: string;
    excluido : boolean = false;
    collapsed : boolean = true;

}
