import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb';
//import cors from 'cors'

const app = express();
dotenv.config();
app.use(express.json());
//app.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URI);



try{
   await mongoClient.connect();
   console.log("mongoCLient conectado! :D")
}catch(err){
    console.log(err);
}

const db = mongoClient.db("myWallet")

app.listen(process.env.PORT, ()=> console.log(`Servidor rodando na porta ${process.env.PORT}`))