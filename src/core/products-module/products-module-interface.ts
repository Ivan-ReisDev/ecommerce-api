export interface Product<T> {
    name: string;
    category: string;
    price: T;
    description: string;
    amount: number
}

export type ProductsInterface = Product<string>
export type NewProductsInterface = Product<number>