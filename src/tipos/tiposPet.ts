import PetEntity from "../entities/PetEntity";

type TipoRequestBodyPet = Omit<PetEntity, "id">;

type TipoResponseBodyPet = {
  data?:
    | Pick<PetEntity, "id" | "nome" | "especie"| "porte">
    | Pick<PetEntity, "id" | "nome" | "especie"| "porte">[];

  error?: unknown;
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
