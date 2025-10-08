"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Celular, CEP, Numero } from "@imports/components/ui/selectionboxes";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
    const router = useRouter();
    const [ pop, setPop ] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload
        router.push("/matricula/dados_do_aluno")
    };

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
            className="text-[35px] mx-auto mt-10 font-medium text-center">Endereço/Comunicação do responsável</motion.h1>

            <motion.p 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="mb-4 ">Preencha os campos com seu endereço e formas de comunicação do responsável</motion.p>

            <AnimatePresence >
                <div className="flex flex-col justify-between w-full gap-5">

                    <motion.h1 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className="text-[35px] origin-left">Endereço</motion.h1>

                    <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
                        <motion.div 
                        initial={{scale:0}}
                        animate={{scale:1}}
                        exit={{scale:0}}
                        className="flex flex-col gap-2 w-full">
                        <motion.label 
                        htmlFor="" 
                        className="origin-left">C.E.P.</motion.label>
                        <CEP />
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
                        required
                        
                        type="text" placeholder="Digite sua Rua/Avenida" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                        </motion.div>
                        
                        <motion.div 
                        initial={{scale:0}}
                        animate={{scale:1}}
                        exit={{scale:0}}
                        className="flex flex-col gap-2 w-full ">
                        <motion.label 
                        htmlFor="" 
                        className="origin-left">N°</motion.label>
                        <Numero />
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
                        required
                        
                        type="text" placeholder="Digite sua cidade" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
                        required
                        
                        type="text" placeholder="Digite seu bairro" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                        </motion.div>

                    </div>


                    <motion.h1 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className="text-[35px] origin-left">Comunicação</motion.h1>
                    
                    <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>
                        <motion.div 
                        initial={{scale:0}}
                        animate={{scale:1}}
                        exit={{scale:0}}
                        className="flex flex-col gap-2 w-full ">
                        <motion.label 
                        htmlFor="" 
                        className="origin-left">Celular</motion.label>
                        <Celular />
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
                        required
                        
                        type="email" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                        </motion.div>

                    </div>

                </div>
            </AnimatePresence>
            
            <motion.button 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
            whileTap={{scale:0.98}}
            transition={{duration: 0.3, }}
            type="submit"
            className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-10">Próximo</motion.button>
            </form>
        </div>
        </>

    );
}
