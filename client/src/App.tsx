import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { UserVideosPage } from './pages/UserVideosPage'
import { VideoFormPage } from './pages/VideoForm'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import NavBar from './components/NavBar/NavBar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={HomePage()} path='/'/>
        <Route element={VideoFormPage()} path='/create-video'  />
        <Route element={RegisterPage()} path='/register' />
        <Route element={LoginPage()} path='/login' />
        <Route element={UserVideosPage()} path='/dashboard' />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
