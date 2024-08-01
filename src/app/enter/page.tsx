'use client'

import { Button } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import Brand from '@/components/ui/Brand'
import FormGroup from '@/components/ui/FormGroup'
import api from '@/config/axios'
import { IError } from '@/interfaces'
import { setUser } from '@/store/slices/userSlice'
import { setTokens } from '@/utils/jwt'
import { rules } from '@/utils/rules'
import SignUpModal from './SignUpModal'

type FormData = {
	email: string
	password: string
}

const Enter = () => {
	const [error, setError] = useState<IError>()
	const [disabled, setDisabled] = useState(false)
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: '',
			password: '',
		},
		mode: 'onChange',
	})
	const dispatch = useDispatch()
	const router = useRouter()
	const { setTheme } = useTheme()

	const onSubmit: SubmitHandler<FormData> = async (formData) => {
		try {
			setDisabled(true)

			const { data } = await api.post('auth/login', formData)

			if ('error' in data) {
				handleError(data.error)
				return
			}

			setTokens(data.data.accessToken, data.data.refreshToken)
			const { data: profile } = await api.get('users/profile')

			if ('error' in profile) {
				handleError(data.error)
				return
			}

			reset()
			setError(undefined)
			setDisabled(false)
			dispatch(setUser(profile.data))
			setTheme(profile.data.theme.toLowerCase())
			router.push('/')
		} catch (error) {
			setError(undefined)
			setDisabled(false)
			console.log('LoginError:', error)
		}
	}

	const handleError = (error: any) => {
		setError(error)
		setDisabled(false)
		reset()
	}

	return (
		<div className='h-screen flex items-center justify-center'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='py-4 px-8 rounded-md space-y-5 max-w-xs w-full'>
				<div className='flex flex-col items-center space-y-2'>
					<Brand size='lg' className='flex' />

					{error && (
						<div className='text-danger-500 font-semibold'>
							({error.code}) {error.message}
						</div>
					)}
				</div>

				<Controller
					name='email'
					control={control}
					rules={{ required: rules.required, pattern: rules.email }}
					render={({ field: { value, onChange } }) => (
						<FormGroup
							type='email'
							placeholder='Email'
							value={value}
							onChange={onChange}
							error={errors.email}
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
							placeholder='Password'
							value={value}
							onChange={onChange}
							error={errors.password}
						/>
					)}
				/>

				<Button
					type='submit'
					disabled={disabled}
					radius='full'
					color='primary'
					fullWidth>
					CONTINUE
				</Button>

				<div className='text-sm text-center uppercase font-medium'>
					New to HNEX ? <SignUpModal />
				</div>
			</form>
		</div>
	)
}

export default Enter
