import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        private dataSource: DataSource,
    ) {}

    async getProducts() {
        const products = await this.productRepository.find();
        return products.map((product) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        }));
    }

    async getProduct(id: number) {
        const product = await this.productRepository.findOneBy({ id });
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
        };
    }

    async addProduct(title: string, description: string, price: number): Promise<any> {
        return await this.executeTransaction(async (x: QueryRunner) => {
            const newProduct = this.productRepository.create({
                title: title,
                description: description,
                price: price,
            });
            await x.manager.save(newProduct);
            return 'Product created with id: ' + newProduct.id.toString();
        }, 'Product cannot be created!');
    }

    async updateProduct(id: number, title: string, description: string, price: number) {
        return await this.executeTransaction(async () => {
            const productToUpdate = await this.productRepository.findOneBy({ id });
            if (!productToUpdate) return 'Product cannot be found.';

            if (title) productToUpdate.title = title;
            if (description) productToUpdate.description = description;
            if (price) productToUpdate.price = price;

            const result = await this.productRepository.update({ id }, productToUpdate);
            return result.affected ? 'Product updated.' : 'Product update failed.';
        }, 'Product cannot be updated!');
    }

    async deleteProduct(id: number) {
        return await this.executeTransaction(async () => {
            const result = await this.productRepository.delete({ id });
            return result.affected ? 'Product deleted.' : 'Product delete failed.';
        }, 'Product cannot be deleted!');
    }

    private async executeTransaction(func: (arg0: QueryRunner) => Promise<string>, failureResult: string) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const result = await func(queryRunner);
            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return failureResult;
        } finally {
            await queryRunner.release();
        }
    }
}
