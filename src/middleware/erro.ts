import { NextFunction, Request, Response } from "express";
import { ManipulaErros } from "../utils/manipulaErros";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export const erroMiddleware = (
    error: ManipulaErros,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode =
        error.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

    const mensagem = error.statusCode
        ? error.message
        : "Erro interno do servidor";
    res.status(statusCode).json({ mensagem });
};