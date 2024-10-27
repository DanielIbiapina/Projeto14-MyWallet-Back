import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../index.js";

export async function signUp(req, res) {
  const user = req.body;

  const passwordHash = bcrypt.hashSync(user.password, 10);

  await db.collection("users").insertOne({ ...user, password: passwordHash });

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const token = uuid();

  const user = await db.collection("users").findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    await db.collection("sessions").insertOne({
      token,
      userId: user._id,
    });
    res.send({ token });
  } else {
    res.sendStatus(401);
  }
}
export async function meusDados(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const sessions = await db.collection("sessions").findOne({ token });

    const user = await db
      .collection("users")
      .findOne({ _id: sessions?.userId });

    delete user.password;
    delete user.confirme;

    res.send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
