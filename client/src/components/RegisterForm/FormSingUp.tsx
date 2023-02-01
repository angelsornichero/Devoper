import React, { useState, ChangeEvent } from 'react'
import { User } from '../../types/User.type'
import { useCookies } from 'react-cookie'
import { registerUser } from '../../services/UserService'
import { toast } from 'react-toastify'

export const FormSingUp = () => {
	const [user, setUser] = useState<User>({username: '', password: '', repeatPassword: '', ytUser: ''})
	const [cookies, setCookies] = useCookies(['sessionJWT'])
	const [error, setError] = useState<boolean>(false) 

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser({...user, [e.target.name]: e.target.value})
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		try {
			const data = await registerUser(user)
			toast.success('User correctly registered')
			console.log(data)
			setCookies('sessionJWT', data.token)
			window.location.href = '/'
		}
		catch (error){
			console.log(error)
		}
	}

	return (
		<div className='mt-20 rounded-lg bg-slate-200'>
			{
				error 
					? <h1 className='bg-red-700 p-4 text-xl'>Error, maybe user already exists</h1>
					: <></>
			}
			<form className='text-center p-2 sm:p-12'>
				<span className='text-4xl'>Register</span>
				<div className='m-6 flex justify-center'>
					<input className='rounded p-2 h-[30px] w-[350px]'
						type={'text'}
						onChange={(e) => handleInputChange(e)}
						name='username'
						placeholder={'Write a username for Devoper'}
					/>
				</div>
				<div className='m-6 flex justify-center'>
					<input className='h-[30px] rounded p-2 w-[350px]'
						type={'password'}
						onChange={(e) => handleInputChange(e)}
						name='password'
						placeholder={'Write a password for Devoper'}
					/>
				</div>
				<div className='m-6 flex justify-center'>
					<input className='h-[30px] rounded p-2 w-[350px]'
						type={'password'}
						onChange={(e) => handleInputChange(e)}
						name='repeatPassword'
						placeholder={'Repeat password for Devoper'}
					/>
				</div>
				<div className='m-6 flex justify-center'>
					<input className='h-[30px] rounded p-2 w-[350px]'
						type={'text'}
						onChange={(e) => handleInputChange(e)}
						name='ytUser'
						placeholder={'Write a youtube user for Devoper'}
					/>
				</div>
				<div className='m-6 flex justify-center'>
					<button onClick={(e) => handleSubmit(e)} className='bg-green-400 p-4 rounded-md'>Register now!</button>
				</div>
			</form>
		</div>
	)
}

