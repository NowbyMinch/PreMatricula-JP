"use client";

export const dynamic = "force-dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorModal from "@imports/components/ui/ErrorModal";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
    const router = useRouter();
    const params = useSearchParams();
    const [step, setStep] = useState(Number(params.get("step")) || 1);
    const [message, setMessage] = useState<string | null>(null);
    const [codigo, setCodigo] = useState(Array(5).fill(""));
    const [mostrar, setMostrar] = useState(false);
    const [mostrar2, setMostrar2] = useState(false);
    
    useEffect(() => {
        router.replace(`/esqueci_senha?step=${step}`);
    }, [step, router]);
    
    // STEPS ---------------------------- 
    const [formStep1, setFormStep1] = useState({ email: ""});
    const [formStep2, setFormStep2] = useState({ email: ""});
    const [formStep3, setFormStep3] = useState({ password: "", confirmPassword: ""});

    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const step1 = { email: formStep1.email};
        const step2 = { email: formStep2.email, code: codigo.join("")};
        const step3 = { password: formStep3.password, confirmPassword: formStep3.confirmPassword};

        if (step === 1){
            console.log(step1.email, "oi oi oi ")

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/password/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(step1),
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
    
            if (data.error){
                setMessage(data.message);
            } else {
                setStep(2);
            }
            setStep(2);
        } 
        else if (step === 2){

            console.log(step2, "oi oi oi 2")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/password/reset/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(step2),
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
    
            if (data.error){
                setMessage(data.message);
            } else {
                setStep(3);
            }
        } 
        else if (step === 3){
            console.log(step3, "oi oi oi 2")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/password/reset/confirm`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(step3),
                credentials: "include"
            });
            const data = await res.json();
            console.log(data);
    
            if (data.error){
                setMessage(data.message);
            } else {
                router.push("/cadastro")
            }
            
        } 

    };
    
    const Reenviar = async (e: React.FormEvent) => {
        e.preventDefault();
        const step2 = { email: formStep2.email};

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/password/reset/resend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(step2),
            credentials: "include"
        });
        const data = await res.json();
        console.log(data);
        
        if (data.error){
            setMessage(data.message);
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

        <div className={` ${step === 1 ? "h-[538px]": step === 2 ? "h-[743px]" : step === 3 ? "h-[636px]": "" }  max-h-[95%] max-w-[95%] w-[600px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl relative`}>
            <motion.div 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            onClick={() => {if (step === 1) {router.push("/cadastro")} else {setStep(step-1)}}}
            className="w-8 absolute left-4 top-4 cursor-pointer">
                <ArrowLeft className="w-full h-full text-yellow-400 " />
            </motion.div>

            <form onSubmit={handleSubmit} className={`w-full flex flex-col items-center text-white max-w-[90%] h-full my-10 transition-all ease-in-out duration-300`} >
                <motion.img 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                src="seice.png" alt="Seice Logo" className="w-[50%] h-auto"/>

                <motion.h1 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="text-[40px] mx-auto my-5 font-medium">Esqueci a senha</motion.h1>

                <motion.p 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="mb-4 text-center">
                { 
                step === 1 ? "Insira a conta para a qual será enviado o email de redefinição de senha."
                :
                step === 2 ? "Insira novamente o email e o código enviado para caixa de entrada."
                : 
                step === 3 ? "Insira a nova senha." : ""
                }
                </motion.p>


                <AnimatePresence>
                    <>
                        { step === 1 &&
                            <div className={` w-[480px] max-w-full flex flex-col gap-5 mx-auto mt-4`}>
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
                                    value={formStep1.email}
                                    onChange={(e) => {setFormStep1(prev => ({ ...prev, email: e.target.value }));}}
                                    type="email" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                                </motion.div>
                            </div>
                        }

                        { step === 2 &&
                            <>
                                <div className={` w-[480px] max-w-full flex flex-col gap-5 mx-auto mt-4`}>
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
                                        value={formStep2.email}
                                        onChange={(e) => {setFormStep2(prev => ({ ...prev, email: e.target.value }));}}
                                        type="email" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                                    </motion.div>
                                </div>

                                <motion.div 
                                initial={{scale:0}}
                                animate={{scale:1}}
                                exit={{scale:0}}
                                className="w-[480px] max-w-full flex flex-col gap-2 mx-auto mt-5 ">
                                    <motion.label 
                                    htmlFor="" 
                                    className="origin-left">Código</motion.label>
                                    <span>Insira o código enviado para o seu email</span>

                                    <div className="flex gap-2">
                                        {Array.from({length:5}).map((_,i) => (
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
                            </>
                        }

                        { step === 3 &&
                            <>
                                <motion.label 
                                htmlFor="" 
                                className="origin-left mt-4 w-[480px]">Senha</motion.label>
                                <div className="relative w-[480px] max-w-full flex flex-col gap-5 mx-auto mt-2">
                                    <motion.input
                                    required
                                    value={formStep3.password}
                                    onChange={(e) => {setFormStep3(prev => ({ ...prev, password: e.target.value }));}}
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

                                <motion.label 
                                htmlFor="" 
                                className="origin-left mt-5 w-[480px]">Confirmar senha</motion.label>
                                <div className="relative w-[480px] max-w-full flex flex-col gap-5 mx-auto mt-2">
                                    <motion.input
                                    required
                                    value={formStep3.confirmPassword}
                                    onChange={(e) => {setFormStep3(prev => ({ ...prev, confirmPassword: e.target.value }));}}
                                    type={`${mostrar2 ? "text" : "password"}`} placeholder="Digite sua senha" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}
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
                                {/* <div className={` w-[480px] max-w-full flex flex-col gap-5 mx-auto mt-4`}>
                                    <motion.div 
                                    initial={{scale:0}}
                                    animate={{scale:1}}
                                    exit={{scale:0}}
                                    className="flex flex-col gap-2">
                                        <motion.label 
                                        htmlFor="" 
                                        className="origin-left">Senha</motion.label>
                                        <motion.input
                                        required
                                        
                                        type="email" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                                    </motion.div>
                                </div> */}

                                
                            </>
                        }



                        { step === 2 &&
                            <motion.span 
                            initial={{scale:0}}
                            animate={{scale:1}}
                            exit={{scale:0}}
                            className="mx-auto mt-4 w-[480px] flex font-[600] ">
                                <motion.button 
                                whileHover={{scale:1.01}}
                                whileTap={{scale:0.99}}
                                type="button"
                                onClick={Reenviar}
                                className="hover:text-yellow-300 transition-all ease-in-out duration-300 cursor-pointer">
                                    Reenviar código
                                </motion.button> 
                            </motion.span>
                        }

                    </>
                    
                </AnimatePresence>

                <div className="flex flex-col w-[480px] max-w-full h-full items-center mt-10">
                    <motion.button 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                    whileTap={{scale:0.98}}
                    transition={{duration: 0.3, }}
                    type="submit"
                    className="cursor-pointer rounded-[15px] my-auto w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold ">Próximo</motion.button>
                </div>
            </form>
        </div>
        </>

    );
}
