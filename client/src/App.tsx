import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { VideoFormPage } from './pages/VideoForm'
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
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
