import React from 'react'
import bluerealbackground from "../assets/bluerealbackground.jpg"
import complimentGenerator from '../components/Functions'
import { useState } from 'react'

const Compliments = () => {
  const [randomCompliment, setRandomCompliment] = useState("");
  const complimentsList = [
    "hi there",
    "hi",
    "you",
    "you're pretty",
    "You're so lovely",
    "i love you",
    "memememe"
  ];

const generateCompliment = () => {
  const randomIndex = Math.floor(Math.random() * complimentsList.length)
  setRandomCompliment(complimentsList[randomIndex]);
}

  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full' style={{backgroundImage: `url(${bluerealbackground})`}}>
        <div className='flex flex-col justify-center items-center w-full h-full p-3 text-center'>
          <p>compliments</p>
          <p>a list of handmade compliments i made to make you happy</p>
          <p>I hope you like them me amore :3</p>
          {/* the compliments generator */}
          <div className='bg-white rounded-lg m-5 p-3'>
              <div className='w-full h-auto flex flex-col justify-center items-center gap-y-5'>
                <p className='italic font-semibold'>compliments to make your day!</p>
                {/* generate compliments */}
                <button onClick={generateCompliment} className='bg-blue-300 p-1 rounded-full text-white font-semibold'>generate!</button>
                {/* show compliments */}
                <button>
                  {randomCompliment}
                </button>
              </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Compliments