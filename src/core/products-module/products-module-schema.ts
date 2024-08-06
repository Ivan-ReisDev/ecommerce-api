import { model, Schema } from "mongoose";
import { Product } from "./products-module-interface";

type ProductSchema = Product<number>

const productSchema = new Schema<ProductSchema> (
    {
        name: { 
            type: String,
            required: true
        },
        category: { 
            type: String,
            required: true    
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },

        amount: {
            type: Number,
            required: true
        }
    },

    {
        timestamps: true
    }
);

export const ProductModel = model<ProductSchema>("Product", productSchema);
