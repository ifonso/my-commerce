import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { getDataSourceToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Product } from "./products/entities/product.entity";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.init();

    const dataSource = app.get<DataSource>(getDataSourceToken());
    await dataSource.synchronize(true);

    const porductRepository = dataSource.getRepository<Product>("product");
    await porductRepository.insert([
        {
            id: "asdd-e2g1-f9e1d1ed-91de",
            name: "Product 1",
            description: "Description 1",
            price: 10,
            image_url: "http://example.com",
        },
        {
            id: "bsdd-e2g1-f9e1d1ed-91de",
            name: "Product 2",
            description: "Description 2",
            price: 20,
            image_url: "http://example.com",
        },
        {
            id: "csdd-e2g1-f9e1d1ed-91de",
            name: "Product 3",
            description: "Description 3",
            price: 30,
            image_url: "http://example.com",
        },
        {
            id: "dsdd-e2g1-f9e1d1ed-91de",
            name: "Product 4",
            description: "Description 4",
            price: 40,
            image_url: "http://example.com",
        },
        {
            id: "esdd-e2g1-f9e1d1ed-91de",
            name: "Product 5",
            description: "Description 5",
            price: 50,
            image_url: "http://example.com",
        },
        {
            id: "fsdd-e2g1-f9e1d1ed-91de",
            name: "Product 6",
            description: "Description 6",
            price: 60,
            image_url: "http://example.com",
        },
        {
            id: "gsdd-e2g1-f9e1d1ed-91de",
            name: "Product 7",
            description: "Description 7",
            price: 70,
            image_url: "http://example.com",
        },
        {
            id: "hsdd-e2g1-f9e1d1ed-91de",
            name: "Product 8",
            description: "Description 8",
            price: 80,
            image_url: "http://example.com",
        },
        {
            id: "isdd-e2g1-f9e1d1ed-91de",
            name: "Product 9",
            description: "Description 9",
            price: 90,
            image_url: "http://example.com",
        },
        {
            id: "jsdd-e2g1-f9e1d1ed-91de",
            name: "Product 10",
            description: "Description 10",
            price: 100,
            image_url: "http://example.com",
        },
    ]);
}
bootstrap();
