"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFinished(true), 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  if (!isRendered) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {!isFinished && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              transition: { duration: 1, ease: "easeInOut" } 
            }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          >
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="/bg1.jpg" 
                alt="Rainbow Falls" 
                fill
                className="object-cover opacity-30"
                priority
              />
              {/* Gradient Vignette to focus center and keep text readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-600/40 via-slate-600/70 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              {/* Logo Section */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8"
              >
                <Image 
                  src="/me-compressed1.png" 
                  alt="Titans Logo"
                  width={140}
                  height={140}
                  className="object-contain rounded-full drop-shadow-[0_0_30px_rgba(220,38,38,0)] hidden"
                  priority
                />
              </motion.div>

              {/* Text Section */}
              <div className="space-y-3">
                 <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase drop-shadow-md drop-shadow-black"
                >
                  Robin <span className="text-red-500">te Hofstee</span>
                </motion.h1>
                
               <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs md:text-sm font-medium text-gray-50 uppercase tracking-[0.5em] drop-shadow-md"
                >
                  Personal Blog
                </motion.p>
              </div>

              {/* Progress Bar Container */}
              <div className="mt-12 w-64 h-[3px] bg-white backdrop-blur-md relative overflow-hidden rounded-full border border-white/70 hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-red-900"
                 />
              </div>

               <div className="mt-8 flex items-center justify-center gap-4 w-full"
>
  {/* Left Line */}
  <div className="flex-1 h-[1px] bg-white/20 max-w-[64px]" />
  
  {/* Text - Added leading-none to remove extra font padding */}
  <span className="text-xs font-mono tabular-nums text-white uppercase tracking-[0.3em] leading-none flex items-center">
    Loading {progress}%
  </span>
  
  {/* Right Line */}
  <div className="flex-1 h-[1px] bg-white/20 max-w-[64px]" />
</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Fade In */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isFinished ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </>
  );
}

