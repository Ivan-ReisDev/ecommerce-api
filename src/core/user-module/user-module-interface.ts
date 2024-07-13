export interface IUser {
    firstName: string;
    surname: string;
    email: string;
    password: string;
    role?: string;
    status?: string;
    passwordConf?: string;
}