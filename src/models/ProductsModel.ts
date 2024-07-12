import { model, Schema } from "mongoose";

interface Product {
    name: string;
    category: string;
    price: number;
    description: string;
    amount:Number
}



const productSchema = new Schema<Product>(
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

export const ProductModel = model<Product>("Product", productSchema);
