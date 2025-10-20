import { useState } from "react";
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularGallery from "../components/CircularGallery";
import "../components/CircularGallery.css";

const Plan = () => {
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const handleTime = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };
  const handlePlace = (event: SelectChangeEvent) => {
    setPlace(event.target.value as string);
  };

  // Example: custom items (optional)
  const myGalleryItems = [
    { image: "https://picsum.photos/id/1003/800/600", text: "First Date" },
    { image: "https://picsum.photos/id/1025/800/600", text: "Beach Day" },
    { image: "https://picsum.photos/id/1062/800/600", text: "Coffee Break" },
    { image: "https://picsum.photos/id/1074/800/600", text: "Concert Night" },
  ];

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat flex flex-col items-center"
        style={{ backgroundImage: `url(${bluerealbackground3})` }}
      >
        <div className="pt-8 text-center px-4">
          <p className="font-bold text-white text-3xl md:text-4xl italic drop-shadow-lg">
            our favorite memories!
          </p>
        </div>

        <div
          className="flex justify-center items-center w-full"
          style={{
            height: "65vh",
            position: "relative",
          }}
        >
          <CircularGallery
            items={myGalleryItems}
            bend={2.5}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.03}
          />
        </div>
      </div>
    </div>
  );
};

export default Plan;
