import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import './App.css';
import cinnamorollking from "./assets/kingcinnamoroll.gif";

gsap.registerPlugin(useGSAP);

function App() {
  return (
    <>
      {/* splashscreen */}
      <div className="w-screen h-screen bg-[url('./assets/cinnamy.jpg')] bg-cover bg-center">
        <div className="w-full h-full flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg">
            {/* container for video */}
            <div>
              <img src={cinnamorollking} alt="king cinnamoroll" className="w-20"/>              
            </div>
            <p></p>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="w-screen h-screen bg-[url('./assets/bluebackground.jpg')] bg-cover bg-center">
        <div className="w-full h-full flex justify-center items-center">
          <p>Second section</p>
        </div>
      </div>
    </>
  )
}

export default App;
