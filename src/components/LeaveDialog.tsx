import {Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Button} from "@mui/material"
import { random } from "gsap";
import React, { useState } from 'react'
import { motion } from "framer-motion";

const begMessage = [
    "i love you so i sent this to you!!",
    "i beggg",
    "at least give it a shot!!",
    "but i wanna give you somethingg"
]

const begTitle = [
    "c'mnon noww",
    "i love you though 🥺",
    "pleaseee"
]

const LeaveDialog = ({ open, onClose }) => {
    const begMessageIndex = Math.floor(Math.random() * begMessage.length);
    const begTitleIndex = Math.floor(Math.random() * begTitle.length);
    const message = begMessage[begMessageIndex];
    const title = begTitle[begTitleIndex];

  return ( 
    <div>
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>
                <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity:1, scale:1}}
                transition={{duration: 0.4}}
                className="flex flex-col justify-center items-center text-lg font-semibold text-blue-400/60 text-center"
                >
                    {title}
                </motion.div>
            </DialogTitle>
            <DialogContent>
                <motion.div
                initial={{opacity:0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.4}}
                className="flex flex-col justify-center items-center text-base font-semibold text-blue-600/40 italic text-center"
                >
                    {message}
                </motion.div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default LeaveDialog