import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import './App.css';
import cinnamorollking from "./assets/kingcinnamoroll.gif";

gsap.registerPlugin(useGSAP);

function App() {
  
  return (
    <>
      {/* splashscreen */}
      <div className="w-screen h-screen bg-[url('./assets/bluerealbackground.jpg')] bg-cover bg-center p-5">
        
      </div>
    </>
  );
}

export default App;