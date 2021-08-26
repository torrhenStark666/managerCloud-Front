import { TituloPagar } from '../tituloPagar/titulo-pagar';

export class ParcelaPagar {

    idParcelaPagar!: number;
    tituloPagar!: TituloPagar;
    parcela!: string;
    dataVencimento!: Date;
    valorOriginal!: number;
    valorPagar!: number;
    percentualDesconto!: number;
    valorDesconto!: number;
    percentualJuro!: number;
    valorJuro!: number;

}
