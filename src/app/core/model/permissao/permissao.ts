import { Modulo } from '../modulo/modulo';

export enum TipoPermissao {
    VISUALIZAR,
    EDITAR,
    CRIAR,
    EXCLUIR,
}

export namespace TipoPermissao {

    export function values() {
        return Object.keys(TipoPermissao).filter(
            (type) => isNaN(<any>type) && type !== 'values'
        );
    }
}
export class Permissao {

    constructor(descricao : TipoPermissao){
        this.descricao = descricao;
    }

    public idPermissao: number;
    public modulo: Modulo;
    public descricao: TipoPermissao;
    public excluido: boolean = false;
}
