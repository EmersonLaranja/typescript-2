import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import PetEntity from "../../entities/PetEntity";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";
import { TipoRequestBodyPet } from "../../tipos/tiposPet";
yup.setLocale(pt);

const esquemaBodyPet: yup.ObjectSchema<Omit<TipoRequestBodyPet, "adotante">> =
    yup.object({
        nome: yup.string().defined().required(),
        porte: yup.string().oneOf(Object.values(EnumPorte)).optional(),
        especie: yup
            .string()
            .oneOf(Object.values(EnumEspecie))
            .required()
            .defined(),
        dataDeNascimento: yup.date().defined().required(),
        adotado: yup.boolean().defined().required(),
    });

export const middlewareValidadorBodyPet = async (
    req: Request<{}, {}, Partial<PetEntity>>,
    res: Response,
    next: NextFunction
) => {
    try {
        await esquemaBodyPet.validate(req.body, {
            abortEarly: false,
        });
        return next();
    } catch (erros) {
        const yupErrors = erros as yup.ValidationError;

        const validationErrors: Record<string, string> = {};
        yupErrors.inner.forEach((erros) => {
            if (!erros.path) return;
            validationErrors[erros.path] = erros.message;
        });
        return res.status(400).json({ erros: validationErrors });
    }
};