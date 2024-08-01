import { ICart } from './cart'
import { ICategory } from './category'
import { IComment } from './comment'
import { ILike } from './like'

export interface IProduct {
	id: string
	name: string
	images: string[]
	quantity: number
	price: number
	discount: number
	description: string
	userId: string
	createdAt: Date
	updatedAt: Date
	comments: IComment[]
	categories: ICategory[]
	likes: ILike[]
	carts: ICart[]
}
