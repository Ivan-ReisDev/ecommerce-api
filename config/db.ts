import mongoose from "mongoose";
import config from "config";
import Logger from "./logger";

async function connect() {
    const db = config.get<string>("database");

    try {
        await mongoose.connect(db);
        Logger.info(`Conectado ao banco de dados.`)


    } catch (error) {
        Logger.error(`Erro ao conectar ao banco de dados.`);
        Logger.error(error);
        
    }

}

export default connect;