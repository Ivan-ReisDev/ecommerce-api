import { model, Schema } from "mongoose";
interface User{
    firstName:string;
    surname:string;
    email: string;
    password:string;
    role:string;
    status: string;

}

const userSchema = new Schema<User>(
    {
        firstName:{ 
            type: String,
            required: true
        },

        surname:{ 
            type: String,
            required: true    
        },

        email:{ 
            type: String,
            required: true    
        },

        password:{ 
            type: String,
            required: true    
        },

        role:{
            type: String,
            enum: ["User", "Moderador", "Admin"],
            required: true
        },

        status:{
            type: String,
            enum: ["Ativo", "Desativado", "Pendente", "Banido"],
            required: true

        }
    },
{
    timestamps: true

});

export const UserModel = model<User>("User", userSchema);