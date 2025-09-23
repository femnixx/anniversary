import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import background from "./assets/background.jpg"

function App() {
  return (
    <>
     <div className='relative w-full h-screen background-cover background-center bg-blue-200'>
       {/* background opacity */}
       <div className='bg-black w-full h-full opacity-5 z-0 absolute'></div>
        {/* content */}
        <div className='relative z-20 text-center pt-5'>
          <p className='font-greatvibes text-7xl text-white mr-15'>Happy</p>
          <p className='font-greatvibes text-6xl text-white ml-10'>Anniversary</p>
          <p>Here's to the first year of our relationship</p>
          {/* decoration like clouds */}
          <div></div>
          {/* timeline of us */}
          <div>
          </div>
          {/* favorite pictures */}
          <div></div>
          {/* cinnamoroll pop up */}
          <p>Thank you for being with me</p>
          <p>Here's some cute things to do here!</p>
        </div>
        
     </div>
    </>
  )
}

export default App
