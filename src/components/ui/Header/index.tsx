'use client'

import { Button } from '@nextui-org/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useSelector } from 'react-redux'

import { selectUser } from '@/store/slices/userSlice'
import Brand from '../Brand'
import CartTooltip from './CartTooltip'
import NotificationTooltip from './NotificationTooltip'
import ThemeSwitcher from './ThemeSwitcher'
import UserDropdown from './UserDropdown'

const Header = () => {
	const user = useSelector(selectUser)
	const [isFocus, setIsFocus] = useState(false)

	const toggleIsFocus = useCallback(() => setIsFocus((prev) => !prev), [])

	return (
		<header className='sticky top-0 right-0 w-full h-16 border-b light:bg-red-500 dark:bg-[#1A2130] flex px-4 items-center justify-between shadow z-20'>
			<Brand className='hidden md:flex' />

			<div
				className={clsx(
					'p-2 border border-b-2 rounded-full overflow-hidden flex items-center gap-3 w-[200px] md:w-80 transition',
					{
						'text-secondary border-primary': isFocus,
					}
				)}>
				<CiSearch size={20} />

				<input
					placeholder='Search...'
					className='block w-full bg-transparent outline-none'
					onFocus={toggleIsFocus}
					onBlur={toggleIsFocus}
				/>
			</div>

			<div className='flex items-center gap-3'>
				{user ? (
					<>
						<ThemeSwitcher />

						<div className='hidden md:flex md:items-center md:gap-3'>
							<NotificationTooltip />
							<CartTooltip />
						</div>

						<UserDropdown />
					</>
				) : (
					<Link href='/enter'>
						<Button color='primary' radius='full'>
							LOGIN
						</Button>
					</Link>
				)}
			</div>
		</header>
	)
}

export default Header
