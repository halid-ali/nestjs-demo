import { Body, Controller, Get, Header, Param, Post } from "@nestjs/common";
import { ProductModel } from "./product.model";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @Header("content-type", "application/json")
    getProducts(): ProductModel[] {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productsService.getProduct(id);
    }

    @Post()
    addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number
    ): any {
        const productId = this.productsService.addProduct(title, description, price);
        return { id: productId };
    }
}