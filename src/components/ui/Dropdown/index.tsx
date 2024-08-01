import clsx from 'clsx'
import { FC, memo, ReactNode, useState } from 'react'

interface DropdownProps {
	children: ReactNode
	position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
	trigger: ReactNode
	triggerClassName?: string
	className?: string
}

const Dropdown: FC<DropdownProps> = ({
	children,
	position = 'bottom-right',
	trigger,
	triggerClassName,
	className,
}) => {
	const [isVisible, setIsVisible] = useState(false)
	const [y, x] = position.split('-')

	const toggleIsInvisible = () => setIsVisible(!isVisible)

	return (
		<div className={clsx('relative', className)}>
			<button onClick={toggleIsInvisible} className={triggerClassName}>
				{trigger}
			</button>

			<div
				className={clsx(
					'absolute bg-white rounded-md min-w-40 max-w-xs shadow-md transition-all p-1',
					{
						'top-0': y === 'top',
						'top-full': y === 'bottom',
						'left-0': x === 'left',
						'right-0': x === 'right',
						'visible translate-y-2': isVisible,
						'-translate-y-2 opacity-0 invisible': !isVisible,
					}
				)}>
				{children}
			</div>
		</div>
	)
}

export default memo(Dropdown)
