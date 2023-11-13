import express, { RequestHandler } from "express";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";
import { middlewareValidadorBodyAdotante } from "../middleware/validadores/adotanteRequestBody";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

const validateAdotanteBody: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyAdotante(req, res, next);

const validateEnderecoBody: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyEndereco(req, res, next);

router.post("/", validateAdotanteBody, (req, res) =>
  adotanteController.criaAdotante(req, res)
);
router.get("/", (req, res) => adotanteController.listaAdotantes(req, res));

router.put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res));

router.delete("/:id", (req, res) =>
  adotanteController.deletaAdotante(req, res)
);

router.patch("/:id", validateEnderecoBody, (req, res) =>
  adotanteController.atualizaEnderecoAdotante(req, res)
);

export default router;
