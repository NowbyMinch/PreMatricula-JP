"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Endereco = {
  cep: string;
  rua: string;
  numero: string;
  cidade: string;
  bairro: string;
};

type Responsavel = {
  endereco: Endereco;
  celular: string;
  email: string;
};

type Dados = {
  responsavel: Responsavel;
};

export default function Home() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [dados, setDados] = useState<Dados | null>(null);

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
      const usuarioId = usuarioIDRetorno.usuarioId; 

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario/${usuarioId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const dataRes = await res.json();

      console.log(dataRes)
      for (let i=0; i<dataRes.total; i++){
        if (dataRes.items[i].id === id){
          setDados(dataRes.items[i]);
          console.log(dataRes.items[i])
        }
      }

    }; fetchToken();
  },[id])
  
  return (
    <>
      
      <div className="flex flex-col mt-5 gap-16 pb-10 w-full">
        <AnimatePresence >
          <div key={0} className="flex flex-col justify-between w-full gap-5">
            <motion.h1 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="text-[30px] origin-left">Reponsável Financeiro</motion.h1>

            <motion.h1 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="text-[25px] origin-left">Endereço</motion.h1>

            <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full">
              <motion.label 
              htmlFor="" 
              className="origin-left">C.E.P.</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.responsavel.endereco.cep : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Rua/Avenida</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.responsavel.endereco.rua : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
              
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
              type="text" defaultValue={dados ? dados.responsavel.endereco.numero : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
                
            </div>

            <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Cidade</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.responsavel.endereco.cidade : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Bairro</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.responsavel.endereco.bairro : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

            </div>

            <motion.h1 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="text-[25px] origin-left">Comunicação</motion.h1>
            
            <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Celular</motion.label>
                <motion.input
                disabled
                type="text" defaultValue={dados ? dados.responsavel.celular : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                </motion.div>
                
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Email</motion.label>
                <motion.input
                disabled
                type="email" defaultValue={dados ? dados.responsavel.email : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                </motion.div>

            </div>
              
          </div>

          <div key={1} className="flex flex-col justify-between w-full gap-5">
            <motion.h1 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="text-[30px] origin-left">Segundo responsável</motion.h1>

            <motion.h1 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="text-[25px] origin-left">Endereço</motion.h1>

            <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full">
              <motion.label 
              htmlFor="" 
              className="origin-left">C.E.P.</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.responsavel.endereco.cep : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Rua/Avenida</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.responsavel.endereco.rua : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
              
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
              type="text" defaultValue={dados ? dados.responsavel.endereco.numero : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
                
            </div>

            <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Cidade</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.responsavel.endereco.cidade : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Bairro</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.responsavel.endereco.bairro : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

            </div>

            <motion.h1 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="text-[25px] origin-left">Comunicação</motion.h1>
            
            <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Celular</motion.label>
                <motion.input
                disabled
                type="text" defaultValue={dados ? dados.responsavel.celular : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                </motion.div>
                
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Email</motion.label>
                <motion.input
                disabled
                type="email" defaultValue={dados ? dados.responsavel.email : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                </motion.div>

            </div>
              
          </div>
        </AnimatePresence>
      </div>
    </>

  );
}
