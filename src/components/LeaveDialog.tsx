"use client";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { motion } from "framer-motion";
import { useMemo } from "react";

const begMessages = [
  "i love you so i sent this to you!!",
  "i beggg",
  "at least give it a shot!!",
  "but i wanna give you somethingg",
];

const begTitles = [
  "c'mnon noww",
  "i love you though 🥺",
  "pleaseee",
];

export default function LeaveDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const message = useMemo(() => begMessages[Math.floor(Math.random() * begMessages.length)], []);
  const title = useMemo(() => begTitles[Math.floor(Math.random() * begTitles.length)], []);

  return (
    <div>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center items-center text-lg font-semibold text-rose-500/60 text-center"
          >
            {title}
          </motion.div>
        </DialogTitle>
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center items-center text-base font-semibold text-rose-600/40 italic text-center"
          >
            {message}
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}