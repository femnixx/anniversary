import React from 'react'
import bluerealbackground from '../assets/bluerealbackground.jpg'

const Options = () => {
  return (
    <div className='w-screen h-screen' style={{backgroundImage: `url(${bluerealbackground})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className='w-full items-center flex flex-col '>
            <p className='text-lg mt-5'>Some cute activities for you to do</p>
            <div className='md:grid-cols-2 grid-cols-1 gap-y-10 flex flex-col mt-10'>
              <div className='bg-white/40'>
                <img src="" alt="">
                </img>
                    <p>Idea Of A Perfect Date</p>
              </div>
              <div className='bg-white/40'>
                <img src="" alt="">
                </img>
                    <p>Our Together Time</p>
              </div>
              <div className='bg-white/40'>
                <img src="" alt="">
                </img>
                    <p>Random Compliments Generator</p>
              </div>
              <div className='bg-white/40'>
                <img src="" alt="">
                </img>
                    <p>Favorite Moment Picker</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Options