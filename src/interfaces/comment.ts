import { IProduct } from './product'

export interface IComment {
	id: string
	images: string[]
	content: string
	rating: number
	productId: string
	product: IProduct
	userId: string
	createdAt: Date
	updatedAt: Date
}
