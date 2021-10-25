import { Product } from './product.model';

export interface Item {
    product: Product
    quantity: number
}

export interface Cart {
    productList: Item[]
    total: number
}
