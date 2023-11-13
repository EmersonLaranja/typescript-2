import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import { NextFunction, Request, Response } from "express";

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
    } catch (error) {
        const yupErrors = error as yup.ValidationError;

        const validationErrors: Record<string, string> = {};
        yupErrors.inner.forEach((error) => {
            if (!error.path) return;
            validationErrors[error.path] = error.message;
        });
        return res.status(400).json({ error: validationErrors });
    }
};

export { middlewareValidadorBodyAdotante };

