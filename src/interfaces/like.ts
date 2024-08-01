import { IProduct } from './product'

export interface ILike {
	id: string
	userId: string
	productId: string
	product: IProduct
	createdAt: Date
	updatedAt: Date
}
