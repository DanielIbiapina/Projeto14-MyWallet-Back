import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../index.js";
import { ObjectId } from "mongodb";

export async function signUp(req, res) {
  const user = req.body;

  const passwordHash = bcrypt.hashSync(user.password, 10);

  await db.collection("users").insertOne({ ...user, password: passwordHash });

  res.sendStatus(201);
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    const token = uuid();

    await db.collection("sessions").deleteMany({ userId: user._id });

    await db.collection("sessions").insertOne({
      token,
      userId: user._id,
    });

    res.send({ token });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function meusDados(req, res) {
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

    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(session.userId) });

    if (!user) {
      return res.sendStatus(404);
    }

    delete user.password;
    delete user.confirme;

    res.send(user);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
