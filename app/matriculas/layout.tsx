"use client";

import "../globals.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Matricula } from "@imports/components/ui/selectionboxes";

export default function RootLayout({children,}: { children: React.ReactNode;} ) {
    const pathname = usePathname();
    const router = useRouter();    
    const [ bar, setBar ] = useState("");
    const id = pathname.split("/")[2];
    const [ matricula, setMatricula ] = useState(id);

    useEffect(() => {

        if (pathname.startsWith("/matriculas/") && pathname.endsWith("/dados_do_responsavel")){
            setBar("1")
        } 
        else if (pathname.startsWith("/matriculas/") && pathname.endsWith("/endereco_e_comunicacao_responsavel")){
            setBar("2")
        }
        else if (pathname.startsWith("/matriculas/") && pathname.endsWith("/dados_do_aluno")){
            setBar("3")
        }
        else {
            setBar("4")
        }

    },[pathname])

    return (
        <>
            
            <div className={` text-white overflow-hidden max-h-[95%] max-w-[95%] w-[1350px] flex items-center min-h-[800px] h-fit pb-5 transition-all ease-in-out duration-300 rounded-[25px] bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}>
                
                <div className="w-full">
                    <div className="px-7  h-[60px] mx-auto flex justify-between items-center ">
                        <div className="w-full overflow-x-auto overflow-y-hidden flex gap-4 h-full items-center ">
                            <motion.a 
                            whileHover="hover"
                            variants={{
                                hover: {scale:1.02}
                            }}
                            whileTap={{scale:0.98}}
                            className="hover:text-yellow-300 relative "
                            href={`/matriculas/${id}/dados_do_responsavel`}>
                                Dados do Responsável 
                                <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: bar === "1" ? 1 : 0 }}
                                exit={{ scaleX: 0 }}
                                variants={{
                                    hover: {scaleX:1, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)"}
                                }}
                                className={`w-full  origin-center bg-yellow-400 h-[2px] absolute -bottom-2 `}></motion.div>
                            </motion.a>
                            
                            <motion.a 
                            whileHover="hover"
                            variants={{
                                hover: {scale:1.02}
                            }}
                            whileTap={{scale:0.98}}
                            className="hover:text-yellow-300 relative text-center"
                            href={`/matriculas/${id}/endereco_e_comunicacao_responsavel`}>
                                Endereço/Comunicação do Responsável
                                <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: bar === "2" ? 1 : 0 }}
                                exit={{ scaleX: 0 }}
                                variants={{
                                    hover: {scaleX:1, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)"}
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
                            href={`/matriculas/${id}/dados_do_aluno`}>
                                Dados do Aluno
                                <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: bar === "3" ? 1 : 0 }}
                                exit={{ scaleX: 0 }}
                                variants={{
                                    hover: {scaleX:1, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)"}
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
                            href={`/matriculas/${id}/endereco_e_comunicacao_aluno`}>
                                Endereço/Comunicação do Aluno
                                <motion.div 
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: bar === "4" ? 1 : 0 }}
                                exit={{ scaleX: 0 }}
                                variants={{
                                    hover: {scaleX:1, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)"}
                                }}
                                className=" w-full origin-center bg-yellow-400 h-[2px] absolute -bottom-2"></motion.div>
                            </motion.a>
                        </div> 
                        
                        <div className=" min-w-[30%] flex justify-end gap-4 ">
                            <Matricula value={matricula} onChange={(value) => {setMatricula(value); router.push(`/matriculas/${value}/${pathname.split("/")[3]}`)}} />
                            <motion.button 
                            whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                            whileTap={{scale:0.98}}
                            onClick={() => router.push("/matricula/dados_do_responsavel")}
                            className="cursor-pointer rounded-[10px] max-w-full w-fit text-nowrap px-2  bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold ">Nova Matrícula</motion.button>
                        </div> 
                    </div>
                    <hr className="w-full h-[1px] text-[#ffffff33]"/>
                </div>
                <div className=" w-full flex justify-center h-full">
                    <div className={`w-full flex flex-col items-center text-white max-w-[90%] h-full gap-10 `} >
                        {children}
                    </div>
                </div>

            
            </div>
        </>
    );
}
