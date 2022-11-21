import { Router } from 'express';
import { getRegistros } from '../controllers/registrosController.js';
import { verificar } from '../middlewares/verificador.js';

const registrosRouter = Router();
registrosRouter.get("/registros", getRegistros);

export default registrosRouter;