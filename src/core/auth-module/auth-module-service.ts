import { Login } from "./auth-module-interface"; 
import config from 'config'
import { UserModel } from "../user-module/user-module-schema";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


export class CustomError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export default class AuthModuleService {
    async authenticate(props: Login) {
        const {email, password } = props;

        if (!password || !email) {
            throw new CustomError(400, 'Preencha todos os campos.');
        }
        const user = await UserModel.findOne({email: email })

        if(!user){
            throw new CustomError(400, 'Usuário não encontrado');
        }

        const isValuePassword = await compare(password, user.password);

        if(!isValuePassword){
            throw new CustomError(400, 'Usuário ou senha incorretos');
        }

        const keySecret = config.get<string>("KeySecretJWT");
        const token = sign({id: user._id}, keySecret, {expiresIn: "3d"})


        try {
            return token;
        } catch (error) {
            throw new CustomError(500, 'Erro ao efetuar login.');
        }
    }

}
