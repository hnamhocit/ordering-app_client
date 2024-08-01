import { IProduct } from './product'

export interface ICart {
	id: string
	userId: string
	productId: string
	product: IProduct
	buyQuantity: number
	createdAt: Date
	updatedAt: Date
}
