import { Natureza } from '../natureza/natureza';
import { MovimentacaoBancaria } from '../movimentacaoBancaria/movimentacao-bancaria';
import { TipoLancamento } from '../tipoLancamento/tipo-lancamento';
import { ParcelaPagar } from '../parcelaPagar/parcela-pagar';
import { ParcelaReceber } from '../parcelaReceber/parcela-receber';

export class Baixa {

    idBaixa!: number;
    natureza!: Natureza;
    dataBaixa!: Date;
    valorBaixa!: number;
    decressimo!: number;
    diasAtraso!: number;
    tipoPagarReceber!: string;
    tipoLancamento!: TipoLancamento;
    parcelasPagar!: ParcelaPagar[];
    parcelasReceber!: ParcelaReceber[];
    excluido!: boolean;

}
