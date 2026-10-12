"use client";

import { FileUpload, type FileUploadSelectEvent } from "primereact/fileupload";
import { useState } from "react";
import { motion } from "framer-motion";
import bluerealbackground from "../assets/bluerealbackground.jpg";
import pomsit from "../assets/pomsit.png";
import { neonStorage } from "@/NeonClient";
import { ScrollReveal, StaggerContainer, StaggerItem, FloatingElement, RevealText } from '@/components/ScrollReveal';

function Moments() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const onSelect = (e: FileUploadSelectEvent) => {
    const selectedFiles = Array.from(e.files as File[]);
    setFiles(selectedFiles);
    setUploadComplete(false);
    console.log("Selected files:", selectedFiles);
  };

  const onUpload = async () => {
    if (files.length === 0) return alert("No files selected!");
    setUploading(true);

    for (const file of files) {
      try {
        await neonStorage.upload(file, file.name);
        console.log("Uploaded:", file.name);
      } catch (error) {
        console.error("Upload failed:", error);
        alert(`❌ Failed to upload ${file.name}`);
      }
    }

    setUploadComplete(true);
    setUploading(false);
    setFiles([]);
    
    setTimeout(() => setUploadComplete(false), 3000);
  };

  return (
    <div className="page-container min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <img
          src={bluerealbackground}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 via-cream-50/20 to-lavender-50/30" />
      </div>

      <main className="relative z-10 flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <ScrollReveal direction="up" delay={0.1} className="w-full max-w-[clamp(24rem,92vw,40rem)]">
            <StaggerContainer>
              <StaggerItem direction="down" delay={0.1} className="w-full">
                <motion.div
                  className="romantic-card relative overflow-hidden"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 via-cream-50/50 to-lavender-50/50" />
                  
                  <div className="relative z-10 text-center">
                    <RevealText 
                      text="capture our moments" 
                      className="font-romantic type-title text-gradient-romantic mb-2" 
                      delay={0.2}
                    />
                    <RevealText 
                      text="pick your favorite memory of us together" 
                      className="font-romantic-alt text-rose-600 type-subtitle" 
                      delay={0.3}
                    />

                    <FloatingElement amplitude={12} period={4} className="my-6 inline-block">
                      <img 
                        src={pomsit} 
                        alt="cute moment together" 
                        className="w-[clamp(13rem,28vw,30rem)] drop-shadow-xl transition-transform duration-500 hover:scale-105"
                      />
                    </FloatingElement>

                    <div className="relative">
                      <div className="w-full border-2 border-dashed border-rose-300 rounded-2xl p-6 bg-white/60 backdrop-blur-sm transition-all duration-300 group-hover:border-rose-400 group-hover:bg-white/80">
                        <FileUpload
                          name="files"
                          accept="image/*"
                          multiple
                          customUpload
                          uploadHandler={onUpload}
                          onSelect={onSelect}
                          chooseLabel="Choose Photos"
                          uploadLabel={uploading ? "Uploading..." : "Add to Memories"}
                          cancelLabel="Clear"
                          className="flex flex-col gap-3 w-full justify-center items-center"
                          chooseOptions={{
                            className: "romantic-button-primary",
                          }}
                          uploadOptions={{
                            className: "romantic-button-secondary",
                          }}
                          cancelOptions={{
                            className: "romantic-button-ghost border-rose-300 text-rose-600 hover:bg-rose-50",
                          }}
                          pt={{
                            buttonbar: { className: "flex gap-4 justify-center mt-4" },
                          }}
                        />

                        {files.length > 0 && (
                          <motion.div
                            className="w-full bg-rose-50/50 rounded-xl p-4 mt-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <RevealText 
                              text="Selected Photos" 
                              className="font-romantic-alt text-rose-700 text-base font-medium mb-3" 
                              delay={0.1}
                            />
                            <ul className="text-sage-700 text-sm space-y-2 text-left">
                              {files.map((file, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <span className="text-2xl">📸</span>
                                  <span>{file.name}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}

                        {uploadComplete && (
                          <motion.div
                            className="w-full bg-green-50/50 border border-green-200 rounded-xl p-4 mt-6"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <div className="flex items-center justify-center gap-2 text-green-700">
                              <motion.span className="text-4xl animate-heartbeat">✨</motion.span>
                              <RevealText 
                                text="Successfully uploaded to our memories!" 
                                className="font-romantic-alt font-medium" 
                                delay={0.1}
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
          </ScrollReveal>
        </div>

        <footer className="relative z-10 py-8 px-4">
          <ScrollReveal direction="up" delay={1}>
            <p className="font-romantic-alt text-rose-500/80 text-center type-lead">
              every photo tells our story 💕
            </p>
          </ScrollReveal>
        </footer>
      </main>
    </div>
  );
}

export default Moments;