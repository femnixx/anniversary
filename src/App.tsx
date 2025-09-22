import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import background from "./assets/background.jpg"

function App() {
  return (
    <>
     <div className='relative w-full h-screen bg-blue-300'>
        <p className=''>Happy <br /> Anniversary</p>
        <p>Here's to the first year of our relationship</p>
        {/* decoration like clouds */}
        <div></div>
        {/* pictures */}
        <div></div>
        {/* cinnamoroll pop up */}
        <p>Thank you for being with me</p>
     </div>
    </>
  )
}

export default App
