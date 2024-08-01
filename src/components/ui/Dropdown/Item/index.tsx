import clsx from 'clsx'
import { FC, HtmlHTMLAttributes, memo, ReactElement, ReactNode } from 'react'

interface ItemProps extends HtmlHTMLAttributes<HTMLButtonElement> {
	icon?: ReactElement
	children: ReactNode
	className?: string
}

const DropdownItem: FC<ItemProps> = ({
	icon,
	children,
	className,
	...props
}) => {
	return (
		<button
			{...props}
			className={clsx(
				'p-2 rounded-md hover:bg-primary transition flex items-center gap-3 text-black hover:text-white w-full',
				className
			)}>
			{icon}
			{children}
		</button>
	)
}

export default memo(DropdownItem)
