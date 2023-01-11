import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { VideoFormPage } from './pages/VideoForm'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={HomePage()} path='/'/>
        <Route element={VideoFormPage()} path='/create-video'  />
      </Routes>
    </BrowserRouter>
  )
}

export default App
