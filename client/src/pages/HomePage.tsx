import React from 'react'
import Videos from '../components/Videos/Videos.js'
import { Navigator } from '../components/Navigator/Navigator.js'

const HomePage = () => {
  return (
    <div>
        <Navigator /> 
        <Videos />
    </div>
  )
}

export default HomePage