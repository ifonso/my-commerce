import {
    ArrayNotEmpty,
    IsInt,
    IsNotEmpty,
    IsPositive,
    IsString,
    MaxLength,
    ValidateNested,
} from "class-validator";

import { Type } from "class-transformer";

export class CreateOrderDto {
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @MaxLength(255)
    @IsNotEmpty()
    @IsString()
    card_hash: string;
}

export class OrderItemDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    quantity: number;

    @MaxLength(36)
    @IsString()
    @IsNotEmpty()
    product_id: string;
}
