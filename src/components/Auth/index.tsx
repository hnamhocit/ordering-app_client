'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import api from '@/config/axios'
import { selectUser, setUser } from '@/store/slices/userSlice'
import { getTokens } from '@/utils/jwt'
import { systemTheme } from '@/utils/systemTheme'

const Auth = ({ children }: { children: ReactNode }) => {
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
	const { setTheme } = useTheme()

	useEffect(() => {
		;(async () => {
			const tokens = getTokens()

			if (
				!(typeof tokens === 'object') ||
				!tokens.accessToken ||
				!tokens.refreshToken
			) {
				return
			}

			const { data } = await api.get('users/profile')

			if ('error' in data) {
				toast.error(data.error.message)
				return
			}

			dispatch(setUser(data.data))
			setTheme(data.data.theme.toLowerCase())
		})()
	}, [dispatch, setTheme])

	return (
		<ThemeProvider
			attribute='class'
			defaultTheme={
				user?.theme ? user.theme.toLowerCase() : systemTheme()
			}>
			{children}
		</ThemeProvider>
	)
}

export default Auth
