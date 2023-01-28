import { Body, Controller, Delete, Get, Header, Param, Patch, Post } from "@nestjs/common";
import { ProductModel } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @Header("content-type", "application/json")
    async getProducts() {
        const products = await this.productsService.getProducts();
        return {
            'Product Count': products.length,
            'Products': products
        };
    }

    @Get(':id')
    async getProduct(@Param('id') id: string) {
        return await this.productsService.getProduct(id);
    }

    @Post()
    async addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
    ) {
        const productId = await this.productsService.addProduct(title, description, price);
        return { id: productId };
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
    ) {
        return await this.productsService.updateProduct(id, title, description, price);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: string) {
        return await this.productsService.deleteProduct(id);
    }
}