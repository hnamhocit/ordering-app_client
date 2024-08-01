import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '..'
import { IUser } from '../../interfaces/user'

const initialState: { value: IUser | null } = {
	value: null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser(state, action) {
			state.value = {
				...(state.value || {}),
				...action.payload,
			}
		},
		setUser(state, action) {
			state.value = action.payload
		},
	},
})

export const selectUser = (state: RootState) => state.user.value

export const { updateUser, setUser } = userSlice.actions

export default userSlice.reducer
