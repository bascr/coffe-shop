export interface ProductSummary {
    id: number
    name: string
}

export interface Combo {
    id: number
    name: string
    products: ProductSummary[]
    discount: number
}
