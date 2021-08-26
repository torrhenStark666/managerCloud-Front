import { DiasParcelas } from '../diasParcelas/dias-parcelas';

export class CondicaoPagamento {

    diasParcelas!: DiasParcelas[];
    idCondicaoPagamento!: number;
    descricao!: string;
    quantidadeVezes!: number;
    juros!: number;
    desconto!: number;
    prazoMedio!: number;
    contarPagarReceber!: string;
    excluido!: boolean;

}
