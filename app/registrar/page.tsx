"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import ErrorModal from "@imports/components/ui/ErrorModal";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
    const router = useRouter();
    const [mostrar, setMostrar] = useState(false);
    const [mostrar2, setMostrar2] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    
    const [email, setEmail] = useState("");
    const [codigo, setCodigo] = useState(Array(6).fill(""));
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload
        const codigoCompleto = codigo.join("");
        const registro = {email: email, code: codigoCompleto, password: senha, confirmPassword: confirmarSenha}
        console.log(codigo, "codigo");
        console.log(codigo, "registro");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/register/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registro),
        });

        const data = await res.json();
        console.log(data);

        // handleSubmit snippet
        if (data.error && Array.isArray(data.message) && data.message.length > 0) {
            // data.error exists and is a non-empty array
            let errors = "";
            for (let i = 0; i < data.message.length; i++) {
                errors += data.message[i] + "\n";
            }
            setMessage(errors);
        } else {
            router.push('/cadastro');
        }
        

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        // Remove non-digit characters
        const value = e.target.value.replace(/\D/g, "");

        // Update only the changed index
        const newCode = [...codigo];
        newCode[i] = value;
        setCodigo(newCode);

        // Move to next input if a value was typed
        if (value.length === 1 && i < 5) {
        const nextInput = document.querySelector(
            `input[name=codigo${i + 1}]`
        ) as HTMLInputElement | null;
        if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
        if (e.key === "Backspace" && !e.currentTarget.value && i > 0) {
        const prevInput = document.querySelector(
            `input[name=codigo${i - 1}]`
        ) as HTMLInputElement | null;
        if (prevInput) prevInput.focus();
        }
    };
     

    return (
        <>
            {message && (
                <ErrorModal message={message} onClose={() => setMessage(null)} />
            )}

            <div className={` h-fit overflow-hidden max-h-[95%] max-w-[95%] w-[600px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}>
                <form className={`w-full flex flex-col items-center text-white max-w-[90%] h-full `} onSubmit={handleSubmit}>
                    
                    <motion.img 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    src="seice.png" alt="Seice Logo" className="w-[50%] h-auto mt-10"/>

                    <motion.h1 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className="text-[50px] mx-auto my-2 font-medium">Registrar</motion.h1>

                    <motion.p 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className="mb-4 ">Coloque a sua conta para poder realizar a pré matricula</motion.p>

                    <AnimatePresence >
                            <div className={`w-[480px] max-w-full flex flex-col gap-5 mx-auto `}>
                                <motion.div 
                                initial={{scale:0}}
                                animate={{scale:1}}
                                exit={{scale:0}}
                                className="flex flex-col gap-2">
                                    <motion.label 
                                    htmlFor="" 
                                    className="origin-left">Email</motion.label>
                                    <motion.input
                                    required
                                    onChange={(e) => {setEmail(e.target.value); console.log(email)}}
                                    type="email" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                                </motion.div>

                                <motion.div 
                                initial={{scale:0}}
                                animate={{scale:1}}
                                exit={{scale:0}}
                                className="flex flex-col gap-2">
                                    <motion.label 
                                    htmlFor="" 
                                    className="origin-left">Código</motion.label>
                                    <span>Insira o código enviado para o seu email</span>

                                    <div className="flex gap-2">
                                        {Array.from({length:6}).map((_,i) => (
                                            <motion.input
                                            key={i}
                                            required
                                            maxLength={1}
                                            name={`codigo${i}`}
                                            id={`codigo${i}`}
                                            value={codigo[i]}
                                            onChange={(e) => handleChange(e, i)}
                                            onKeyDown={(e) => handleKeyDown(e, i)}
                                            type="text" 
                                            inputMode="numeric"
                                            placeholder="" className={` w-[40px] text-[20px] max-w-full rounded-[10px] px-3 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>

                                        ))}
                                        
                                    </div>
                                </motion.div>

                                <motion.div 
                                initial={{scale:0}}
                                animate={{scale:1}}
                                exit={{scale:0}}
                                className="flex flex-col gap-2 ">
                                    <motion.label 
                                    htmlFor="" className="origin-left">Senha</motion.label>
                                    
                                    <div className="relative">
                                    <motion.input
                                    required
                                    onChange={(e) => {setSenha(e.target.value); console.log(senha)}}
                                    type={`${mostrar ? "text" : "password"}`} placeholder="Digite sua senha" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}
                                    autoComplete="new-password"   
                                    name="new-password" />
                                    <div className="absolute right-3 bottom-[50%] translate-y-[50%] ">
                                        <motion.div 
                                        whileHover={{scale:1.10}}
                                        whileTap={{scale:0.95}}
                                        className="w-5">
                                        {mostrar ? (  
                                            <EyeOff onClick={() => setMostrar(!mostrar)} className="w-full cursor-pointer"/>
                                        ) : (
                                            <Eye onClick={() => setMostrar(!mostrar)} className="w-full cursor-pointer"/>
                                        )}
                                        </motion.div>
                                    </div>
                                    </div>

                                </motion.div>

                                <motion.div 
                                initial={{scale:0}}
                                animate={{scale:1}}
                                exit={{scale:0}}
                                className="flex flex-col gap-2 ">
                                    <motion.label 
                                    htmlFor="" className="origin-left">Confirmar senha</motion.label>
                                    
                                    <div className="relative">
                                    <motion.input
                                    required
                                    onChange={(e) => {setConfirmarSenha(e.target.value);}}
                                    type={`${mostrar2 ? "text" : "password"}`} placeholder="Confirme sua senha" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}
                                    autoComplete="new-password"   
                                    name="new-password" />
                                        <div className="absolute right-3 bottom-[50%] translate-y-[50%] ">
                                            <motion.div 
                                            whileHover={{scale:1.10}}
                                            whileTap={{scale:0.95}}
                                            className="w-5">
                                            {mostrar2 ? (  
                                                <EyeOff onClick={() => setMostrar2(!mostrar2)} className="w-full cursor-pointer"/>
                                            ) : (
                                                <Eye onClick={() => setMostrar2(!mostrar2)} className="w-full cursor-pointer"/>
                                            )}
                                            </motion.div>
                                        </div>
                                    </div>

                                </motion.div>
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
                    className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-10">Registrar</motion.button>
                </form>
            </div>
        </>

    );
}
