import bluerealbackground3 from "../assets/bluerealbackground3.jpg"
import { motion } from "motion/react";
import type { Variants } from "motion/react"

const Journey = () => {
  return (
    <div className='w-screen h-screen'>
      <div
  className="w-full h-full bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${bluerealbackground3})` }}
>
  <div className=" absolute w-full h-full flex flex-col justify-center items-center bg-black/30 text-white">
  </div>
    <div className="w-full h-full items-center justify-center flex flex-col">
      <p className="text-xl font-semibold">Scroll down or something</p>
    </div>
      <p>hi</p>

</div>
    </div>
  )
}

export default Journey