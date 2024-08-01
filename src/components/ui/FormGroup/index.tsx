import clsx from 'clsx'
import { FC, InputHTMLAttributes, memo, useState } from 'react'
import { FieldError } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

interface FormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	isInvalid?: string
	errorMessage?: string
	error?: FieldError
}

const FormGroup: FC<FormGroupProps> = ({
	label,
	isInvalid,
	errorMessage,
	error,
	...props
}) => {
	const [isVisible, setIsVisible] = useState(false)
	const [isFocus, setIsFocus] = useState(false)

	const toggleIsVisible = () => setIsVisible((prev) => !prev)
	const toggleIsFocus = () => setIsFocus((prev) => !prev)

	return (
		<div className='space-y-1'>
			<div
				className={clsx(
					'flex items-center gap-2 py-2 px-4 rounded-full border transition',
					{
						'!bg-danger-500 !border-danger-500': !!error,
						'text-white bg-primary border-primary': isFocus,
					}
				)}>
				<input
					{...props}
					type={isVisible ? 'text' : props.type}
					className={clsx(
						'block outline-none flex-1 bg-transparent',
						{
							'placeholder:text-gray-500': !error || !isFocus,
							'placeholder:text-transparent': !!error || isFocus,
						}
					)}
					onFocus={toggleIsFocus}
					onBlur={toggleIsFocus}
				/>

				{props.type === 'password' && (
					<button
						type='button'
						onClick={toggleIsVisible}
						className={`dark:text-black ${
							isFocus ? 'text-white' : 'text-black'
						}`}>
						{isVisible ? <FaRegEye /> : <FaRegEyeSlash />}
					</button>
				)}
			</div>

			<span className='text-sm font-semibold text-danger-500'>
				{error?.message}
			</span>
		</div>
	)
}

export default memo(FormGroup)
