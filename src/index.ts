require("dotenv").config()
import express, { Request, Response } from "express";
import config from "config"
import connect from "../config/db";
import Logger from "../config/logger";
import router from "./routes/router";
import path from "path";

const app = express();
const port = config.get<number>('port');

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "uploads")))


app.use("/api/", router)
app.listen(port, async () => {
  await connect();
  Logger.info(`Aplicação rodando no endereço http://localhost:${port}`);
});
