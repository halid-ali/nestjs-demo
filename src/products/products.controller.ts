import { Controller, Get, Header, Param } from "@nestjs/common";
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
}