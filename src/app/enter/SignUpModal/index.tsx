import { Button, Checkbox, CheckboxGroup } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import FormGroup from '@/components/ui/FormGroup'
import Modal from '@/components/ui/Modal'
import api from '@/config/axios'
import { IError } from '@/interfaces'
import { setUser } from '@/store/slices/userSlice'
import { setTokens } from '@/utils/jwt'
import { rules } from '@/utils/rules'
import { useTheme } from 'next-themes'

type FormData = {
	displayName: string
	email: string
	password: string
}

const SignUpModal = () => {
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: '',
			password: '',
			displayName: '',
		},
		mode: 'onChange',
	})
	const [selected, setSelected] = useState([
		'allow-notifications',
		'accept-terms',
	])
	const [disabled, setDisabled] = useState(false)
	const [error, setError] = useState<IError>()
	const dispatch = useDispatch()
	const router = useRouter()
	const { setTheme } = useTheme()

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		try {
			setDisabled(true)

			if (!selected.includes('accept-terms')) {
				handleError(
					{ code: 400, message: 'Invalid credentials!' },
					false
				)
				return
			}

			if (selected.includes('allow-notifications')) {
				const { data } = await api.post('subscribers', {
					displayName: formData.displayName,
					email: formData.email,
				})

				if ('error' in data) {
					handleError(data.error, false)
					return
				}
			}

			const { data } = await api.post('auth/signup', formData)

			if ('error' in data) {
				handleError(data.error)
				return
			}

			setTokens(data.data.accessToken, data.data.refreshToken)
			const { data: profile } = await api.get('users/profile')

			if ('error' in profile) {
				handleError(profile.error)
				return
			}

			reset()
			setError(undefined)
			setDisabled(false)
			dispatch(setUser(profile.data))
			setTheme(profile.data.theme.toLowerCase())
			router.push('/')
		} catch (error) {
			setDisabled(false)
			setError(undefined)
		}
	}

	const handleError = (error: any, isReset: boolean = true) => {
		setError(error)
		setDisabled(false)
		if (isReset) reset()
	}

	return (
		<Modal
			trigger='sign up'
			triggerClassName='text-info-600 font-semibold hover:opacity-80 underline transition font-bold uppercase'
			header='sign up'>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				{error && (
					<div className='text-danger-500 font-semibold'>
						({error.code}) {error.message}
					</div>
				)}

				<Controller
					name='displayName'
					control={control}
					rules={{
						required: rules.required,
						maxLength: 30,
					}}
					render={({ field: { value, onChange } }) => (
						<FormGroup
							type='text'
							value={value}
							onChange={onChange}
							error={errors.displayName}
							placeholder='Display Name'
						/>
					)}
				/>

				<Controller
					name='email'
					control={control}
					rules={{
						required: rules.required,
						pattern: rules.email,
					}}
					render={({ field: { value, onChange } }) => (
						<FormGroup
							type='email'
							value={value}
							onChange={onChange}
							error={errors.email}
							placeholder='Email'
						/>
					)}
				/>

				<Controller
					name='password'
					control={control}
					rules={{
						required: rules.required,
						pattern: rules.password,
					}}
					render={({ field: { value, onChange } }) => (
						<FormGroup
							type='password'
							value={value}
							onChange={onChange}
							error={errors.password}
							placeholder='Password'
						/>
					)}
				/>

				<div className='space-y-2'>
					<CheckboxGroup value={selected} onValueChange={setSelected}>
						<Checkbox value='allow-notifications'>
							Allow HNEX to send me update information
						</Checkbox>

						<Checkbox value='accept-terms'>
							I accept all{' '}
							<Link
								className='text-secondary sont semibold underline'
								href='/term-of-use'>
								Term of use
							</Link>{' '}
							and{' '}
							<Link
								className='text-secondary sont semibold underline'
								href='/privacy-policy'>
								Privacy Policy
							</Link>
						</Checkbox>
					</CheckboxGroup>

					{!selected.includes('accept-terms') && (
						<div className='text-sm font-medium text-red-600'>
							Please accept terms to continue!
						</div>
					)}
				</div>

				<Button
					type='submit'
					disabled={disabled}
					color='primary'
					fullWidth
					radius='full'
					className='text-white'>
					{disabled ? 'Loading...' : 'CONTINUE'}
				</Button>
			</form>
		</Modal>
	)
}

export default SignUpModal
