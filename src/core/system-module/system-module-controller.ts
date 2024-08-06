import { Request, Response } from "express";
import { ISystem } from "./system-module-interface";
import Logger from "../../../config/logger";
import ServiceModuleService from "./system-module-service";
import { CustomError } from "./system-module-service";

const getInstanceServiceSystem = () => {
    return new ServiceModuleService();
}

export const createInfo = async (req: Request, res: Response) => {
    const service = getInstanceServiceSystem();

    const props = req.body as ISystem;
    try {
        const response = await service.insert(props);
        return res.status(201).send({ message: 'Informações criadas com sucesso!', data: response });

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.status).send({ error: error.message });
        }
        Logger.error(error);
        return res.status(500).send({ error: "Ocorreu um erro interno ao processar a requisição." });
    }
};

export const updateInfo = async (req: Request, res: Response) => {
    const service = getInstanceServiceSystem();

    try {
        const props = req.body;
        const response = await service.update(props);
        return res.status(200).send({ message: 'Atualização concluída com sucesso', data: response });

    } catch (error: any) {
        if (error instanceof CustomError) {
            return res.status(error.status).send({ error: error.message });
        }
        Logger.error(error);
        return res.status(500).send({ error: 'Ocorreu um erro interno ao processar a requisição.' });
    }
};

export const deleteInfo = async (req: Request, res: Response) => {
    const service = getInstanceServiceSystem();

    try {
        const { idInfo } = req.params;
        const response = await service.delete(idInfo);
        return res.status(200).send({ message: 'Informações excluídas com sucesso.', data: response });

    } catch (error: any) {
        if (error instanceof CustomError) {
            return res.status(error.status).send({ error: error.message });
        }
        Logger.error(error);
        return res.status(500).send({ error: "Ocorreu um erro interno ao processar a requisição." });
    }
};

export const getInfo = async (req: Request, res: Response) => {
    const service = getInstanceServiceSystem();

    try {
        const response = await service.getInfos();
        return res.status(200).send(response);

    } catch (error) {
        Logger.error(error);
        return res.status(500).send({ error: "Ocorreu um erro interno ao processar a requisição." });
    }
};
