import React, { useEffect, useState } from 'react'
import * as jose from 'jose'
import { useCookies } from 'react-cookie'

export const UserDashboard = () => {
  const [jwt, setJwt] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [cookies, setCookies] = useCookies(['sessionJWT'])

  const verifyToken = async (cookie: any) => {
    try { 
      const verifyJWT = await jose.jwtVerify(cookie, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
      if (!verifyJWT) setJwt('')
      console.log(verifyJWT)
      setUsername(verifyJWT.payload.username as any)
      setJwt(cookie)
      return verifyJWT
    }
    catch {
      setJwt('')
    }
  }

  useEffect(() => {
    const cookie = cookies.sessionJWT
    verifyToken(cookie)
    console.log(cookie, verifyToken(cookie))
    
  }, [])

  useEffect(() => {
    
  })

  return (
    <div className='m-20'>
        <div>
            <h1 className='text-3xl font-semibold'>User: {username}</h1>
        </div>
    </div>
  )
}
