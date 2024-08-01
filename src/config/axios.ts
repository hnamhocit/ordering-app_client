import axios from 'axios'

import {
	clearTokens,
	getToken,
	getTokens,
	isExpToken,
	setTokens,
} from '../utils/jwt'

const api = axios.create({ baseURL: 'http://localhost:8080/api/' })

api.interceptors.request.use(
	async (config) => {
		const { accessToken, refreshToken } = getTokens()

		if (accessToken) {
			if (isExpToken(accessToken) && refreshToken) {
				const { data } = await axios.get(
					'http://localhost:8080/api/auth/refresh',
					{
						headers: {
							Authorization: `Bearer ${refreshToken}`,
						},
					}
				)

				const tokens = data.data

				if ('error' in data) {
					clearTokens()
					console.log(data.error)
				}

				if (tokens) {
					console.log({ tokens })
					setTokens(tokens.accessToken, tokens.refreshToken)
				}
			}

			config.headers.Authorization = `Bearer ${getToken('accessToken')}`
		}

		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default api
