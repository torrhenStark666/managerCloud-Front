import { Fornecedor } from '../fornecedor/fornecedor';
import { CondicaoPagamento } from '../condicaoPagamento/condicao-pagamento';
import { FormaPagamento } from '../formaPagamento/forma-pagamento';
import { TipoLancamento } from '../tipoLancamento/tipo-lancamento';

export class TituloPagar {

    idTituloPagar!: number;
    fornecedor!: Fornecedor;
    condicaoPagamento!: CondicaoPagamento;
    formaPagamento!: FormaPagamento;
    tipoLancamento!: TipoLancamento;
    dataInclusao!: Date;
    dataLancamento!: Date;
    valorTotal!: number;
    excluido!: boolean;

}
