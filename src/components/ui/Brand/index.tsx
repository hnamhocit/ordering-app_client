import clsx from 'clsx'
import { FC, memo } from 'react'

interface BrandProps {
	withText?: boolean
	size?: 'md' | 'lg'
	className?: string
}

const Brand: FC<BrandProps> = ({ withText = true, size = 'md', className }) => {
	return (
		<div className={clsx('items-center gap-3', className)}>
			<div
				className={clsx(
					'bg-contain bg-center bg-no-repeat rounded-full',
					{
						'h-12 w-12': size === 'lg',
						'h-8 w-8': size === 'md',
					}
				)}
				style={{
					backgroundImage: 'url("/logo.jpg")',
				}}></div>

			{withText && (
				<div
					className={clsx('font-black text-primary', {
						'text-3xl': size === 'lg',
						'text-xl': size === 'md',
					})}>
					HNEX
				</div>
			)}
		</div>
	)
}

export default memo(Brand)
