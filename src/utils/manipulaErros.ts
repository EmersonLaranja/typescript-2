import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export class ManipulaErros extends Error {
    readonly statusCode: EnumHttpStatusCode;
    constructor(mensagem: string, status: number) {
        super(mensagem);
        this.statusCode = status;
    }
}