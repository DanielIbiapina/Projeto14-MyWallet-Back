import { Router } from 'express';
import { getRegistros } from '../controllers/registrosController.js';

const registrosRouter = Router();
registrosRouter.get("/registros", getRegistros);

export default registrosRouter;