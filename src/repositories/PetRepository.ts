import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import PetEntity from "../entities/PetEntity";
import { NaoEncontrado } from "../utils/manipulaErros";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {
  private petRepository: Repository<PetEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;

  constructor(
    petRepository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>
  ) {
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository;
  }

  async criaPet(pet: PetEntity): Promise<void> {
    await this.petRepository.save(pet);
  }
  async listaPet(): Promise<PetEntity[]> {
    return await this.petRepository.find();
  }
  async atualizaPet(
    id: number,
    newData: PetEntity
  ): Promise<void> {
    const petToUpdate = await this.petRepository.findOne({ where: { id } });

    if (!petToUpdate) {
      throw new NaoEncontrado("Pet não encontrado");
    }

    Object.assign(petToUpdate, newData);

    await this.petRepository.save(petToUpdate);

  }

  async deletaPet(id: number): Promise<void> {
    const petToRemove = await this.petRepository.findOne({ where: { id } });

    if (!petToRemove) {
      throw new NaoEncontrado("Pet não encontrado");

    }

    await this.petRepository.remove(petToRemove);

  }

  async adotaPet(
    idPet: number,
    idAdotante: number
  ): Promise<void> {
    const pet = await this.petRepository.findOne({ where: { id: idPet } });
    if (!pet) {
      throw new NaoEncontrado("Pet não encontrado");

    }

    const adotante = await this.adotanteRepository.findOne({
      where: { id: idAdotante },
    });
    if (!adotante) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    pet.adotante = adotante;
    pet.adotado = true;
    await this.petRepository.save(pet);
  }

  async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo]
  ): Promise<PetEntity[]> {
    const pets = await this.petRepository.find({ where: { [campo]: valor } });
    return pets;
  }
}
