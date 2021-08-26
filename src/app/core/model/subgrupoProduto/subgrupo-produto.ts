import { GrupoProduto } from '../grupoProduto/grupo-produto';

export class SubgrupoProduto {

    idSubgrupoProduto!: number;
    grupoProduto!: GrupoProduto;
    descricao!: string;
    ativo:                      boolean = true;
    excluido!: boolean;

}
