import { Contato } from "../contatos/contato";
import { Endereco } from "../endereco/endereco";

export class Empresa {

  idEmpresa!: number;
  contatos!: Contato[];
  endereco!: Endereco;
  cnpj!: String;
  nomeFantasia!: String;
  razaoSocial!: String;
  incricaoEstadual!: String;
  incricaoMunicipal!: String;
  excluido!: boolean;
  collapsed:                  boolean = true;

}
