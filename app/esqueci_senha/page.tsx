"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ErrorModal from "@imports/components/ui/ErrorModal";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
    const router = useRouter();
    // const params = useSearchParams();
    // const [step, setStep] = useState(Number(params.get("step")) || 1);
    const [message, setMessage] = useState<string | null>(null);

    
    // useEffect(() => {
    //     router.replace(`/esqueci_senha?step=${step}`);
    // }, [step]);
    
    // STEPS ---------------------------- 
    // const [formStep1, setFormStep1] = useState({ email: "", senha: ""});
    // const [formStep2, setFormStep2] = useState({ email: "", senha: ""});
    // const [formStep3, setFormStep3] = useState({ email: "", senha: ""});
    // const [formStep4, setFormStep4] = useState({ email: "", senha: ""});
    // const [formStep5, setFormStep5] = useState({ email: "", senha: ""});
    // const [formStep6, setFormStep6] = useState({ email: "", senha: ""});

    
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     const step1 = { email: formStep1.email};

    //     if (step === 1){
    //         console.log(step1.email, "oi oi oi ")

    //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/password/reset`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(step1),
    //             credentials: "include"
    //         });
    
    //         const data = await res.json();
    //         console.log(data);
    
    //         if (data.error){
    //             setMessage(data.message);
    //         } else {
    //             router.push('/registrar')
    //         }
    //     } 
    // };

    return (
        <>
        {message && (
            <ErrorModal message={message} onClose={() => setMessage(null)} />
        )}

        <div className={` h-[550px] max-h-[95%] max-w-[95%] w-[600px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl relative`}>
            <motion.div 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            onClick={() => router.back()}
            className="w-8 absolute left-4 top-4 cursor-pointer">
                <ArrowLeft className="w-full h-full text-yellow-400 " />
            </motion.div>

{/* onSubmit={handleSubmit} */}

            <form className={`w-full flex flex-col items-center text-white max-w-[90%] h-full  `} >
                <motion.img 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                src="seice.png" alt="Seice Logo" className="w-[50%] h-auto mt-10"/>

                <motion.h1 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="text-[40px] mx-auto my-5 font-medium">Esqueci a senha</motion.h1>

                <motion.p 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="mb-4 text-center">Coloque a conta para a qual será enviado o email de redefinição de senha. Será gerada uma nova senha automática para a conta.</motion.p>


                <AnimatePresence>
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
                            // value={formSte.email}
                            // onChange={(e) => {setFormStep1(prev => ({ ...prev, email: e.target.value }));}}
                            type="email" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                        </motion.div>

                    </div>
                </AnimatePresence>








                <div className="flex flex-col w-[480px] max-w-full h-full  items-center">
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
