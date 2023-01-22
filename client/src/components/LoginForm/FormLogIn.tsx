import React, {useState, ChangeEvent} from 'react'
import { User } from '../../types/User.type'
import { useCookies } from 'react-cookie'
import { loginUser } from '../../services/UserService'
import { toast } from 'react-toastify'

export const FormLogIn = () => {
    const [user, setUser] = useState<User>({username: '', password: ''})
    const [cookies, setCookies, removeCookie] = useCookies(['sessionJWT'])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
       setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const data = await loginUser(user)
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
                <form className='text-center p-2 sm:p-12'>
                    <span className='text-4xl'>Log in</span>
                    <div className='m-6 flex justify-center'>
                        <input className='rounded p-2 h-[30px] w-[350px]'
                            type={'text'}
                            name='username'
                            onChange={(e) => handleInputChange(e)}
                            placeholder={'Write your username for Devoper'}
                        />
                    </div>
                    <div className='m-6 flex justify-center'>
                        <input className='h-[30px] rounded p-2 w-[350px]'
                            type={'password'}
                            name='password'
                            onChange={(e) => handleInputChange(e)}
                            placeholder={'Write your password for Devoper'}
                        />
                    </div>
                    <div className='m-6 flex justify-center'>
                        <button onClick={(e) => handleSubmit(e)} className='bg-green-400 p-4 rounded-md'>Log in now!</button>
                    </div>
                </form>
            </div>
    )
}