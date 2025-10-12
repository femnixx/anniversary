import React from 'react'
import bluerealbackground from "../assets/bluerealbackground.jpg"
import date from "../assets/date.png"
import moments from "../assets/moments.png"
import together from "../assets/together.png"
import compliments from "../assets/compliments.png"
import title from "../assets/optionstitle.png"
import { Navigate, useNavigate } from 'react-router-dom'

const navigate = useNavigate();
const Card = ({ imgSrc, label, alt, Link }) => 
(
  <div
    role="button"
    tabIndex={0}
    className="group rounded-2xl bg-white/20 backdrop-blur-md ring-5 ring-white/100
               hover:ring-white/60 transition-all duration-300 hover:-translate-y-1
               hover:shadow-xl focus-visible:outline-none
               focus-visible:ring-2 focus-visible:ring-white/70" onClick={() => {navigate(`${Link}`)}}
  >
    <div className="flex flex-col items-center justify-center p-6 sm:p-8">
      <img
        src={imgSrc}
        alt={alt}
        className="h-24 sm:h-28 object-contain drop-shadow-md transition-transform
                   duration-300 group-hover:scale-105"
      />
      <p className="mt-4 font-semibold text-white/90 text-base sm:text-lg tracking-wide">
        {label}
      </p>
    </div>
  </div>
)

const Options = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${bluerealbackground})` }}
    >
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <header className="flex justify-center">
          <img
            src={title}
            alt="Options"
            className="h-14 sm:h-16 md:h-20 object-contain drop-shadow"
          />
        </header>

        <section className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 auto-rows-fr">
          <Card imgSrc={date} alt="Calendar and heart" label="plan our next date"/>
          <Card imgSrc={moments} alt="Camera and memories" label="our favorite moments" />
          <Card imgSrc={together} alt="Timeline together" label="journey of togetherness" />
          <Card imgSrc={compliments} alt="Stars and compliments" label="compliments generator" />
        </section>
      </main>
    </div>
  )
}

export default Options