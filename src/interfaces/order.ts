export enum State {
	INCART = 'INCART',
	CONFIRM = 'CONFIRM',
	PREPARE = 'PREPARE',
	TRANSPORTER = 'TRANSPORTER',
	WAITING = 'WAITING',
	RECEIVED = 'RECEIVED',
	PAID = 'PAID',
}

export interface IOrder {
	id: string
	state: State
	intentTime: Date
	quantity: number
	productId: string
	userId: string
	createdAt: Date
	updatedAt: Date
}
