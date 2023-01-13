import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import * as jose from 'jose'

export default function Navbar() {
  const [jwt, setJwt] = useState<boolean>(false)
  const [cookies, setCookies, removeCookie] = useCookies(['sessionJWT'])

  const verifyToken = async (cookie: any) => {
    try { 
      const verifyJWT = await jose.jwtVerify(cookie, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
      if (!verifyJWT) setJwt(false)
      setJwt(true)
    }
    catch {
      setJwt(false)
    }
  }

  useEffect(() => {
    const cookie = cookies.sessionJWT
    verifyToken(cookie)
    
  }, [jwt])
  
  const handleLogout = () => {
    removeCookie('sessionJWT')
    setJwt(false)
  }

  return (
    <header className='w-full h-20 bg-blue-200'>
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
            </ul>
            )
          
          : (
              <ul className='mr-10 flex flex-nowrap gap-6'>
                <li className='text-xl pt-6 font-display'>
                  <Link className='bg-green-300 p-4 rounded-lg' to={'/create-video'}>Create New Video!</Link>
                </li>
                <li className='text-xl pt-2.5 font-display'>
                  <button onClick={handleLogout} className='bg-green-300 rounded-lg p-4 '>Logout</button>
                </li>
              </ul>
            
          )
        }
        
        
        
      </nav>
    </header>
    
  )
}