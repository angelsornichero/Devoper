import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import * as jose from 'jose'
import { FaMoon } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function Navbar() {
  const [jwt, setJwt] = useState<boolean>(false)
  const [cookies, setCookies, removeCookie] = useCookies(['sessionJWT'])
  const [mode, setMode] = useState<boolean>(false)

  const verifyToken = async (cookie: any) => {
    try { 
      const verifyJWT = await jose.jwtVerify(cookie, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
      if (!verifyJWT) setJwt(false)
      console.log(verifyJWT)
      setJwt(true)
      return verifyJWT
    }
    catch {
      setJwt(false)
    }
  }

  useEffect(() => {
    const cookie = cookies.sessionJWT
    verifyToken(cookie)
    console.log(cookie, verifyToken(cookie))
    
  }, [jwt])
  useEffect(() => {
    const root = window.document.querySelector('body')
    const icon = window.document.querySelector('#icon')
    const nav = window.document.querySelector('header')
    const button = window.document.querySelector('#nav-button')
    const button1 = window.document.querySelector('#nav-button-1')
    const button2 = window.document.querySelector('#nav-button-2')

    if (mode === false && root !== null && icon !== null && nav !== null && button && button1 && button2) {
      root.classList.remove('bg-gray-700'); root.classList.add('bg-white')
      nav.classList.remove('bg-blue-700'); nav.classList.add('bg-blue-200'); nav.classList.remove('text-white'); nav.classList.add('text-black')
      icon.classList.remove('text-grey-400'); icon.classList.add('text-black')
      button.classList.remove('bg-green-600'); button.classList.add('bg-green-300')
      button1.classList.remove('bg-green-600'); button1.classList.add('bg-green-300')
      button2.classList.remove('bg-green-600'); button2.classList.add('bg-green-300')

    }
    
    if (mode === true && root !== null && icon !== null && nav !== null && button && button1 && button2) {
      root.classList.remove('bg-white'); root.classList.add('bg-gray-700')
      nav.classList.remove('bg-blue-200'); nav.classList.add('bg-blue-700'); nav.classList.remove('text-black'); nav.classList.add('text-white')
      icon.classList.remove('text-black'); icon.classList.add('text-grey-400')
      button.classList.remove('bg-green-300'); button.classList.add('bg-green-600')
      button1.classList.remove('bg-green-300'); button1.classList.add('bg-green-600')
      button2.classList.remove('bg-green-300'); button2.classList.add('bg-green-600')
      toast('Theme changed to darkmode', {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
        });
    }
    
  }, [mode])
  
  const handleLogout = () => {
    removeCookie('sessionJWT')
    setJwt(false)
    toast.success('User correctly logout')
  }

  

  return (
    <header className='w-full h-20 bg-blue-200 text-black'>
      <nav className='flex justify-between'>
        <ul className='ml-10 flex flex-nowrap gap-6'>
          <li className='text-5xl font-body p-3'>
           <Link to={'/'}>DEVOPER</Link>
          </li>
          <li className='text-2xl pt-7 font-display'>
            Learn to code watching videos
          </li>
        </ul>
        {
          jwt === false 
          
          ? (
              <ul className='mr-10 flex flex-nowrap gap-6'>
                <li className='text-xl pt-6 font-display'>
                  <Link className='bg-green-300 p-4 rounded-lg' to={'/register'}>Register now!</Link>
                </li>
                <li className='text-xl pt-6 font-display'>
                  <Link className='bg-green-300 rounded-lg p-4' to={'/login'}>Login</Link>
                </li>
                <li className='text-xl pt-2.5 font-display'>
                  <label className="relative inline-flex items-center cursor-pointer">
                      <input onChange={() => {setMode(!mode); console.log('change')}} type="checkbox" value="" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute pt-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-200"></div>
                      <span className="ml-3 text-5xl font-medium  dark:text-gray-300"><FaMoon id='icon' className='text-black' /></span>
                  </label>
                </li>
            </ul>
            )
          
          : (
              <ul className='mr-10 flex flex-nowrap gap-6'>
                <li className='text-xl pt-6 font-display'>
                  <Link id='nav-button-1' className='bg-green-300 p-4 rounded-lg' to={'/create-video'}>Create New Video!</Link>
                </li>
                <li className='text-xl pt-6 font-display'>
                  <Link id='nav-button-2' className='bg-green-300 p-4 rounded-lg' to={'/dashboard'}>Your videos!</Link>
                </li>
                <li className='text-xl pt-2.5 font-display'>
                  <button id='nav-button' onClick={handleLogout} className='bg-green-300 rounded-lg p-4 '>Logout</button>
                </li>
                <li className='text-xl pt-2.5 font-display'>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input onChange={() => {setMode(!mode); console.log('change')}} type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute pt-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-200"></div>
                    <span className="ml-3 text-5xl font-medium  dark:text-gray-300"><FaMoon id='icon' className='text-black' /></span>
                  </label>
                </li>
              </ul>
            
          )
        }
        

        
        
      </nav>
    </header>
    
  )
}