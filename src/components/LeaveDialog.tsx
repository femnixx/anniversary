"use client";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { motion } from "framer-motion";

interface Beg { title: string; msg: string; }

export default function LeaveDialog({
  open,
  onClose,
  beg,
}: {
  open: boolean;
  onClose: () => void;
  beg: Beg;
}) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
          className="flex flex-col justify-center items-center text-center bg-cream-50 border-2 border-rose-700 rounded-xl px-6 py-4 plate"
        >
          <p className="press-label mb-1">refusal rejected</p>
          <p className="font-romantic text-3xl text-rose-700">{beg.title}</p>
        </motion.div>
      </DialogTitle>
      <DialogContent>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="flex flex-col justify-center items-center text-center bg-cream-50 border-2 border-rose-700 rounded-xl px-6 py-4 plate"
        >
          <p className="font-romantic-alt text-rose-600 text-xl italic leading-relaxed">
            {beg.msg}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="ink-dot" />
            <span className="font-ui text-xs font-bold tracking-widest uppercase text-rose-700">
              try again
            </span>
            <span className="ink-dot" />
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
