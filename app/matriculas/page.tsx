"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import Account from "@imports/components/ui/account_icon";


export default function Home() {
  const [ pop, setPop ] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const tok = await fetch('/api/token');
      const data = await tok.json();
      if (!data.token) {return;}
      const token = data.token;
      
      const usuarioID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario-id`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const usuarioIDRetorno = await usuarioID.json();
      const usuarioId = usuarioIDRetorno.id; 

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario/${usuarioId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const dataRes = await res.json();
      
      console.log(dataRes);
    };
    fetchToken();

  },[])
  
  return (
    <>
      {pop && (
        <>
          <Account onClose={() => setPop(!pop)} /> 
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

      <div className={` text-white overflow-hidden max-h-[95%] max-w-[90%] w-[1700px] flex items-center h-[800px] my-4 transition-all ease-in-out duration-300 rounded-[25px] bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}>
        
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
