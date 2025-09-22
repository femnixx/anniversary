import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import background from "./assets/background.jpg"

function App() {
  return (
    <>
      <div className='w-full h-screen bg-cover bg-center' style={{backgroundImage: `url(${background})`}}>
        <div className='flex items-center justify-center h-full'>
          <div className='flex bg-red-600'>
            <p>hi there</p>
          </div>
        </div>
      </div> 
    </>
  )
}

export default App
