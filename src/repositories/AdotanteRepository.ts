import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/Endereco";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  constructor(private repository: Repository<AdotanteEntity>) { }

  private async existeAdotanteComCelular(celular: string) {
    return await this.repository.findOne({ where: { celular } });
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    if (await this.existeAdotanteComCelular(adotante.celular)) {
      throw new RequisicaoRuim("Já existe um adotante com esse celular!");
    }
    this.repository.save(adotante);
  }
  async listaAdotantes(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }
  async atualizaAdotante(
    id: number,
    newData: AdotanteEntity
  ): Promise<void> {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });

    if (!adotanteToUpdate) {
      throw new NaoEncontrado("Adotante não encontrado!");
    }

    Object.assign(adotanteToUpdate, newData);

    await this.repository.save(adotanteToUpdate);

  }

  async deletaAdotante(
    id: number
  ): Promise<void> {
    const adotanteToRemove = await this.repository.findOne({ where: { id } });

    if (!adotanteToRemove) {
      throw new NaoEncontrado("Adotante não encontrado!");
    }

    await this.repository.remove(adotanteToRemove);

  }

  async atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity
  ): Promise<void> {
    const adotante = await this.repository.findOne({
      where: { id: idAdotante },
    });

    if (!adotante) {
      throw new NaoEncontrado("Adotante não encontrado!");
    }

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);
  }
}
