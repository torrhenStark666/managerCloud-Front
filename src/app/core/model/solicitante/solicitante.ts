import { Usuario } from '../login/usuario';
import { GrupoProduto } from '../grupoProduto/grupo-produto';
import { GrupoSolicitante } from '../grupoSolicitante/grupo-solicitante';

export class Solicitante {

    constructor(login : Usuario){
        this.login = login;
    }

    idSolicitante!: number;
    login :                     Usuario;
    grupoProduto!: GrupoProduto;
    grupoSolicitante!: GrupoSolicitante;
    dataInicio!: Date;
    dataFim!: Date;
    limiteInicial!: number;
    limiteFinal!: number;
    nivel!: number;
    valorDisponivel!: number;
    ativo:                      boolean = true;
    excluido!: boolean;
    collapsed!: boolean;

}
