import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet = Omit<PetEntity, "id">;

type TipoResponseBodyPet = {
  dados?:
  | Pick<PetEntity, "id" | "nome" | "especie" | "porte">
  | Pick<PetEntity, "id" | "nome" | "especie" | "porte">[];

};

type TipoRequestParamsPet = {
  id?: string;
  pet_id?: string;
  adotante_id?: string;
};

export {
  TipoRequestBodyPet,
  TipoRequestParamsPet,
  TipoResponseBodyPet,
};
