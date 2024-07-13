import { Products } from "../../utils/ProductsUtils";
import { ISystem } from "./system-module-interface";
import { SystemModel } from "./system-module-schema";

const productsUtils = new Products();

class CustomError extends Error {
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

        const post = await SystemModel.create(newInfo);
        return post;
    }


    async update(props: ISystem) {

        const { idInfo, about, linkedin, whatsapp, github } = props;

        const info = await SystemModel.findOne({ _id: idInfo });

        if (!info) {
            throw new Error('Informações não encontradas.');
        }

        info.about = about ?? info.about;
        info.linkedin = linkedin ?? info.linkedin;
        info.whatsapp = whatsapp ?? info.whatsapp;
        info.github = github ?? info.github;

        const updatedInfo = await info.save();
        return updatedInfo;
    }

    async delete(idInfo: any) {

        const info = await SystemModel.findById(idInfo);
        if (!info || info === undefined) {
            throw new CustomError(404, 'Informações não encontradas.');
        }

        const deleteInfo = await SystemModel.findByIdAndDelete(idInfo);
        return deleteInfo;
    }

    async getInfos() {

        productsUtils.formatPrice(39.99);
        productsUtils.revertFormatPrice("49,90  ");

        const info = await SystemModel.find();
        return info;
    }

}