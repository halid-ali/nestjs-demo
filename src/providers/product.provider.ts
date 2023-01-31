import { AppSettings } from "src/constants/appsettings.constants";
import { Product } from "src/products/product.entity"
import { DataSource } from "typeorm"

export const productProviders = [
    {
        provide: AppSettings.ProductProvider,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
        inject: [AppSettings.DatabaseProvider]
    }
];