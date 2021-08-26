import { Usuario } from '../login/usuario';
import { GrupoProduto } from '../grupoProduto/grupo-produto';
import { GrupoSolicitante } from '../grupoSolicitante/grupo-solicitante';

export class Liberador {

    idLiberador!: number;
    login!: Usuario;
    grupoProduto!: GrupoProduto;
    grupoSolicitante!: GrupoSolicitante;
    dataInicio!: Date;
    dataFim!: Date;
    limiteInicial!: number;
    limiteFinal!: number;
    nivel!: number;
    valorDisponivel!: number;
    collapsed:                  boolean = true;
    ativo!: boolean;
    excluido!: boolean;
}
