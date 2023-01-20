import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { UserVideosPage } from './pages/UserVideosPage'
import { VideoFormPage } from './pages/VideoForm'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import NavBar from './components/NavBar/NavBar'
import { UpdatePage } from './pages/UpdatePage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import * as jose from 'jose'

function App() {
  const [authenticated, setAuthorization] = useState<boolean>(false)
  const [cookies] = useCookies(['sessionJWT'])

  const validateJwt = () => {
    try {
      const verifyJWT = jose.jwtVerify(cookies.sessionJWT, new TextEncoder().encode(import.meta.env.VITE_SECRET_JWT as string))
      if (!verifyJWT) return
      return setAuthorization(true)
    } catch {
      return
    }
  }

  useEffect(() => {
    const cookie = cookies.sessionJWT
    if (!cookie) return

    validateJwt()
  })

  return (
    <BrowserRouter>
      <NavBar />
        {
          authenticated === false 
          ? (
            <Routes>
              <Route element={HomePage()} path='/'/>
              <Route element={HomePage()} path='/create-video'  />
              <Route element={RegisterPage()} path='/register' />
              <Route element={LoginPage()} path='/login' />
              <Route element={HomePage()} path='/dashboard' />
              <Route element={HomePage()} path='/videos/update/:id' />
            </Routes>
            )
          : (
            <Routes>
              <Route element={HomePage()} path='/'/>
              <Route element={VideoFormPage()} path='/create-video'  />
              <Route element={RegisterPage()} path='/register' />
              <Route element={LoginPage()} path='/login' />
              <Route element={UserVideosPage()} path='/dashboard' />
              <Route element={UpdatePage()} path='/videos/update/:id' />
            </Routes>
          )
        }
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
