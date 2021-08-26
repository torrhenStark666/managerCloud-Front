import { TituloPagar } from '../tituloPagar/titulo-pagar';
import { CondicaoPagamento } from '../condicaoPagamento/condicao-pagamento';
import { FormaPagamento } from '../formaPagamento/forma-pagamento';
import { TipoLancamento } from '../tipoLancamento/tipo-lancamento';
import { Natureza } from '../natureza/natureza';

export class RenegociacaoPagar {

    idRenegociacaoPagar!: number;
    tituloPagar!: TituloPagar;
    condicaoPagamento!: CondicaoPagamento;
    formaPagamento!: FormaPagamento;
    tipoLancamento!: TipoLancamento;
    natureza!: Natureza;
    dataNegociacao!: Date;
    valorOriginal!: number;
    valorRenegociado!: number;
    excluido!: boolean;

}
