import { model, Schema } from "mongoose";
import { IUser } from "./user-module-interface";

const userSchema = new Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true
        },

        surname: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["User", "Moderador", "Admin"],
            required: true
        },

        status: {
            type: String,
            enum: ["Ativo", "Desativado", "Pendente", "Banido"],
            required: true

        }
    },
    {
        timestamps: true

    });

export const UserModel = model<IUser>("User", userSchema);