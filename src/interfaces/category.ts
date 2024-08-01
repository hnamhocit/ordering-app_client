import { IProduct } from './product'

export interface ICategory {
	id: string
	name: string
	photoURL: string
	products: IProduct[]
	createdAt: Date
	updatedAt: Date
}
