import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import './App.css';
import cinnamorollking from "./assets/kingcinnamoroll.gif";

gsap.registerPlugin(useGSAP);

function App() {
  return (
    <>
      {/* splashscreen */}
      <div className="w-screen h-screen bg-[url('./assets/bluerealbackground.jpg')] bg-cover bg-center">
        <div className="w-full h-full flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg flex p-0">
            {/* container for video */}
            <div className="">
              <img src={cinnamorollking} alt="king cinnamoroll" className="w-20"/>              
            </div>
            {/* content */}
            <div className="bg-blue-300/50 w-0.5 m-2"></div>
            <p className="p-2">Welcome</p>
          </div>
        </div>
      </div>

      {/* slide 2 */}
      <div className="w-screen h-screen bg-[url('./assets/bluebackground.jpg')] bg-cover bg-center">
        <div className="w-full h-full flex justify-center items-center">
          <p>Second section</p>
        </div>
      </div>
    </>
  )
}

export default App;
