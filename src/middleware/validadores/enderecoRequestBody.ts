import * as yup from "yup";
import EnderecoEntity from "../../entities/Endereco";
import { NextFunction, Request, Response } from "express";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

export const esquemaBodyEndereco: yup.ObjectSchema<Omit<EnderecoEntity, "id">> =
    yup.object({
        cidade: yup.string().defined().required(),
        estado: yup.string().defined().required().max(20),
    });

export const middlewareValidadorBodyEndereco = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await esquemaBodyEndereco.validate(req.body, { abortEarly: false });
        return next();
    } catch (erros) {
        const yupErrors = erros as yup.ValidationError;

        const validationErrors: Record<string, string> = {};
        yupErrors.inner.forEach((erro) => {
            if (!erro.path) return;
            validationErrors[erro.path] = erro.message;
        });
        return res.status(400).json({ error: validationErrors });
    }
};
