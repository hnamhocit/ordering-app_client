import { Button, Tooltip } from '@nextui-org/react'
import { useState } from 'react'
import { CiShoppingCart } from 'react-icons/ci'

import { INotification } from '@/interfaces'

const NotificationTooltip = () => {
	const [loading, setLoading] = useState(true)
	const [notifications, setNotifications] = useState<INotification>()

	return (
		<Tooltip content={<div>xin chao</div>}>
			<Button isIconOnly radius='full' variant='light'>
				<CiShoppingCart size={20} />
			</Button>
		</Tooltip>
	)
}

export default NotificationTooltip
