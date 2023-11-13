import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export class ManipulaErros extends Error {
    readonly statusCode: EnumHttpStatusCode;
    constructor(mensagem: string, status: number) {
        super(mensagem);
        this.statusCode = status;
    }
}

export class NaoEncontrado extends ManipulaErros {
    constructor(mensagem: string) {
        super(mensagem, EnumHttpStatusCode.NOT_FOUND);
    }
}
export class RequisicaoRuim extends ManipulaErros {
    constructor(mensagem: string) {
        super(mensagem, EnumHttpStatusCode.BAD_REQUEST);
    }
}