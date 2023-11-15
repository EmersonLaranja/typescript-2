import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
  criaPet(pet: PetEntity): void | Promise<void>;
  listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
  atualizaPet(id: number, pet: PetEntity): void | Promise<void>;

  deletaPet(id: number): void | Promise<void>;

  adotaPet(idPet: number, idAdotante: number): void | Promise<void>;

  buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(campo: Tipo, valor: PetEntity[Tipo]): Promise<PetEntity[]> | PetEntity[];
}
