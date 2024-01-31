import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductsModule } from "./products/products.module";
import { Product } from "./products/entities/product.entity";

import { OrdersModule } from "./orders/orders.module";
import { Order } from "./orders/entities/order.entity";
import { OrderItem } from "./orders/entities/order-item.entity";

import { AuthModule } from "./auth/auth.module";
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "nestjs",
            entities: [Product, Order, OrderItem],
            synchronize: true,
            logging: true,
        }),
        ProductsModule,
        OrdersModule,
        AuthModule,
        RabbitmqModule,
    ],
})
export class AppModule {}
