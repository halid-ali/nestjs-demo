import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose/dist";
import { Guid } from "guid-typescript";
import { Model } from "mongoose";
import { ProductModel } from "./product.model";

@Injectable()
export class ProductsService {
    private products: ProductModel[];

    constructor(@InjectModel('Product') private readonly productModel: Model<ProductModel>) { }

    getProducts(): ProductModel[] {
        //instead of pointer/reference of the products, return copy of the products
        return [...this.products];
    }

    getProduct(id: string) {
        const product = this.findProduct(id)[0];
        //instead of pointer/reference of the product, return copy of the product
        return { ...product };
    }

    async addProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({
            title: title,
            description: description,
            price: price
        });

        const result = await newProduct.save();
        return result.id;
    }

    updateProduct(id: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(id);
        const updatedProduct = { ...product }; //get copy of the product

        if (title) updatedProduct.title = title;
        if (description) updatedProduct.description = description;
        if (price) updatedProduct.price = price;

        this.products[index] = updatedProduct;
    }

    deleteProduct(id: string) {
        const index = this.findProduct(id)[1];
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [ProductModel, number] {
        const productIndex = this.products.findIndex((p) => p.id == id);
        if (productIndex < 0) throw new NotFoundException('Product could not be found!');

        const product = this.products[productIndex];
        return [product, productIndex];
    }
}