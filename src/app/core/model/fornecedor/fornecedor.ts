import { GrupoFornecedor } from '../grupoFornecedor/grupo-fornecedor';
import { TipoFornecedor } from '../tipoFornecedor/tipo-fornecedor';
import { Endereco } from '../endereco/endereco';
import { Contato } from '../contatos/contato';
import { PedidoCompra } from '../pedidoCompra/pedido-compra';
import { Produto } from '../produto/produto';

export class Fornecedor {
    idFornecedor:               number;
    grupoFornecedor:            GrupoFornecedor;
    tipoFornecedor:             TipoFornecedor;
    contatos:                   Contato[];
    endereco:                   Endereco;
    razaoSocial:                string;
    nomeFantasia:               string;
    cnpj:                       string;
    cpf:                        string;
    inscricaoEstadual:          string;
    dataUltimaCompra:           Date;
    pontuacao:                  number;
    telefoneFixo:               string;
    celular:                    string;
    excluido:                   boolean;
    collapsed:                  boolean = true;
}
