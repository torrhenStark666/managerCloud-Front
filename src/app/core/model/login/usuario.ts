import { Empresa } from '../empresa/empresa';
import { Role } from '../role/role';

export class Usuario {
  public idLogin!: bigint
  public role!: Role;
  public empresa!: Empresa;
  public login!: string;
  public senha!: string;
  public excluido! : boolean;
  public ativo!: boolean;
  public collapsed!: boolean;
}
