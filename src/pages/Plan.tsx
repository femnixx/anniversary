import { useState } from "react";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularGallery from "../components/CircularGallery"
import '../components/CircularGallery.css'

const Plan = () => {
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const handleTime = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  }
  const handlePlace = (event: SelectChangeEvent) => {
    setPlace(event.target.value as string);
  }
  
  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url(${bluerealbackground3})`}}>
        <div className="w-full h-auto pt-10">
          <p className="font-bold text-white text-2xl italic text-center">our favorite memories!</p>
      </div>
      <div className="w-full h-full">
        <div className="mt-10 flex justify-center items-center" style={{ height: '600px', position: 'relative'}}>
          <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
        </div>
      </div>
    </div>
    </div>
  )
};

export default Plan