import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { FaUserCircle } from 'react-icons/fa'
import { BiChevronDown } from 'react-icons/bi'
import { toast } from 'react-toastify'
import useAuthorization from '../../hooks/useAuthorization'

export default function Navbar() {
	const { jwt } = useAuthorization()
	const [cookies, setCookies, removeCookie] = useCookies(['sessionJWT'])
	const [open, setOpen] = useState<boolean>(false)

	const handleLogout = () => {
		removeCookie('sessionJWT')
		toast.success('User correctly logout')
		window.location.href = '/'
	}

	const handleModal = () => {
		const modal = document.querySelector('#modal')
		if (open === false) {
			modal?.classList.remove('hidden')
			modal?.classList.add('flex')
			return setOpen(true)
		}
		if (open === true) {
			modal?.classList.remove('flex')
			modal?.classList.add('hidden')
			return setOpen(false)
		}
	}

	return (
		<header className='w-full h-20 bg-green-700 text-white'>
			<nav className='flex justify-between'>
				<ul className='sm:ml-10 flex flex-nowrap gap-6'>
					<li className='text-4xl sm:text-5xl p-2 pt-3 font-body sm:p-3'>
						<Link to={'/'}>DEVOPER</Link>
					</li>
					<li className='hidden lg:block sm:text-2xl sm:pt-7 font-display'>
            Learn to code watching videos
					</li>
				</ul>
				{
					jwt === undefined

						? (
							<ul className='flex flex-nowrap gap-6'>
								<li className='text-sm sm:text-xl pt-6 font-display'>
									<Link className='bg-gray-800 p-4 rounded-lg' to={'/register'}>Register now!</Link>
								</li>
								<li className='text-sm sm:text-xl pt-6 font-display mr-4'>
									<Link className='bg-gray-800 rounded-lg p-4' to={'/login'}>Login</Link>
								</li>
							</ul>
						)
          
						: (
							<ul className='flex gap-2 flex-nowrap sm:gap-6'>
								<li className='sm:pt-6 pt-5 font-display'>
									<Link id='nav-button-1' className='bg-gray-800 text-sm sm:text-2xl p-2 sm:p-4 rounded-lg sm:rounded-lg' to={'/create-video'}>Create New Video!</Link>
								</li>
								<li onClick={handleModal} className='flex sm:mr-2 text-5xl sm:text-6xl pt-2 font-display cursor-pointer'>
									<div className='flex'>
										<FaUserCircle className='text-gray-800' /> 
										<BiChevronDown className='text-5xl sm:text-5xl pt-3 text-gray-800' />
									</div>
								</li>
							</ul>
						)
				}
          
			</nav>
			<div id='modal' className='hidden justify-end '>
				<ul className='bg-gray-900 mr-3 rounded-lg '>
					<li className='text-sm text-center sm:text-xl p-1 sm:p-6 font-display border-b-[1px] sm:border-b-2'>
						<Link id='nav-button-2' className='text-white  cursor-pointer' to={'/dashboard'}>Your videos!</Link>
					</li>
					<li className='text-sm text-center sm:text-xl p-1 sm:p-6 font-display border-b-[1px] sm:border-b-2'>
						<Link id='nav-button-2' className='text-white  cursor-pointer' to={'/user/history'}>History of videos</Link>
					</li>
					<li className='text-sm text-center sm:text-xl p-1 sm:p-6 font-display sm:border-b-2'>
						<button id='nav-button' onClick={handleLogout} className='text-white cursor-pointer '>Logout</button>
					</li>
				</ul>
			</div> 
		</header>
    
	)
}