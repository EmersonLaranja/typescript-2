import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id">;

type TipoResponseBodyAdotante = {
  data?: Pick<AdotanteEntity, "id" | "nome" | "celular">;
};

export { TipoRequestBodyAdotante, TipoResponseBodyAdotante };
