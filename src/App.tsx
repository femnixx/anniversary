import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import './App.css';
import envelope from "./assets/trans-evelope.png"
import text from "./assets/text.png"
import cinnamorollpeeking from "./assets/cinnamorollpeeking.png" 
function App() {
  
  return (
    <>
      {/* splashscreen */}
      <div className="w-screen h-screen bg-[url('./assets/bluerealbackground.jpg')] bg-cover bg-center p-5 flex flex-col">
          <div className="bg-white/95 rounded-2xl shadow-2xl p-3">
              <div className="flex justify-center">
                <img src={envelope} alt="baby blue envelope"/>
                </div>
              <div className="-mt-5">
                <p className="text-center text-blue-400 font-bold">you've got mail ! </p>
                <div className="flex gap-x-5 w-full justify-center mt-3">
                    <button className="bg-green-300 px-2 py-0.5 rounded-full">open</button>
                    <button className="bg-red-300 px-2 py-0 rounded-full text-black">leave</button>
                </div>
              </div>
          </div>
            <div className="w-full h-full flex flex-col items-center justify-center">
              <img src={text} alt="" className="max-w-full max-h-full object-contain"/>
              <img src={cinnamorollpeeking} alt="" className="flex flex-1"/>
            </div>
      </div>
    </>
  );
}

export default App;

