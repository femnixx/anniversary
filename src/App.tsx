import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import './App.css';
import cinnamorollking from "./assets/kingcinnamoroll.gif";

gsap.registerPlugin(useGSAP);

function App() {
  useGSAP(() => {
    gsap.from(".card-container", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power2.out",
    });
  });

  return (
    <>
      {/* splashscreen */}
      <div className="w-screen h-screen bg-[url('./assets/bluerealbackground.jpg')] bg-cover bg-center p-5">
        <div className="w-full h-full flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg flex p-0 card-container cursor-pointer"
            onMouseEnter={() => gsap.to(".card-container", { scale: 1.05, duration: 0.2 })}
            onMouseLeave={() => gsap.to(".card-container", { scale: 1, duration: 0.2 })}
          >
            {/* container for video */}
            <div className="flex items-center justify-center h-full p-2">
              <img src={cinnamorollking} alt="king cinnamoroll" className="w-20"/>              
            </div>
            {/* content */}
            <div className="bg-blue-300/50 w-0.5 m-2"></div>
            <div className="p-2 flex items-center flex-col">
              <p className="">Happy Anniversary!</p>
              <p>Ready to see our journey?</p>
              <p>Click me!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;