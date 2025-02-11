import {IsNotEmpty, IsNumber, IsPositive} from 'class-validator';

export class Product {
    @IsNotEmpty()
    id: string;
    title: string;
    @IsNumber()
    @IsPositive()
    price: number;

    constructor(id: string, title: string, price: number) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    getInformation() {
        return [this.title, `$${this.price}`];
    }
}