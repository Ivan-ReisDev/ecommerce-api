
export class Products {
    //função para formatar o preço que vem do banco de dados.
    formatPrice(price:number): string{
        const newNumber: string = price.toFixed(2).toString();
        const newFormat: string = `R$ ${newNumber.replace(".", ",")}`
        console.log(newFormat)
        return newFormat
    };

    //função para formatar o valor que vem do front-end.
    revertFormatPrice(price: string): number{
        const newString: string = price.replace(",",".").trim();
        const newFormat: number = parseFloat(newString);
        console.log(newFormat)
        return newFormat;
    };

}