import { Button } from '@nextui-org/react'
import moment from 'moment'
import { FC, memo } from 'react'

import { ICart } from '@/interfaces'

const Cart: FC<ICart> = ({ product, updatedAt, buyQuantity }) => {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-3'>
				<div
					className='bg-cover bg-center bg-no-repeat w-12 h-12'
					style={{
						backgroundImage: `url("${product.images[0]}")`,
					}}></div>

				<div>
					<div className='text-lg font-semibold'>{product.name}</div>

					<div>
						Added {buyQuantity} products (
						{moment(updatedAt).fromNow(true)})
					</div>
				</div>
			</div>

			<div className='flex items-center gap-3'>
				<Button radius='full' size='sm'></Button>
				<Button radius='full' size='sm'></Button>
				<Button radius='full' size='sm'></Button>
			</div>
		</div>
	)
}

export default memo(Cart)
