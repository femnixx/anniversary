import React from 'react'
import gsap from 'gsap'
import { useEffect, useRef } from "react";
import ScrollTrigger from 'gsap/ScrollTrigger';
import bluerealbackground from "../assets/bluerealbackground.jpg"

gsap.registerPlugin(ScrollTrigger);

const Journey = () => {
  return (
    <div className='w-screen h-screen'>
      <div className='w-full h-full' style={{backgroundImage: `url(${bluerealbackground})`}}>
        <p>hi</p>
      </div>
    </div>
  )
}

export default Journey