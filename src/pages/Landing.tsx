import { useNavigate } from 'react-router-dom';
import '../App.css';
import cinnamorollpeeking from "../assets/cinnamorollpeeking.png";
import text from "../assets/text.png";
import envelope from "../assets/trans-evelope.png";
import LeaveDialog from '@/components/LeaveDialog';
import { useState } from 'react';

function Landing() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="w-screen h-screen bg-[url('./assets/bluerealbackground.jpg')] bg-cover bg-center flex flex-col justify-between overflow-y-hidden">
      
      {/* Top section: Card + Text side by side on md+ */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 flex-grow px-5 pt-5 sm:flex-row">
        
        {/* Card */}
        <div className="bg-white/95 rounded-2xl p-5 ring-3 ring-blue-300 shadow-lg shadow-blue-300 w-full md:max-w-md">
          <p className="text-3xl md:text-4xl font-semibold text-center text-blue-400">𝙨𝙪𝙧𝙥𝙧𝙞𝙨𝙚!</p>
          <div className="flex justify-center -mt-4">
            <img src={envelope} alt="baby blue envelope" className="w-40 md:w-48"/>
          </div>
          <div className="-mt-3 px-5">
            <div className="border-blue-200 border-dashed border-2"></div>
          </div>
          <div className="p-3">
            <p className="text-center text-blue-400 font-bold text-lg md:text-xl">you've got mail!</p>
            <div className="flex gap-x-5 w-full justify-center mt-3">
              <button
                className="bg-green-300 px-3 py-1 rounded-full hover:bg-green-400 transition"
                onClick={() => navigate('/message')}
              >
                open
              </button>
              <button className="bg-red-300 px-3 py-1 rounded-full text-black hover:bg-red-400 transition" onClick={() => {setOpenDialog(true)}}>
                leave
              </button>
            </div>
          </div>
        </div>

        {/* Text image */}
        <div className="w-full md:w-auto flex justify-center">
          <img src={text} alt="text" className="max-w-xs md:max-w-md object-contain" />
        </div>
      </div>

      {/* Bottom Cinnamoroll image */}
      <div className="flex justify-center mb-2">
        <img src={cinnamorollpeeking} alt="cinnamoroll peeking" className="w-40 md:w-56 -mt-6" />
      </div>

      {/* Leave Dialog */}
      <LeaveDialog open={openDialog} onClose={() => setOpenDialog(false)}></LeaveDialog>
    </div>
  );
}

export default Landing;
