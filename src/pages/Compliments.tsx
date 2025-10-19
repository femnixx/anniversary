import React from 'react'
import bluerealbackground from "../assets/bluerealbackground.jpg"
import complimentGenerator from '../components/Functions'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { random } from 'gsap';

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }

  
  const Compliments = () => {
    const [randomCompliment, setRandomCompliment] = useState("");
    const [open, setOpen] = useState(false);

  const complimentsList = [
    "hi there",
    "hi",
    "you",
    "you're pretty",
    "You're so lovely",
    "i love you",
    "memememe"
  ];

  const generateCompliment = () => {
    const randomIndex = Math.floor(Math.random() * complimentsList.length);
    setRandomCompliment(complimentsList[randomIndex]);
    setOpen(true); // open dialog
  };

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className='w-full h-full' style={{backgroundImage: `url(${bluerealbackground})`}}>
            
          
          <div className='pt-10 flex flex-col justify-center items-center w-full h-auto'>
            <p className='text-center text-2xl text-white text-shadow-lg text-shadow-blue-300/60 italic font-semibold'>compliments</p>
          </div>
          
        <div className='flex flex-col pt-20 items-center w-full h-full p-3 text-center'>
          <div className='bg-white/100 p-3 shadow-xl rounded-xl gap-y-3 flex flex-col outline-2 outline-blue-500 shadow-blue-200'>
            <p className='text-lg font-semibold drop-shadow-lg italic'>to my favorite person 💌</p>
            <p className='text-md font-light p-2'>handmade compliments for your eyes only</p>
            {/* the compliments generator */}
            <div className='bg-white/50 rounded-lg m-5 p-3 shadow-2xl/30 outline-dotted outline-blue-300'>
                <div className='w-full h-auto flex flex-col compliments justify-center items-center gap-y-5'>
                  <p className='italic font-semibold'>click to reveal!</p>
                  {/* generate compliments */}
                  <button onClick={generateCompliment} className='bg-gradient-to-r from-blue-300 to-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-blue-400/50'>generate 🤍</button>
                  {/* show compliments */}
                  <Dialog className='' onClose={handleClose} open={open}>
                    <DialogTitle>
                      Your Compliment
                    </DialogTitle>
                    <DialogContent>
                        {randomCompliment}
                    </DialogContent>
                  </Dialog>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Compliments