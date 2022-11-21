import { Router } from 'express';
import { meusDados } from '../controllers/authController.js';
import { signUp, signIn } from '../controllers/authController.js';

const authRouter = Router();
authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.get("/meus-dados", meusDados)

export default authRouter;

