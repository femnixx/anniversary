import React from 'react'
import bluerealbackground from "../assets/bluerealbackground.jpg"
const Compliments = () => {
  const complimentsList = [
    "hi there",
    "hi",
    "you",
    "you're pretty",
    "You're so lovely"
  ];

  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full' style={{backgroundImage: `url(${bluerealbackground})`}}>
        <p>Compliment Generator</p>
        <p>Handmade compliments to make you happy 🤍</p>
      </div>
    </div>
  )
}

export default Compliments