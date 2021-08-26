import { Contato } from '../contatos/contato';
import { Endereco } from '../endereco/endereco';

export class Cliente {

    idCliente!: number;
  //  grupoCliente:            GrupoCliente;
   // tipoFornecedor:             TipoFornecedor;
    //  grupoCliente:            GrupoCliente;
  // tipoFornecedor:             TipoFornecedor;
  contatos!: Contato[];
  //  regrasNegocio:              RegraNegocio[];
    //  regrasNegocio:              RegraNegocio[];
  endereco!: Endereco;
  //  setor:                      Setor;
  //  representante:              Representante;
    //  setor:                      Setor;
  //  representante:              Representante;
  razaoSocial!: string;
    nomeFantasia!: string;
    cnpj!: string;
    cpf!: string;
    inscricaoEstadual!: string;
    dataUltimaCompra!: Date;
    bloqueadorFaturamento!: boolean;
    bloqueadorVendas!: boolean;
    bloqueadoInativo!: boolean;
    consumidorFinal!: string;
    pontuacao!: number;
    telefoneFixo!: string;
    celular!: string;
    email!: string;
    emailXml!: string;
    excluido!: boolean;

}
