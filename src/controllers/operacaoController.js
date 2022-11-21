import db from "../index.js"
import joi from "joi";
import dayjs from "dayjs"

export async function postEntrada(req, res){
        const {valor, descricao, positivo} = req.body;

        const messageSchema = joi.object({
            valor: joi.number().required().min(1),
            descricao: joi.string().required().min(1),
            positivo: joi.string(),
            time: joi.string(),
          });

        const message = {
          valor,
          descricao,
          positivo,
          time: dayjs().format("HH:mm:ss"),
        };
      
        try {
          const { error } = messageSchema.validate(message, { abortEarly: false });
      
          if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
          }
      
          await db.collection("operacao").insertOne(message);
          await db.collection("registros").insertOne(message);
      
          res.sendStatus(201);
        } catch (err) {
          console.log(err);
          res.sendStatus(500);
        }
      
}
export async function postSaida(req, res){

}