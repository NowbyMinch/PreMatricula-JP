"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import ErrorModal from "@imports/components/ui/ErrorModal";
import Account from "@imports/components/ui/account_icon";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
    const router = useRouter();
    const [mostrar, setMostrar] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // REGISTRAR
    const [form, setForm] = useState({ email: ""});
    // LOGIN
    const [formLogin, setFormLogin] = useState({ email: "", senha: ""});

    const [ pop, setPop ] = useState(false);
    
    const [registrar, setRegistrar] = useState(false);

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const registro = { email: form.email};
        const login = { email: formLogin.email, password: formLogin.senha};

        if (registrar){
            console.log(registro.email, "oi oi oi ")

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/register/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registro),
                credentials: "include"
            });
    
            const data = await res.json();
            console.log(data);
    
            if (data.error){
                setMessage(data.message);
            } else {
                router.push('/registrar')
            }
            
        } else {
            
            const res = await fetch(`/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login),
                credentials: "include",
            });
    
            const data = await res.json();
            console.log(data);
            console.log(login);
    
            // handleSubmit snippet
            if (Array.isArray(data?.message) && data.message.length > 0) {
                if (data.message[0] === "Login realizado com sucesso") {
                    router.push('/matricula/dados_do_responsavel');
            } else {
                let errors = data.message.join("\n");
                setMessage(errors);
            }
            } else if (data?.message === "Login realizado com sucesso") {
                router.push('/matricula/dados_do_responsavel');
            } else {
                setMessage(data?.message || data?.error || "Erro desconhecido ao fazer login.");
            }


        }
        
    };

    return (
        <>
        {message && (
            <ErrorModal message={message} onClose={() => setMessage(null)} />
        )}

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

        <div className={` my-4 ${registrar ? "h-[534px]" :"h-[635px]"} overflow-hidden max-h-[95%] max-w-[95%] w-[600px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}>
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
                className="text-[50px] mx-auto my-2 font-medium">{registrar ? "Registrar" : "Login" }</motion.h1>

                <motion.p 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="mb-4 ">Coloque a sua conta para poder realizar a pré matricula</motion.p>

                { registrar ?
                <>
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
                                onChange={(e) => {setForm({email: e.target.value}); console.log(form.email)}}
                                type="email" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>

                                <motion.span onClick={() => setRegistrar(false)} className="mx-auto">Já possui uma conta? <motion.button 
                                    whileHover={{scale:1.01}}
                                    whileTap={{scale:0.99}}
                                    type="button" className="cursor-pointer">
                                        <motion.strong
                                        whileHover={{scale:1.02}}
                                        whileTap={{scale:0.98}}
                                        className="hover:text-yellow-300 transition-all ease-in-out duration-300">
                                         Logar-se
                                        </motion.strong>
                                    </motion.button>
                                
                                </motion.span>

                            </motion.div>
                        </div>
                    </AnimatePresence>
                </>
                : 
                <>
                    <AnimatePresence>
                        <div className={` w-[480px] max-w-full flex flex-col gap-5 mx-auto `}>
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
                            onChange={(e) => {setFormLogin(prev => ({ ...prev, email: e.target.value })); console.log(e.target.value)}}
                            type="email" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
                                onChange={(e) => {setFormLogin(prev => ({ ...prev, senha: e.target.value })); console.log(e.target.value)}}
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

                            <motion.span onClick={() => setRegistrar(true)} className="mx-auto">Não possui uma conta? <motion.button 
                            whileHover={{scale:1.01}}
                            whileTap={{scale:0.99}}
                            type="button" className="cursor-pointer">
                            <motion.strong
                            whileHover={{scale:1.02}}
                            whileTap={{scale:0.98}}
                            className="hover:text-yellow-300 transition-all ease-in-out duration-300">
                                Registre-se
                            </motion.strong></motion.button></motion.span>

                        </motion.div>

                        </div>
                    </AnimatePresence>
                </>
                }

                <motion.button 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                whileTap={{scale:0.98}}
                transition={{duration: 0.3, }}
                type="submit"
                className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-10">{registrar ? "Registrar":"Entrar"}</motion.button>
            </form>
        </div>
        </>

    );
}
