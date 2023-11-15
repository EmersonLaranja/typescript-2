import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/Endereco";

export default interface InterfaceAdotanteRepository {
  criaAdotante(adotante: AdotanteEntity): void | Promise<void>;

  listaAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

  atualizaAdotante(id: number, adotante: AdotanteEntity): void | Promise<void>;

  deletaAdotante(id: number): void | Promise<void>;

  atualizaEnderecoAdotante(idAdotante: number, endereco: EnderecoEntity): void | Promise<void>;
}
