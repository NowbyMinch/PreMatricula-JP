"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import Account from "@imports/components/ui/account_icon";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
    const router = useRouter();
    const [ pop, setPop ] = useState(false);
    
    return (
        <>
        {pop && (
            <Account onClose={() => setPop(!pop)} />    
        )}

        <motion.div 
        whileHover={{scale:1.02}}
        whileTap={{scale:0.98}}
        onClick={() => setPop(!pop)} className="cursor-pointer  bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] rounded-full w-16 h-16 absolute z-10 right-3 top-3 flex justify-center items-center ">

            <button className="cursor-pointer w-[36px] h-[36px]">
                <User className="cursor-pointer w-full h-full text-white stroke-1 hover:text-yellow-300 transition-all ease-in-out duration-300" />
            </button>

        </motion.div>
        <div className={` my-4 h-fit overflow-hidden max-h-[95%] max-w-[95%] w-[600px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}>
            <div className={`w-full flex flex-col items-center text-white max-w-[90%] h-full gap-10`} >
                
                <motion.img 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                src="/seice.png" alt="Seice Logo" className="w-[50%] h-auto mt-10"/>

                <motion.p 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className=" text-center">Matricula concluída! Deseja ver suas matrículas ou fazer uma nova?</motion.p>


                <div className="flex flex-1 gap-4 max-w-full ">
                    <motion.button 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                    whileTap={{scale:0.98}}
                    transition={{duration: 0.3}}
                    onClick={() => router.push('/matricula/dados_do_responsavel')}
                    className="cursor-pointer rounded-[15px] max-w-full w-[230px] py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold mb-10">Nova matrícula</motion.button>

                    <motion.button 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                    whileTap={{scale:0.98}}
                    transition={{duration: 0.3, }}
                    onClick={() => router.push('/matriculas')}
                    className="cursor-pointer rounded-[15px] max-w-full w-[230px] py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold mb-10">Ver matrículas</motion.button>
                </div>
            </div>
        </div>
        </>

    );
}
