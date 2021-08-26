import { Role } from '../role/role';
import { Permissao } from '../permissao/permissao';

export enum TipoModulo {
    'COMPRAS', 
    'VENDAS', 
    'FINANCEIRO', 
    'CONFIG', 
    'FATURAMENTO', 
    'EXPEDICAO', 
    'CRIACAO', 
    'CONTABILIDADE', 
    'PCP'
}

export namespace TipoModulo {

    export function values() {
      return Object.keys(TipoModulo).filter(
        (type) => isNaN(<any>type) && type !== 'values'
      );
    }
  }

export class Modulo {

    public idModulo: number;
    public role: Role;
    public permissoes: Permissao[];
    public descricao: TipoModulo;
    public excluido : boolean = false;

}
