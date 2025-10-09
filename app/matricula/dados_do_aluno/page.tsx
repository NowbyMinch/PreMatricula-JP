"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Civil, CpfInput, Genero } from "@imports/components/ui/selectionboxes";
import DatePicker from "@imports/components/ui/datepicker";
import Account from "@imports/components/ui/account_icon";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
  const router = useRouter();
  const [ pop, setPop ] = useState(false);
  const [ genero, setGenero ] = useState("");
  const [ estado_civil, setEstado_civil ] = useState("");
  const [ enderecoDiferente, setEnderecoDiferente ] = useState(false);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // prevent page reload
      if (enderecoDiferente) {
        router.push("/matricula/endereco_e_comunicacao_aluno")
      } else {
        return
      }
  };
  
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
      onClick={() => setPop(!pop)} className="cursor-pointer bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] rounded-full w-16 h-16 absolute z-100 right-3 top-3 flex justify-center items-center ">

        <button className="cursor-pointer w-[36px] h-[36px]">
          <User className="cursor-pointer w-full h-full text-white stroke-1 hover:text-yellow-300 transition-all ease-in-out duration-300" />
        </button>

      </motion.div>

      <div className={`  max-h-[95%] max-w-[95%] w-[1150px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}>
        <form className={`w-full flex flex-col items-center text-white max-w-[90%] h-full `} onSubmit={handleSubmit}>
          
          {/* <motion.img 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
          src="seice.png" alt="Seice Logo" className="w-[50%] h-auto mt-10"/> */}

          <motion.h1 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
          className="text-[35px] mx-auto mt-10 font-medium text-center">Dados do aluno</motion.h1>

          <motion.p 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
          className="mb-4 ">Insira os dados do aluno</motion.p>

          <AnimatePresence >
            <div className="flex flex-col justify-between w-full gap-5">
              
              <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Nome</motion.label>
                  <motion.input
                  required
                  
                  type="text" placeholder="Digite seu nome" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Gênero</motion.label>
                  <Genero value={genero} onChange={ value => {setGenero(value);}} />
                  {/* <motion.input
                  required
                  
                  type="text" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/> */}
                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full  ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Data de Nascimento</motion.label>
                  <DatePicker onChange={() => {}} />
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
                  className="origin-left">Estado Civíl</motion.label>
                  <Civil value={estado_civil} onChange={(val) => {setEstado_civil(val)}} />
                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Cidade Natal</motion.label>
                  <motion.input
                  required
                  
                  type="text" placeholder="Digite sua cidade natal" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
                  required
                  
                  type="text" placeholder="Digite sua nacionalidade" defaultValue="brasileiro(a)" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                </motion.div>
                
              </div>
            
              <div className={` w-[492px] max-w-full flex gap-4 md:flex-row flex-col`}>

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
                      <label className="flex items-center gap-2 cursor-pointer">
                        <motion.input 
                        whileHover={{ scale: 1.04}}
                        whileTap={{ scale: 0.96}}
                        required
                        type="radio" name="personType" value="fisica" className="form-radio text-blue-500 cursor-pointer accent-yellow-400"/>
                        Pessoa Física
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <motion.input 
                        whileHover={{ scale: 1.04}}
                        whileTap={{ scale: 0.96}}
                        required
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
                      <CpfInput />
                      
                    </motion.div>

                  </div>
                </motion.div>

              </div>

              <motion.label 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="inline-flex items-center cursor-pointer mx-auto">
                    {/* Hidden native checkbox */}
                    <input onChange={() => {setEnderecoDiferente(!enderecoDiferente);}} type="checkbox" className="sr-only peer" />

                    {/* Custom checkbox */}
                    <motion.div 
                    whileHover={{scale:1.10}}
                    whileTap={{scale:0.90}}
                    className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-yellow-400 peer-checked:border-yellow-400">
                        {/* Checkmark */}
                        <svg className="w-3 h-3 text-white hidden peer-checked:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </motion.div>

                    {/* Label text */}
                    <span className="ml-2 select-none">O aluno possui um endereço diferente</span>
                </motion.label>

            </div>
          </AnimatePresence>
          
          <motion.button 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
          whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
          whileTap={{scale:0.98}}
          transition={{duration: 0.3, }}
          className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-10">Próximo</motion.button>
        </form>
      </div>
    </>

  );
}
