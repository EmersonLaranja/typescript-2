import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import EnumPorte from "../enum/EnumPorte";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../tipos/tiposPet";

export default class PetController {
  constructor(private repository: PetRepository) { }
  async criaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>) {
    const { adotado, especie, dataDeNascimento, nome, porte } = <PetEntity>(
      req.body
    );

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ erros: "Especie inválida" });
    }

    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ erros: "Porte inválido" });
    }
    const novoPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
      porte
    );

    await this.repository.criaPet(novoPet);
    return res.status(201).json({ dados: { id: novoPet.id, especie, nome, porte } });
  }

  async listaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>) {
    const listaDePets = await this.repository.listaPet();

    return res.status(200).json({ dados: listaDePets });
  }

  async atualizaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      return res.status(404).json({ erros: { mensagem: message } });
    }
    return res.sendStatus(204);
  }

  async deletaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ erros: { mensagem: message } });
    }
    return res.sendStatus(204);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, adotante_id } = req.params;

    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async buscaPetPorCampoGenerico(req: Request, res: Response) {
    const { campo, valor } = req.query;
    const listaDePets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string
    );
    return res.status(200).json(listaDePets);
  }
}
