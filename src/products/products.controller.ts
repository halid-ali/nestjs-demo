import { Body, Controller, Delete, Get, Header, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @Header("content-type", "application/json")
    async getProducts() {
        return await this.productsService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') id: number) {
        return await this.productsService.getProduct(id);
    }

    @Post()
    async addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
    ) {
        const result = await this.productsService.addProduct(title, description, price);
        return { result: result };
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
    ) {
        return await this.productsService.updateProduct(id, title, description, price);
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id: number) {
        return await this.productsService.deleteProduct(id);
    }
}