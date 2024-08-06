import { Request, Response } from "express";
import Logger from "../../../config/logger";
import UserModuleService from "./user-module-service";
import { CustomError } from "./user-module-service";

const getInstanceServiceUser = () => {
    return new UserModuleService();
}

export const createUser = async (req: Request, res: Response) => {
    const service = getInstanceServiceUser();

    try {
        const props = req.body;

        await service.create(props);

        return res.status(201).send({ message: 'Usuário criado com sucesso.' });

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.status).send({ error: error.message });
        }
        Logger.error(error);
        return res.status(500).send({ error: 'Ocorreu um erro interno ao processar a requisição.' });
    }
};

export const currentUser = async (req: Request, res: Response) => {
    const service = getInstanceServiceUser();

    try {
        const id = req.userId;
        const user = await service.currentUser(id);
        return res.status(201).send(user);

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.status).send({ error: error.message });
        }
        Logger.error(error);
        return res.status(500).send({ error: 'Ocorreu um erro interno ao processar a requisição.' });
    }
};

export const listUsers = async (req: Request, res: Response) => {
    const service = getInstanceServiceUser();

    try {
        const page = parseInt(req.params.page) || 1;

        const { users, totalPages } = await service.listUsers(page);

        return res.status(200).send({
            users,
            totalPages
        });

    } catch (error) {
        Logger.error(error);
        return res.status(500).send({ error: 'Ocorreu um erro ao listar os usuários, tente novamente.' });
    }
};
