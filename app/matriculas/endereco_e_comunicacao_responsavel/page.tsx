"use client";

import { AnimatePresence, motion } from "framer-motion";
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
        
      <motion.h1 
      initial={{scale:0}}
      animate={{scale:1}}
      exit={{scale:0}}
      className="text-[35px] w-full mt-5 font-medium ">Dados do responsável</motion.h1>

      <AnimatePresence >
        <div className="flex flex-col justify-between w-full gap-5">
          <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
            <motion.div 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="flex flex-col gap-2 w-full">
              <motion.label 
              htmlFor="" 
              className="origin-left">Nome</motion.label>
              <motion.input
              disabled
              
              type="text"  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
            </motion.div>

            <motion.div 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Gênero</motion.label>
              <motion.input
              disabled
              
              type="text"  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>

              
            </motion.div>
            
            <motion.div 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Data de Nascimento</motion.label>
              <motion.input
              disabled
              
              type="text"  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
            </motion.div>
            
            <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Estado Civil</motion.label>
                <motion.input
              disabled
                
                type="text"  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
            </motion.div>

            <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full">
                <motion.label 
                htmlFor="" 
                className="origin-left">Parentesco</motion.label>
                <motion.input
              disabled
                
                type="text" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
          </div>

          <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>
            
            <motion.div 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="flex flex-col gap-2 ">
              <motion.label 
              htmlFor="" 
              className="origin-left">CPF / CNPJ</motion.label>
              <div className="w-full flex flex-col justify-center items-center gap-4 rounded-[15px] border border-gray-400 min-h-[150px] p-3">

                <div className="flex w-full gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <motion.input
              disabled 
                    whileHover={{ scale: 1.04}}
                    whileTap={{ scale: 0.96}}
                    
                    type="radio" name="personType" value="fisica" className="form-radio text-blue-500 cursor-pointer accent-yellow-400"/>
                    Pessoa Física
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <motion.input
              disabled 
                    whileHover={{ scale: 1.04}}
                    whileTap={{ scale: 0.96}}
                    
                    type="radio" name="personType" value="juridica" className="form-radio text-blue-500 cursor-pointer accent-yellow-400"/>
                    Pessoa Jurídica
                  </label>
                </div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">CPF</motion.label>
                  <motion.input
              disabled
                  
                  type="text"  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                  
                </motion.div>

              </div>
          </motion.div>

            <motion.div 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="flex flex-col gap-2 min-w-[66%] ">
              <motion.label 
              htmlFor="" 
              className="origin-left">RG</motion.label>


              <div className="w-full flex sm:flex-row flex-col justify-center items-center gap-4 rounded-[15px] border border-gray-400 min-h-[150px] p-3">
                
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">N°</motion.label>
                  <motion.input
              disabled
                  
                  type="text"  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                  
                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Órgão Exp.</motion.label>
                  <motion.input
              disabled
                  
                  type="text"  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                  
                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Data de Exp.</motion.label>
                  <motion.input
              disabled
                  
                  type="text"  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                  
                </motion.div>

              </div>
              
            </motion.div>
          </div>

        </div>
      </AnimatePresence>
    </>

  );
}
