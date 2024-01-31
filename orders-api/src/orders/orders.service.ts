import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";

import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { Product } from "src/products/entities/product.entity";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
        private amqpConnection: AmqpConnection,
    ) {}

    async create(createOrderDto: CreateOrderDto & { client_id: number }) {
        const productIds = createOrderDto.items.map((item) => item.product_id);
        const uniqueProductIds = [...new Set(productIds)];
        const products = await this.productRepository.findBy({
            id: In(uniqueProductIds),
        });

        if (products.length !== uniqueProductIds.length) {
            throw new Error(
                `Some products may not exist. Passed ones ${uniqueProductIds}, found ${products.map((product) => product.id)}`,
            );
        }

        const order = Order.create({
            client_id: createOrderDto.client_id,
            items: createOrderDto.items.map((item) => {
                const product = products.find(
                    (product) => product.id === item.product_id,
                );
                return {
                    product_id: product.id,
                    price: product.price,
                    quantity: item.quantity,
                };
            }),
        });

        await this.orderRepository.save(order);

        // Publish order to RabbitMQ exchange
        this.amqpConnection.publish(
            "amq.direct",
            "order_created",
            {
                order_id: order.id,
                card_hash: createOrderDto.card_hash,
                total: order.total,
            },
        );

        return order;
    }

    findAll(client_id: number) {
        return this.orderRepository.find({
            where: { client_id },
            order: { created_at: "DESC" },
        });
    }

    findOne(id: string, client_id: number) {
        return this.orderRepository.findOneOrFail({
            where: { id, client_id },
        });
    }
}
