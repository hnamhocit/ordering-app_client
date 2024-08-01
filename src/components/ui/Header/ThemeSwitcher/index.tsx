import { Switch } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useCallback, useState } from 'react'
import { CiDark, CiLight } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import api from '@/config/axios'
import { selectUser } from '@/store/slices/userSlice'

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()
	const user = useSelector(selectUser)
	const [isSelected, setIsSelected] = useState(theme === 'dark')

	const handleThemeChange = useCallback(
		async (isSelected: boolean) => {
			const theme = isSelected ? 'dark' : 'light'

			setTheme(theme)
			setIsSelected(isSelected)

			if (user) {
				const { data } = await api.patch(`users/${user.id}`, {
					theme: theme.toUpperCase(),
				})

				if ('error' in data) {
					toast.error(data.error.message)
				}
			}
		},
		[user, setTheme]
	)

	return (
		<Switch
			isSelected={isSelected}
			onValueChange={handleThemeChange}
			thumbIcon={({ isSelected }) =>
				isSelected ? (
					<CiDark className='text-black' size={20} />
				) : (
					<CiLight size={20} />
				)
			}
		/>
	)
}

export default ThemeSwitcher
