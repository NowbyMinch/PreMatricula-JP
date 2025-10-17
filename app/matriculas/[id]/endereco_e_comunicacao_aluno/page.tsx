"use client";

import {Loading} from "@imports/components/ui/loading";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


type Aluno = {
  nome: string;
  genero: string;
  dataNascimento: string;
  estadoCivil: string;
  cidadeNatal: string;
  nacionalidade: string;
  cpf: string;
  celular: string;
  email: string;
  moraComResponsavel: boolean;
  moraComResponsavelNome: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
};

type DadosAluno = {
  aluno: Aluno;
};

export default function Home() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [dados, setDados] = useState<DadosAluno | null>(null);
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
      
      <div className="flex flex-col mt-5 gap-16 pb-10 w-full">
        <AnimatePresence >
          <div className="flex flex-col justify-between w-full gap-5">

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
              type="text" defaultValue={dados ? dados.aluno.cep : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
              type="text" defaultValue={dados ? dados.aluno.rua : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
              type="text" defaultValue={dados ? dados.aluno.numero : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
              className="origin-left">Complemento</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.aluno.cidade : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

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
              type="text" defaultValue={dados ? dados.aluno.cidade : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-[130px]">
                <motion.label 
                htmlFor="" 
                className="origin-left">UF</motion.label>
                <motion.input 
                type="text" 
                disabled
                defaultValue={dados ? dados.aluno.uf : ""}
                className={`w-full rounded-[15px] py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] bg-transparent text-white  text-center`} />
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
              type="text" defaultValue={dados ? dados.aluno.bairro : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
              className="origin-left">Telefone</motion.label>
              <motion.input
              disabled
              type="text" defaultValue={dados ? dados.aluno.celular : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
              
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
              type="email" defaultValue={dados ? dados.aluno.email : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
              className="origin-left">Email</motion.label>
              <motion.input
              type="text" defaultValue={dados ? dados.aluno.celular : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
              
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full max-w-full">
                <motion.label 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="inline-flex items-center mt-2">

                  <motion.div className={`w-5 h-5 border-2 ${dados?.aluno?.moraComResponsavel ? "bg-yellow-400 border-yellow-400" : "border-gray-400" } rounded-md flex items-center justify-center `}>
                  </motion.div>

                  <span className="ml-2 select-none">Mora junto com algum dos seus responsáveis?</span>

                </motion.label>

                <motion.input
                disabled
                type="email" defaultValue={dados ? dados.aluno.moraComResponsavelNome : ""} className={` w-[380px]  rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>

              </motion.div>

            </div>
              
          </div>

        </AnimatePresence>
      </div>
    </>

  );
}
