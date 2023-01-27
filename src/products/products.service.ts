import { Injectable } from "@nestjs/common";
import { Guid } from "guid-typescript";
import { ProductModel } from "./product.model";

@Injectable()
export class ProductsService {
    private products: ProductModel[];

    constructor() {
        this.products = this.createInitialProducts();
    }

    getProducts(): ProductModel[] {
        return this.products;
    }

    private createProductId(): string {
        return Guid.create().toString();
    }

    private createInitialProducts(): ProductModel[] {
        return [
            new ProductModel(
                this.createProductId(),
                "Apple",
                "Fruit",
                1.45),
            new ProductModel(
                this.createProductId(),
                "BMW",
                "Auto",
                125.75),
            new ProductModel(
                this.createProductId(),
                "Chair",
                "Furniture",
                17.90)
        ];
    }
}