import db from "../index.js";

export async function verificar(req, res, next) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");
        const userSession = await db.collection("sessions").findOne({ sessionId: token });

        if (!authorization || !authorization.includes("Bearer ")) {
            res.status(401).send("Authorization token is missing");
            return
        }

        if (!userSession) {
            res.status(401).send("Invalid Authorization token");
            return
        }

        res.locals.userId = userSession.user;
        next();
    }
    catch (err) {
        console.log(err.message);
    }
}
//não consegui colocar a função pra funcionar, o user session nao batia com o token