export enum Sex {
	MALE = 'MALE',
	FEMALE = 'FEMALE',
	OTHER = 'OTHER',
}

export enum Theme {
	LIGHT = 'LIGHT',
	DARK = 'DARK',
	SYSTEM = 'SYSTEM',
}

export enum Role {
	USER = 'USER',
	SELLER = 'SELLER',
	ADMIN = 'ADMIN',
}
export interface IUser {
	id: string
	email: string
	username?: string
	phoneNumber?: string
	sex?: Sex
	role: Role
	theme: Theme
	bio?: string
	password: string
	displayName: string
	photoURL?: string
	backgroundURL?: string
	refreshToken?: string
	createdAt: Date
	updatedAt: Date
}
