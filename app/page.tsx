"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>



export default function Home() {
  const [focused, setFocused] = useState(false);

  return (
    <div className="overflow-hidden max-h-[95%] max-w-[95%] w-[600px] transition-all ease-in-out duration-300 h-fit rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] gap-4 z-20 flex-col">
      <form className="w-full flex flex-col items-center text-white max-w-[95%] h-full overflow-y-auto overflow-x-hidden" onSubmit={(e) => {e.preventDefault();}}>
        <img src="seice.png" alt="Seice Logo" className="w-[50%] h-auto mt-6"/>
        <AnimatePresence >
          <div className="w-[480px] max-w-full flex flex-col gap-2 mx-auto mt-10">
              <motion.label 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              htmlFor="" className="origin-left">Email</motion.label>
              <motion.input
              initial={{scale:0.8}}
              animate={{scale:1}}
              exit={{scale:0}} 
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              type="text" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] ${focused
                ? "border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                : "border-gray-400"} `}/>

          </div>
        </AnimatePresence>
        
        <motion.button 
        whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
        whileTap={{scale:0.98}}
        transition={{duration: 0.3, }}
        className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-8">Enviar email</motion.button>
      </form>
    </div>

  );
}
