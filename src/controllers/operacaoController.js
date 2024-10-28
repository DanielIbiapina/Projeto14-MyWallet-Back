import db from "../index.js";
import joi from "joi";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";

const operacaoSchema = joi.object({
  valor: joi.number().required().min(1),
  descricao: joi.string().required().min(1),
  positivo: joi.string().required(),
  time: joi.string(),
  userId: joi.any(), // Permitir ObjectId
});

export async function postOperacao(req, res) {
  const { valor, descricao, positivo } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      return res.sendStatus(401);
    }

    const operacao = {
      valor,
      descricao,
      positivo,
      time: dayjs().format("DD/MM"),
      userId: new ObjectId(session.userId),
    };

    const { error } = operacaoSchema.validate(operacao, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    // Salvando tanto na coleção operacao quanto na registros
    await db.collection("operacao").insertOne(operacao);
    await db.collection("registros").insertOne(operacao);

    res.sendStatus(201);
  } catch (err) {
    console.log("Erro ao criar operação:", err);
    res.sendStatus(500);
  }
}
