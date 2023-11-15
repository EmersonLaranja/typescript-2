import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import EnumPorte from "../enum/EnumPorte";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../tipos/tiposPet";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export default class PetController {
  constructor(private repository: PetRepository) { }
  async criaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>) {
    const { adotado, especie, dataDeNascimento, nome, porte } = <PetEntity>(
      req.body
    );

    const novoPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
      porte
    );

    await this.repository.criaPet(novoPet);
    return res.status(EnumHttpStatusCode.CREATED).json({ dados: { id: novoPet.id, especie, nome, porte } });
  }

  async listaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>) {
    const listaDePets = await this.repository.listaPet();
    const dados = listaDePets.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte !== null ? pet.porte : undefined,
      };
    });
    return res.status(EnumHttpStatusCode.OK).json({ dados });
  }

  async atualizaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>) {
    const { id } = req.params;
    await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
  }

  async deletaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>) {
    const { id } = req.params;

    await this.repository.deletaPet(Number(id));

    return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, adotante_id } = req.params;

    await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );


    return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
  }

  async buscaPetPorCampoGenerico(req: Request, res: Response) {
    const { campo, valor } = req.query;
    const listaDePets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string
    );
    return res.status(EnumHttpStatusCode.OK).json(listaDePets);
  }
}
