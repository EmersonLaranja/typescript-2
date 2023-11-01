import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id">;

type TipoResponseBodyAdotante = {
  data?:
    | Pick<AdotanteEntity, "id" | "nome" | "celular">
    | Pick<AdotanteEntity, "id" | "nome" | "celular">[];

  error?: unknown;
};

type TipoRequestParamsAdotante = {
  id?: string;
};

export {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
};
