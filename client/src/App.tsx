import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { VideoFormPage } from './pages/VideoForm'
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={HomePage()} path='/'/>
        <Route element={VideoFormPage()} path='/create-video'  />
      </Routes>
    </BrowserRouter>
  )
}

export default App
