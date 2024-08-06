import { Products } from "../../utils/ProductsUtils";
import { ISystem } from "./system-module-interface";
import { SystemModel } from "./system-module-schema";

const productsUtils = new Products();

export class CustomError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export default class ServiceModuleService {

    async insert(props: ISystem) {
        const { about, linkedin, whatsapp, github } = props;

        const newInfo: ISystem = {
            about,
            linkedin,
            whatsapp,
            github,
        };

        try {
            const post = await SystemModel.create(newInfo);
            return post;
        } catch (error) {
            throw new CustomError(500, 'Erro ao criar informações no banco de dados.');
        }
    }

    async update(props: ISystem) {
        const { idInfo, about, linkedin, whatsapp, github } = props;

        const info = await SystemModel.findOne({ _id: idInfo });

        if (!info) {
            throw new CustomError(404, 'Informações não encontradas.');
        }

        info.about = about ?? info.about;
        info.linkedin = linkedin ?? info.linkedin;
        info.whatsapp = whatsapp ?? info.whatsapp;
        info.github = github ?? info.github;

        try {
            const updatedInfo = await info.save();
            return updatedInfo;
        } catch (error) {
            throw new CustomError(500, 'Erro ao atualizar informações no banco de dados.');
        }
    }

    async delete(idInfo: any) {
        const info = await SystemModel.findById(idInfo);

        if (!info) {
            throw new CustomError(404, 'Informações não encontradas.');
        }

        try {
            const deleteInfo = await SystemModel.findByIdAndDelete(idInfo);
            return deleteInfo;
        } catch (error) {
            throw new CustomError(500, 'Erro ao excluir informações do banco de dados.');
        }
    }

    async getInfos() {
        productsUtils.formatPrice(39.99);
        productsUtils.revertFormatPrice("49,90");

        try {
            const info = await SystemModel.find();
            return info;
        } catch (error) {
            throw new CustomError(500, 'Erro ao recuperar informações do banco de dados.');
        }
    }
}
