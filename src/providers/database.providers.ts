import { AppSettings } from "src/constants/appsettings.constants";
import { DbSettings } from "src/constants/dbsettings.constants";
import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: AppSettings.DatabaseProvider,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: DbSettings.Type,
                host: DbSettings.Host,
                port: DbSettings.Port,
                username: DbSettings.Username,
                password: DbSettings.Password,
                database: DbSettings.DatabaseName,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                //should be false in production mode, otherwise all production data will be lost
                synchronize: true
            });

            return dataSource.initialize();
        }
    }
];