import React from 'react'
import bluerealbackground from "../assets/bluerealbackground.jpg"

const Options = () => {
  return (
    <div className='w-screen h-screen' style={{ backgroundImage: `URL(${bluerealbackground})`}}>
        
        <div className='flex flex-col justify-center items-center'>
            <h1 className='mt-[10%]'>Fun Things To Do!</h1>
            <div className='mt-10 grid grid-cols-1 gap-y-10'>
                <div className='bg-white/40'>

                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>    
        </div>
    </div>
  )
}

export default Options;