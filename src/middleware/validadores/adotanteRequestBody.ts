import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";

yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<
    Omit<TipoRequestBodyAdotante, "endereco">
> = yup.object({

    nome: yup.string().defined().required(),
    celular: yup
        .string()
        .defined()
        .matches(
            /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm,
            "Celular inválido"
        ),
    foto: yup.string().optional(),
    senha: yup.string().defined().min(6).required(),
});

const middlewareValidadorBodyAdotante = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await esquemaBodyAdotante.validate(req.body, { abortEarly: false });
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

export { middlewareValidadorBodyAdotante };

