import { TipoProduto } from '../tipoProduto/tipo-produto';
import { GrupoProduto } from '../grupoProduto/grupo-produto';
import { SubgrupoProduto } from '../subgrupoProduto/subgrupo-produto';
import { Fornecedor } from '../fornecedor/fornecedor';
import { Cor } from '../cor/cor';

export enum TipoCalculoValor{
    'MEDIO' = 'MEDIO',
    'MAIOR_VALOR' = 'MAIOR_VALOR',
    'MENOR_VALOR' = 'MENOR_VALOR',
}

export enum TipoConversor{
    'MULTIPLICAR' = 'MULTIPLICAR',
    'DIVIDIR' = 'DIVIDIR',
    'SOMAR' = 'SOMAR',
    'SUBTRAIR' = 'SUBTRAIR',

}

export class Produto {

    idProduto!: number;
    tipoProduto!: TipoProduto;
    grupoProduto!: GrupoProduto;
    subGrupoProduto!: SubgrupoProduto;
    fornecedores!: Fornecedor[];
    cores!: Cor[];
    contaContabil!: number;
    descricao!: string;
    unidadeMedida!: string;
    unidadeMedidaTwo!: string;
    conversoAbudade!: TipoConversor;
    fatorConversor!: number;
    codigoBarrasFornecedor!: string;
    codigoBarras!: string;
    peso!: number;
    altura!: number;
    largura!: number;
    quantidadeMax!: number;
    quantidadeMin!: number;
    pontoPedido!: number;
    loteEconomico!: number;
    dataUltimaCompra!: Date;
    pontuacao!: number;
    calculoValor!: TipoCalculoValor;
    valor:                  number = 0.0;
    excluido!: boolean;
    collapsed:              boolean = true;

}
