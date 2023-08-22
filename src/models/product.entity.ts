import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        length: 1500
    })
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;

    setId(id: number) {
        this.id = id;
    }

    getId(): number {
        return this.id;
    }

    setName(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getDescription(): string {
        return this.description;
    }

    setImage(image: string) {
        this.image = image;
    }

    getImage(): string {
        return this.image;
    }

    setPrice(price: number) {
        this.price = price;
    }

    getPrice(): number {
        return this.price;
    }
  
}
