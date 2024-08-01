import { IError } from './error'

export interface IReponse<T> {
	data?: T
	error?: IError
}
