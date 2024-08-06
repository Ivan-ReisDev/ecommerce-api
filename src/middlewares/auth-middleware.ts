import { NextFunction, Request, Response } from "express";
import config from "config"
import { verify } from "jsonwebtoken";

type TokenPayLoad  = {
    id: string;
    iat: number;
    exp: number;

}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({error: `Token inexistente`})
    }

    const [, token] = authorization.split(" ");

    try {
        const decored = verify(token, config.get<string>("KeySecretJWT"));
        if (!decored){
            return res.status(401).json({error: `Token inválido`})
        }

        const { id } = decored as TokenPayLoad;
        console.log(id)
        req.userId = id;
        next();

    } catch (error) {
        return res.status(401).json({error: `Acesso Negado!`})
    }




}