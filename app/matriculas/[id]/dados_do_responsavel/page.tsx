"use client";

import {Loading} from "@imports/components/ui/loading";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type DadosResponsavel = {
  responsaveis: {
    nome: string;
    genero: string;
    dataNascimento: string;
    estadoCivil: string;
    tipoParentesco: string;
    pessoaJuridica: boolean;
    cpf: string;
    rg: string;
    orgaoExpeditor: string;
    dataExpedicao: string;
  }[];
};

export default function Home() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [dados, setDados] = useState<DadosResponsavel | null>(null);
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

      setDados(dataRes);
      console.log(dataRes, "Esse aqui é o de agora que está pegando as informações da pagina")
      setLoading(false);
    }; fetchToken();
  },[id])

  if (loading) return <div className="h-[703px]"><Loading /></div>

  return (
    <>
      
      <div className="flex flex-col gap-10 pb-10 w-full">
        <AnimatePresence >
          
          <div key={0} className="flex flex-col justify-between w-full gap-5">
            { dados?.responsaveis[0] && 
              <motion.h1 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="text-[30px] w-full mt-5 font-medium ">
                Responsavel Financeiro
              </motion.h1>
            }
            
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
                type="text" defaultValue={dados ? dados.responsaveis[0].nome : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
                
                type="text" defaultValue={dados ? (dados.responsaveis[0].genero.toLowerCase()[0].toUpperCase() + dados.responsaveis[0].genero.toLowerCase().slice(1)) : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>

                
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
                
                type="text" defaultValue={dados ? dados.responsaveis[0].dataNascimento : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
              
            </div>
            <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
              
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
                  type="text" 
                  defaultValue={dados ? (((dados.responsaveis[0].tipoParentesco).toLowerCase())[0].toUpperCase()) + (dados.responsaveis[0].tipoParentesco).toLowerCase().slice(1): ""} 
                  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full">
                <motion.label 
                htmlFor="" 
                className="origin-left">CPF / CNPJ</motion.label>
                <div className="w-full flex flex-col justify-center items-center gap-4 rounded-[15px] border border-gray-400 min-h-[150px] p-3">

                  <div className="flex w-full gap-4">
                    <label className="flex items-center gap-2 ">
                      <motion.input
                      whileHover={{ scale: 1.04}}
                      whileTap={{ scale: 0.96}}
                      checked={dados?.responsaveis[0].pessoaJuridica ? false : true}
                      onChange={() => {}}
                      type="radio"  className="form-radio cursor-none  accent-yellow-400 pointer-events-none"/>
                      Pessoa Física
                    </label>
                    <label className="flex items-center gap-2">
                      <motion.input
                      whileHover={{ scale: 1.04}}
                      whileTap={{ scale: 0.96}}
                      checked={dados?.responsaveis[0].pessoaJuridica ? true : false}
                      onChange={() => {}}
                      type="radio"  className="form-radio poicursor-non accent-yellow-400 pointer-events-none"/>
                      Pessoa Jurídica
                    </label>
                  </div>

                  <motion.div 
                  initial={{scale:0}}
                  animate={{scale:1}}
                  exit={{scale:0}}
                  className="flex flex-col gap-2 w-full ">
                    
                    <motion.input
                    disabled
                    
                    type="text" defaultValue={dados ? dados.responsaveis[0].cpf : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                    
                  </motion.div>

                </div>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
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
                    
                    type="text" defaultValue={dados ? dados.responsaveis[0].rg : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                    
                  </motion.div>

                </div>
              </motion.div>

            </div>

            <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>
              
              
            </div>
          </div>

          { dados?.responsaveis[1] &&
            <div key={0} className="flex flex-col justify-between w-full gap-5">
              { dados?.responsaveis[1] && 
                <motion.h1 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="text-[30px] w-full mt-5 font-medium ">
                  Responsavel Financeiro
                </motion.h1>
              }
              
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
                  type="text" defaultValue={dados ? dados.responsaveis[1].nome : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
                  
                  type="text" defaultValue={dados ? (dados.responsaveis[1].genero.toLowerCase()[0].toUpperCase() + dados.responsaveis[1].genero.toLowerCase().slice(1)) : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>

                  
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
                  
                  type="text" defaultValue={dados ? dados.responsaveis[1].dataNascimento : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                </motion.div>
                
              </div>
              <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
                
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
                    type="text" 
                    defaultValue={dados ? (((dados.responsaveis[1].tipoParentesco).toLowerCase())[0].toUpperCase()) + (dados.responsaveis[1].tipoParentesco).toLowerCase().slice(1): ""} 
                    className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">CPF / CNPJ</motion.label>
                  <div className="w-full flex flex-col justify-center items-center gap-4 rounded-[15px] border border-gray-400 min-h-[150px] p-3">

                    <div className="flex w-full gap-4">
                      <label className="flex items-center gap-2 ">
                        <motion.input
                        whileHover={{ scale: 1.04}}
                        whileTap={{ scale: 0.96}}
                        checked={dados?.responsaveis[1].pessoaJuridica ? false : true}
                        onChange={() => {}}
                        type="radio"  className="form-radio cursor-none  accent-yellow-400 pointer-events-none"/>
                        Pessoa Física
                      </label>
                      <label className="flex items-center gap-2">
                        <motion.input
                        whileHover={{ scale: 1.04}}
                        whileTap={{ scale: 0.96}}
                        checked={dados?.responsaveis[1].pessoaJuridica ? true : false}
                        onChange={() => {}}
                        type="radio"  className="form-radio poicursor-non accent-yellow-400 pointer-events-none"/>
                        Pessoa Jurídica
                      </label>
                    </div>

                    <motion.div 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className="flex flex-col gap-2 w-full ">
                      
                      <motion.input
                      disabled
                      
                      type="text" defaultValue={dados ? dados.responsaveis[1].cpf : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                      
                    </motion.div>

                  </div>
                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
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
                      
                      type="text" defaultValue={dados ? dados.responsaveis[1].rg : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                      
                    </motion.div>

                  </div>
                </motion.div>

              </div>

              <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>
                
                
              </div>
            </div>
            
          }
        </AnimatePresence>

      </div>
    </>

  );
}
