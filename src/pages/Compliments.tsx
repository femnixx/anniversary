import React, { useState } from 'react';
import bluerealbackground3 from "../assets/bluerealbackground3.jpg";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { motion } from "framer-motion";
import InfiniteScroll from '../components/InfiniteScroll';
import '../components/InfiniteScroll.css';

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

  const handleClose = () => setOpen(false);

  return (
    <div className='w-screen h-screen overflow-hidden relative'>
      {/* Background */}
      <div
        className='w-full h-full bg-no-repeat bg-cover bg-center'
        style={{ backgroundImage: `url(${bluerealbackground3})` }}
      >
        {/* Header */}
        <div className='pt-10 flex flex-col justify-center items-center w-full h-auto'>
          <p className='text-center text-2xl text-white text-shadow-lg text-shadow-blue-300/60 italic font-semibold'>
            compliments
          </p>
        </div>

        {/* Compliment Generator */}
        <div className='flex flex-col pt-20 items-center w-full h-full p-3 text-center flex-grow flex-1'>
          <div className='bg-white/100 p-3 shadow-xl rounded-xl gap-y-3 flex flex-col outline-2 outline-blue-500 shadow-blue-200'>
            <p className='text-lg font-semibold drop-shadow-lg italic'>to my favorite person 💌</p>
            <p className='text-md font-light p-2'>handmade compliments for your eyes only</p>

            <div className='bg-white/50 rounded-lg m-5 p-3 shadow-2xl/30 outline-dotted outline-blue-300'>
              <div className='w-full h-auto flex flex-col compliments justify-center items-center gap-y-5'>
                <p className='italic font-semibold'>click to reveal!</p>
                <button
                  onClick={generateCompliment}
                  className='bg-gradient-to-r from-blue-300 to-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-blue-400/50'
                >
                  generate 🤍
                </button>

                <Dialog onClose={handleClose} open={open}>
                  <DialogTitle>Your Compliment</DialogTitle>
                  <DialogContent>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col justify-center items-center text-lg font-semibold text-blue-500/60 italic"
                    >
                      {randomCompliment}
                    </motion.div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Scroll */}
        <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl' style={{ height: '500px' }}>
          <InfiniteScroll
            items={complimentsList.map(text => ({ content: <p className="text-white">{text}</p> }))}
            maxHeight="500px"
            isTilted={true}
            tiltDirection="left"
            autoplay={true}
            autoplaySpeed={0.2}
            autoplayDirection="down"
            pauseOnHover={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Compliments;
