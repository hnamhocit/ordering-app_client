import Image from 'next/image'
import { CiBellOn, CiLogout, CiShoppingCart } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'

import api from '@/config/axios'
import { selectUser, setUser } from '@/store/slices/userSlice'
import { clearTokens } from '@/utils/jwt'
import Dropdown from '../../Dropdown'
import DropdownItem from '../../Dropdown/Item'

const UserDropdown = () => {
	const user = useSelector(selectUser)
	const dispatch = useDispatch()

	const handleLogout = async () => {
		const { data } = await api.get('auth/logout')
		if ('error' in data) return
		clearTokens()
		dispatch(setUser(null))
	}

	return (
		<Dropdown
			className='h-10'
			trigger={
				<div
					className='w-10 h-10 bg-cover bg-center bg-no-repeat rounded-full'
					style={{
						backgroundImage: `url("${
							user?.photoURL || '/default-avatar.jpg'
						}")`,
					}}></div>
			}>
			<DropdownItem
				icon={
					<Image
						src={user?.photoURL || '/default-avatar.jpg'}
						alt={user?.displayName || ''}
						width={32}
						height={32}
						className='rounded-full object-cover'
					/>
				}>
				{user?.displayName}
			</DropdownItem>

			<DropdownItem icon={<CiShoppingCart size={20} />}>
				Cart
			</DropdownItem>

			<DropdownItem icon={<CiBellOn size={20} />}>
				Notification
			</DropdownItem>

			<DropdownItem
				onClick={handleLogout}
				icon={<CiLogout size={20} />}
				className='text-red-500 hover:bg-red-500'>
				Sign Out
			</DropdownItem>
		</Dropdown>
	)
}

export default UserDropdown
