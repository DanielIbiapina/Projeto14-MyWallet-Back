import db from "../index.js"

export async function getRegistros(req, res){
    try {
        const registros = await db.collection("registros").find().toArray();
        if (!registros) {
          return res.sendStatus(404);
        }
    
        res.send(registros);
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }

        
      
}