"use client";

import {Loading} from "@imports/components/ui/loading";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Dados = {
  aluno: {
    nome: string;
    genero: string;
    dataNascimento: string;
    estadoCivil?: string;
    cidadeNatal?: string;
    nacionalidade?: string;
    cpf: string;
  };
};

export default function Home() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [dados, setDados] = useState<Dados | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const tok = await fetch('/api/token');
      const data = await tok.json();
      if (!data.token) {return;}
      const token = data.token;
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/${id}/detalhe`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const dataRes = await res.json();

      console.log(dataRes)
      setDados(dataRes);
      setLoading(false);

    }; fetchToken();
  },[id])
  
  if (loading) return <div className="h-[703px]"><Loading /></div>

  return (
    <>
      <div className="flex flex-col gap-10 pb-10 pt-12 w-full">
        <AnimatePresence >
          <div key={0} className="flex flex-col justify-between w-full gap-5">
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
                type="text" defaultValue={dados ? dados.aluno.nome : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
                
                type="text" defaultValue={dados ? (dados.aluno.genero.toLowerCase()[0].toUpperCase() + dados.aluno.genero.toLowerCase().slice(1)) : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
                
                type="text" defaultValue={dados ? dados.aluno.dataNascimento : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
                className="origin-left">Cidade Natal</motion.label>
                <motion.input
                disabled
                
                type="text" defaultValue={dados ? dados.aluno.cidadeNatal : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Nacionalidade</motion.label>
                <motion.input
                disabled
                
                type="text" defaultValue={dados?.aluno?.nacionalidade ? dados?.aluno?.nacionalidade : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

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
                
                type="text" defaultValue={dados ? dados.aluno.cpf : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
            </div>

          </div>

        </AnimatePresence>

      </div>
    </>

  );
}
