import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import Logger from "../../config/logger";

interface User {
    firstName:string;
    surname:string;
    email:string;
    password:string;
    passwordConf?:string;
    role?:string;
    status?:string;
}

export class UserController {
   async createUser(req:Request, res:Response){
    try {
        const {firstName, surname, email, password, passwordConf} = req.body as User;
        if(password !== passwordConf) {
           return res.status(400).send({error: `As senhas não coincidem.`})
        };
        
        const userDb = await UserModel.findOne({email: email.trim()});
        
        if(userDb){
            return res.status(400).send({error: `e-mail já cadastrado`})
        }
   
        const newUser: User = {
            firstName: firstName.trim(), 
            surname: surname.trim(), 
            email: email.toLowerCase().trim(), 
            password: password.trim(),
            role: `User`,
            status: "Pendente"
        }

        const user = await UserModel.create(newUser);

        if(user){
          return  res.status(201).send({message: `Usuário criado com sucesso.`})
        }

        return res.status(400).send({error: `Ocorreu um erro ao criar o usuário, tente novamente`})

    } catch (error) {
        Logger.error(error)
        return res.status(400).send({error: `Ocorreu um erro ao criar o usuário, tente novamente`})
    }
   }
   
   async listUsers(req: Request, res:Response) {
    try {
        const  page  = await req.params.page as string;
        console.log(page)
        const pageNum: number = parseInt(page)
        const usersTotal = await UserModel.countDocuments();
        const pageSize: number = 10;
        const coutPages: number = usersTotal >= pageSize ? usersTotal / pageSize : 1
        const totalPages:number = Math.ceil(coutPages)
        const list:object = await UserModel.find().skip((pageNum - 1) * pageSize).limit(pageSize).select("-password"); 
        return res.status(200).send(
            {users: list,
             pagesTotal: totalPages  
        });
        
    } catch (error) {
        Logger.error(error)
        return res.status(400).send({error: `Ocorreu um erro ao criar o usuário, tente novamente`})
    }

   }

}

