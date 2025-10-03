"use client";

import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [focused, setFocused] = useState(false);

  return (
    <div className=" items-center py-4 h-full max-h-[1200px] max-w-[90%] w-[1500px] gap-4 ">
      <div className="bg-gradient-to-br from-[#0a0a0a] via-[#0c0c0e] to-[#111111] md:gap-0 gap-5 w-full h-full overflow-hidden flex flex-col md:flex-row rounded-[20px] items-center">
        <div className="relative h-full overflow-hidden md:min-w-[50%] min-w-full">
          {/* Base image (without the year baked in) */}
          <img
            src="prematricula.png" // <- version without "2026"
            alt="Pré-matrícula"
            className="w-full h-full object-cover object-top"
          />

          {/* Year text dynamically added */}
          <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            {new Date().getFullYear() + 1} 
            {/* Example: will show 2026 automatically if current year is 2025 */}
          </span>
        </div>

        <div className=" h-full flex flex-col md:justify-center w-[95%] mx-auto md:w-[48%] items-center text-white  ">
          <form className="w-full flex flex-col items-center gap-5" onSubmit={(e) => {e.preventDefault();}}>
            <div className="w-[480px] max-w-full flex flex-col gap-2 mx-auto  ">
              <label htmlFor="" className="">Email</label>
              <input 
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              
              type="text" placeholder="Digite seu email" className={`w-full rounded-full px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] ${focused
                ? "border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                : "border-gray-400"} `}/>
            </div>
            
            <motion.button 
            whileHover={{scale:1.02}}
            whileTap={{scale:0.98}}
            transition={{duration: 0.3, }}
            className="cursor-pointer rounded-full w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg
              hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
              shadow-[0_0_20px_rgba(255,215,0,0.3)] text-black font-semibold">Enviar email</motion.button>
          </form>
        </div>
        
      </div>
    </div>

  );
}
