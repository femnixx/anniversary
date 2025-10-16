import React from 'react'
import bluerealbackground from "../assets/bluerealbackground.jpg"

const Moments = () => {
  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full' style={{backgroundImage: `url(${bluerealbackground})`}}>
        <p>hi there</p>
      </div>
    </div>
  )
}

export default Moments