import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose/dist";
import { Model } from "mongoose";
import { ProductModel } from "./product.model";

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<ProductModel>) { }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(product => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        }));
    }

    async getProduct(id: string) {
        const product = await this.findProduct(id);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        }
    }

    async addProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({
            title: title,
            description: description,
            price: price
        });

        const result = await newProduct.save();
        return result.id as string;
    }

    async updateProduct(id: string, title: string, description: string, price: number) {
        const productToUpdate = await this.findProduct(id);

        if (!productToUpdate) return 'Product cannot be found.';

        if (title) productToUpdate.title = title;
        if (description) productToUpdate.description = description;
        if (price) productToUpdate.price = price;

        const result = await this.productModel.updateOne({ _id: id }, {
            title: productToUpdate.title,
            description: productToUpdate.description,
            price: productToUpdate.price
        });

        return result.acknowledged ? 'Product updated.' : 'Product update failed.';
    }

    async deleteProduct(id: string) {
        const result = await this.productModel.deleteOne({ _id: id }).exec();
        return result.acknowledged ? 'Product deleted.' : 'Product delete failed.';
    }

    private async findProduct(id: string): Promise<ProductModel> {
        try {
            const product = await this.productModel.findById(id).exec();

            if (!product) {
                throw new NotFoundException('Product cannot be found.')
            }

            return product;
        } catch (error) {
            throw new NotFoundException('Found error: ', error);
        }
    }
}