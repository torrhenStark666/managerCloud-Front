import { Banco } from '../banco/banco';
import { Baixa } from '../baixa/baixa';

export class MovimentacaoBancaria {

    idMovimentacaoBancaria!: number;
    banco: Banco = new Banco;
    baixas: Baixa[] = [];
    dataMovimentacao!: Date;
    descricao!: string;
    valor!: number;
    saldoFinal!: number;
    debitoCredito!: string;
    excluido: boolean = false;
}
