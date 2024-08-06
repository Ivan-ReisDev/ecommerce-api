import { Request, Response } from "express";
import Logger from "../../../config/logger";
import AuthModuleService from "./auth-module-service";
import { CustomError } from "./auth-module-service"

const getInstanceServiceUser = () => {
    return new AuthModuleService();
}

export const login = async (req: Request, res: Response) => {
    const service = getInstanceServiceUser();
    try {
        const props = req.body;
        const login = await service.authenticate(props);

        return res.status(201).send({ token: login });

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.status).send({ error: error.message });
        }
        Logger.error(error);
        return res.status(500).send({ error: 'Ocorreu um erro interno ao processar a requisição.' });
    }
};

