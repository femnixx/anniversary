import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import './App.css';

gsap.registerPlugin(useGSAP);

function App() {
  return (
    <>
    {/* splashscreen */}
    <div className="w-screen h-screen bg-[url('./assets/cinnamy.jpg')] bg-cover bg-center">
    </div>
    {/* content */}
    <div className="w-screen h-screen bg-[url('./assets/bluebackground.jpg')] bg-cover bg-center">
      <div className='w-full h-full flex flex-col justify-center items-center'>
          <p></p>
      </div>
    </div>

    </>
  )
}

export default App
