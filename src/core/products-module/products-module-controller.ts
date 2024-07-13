import { Request, Response } from "express";
import { ProductsInterface } from "./products-module-interface";
import ProductsModuleService from "./products-module-service";
import Logger from "../../../config/logger";



const getInstanceService = () => {
    return new ProductsModuleService();
}

export const createProducts = async (req: Request, res: Response) => {
    const service = getInstanceService();

    try {
        const props = req.body as ProductsInterface;

        const response = await service.insert(props);

        return res.status(201).json({ msg: 'Produto cadastrado com sucesso.', product: response });

    } catch (error: any) {
        if (error.message === 'Preencha todos os campos.' || error.message.includes('já existe')) {
            return res.status(400).json({ error: error.message });
        }

        Logger.error(error);
        return res.status(500).send({ error: 'Ocorreu um erro interno ao processar a requisição.' });
    }
};



