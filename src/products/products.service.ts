import { Injectable } from "@nestjs/common";
import { ProductModel } from "./product.model";

@Injectable()
export class ProductsService {
    private products: ProductModel[];

    constructor() {
        this.products = [
            new ProductModel("p1", "Product 01", "P1 Description", 3.45),
            new ProductModel("p2", "Product 02", "P2 Description", 5.75),
            new ProductModel("p3", "Product 03", "P3 Description", 1.90)
        ];
    }

    getProducts(): ProductModel[] {
        return this.products;
    }
}