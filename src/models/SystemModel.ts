import { model, Schema } from "mongoose";
// Defina a interface com um nome apropriado
interface System {
    about: string;
    linkedin: string;
    whatsapp: number; // Altere para string para corresponder ao esquema
    github: string;
}

const systemSchema = new Schema<System>(
    {
        about: { 
            type: String,
            required: true
        },
        linkedin: { 
            type: String,
            required: true    
        },
        whatsapp: {
            type: Number,
            required: true
        },
        github: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const SystemModel = model<System>("System", systemSchema);
