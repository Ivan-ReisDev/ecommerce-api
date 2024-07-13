import { Request, Response } from "express";
import Logger from "../../../config/logger";
import UserModuleService from "./user-module-service";


const getInstanceServiceUser = () => {
    return new UserModuleService();
}

export const createUser = async (req: Request, res: Response) => {
    const service = getInstanceServiceUser();

    try {
        const props = req.body;

        const user = await service.create(props);

        if (user) {
            return res.status(201).send({ message: 'Usuário criado com sucesso.' });
        }

        return res.status(400).send({ error: 'Ocorreu um erro ao criar o usuário, tente novamente.' });

    } catch (error) {
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













