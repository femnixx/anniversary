import {Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography} from "@mui/material"
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

const LeaveDialog = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    
    const handleClickOpen = () => {
        const randomMessageIndex = Math.floor(Math.random() * begMessage.length);
        const randomTitleIndex = Math.floor(Math.random() * begTitle.length);
        setMessage(begMessage[randomMessageIndex]);
        setTitle(begTitle[randomTitleIndex]);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

  return ( 
    <div>
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                <motion.div
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity:1, scale:1}}
                transition={{duration: 0.4}}
                className="flex flex-col justify-center items-center text-lg font-semibold text-blue-400/60"
                >
                    {title}
                </motion.div>
            </DialogTitle>
            <DialogContent>
                <motion.div
                initial={{opacity:0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.4}}
                className="flex flex-col justify-center items-center text-base font-semibold text-blue-600/40 italic"
                >
                </motion.div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default LeaveDialog