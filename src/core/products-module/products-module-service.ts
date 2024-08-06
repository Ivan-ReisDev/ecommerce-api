import { Products } from "../../utils/ProductsUtils";
import { NewProductsInterface, ProductsInterface} from "./products-module-interface";
import { ProductModel } from "./products-module-schema";

const productsUtils = new Products();

export class CustomError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export default class ProductsModuleService {

    async insert(props: ProductsInterface) {
        const { name, category, price, description, amount } = props;

        if (!name || !category || !price || !description || !amount) {
            throw new CustomError(400, 'Preencha todos os campos.');
        }

        const product = await ProductModel.findOne({ name });

        if (product) {
            throw new CustomError(400, `O produto ${name} já existe no banco de dados.`);
        }

        const newProduct: NewProductsInterface = {
            name,
            category,
            price: productsUtils.revertFormatPrice(price),
            description,
            amount
        };

        try {
            return await ProductModel.create(newProduct);
        } catch (error) {
            throw new CustomError(500, 'Erro ao criar produto no banco de dados.');
        }
    }
}
