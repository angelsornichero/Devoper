import { useEffect, useState } from 'react'
import * as jose from 'jose'
import { useCookies } from 'react-cookie'


const useAuthorization = () => {
    const [userId, setUserId] = useState<string>('')
    const [jwt, setJwt] =  useState<string>()
    const [cookie] = useCookies(['sessionJWT'])

    const loadId = async () => {
        const { payload } = await jose.jwtVerify(cookie.sessionJWT, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
        setUserId(payload.id as string)
        setJwt(cookie.sessionJWT)
        return payload.id
    }

    useEffect(() => {loadId()})

    return { userId, jwt }
}

export default useAuthorization