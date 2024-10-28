import db from "../index.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function getRegistros(req, res) {
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

    // Buscando registros apenas do usuário atual
    const registros = await db
      .collection("registros")
      .find({ userId: new ObjectId(session.userId) })
      .toArray();

    res.send(registros);
  } catch (err) {
    console.log("Erro:", err);
    res.sendStatus(500);
  }
}
