import { Request, Response } from "express";
import { SystemModel } from "../models/SystemModel"; 
import Logger from "../../config/logger";
import { Products } from "../utils/ProductsUtils";
interface System {
    about: string;
    linkedin: string;
    whatsapp: number; 
    github: string;
};

const productsUtils = new Products();

export class SystemController {
    async createInfo(req: Request, res:Response){
        const { about, linkedin, whatsapp, github } = req.body as System;
        try {
            const newInfo: System = {
                about,
                linkedin,
                whatsapp,
                github, 
            };
    
            const post = await SystemModel.create(newInfo);
            if(post){
                return res.status(201).send({message: `Informações criadas com sucesso!`});
            }
    
            return res.status(400).send({error: `Ocorreu um erro desconhecido.`});
    
        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ error: "Ocorreu um erro interno ao processar a requisição." });
        }
    };


    async updateInfo(req: Request, res:Response){
        const { idInfo ,about, linkedin, whatsapp, github } = req.body as {
            idInfo: string;
            about: string;
            linkedin: string;
            whatsapp: number; 
            github: string;
        };
    
        try {
            const info = await SystemModel.findOne({_id: idInfo});
        if(!info || info === undefined){
                return res.status(404).send({error: `Informações não encontradas.`});
            } else {
                info.about = about ?? info.about;
                info.linkedin = linkedin?? info.linkedin;
                info.whatsapp = whatsapp ?? info.whatsapp
                info.github = github ?? info.github;
                const update = await info.save();
                if(update) {
                    return res.status(200).send({message: `Atualização concluída com sucesso`});
                }
            };
            return res.status(400).send({error: `Ocorreu um erro desconhecido.`});
    
        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ error: "Ocorreu um erro interno ao processar a requisição." });
        }
    };

    async deleteInfo(req: Request, res: Response){
        const { idInfo } = req.params as { idInfo:string }
        try {
            const info = await SystemModel.findById(idInfo);
            if(!info || info === undefined){
                return res.status(404).send({error: `Informações não encontradas.`});
            }
    
            const deleteInfo = await SystemModel.findByIdAndDelete(idInfo);
    
            if(deleteInfo) {
                return res.status(200).send({message: `Informações excluidas com sucesso.`})
            }
    
            return res.status(400).send({error: `Erro desconhecido, tente novamente mais tarde!`});
            
        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ error: "Ocorreu um erro interno ao processar a requisição." });
        }
    
    };

    async getInfo(req:Request, res: Response){
        try {
            productsUtils.formatPrice(39.99);
            productsUtils.revertFormatPrice("49,90  ");
            const info = await SystemModel.find();
            return res.status(200).send(info);
    
        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ error: "Ocorreu um erro interno ao processar a requisição." });
        }
    
    }

} 










