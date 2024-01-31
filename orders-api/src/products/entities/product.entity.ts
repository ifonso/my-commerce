import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    // Generate a primay key uuid
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // Generate a varchar(255) default
    @Column()
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column()
    price: number;

    @Column()
    image_url: string;
}
