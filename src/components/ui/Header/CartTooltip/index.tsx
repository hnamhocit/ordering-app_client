import { Button, Spinner, Tooltip } from '@nextui-org/react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { CiBellOn } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import api from '@/config/axios'
import { ICart } from '@/interfaces'
import { selectUser } from '@/store/slices/userSlice'

const CartTooltip = () => {
	const [loading, setLoading] = useState(true)
	const [carts, setCarts] = useState<ICart[]>([])
	const user = useSelector(selectUser)

	useEffect(() => {
		;(async () => {
			const { data } = await api.get('carts/user')

			if ('error' in data) {
				setLoading(false)
				toast.error(data.error.message)
				return
			}

			setLoading(false)
			setCarts(data.data)
		})()
	}, [])

	return (
		<Tooltip
			content={
				<div>
					{loading && <Spinner size='lg' />}
					{carts.length === 0 ? (
						<div
							className='w-full min-h-60 bg-center bg-contain bg-no-repeat'
							style={{
								backgroundImage: `url("/empty-cart.png")`,
							}}></div>
					) : (
						carts.slice(5).map((cart) => (
							<div
								key={cart.id}
								className='flex items-center justify-between'>
								<div className='flex items-center gap-3'>
									<div
										className='bg-cover bg-center bg-no-repeat w-12 h-12'
										style={{
											backgroundImage: `url("${cart.product.images[0]}")`,
										}}></div>

									<div>
										<div className='text-lg font-semibold'>
											{cart.product.name}
										</div>

										<div>
											Added {cart.buyQuantity} products (
											{moment(cart.updatedAt).fromNow(
												true
											)}
											)
										</div>
									</div>
								</div>

								<div className='flex items-center gap-3'></div>
							</div>
						))
					)}
				</div>
			}>
			<Button isIconOnly radius='full' variant='light'>
				<CiBellOn size={20} />
			</Button>
		</Tooltip>
	)
}

export default CartTooltip
