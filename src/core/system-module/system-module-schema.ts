import { model, Schema } from "mongoose";
import { ISystem } from "./system-module-interface";

const systemSchema = new Schema<ISystem>(
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

export const SystemModel = model<ISystem>("System", systemSchema);
