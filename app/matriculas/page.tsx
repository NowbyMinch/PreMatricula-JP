"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User } from "lucide-react";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>



export default function Home() {
  //const [mostrar, setMostrar] = useState(false);
  //const [email, setEmail] = useState("");
  //const [senha, setSenha] = useState("");
  const [ pop, setPop ] = useState(false);
  
  //const [registrar, setRegistrar] = useState(false);

  return (
    <>
      {pop && (
        <>
          <motion.div 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
          className="origin-top-right w-44 h-24 rounded-[15px] flex flex-col justify-center gap-2 items-center cursor-pointer bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] absolute top-20 right-3 z-100">

            <motion.a 
            whileHover={{scale:1.02}}
            whileTap={{scale:0.98}}
            href="/matriculas"
            className="w-full pl-4 hover:text-yellow-300 transition-all ease-in-out duration-300 text-white cursor-pointer font-extralight">Ver matrículas</motion.a>

            <hr className="w-[85%] text-white"/>

            <motion.a 
            whileHover={{scale:1.02}}
            whileTap={{scale:0.98}}
            href="/cadastro"
            className="w-full pl-4 hover:text-yellow-300 transition-all ease-in-out duration-300 text-white cursor-pointer font-extralight">Sair da conta</motion.a>

          </motion.div>
        
        </>
      )}

      <motion.div 
      whileHover={{scale:1.02}}
      whileTap={{scale:0.98}}
      onClick={() => setPop(!pop)} className="cursor-pointer  bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] rounded-full w-16 h-16 absolute z-1000 right-3 top-3 flex justify-center items-center ">

        <button className="cursor-pointer w-[36px] h-[36px] ">
          <User className="cursor-pointer w-full h-full text-white stroke-1 hover:text-yellow-300 transition-all ease-in-out duration-300" />
        </button>

      </motion.div>

      <div className={` text-white overflow-hidden max-h-[95%] max-w-[90%] w-[1750px] flex items-center h-[90%] transition-all ease-in-out duration-300 rounded-[25px] bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}>
        
        <div className="w-full">
            
            <div className="px-7 py-2 mx-auto flex gap-4 ">
                <motion.a 
                whileHover="hover"
                variants={{
                    hover: {scale:1.02}
                }}
                whileTap={{scale:0.98}}
                className="hover:text-yellow-300 relative "
                href="">
                    Matrícula 1
                    <motion.div 
                    initial={{scaleX:0}}
                    variants={{
                        hover: {scaleX:1}
                    }}
                    className=" w-full origin-center bg-yellow-400 h-[2px] absolute -bottom-2"></motion.div>
                </motion.a>
                
                <motion.a 
                whileHover="hover"
                variants={{
                    hover: {scale:1.02}
                }}
                whileTap={{scale:0.98}}
                className="hover:text-yellow-300 relative "
                href="">
                    Matrícula 2
                    <motion.div 
                    initial={{scaleX:0}}
                    variants={{
                        hover: {scaleX:1}
                    }}
                    className=" w-full origin-center bg-yellow-400 h-[2px] absolute -bottom-2"></motion.div>

                </motion.a>
            </div>
            
            <hr className="w-full h-[1px] text-[#ffffff33]"/>
        </div>
      
      </div>
    </>

  );
}
