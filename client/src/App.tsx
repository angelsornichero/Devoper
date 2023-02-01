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
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import * as jose from 'jose'
import { VideoPage } from './pages/VideoPage'
import { HistoryPage } from './pages/HistoryPage'
import React from 'react'
import NotFoundPage from './pages/404Page'
import SearchPage from './pages/SearchPage'

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
      
			{
				authenticated === false 
					? (
						<>
							<NavBar />
							<Routes>
								<Route element={HomePage()} path='/'/>
								<Route element={VideoPage()} path='/video/:id' />
								<Route element={RegisterPage()} path='/register' />
								<Route element={LoginPage()} path='/login' />
								<Route element={NotFoundPage()} path='/404' />
								<Route element={SearchPage()} path='/searches/search/:searches'/>
							</Routes>
						</>
					)
					: (
						<>
							<NavBar />
							<Routes>
								<Route element={SearchPage()} path='/searches/search/:searches'/>
								<Route element={NotFoundPage()} path='*' />
								<Route element={HomePage()} path='/'/>
								<Route element={VideoPage()} path='/video/:id' />
								<Route element={VideoFormPage()} path='/create-video'  />
								<Route element={RegisterPage()} path='/register' />
								<Route element={LoginPage()} path='/login' />
								<Route element={UserVideosPage()} path='/dashboard' />
								<Route element={UpdatePage()} path='/videos/update/:id' />
								<Route element={HistoryPage()} path='/user/history' />
							</Routes>
						</>
					)
			}
			<ToastContainer />
		</BrowserRouter>
	)
}

export default App
