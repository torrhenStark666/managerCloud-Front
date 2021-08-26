import { Modulo } from '../modulo/modulo';

export class Role {

    public idRole!: number;
    public modulos!: Modulo[];
    public descricao!: string;
    public ativo!: boolean;
    public excluido : boolean = false;
    public collapsed : boolean = true;
}
