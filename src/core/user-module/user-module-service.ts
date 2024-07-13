import { IUser } from "./user-module-interface";
import { UserModel } from "./user-module-schema";

class CustomError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export default class UserModuleService {

    async create(props: IUser) {
        const { firstName, surname, email, password, passwordConf } = props;

        if (password !== passwordConf) {
            throw new CustomError(400, 'As senhas não coincidem.');
        }

        const userDb = await UserModel.findOne({ email: email.trim() });

        if (userDb) {
            throw new CustomError(400, 'E-mail já cadastrado.');
        }

        const newUser: IUser = {
            firstName: firstName.trim(),
            surname: surname.trim(),
            email: email.toLowerCase().trim(),
            password: password.trim(),
            role: 'User',
            status: 'Pendente'
        };

        try {
            const user = await UserModel.create(newUser);
            return user;
        } catch (error) {
            throw new CustomError(500, 'Erro ao criar o usuário no banco de dados.');
        }
    }

    async listUsers(page: number) {
        const pageSize = 10;

        const usersTotal = await UserModel.countDocuments();
        const totalPages = Math.ceil(usersTotal / pageSize);

        const users = await UserModel.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .select("-password");

        return { users, totalPages };
    }
}