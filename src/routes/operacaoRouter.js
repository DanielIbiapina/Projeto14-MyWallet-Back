import { Router } from 'express';
import { postEntrada, postSaida } from '../controllers/operacaoController.js';

const operacaoRouter = Router();
operacaoRouter.post("/operacao", postEntrada);
operacaoRouter.post("/operacao", postSaida)

export default operacaoRouter;