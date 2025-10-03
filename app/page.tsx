"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>


export default function Home() {
  const [focused, setFocused] = useState(false);

  return (
    <div className=" py-4 max-h-[95%] max-w-[95%] w-[600px] transition-all ease-in-out duration-300 h-[650px] rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] gap-4 z-20">
      <form className="w-full flex flex-col items-center justify-between text-white max-w-[95%] h-[70%] " onSubmit={(e) => {e.preventDefault();}}>
        <div className="w-[480px] max-w-full flex flex-col gap-2 mx-auto  ">
          <label htmlFor="" className="">Email</label>
          <input 
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          
          type="text" placeholder="Digite seu email" className={`w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] ${focused
            ? "border-yellow-400 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
            : "border-gray-400"} `}/>
        </div>
        
        <motion.button 
        whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
        whileTap={{scale:0.98}}
        transition={{duration: 0.3, }}
        className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg
          text-black font-semibold">Enviar email</motion.button>
      </form>
    </div>

  );
}
