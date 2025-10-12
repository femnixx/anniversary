import React from 'react'
import bluerealbackground from "../assets/bluerealbackground.jpg"
import date from "../assets/date.png"
import moments from "../assets/moments.png"
import together from "../assets/together.png"
import compliments from "../assets/compliments.png"
import title from "../assets/optionstitle.png"

const Options = () => {
  return (
    <div className='w-screen min-h-screen' style={{ backgroundImage: `URL(${bluerealbackground})`}}>
        <div className='flex flex-col justify-center items-center'>
            <div className='mt-5 p-5'>
              <img src={title} alt="" />
            </div>
            <div className='mt-5 grid grid-cols-1 gap-y-10 m-10'>
                <div className='border-5 pb-5 border-white bg-white/40 flex flex-col justify-center items-center text-center rounded-xl'>
                    <div className='flex flex-col justify-center items-center'><img src={date} alt=""  className='w-50'/></div>
                    <p className='font-semibold'>plan our next date</p>
                </div>
                <div className='border-5 pb-5 border-white bg-white/40 flex flex-col justify-center items-center text-center rounded-xl'>
                    <div className='flex flex-col justify-center items-center'><img src={moments} alt=""  className='w-50'/></div>
                    <p className='font-semibold'>our favorite moments</p>
                </div>
                <div className='bg-white/40 border-5 pb-5 border-white flex flex-col justify-center items-center text-center rounded-xl'>
                    <div className='flex flex-col justify-center items-center'><img src={together} alt=""  className='w-50'/></div>
                    <p className='font-semibold'>journey of togetherness</p>
                </div>
                <div className='bg-white/40 border-5 pb-5 border-white flex flex-col justify-center items-center text-center rounded-xl'>
                    <div className='flex flex-col justify-center items-center'><img src={compliments} alt=""  className='w-50'/></div>
                    <p className='font-semibold'>compliments generator</p>
                </div>
            </div>    
        </div>
    </div>
  )
}

export default Options;