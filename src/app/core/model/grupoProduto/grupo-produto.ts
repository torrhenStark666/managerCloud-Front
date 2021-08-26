import { SubgrupoProduto } from '../subgrupoProduto/subgrupo-produto';

export class GrupoProduto {

    idGrupoProduto!: number;
    descricao!: string;
    ativo: boolean = true;
    excluido!: boolean;
    subgrupoProduto!: SubgrupoProduto[];

}
