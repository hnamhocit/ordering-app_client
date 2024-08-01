import { jwtDecode } from 'jwt-decode'

const isExpToken = (token: string) => {
	const { exp } = jwtDecode(token)

	if (exp && exp < Date.now() / 1000) {
		return true
	}

	return false
}

const setTokens = (at: string, rt: string) => {
	localStorage.setItem('accessToken', at)
	localStorage.setItem('refreshToken', rt)
}

const getToken = (name: 'refreshToken' | 'accessToken') => {
	return localStorage.getItem(name)
}

const clearTokens = () => {
	localStorage.removeItem('accessToken')
	localStorage.removeItem('refreshToken')
}

const getTokens = () => {
	return {
		accessToken: localStorage.getItem('accessToken'),
		refreshToken: localStorage.getItem('refreshToken'),
	}
}

export { clearTokens, getToken, getTokens, isExpToken, setTokens }
