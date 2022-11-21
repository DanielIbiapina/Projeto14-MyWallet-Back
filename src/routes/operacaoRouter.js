import { Router } from 'express';
import { postOperacao } from "../controllers/operacaoController.js"
import { verificar } from '../middlewares/verificador.js';

const operacaoRouter = Router();
operacaoRouter.post("/operacao",  postOperacao);

export default operacaoRouter;