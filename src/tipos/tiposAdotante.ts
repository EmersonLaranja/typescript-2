import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;

type TipoResponseBodyAdotante = {
  dados?:
  | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">
  | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[];

  erros?: unknown;
};

type TipoRequestParamsAdotante = {
  id?: string;
};

export {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
};
