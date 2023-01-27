import { Injectable, NotFoundException } from "@nestjs/common";
import { Guid } from "guid-typescript";
import { ProductModel } from "./product.model";

@Injectable()
export class ProductsService {
    private products: ProductModel[];

    constructor() {
        this.products = this.createInitialProducts();
    }

    getProducts(): ProductModel[] {
        //instead of pointer/reference of the products, return copy of the products
        return [...this.products];
    }

    getProduct(id: string) {
        const product = this.findProduct(id)[0];
        //instead of pointer/reference of the product, return copy of the product
        return { ...product };
    }

    addProduct(title: string, description: string, price: number): string {
        const id = this.createProductId();
        const newProduct = new ProductModel(id, title, description, price);

        this.products.push(newProduct);

        return id;
    }

    private findProduct(id: string): [ProductModel, number] {
        const productIndex = this.products.findIndex((p) => p.id == id);
        if (productIndex < 0) throw new NotFoundException('Product could not be found!');

        const product = this.products[productIndex];
        return [product, productIndex];
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