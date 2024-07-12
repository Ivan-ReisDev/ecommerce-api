import { Request, Response } from "express";
import Logger from "../../config/logger";
import { ProductModel } from "../models/ProductsModel";
import { Products } from "../utils/ProductsUtils";

const productsUtils = new Products();

interface ProductsInterface {
    name: string;
    category: string;
    price: string;
    description: string;
    amount:number
}

interface NewProductsInterface {
    name: string;
    category: string;
    price: number;
    description: string;
    amount:number
}

export class ProductsController {
    async createProducts(req: Request, res: Response){
        try {
            const {name, category, price, description, amount} = req.body as ProductsInterface;

            if(!name || !category || !price || !description || !amount) {
                return res.status(400).json({error: `Preencha todos os campos.`});
            }

            const product = await ProductModel.findOne({name: name});
            
            if(product){
                return res.status(409).json({error: `O produto ${name} já existe no banco de dados.`})
            }

            const newProduct:NewProductsInterface = {
                name,
                category,
                price: productsUtils.revertFormatPrice(price),
                description,
                amount
            }

            const createPorduct = await ProductModel.create(newProduct);
            return createPorduct ?  res.status(201).json({msg: `produto cadastrado com sucesso.`}):
            res.status(400).json({error: `Erro ao cadastrar produto!`});

        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ error: "Ocorreu um erro interno ao processar a requisição." });
        }
    }



}