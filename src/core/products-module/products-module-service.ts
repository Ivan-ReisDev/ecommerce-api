import { Products } from "../../utils/ProductsUtils";
import { NewProductsInterface, ProductsInterface } from "./products-module-interface";
import { ProductModel } from "./products-module-schema";

const productsUtils = new Products();

export default class ProductsModuleService {

    async insert(props: ProductsInterface) {
        const { name, category, price, description, amount } = props;

        if (!name || !category || !price || !description || !amount) {
            throw new Error('Preencha todos os campos.');
        }

        const product = await ProductModel.findOne({ name });

        if (product) {
            throw new Error(`O produto ${name} já existe no banco de dados.`);
        }

        const newProduct: NewProductsInterface = {
            name,
            category,
            price: productsUtils.revertFormatPrice(price),
            description,
            amount
        };

        return await ProductModel.create(newProduct);
    }

}