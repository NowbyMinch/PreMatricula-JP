"use client";

export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorModal from "@imports/components/ui/ErrorModal";
import { Cursos } from "@imports/components/ui/selectionboxes";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>


export default function Finalizar() {
    const router = useRouter();
    // const [ ultima, setUltima ] = useState("");
    const [ message, setMessage ] = useState<string | null>("");
    const [ curso, setCurso ] = useState<string>("");
    const [ turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>([]);
    const params = useSearchParams();
    const [step, setStep] = useState(Number(params.get("step")) || 1);

    useEffect(() => {
        router.replace(`/matricula/finalizar_matricula?step=${step}`);
    }, [step, router]);

    useEffect(() => {
        console.log(turmasSelecionadas)
    }, [turmasSelecionadas]);

    useEffect(() => {
        // Bloco completo necessário ------------------------------------------------------------------------------------------------------------------------------------------------------------
        const fetchToken = async () => {
            const tok = await fetch('/api/token');
            const data = await tok.json();
            if (!data.token) {return;}
            const token = data.token;
            
            const usuarioID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario-id`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
            });
            const usuarioIDRetorno = await usuarioID.json();
            const usuarioId = usuarioIDRetorno.usuarioId; 

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario/${usuarioId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
            });
            const dataRes = await res.json();
            console.log(dataRes)
            // setUltima(dataRes.items[0].id);
            
    }; fetchToken();
  
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    },[])
    
    
    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault(); // prevent page reload

    //     const tok = await fetch("/api/token", { credentials: "include" });
    //     const data = await tok.json();
    //     if (!data.token) return
    //     const token = data.token;
    //     const Matricula = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
    //     const matricula = await Matricula.json();
    //     if (matricula?.message === "Unauthorized"){
    //         setMessage("Erro na matricula. Por favor, logue novamente.")
    //         return;
    //     }

    //     const matriculaID = matricula.id;

    //     const AlunoID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/aluno-id`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
    //     const Alunoid = await AlunoID.json();
    //     const alunoID = Alunoid.alunoId;
       

    //     const Atual = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/atual-id`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
    //     const AtualDado = await Atual.json();


    //     // const Sponte = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cadastro/integrar-sponte/${AtualDado.matriculaId}`, {
    //     //   method: 'POST',
    //     //   headers: { 
    //     //     'Content-Type': 'application/json',
    //     //     Authorization: `Bearer ${token}`, },
    //     //   body: JSON.stringify(endereco),
    //     // });
    //     // const IntegrarSponte = await Sponte.json();
    //     // console.log(IntegrarSponte, "Sponte aqui");


    //     // if (IntegrarSponte?.error){
    //     //   if (IntegrarSponte?.error && Array.isArray(IntegrarSponte?.message) && IntegrarSponte?.message.length > 0) {

    //     //     // IntegrarSponte.error exists and is a non-empty array
    //     //     let errors = "";
    //     //     for (let i = 0; i < IntegrarSponte.message.length; i++) {
    //     //         errors += IntegrarSponte.message[i] + "\n";
    //     //     }

    //     //     setMessage(errors);
    //     //   } else if (IntegrarSponte?.error && IntegrarSponte?.message){
    //     //       setMessage(IntegrarSponte.message)
    //     //   }
            
    //     //   console.log("deu certo1")
    //     // } 
    //     // else if (IntegrarSponte?.message){
    //     //   if (IntegrarSponte.message === "Endereço do aluno (etapa 3B) concluído com sucesso."){
    //     //     router.push("/matricula/matricula_finalizada");
    //     //   }
    //     // }
        
    // };
    
    return (
        <>
            {message && (
                <ErrorModal message={message} onClose={() => setMessage(null)} />
            )}
            
            <div className={` p-8 ${step === 1 ? "h-[650px]": "h-[232px]" } overflow-hidden max-h-[95%] max-w-[95%] w-[700px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-8 z-20 flex-col shadow-2xl`}>
                
                <div className={`w-full flex flex-col  text-white h-full `} >
                    
                    <motion.p 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className={`${step === 1 ? "" : "text-center" } text-[20px] mb-6 `}>
                        {step === 1 ?
                            "Matricula quase concluída! Escolha sua turma de interesse"
                        :
                            "Desejas mesmo terminar a matrícula? Nem todos os dados poderão ser alterados após a conclusão"
                        }   
                        
                        </motion.p>
                    
                    {step === 1 &&
                        <Cursos value={curso} onChange={(value) => setCurso(value)} onListChange={setTurmasSelecionadas} />
                    }
                </div>
                
                <div className="flex flex-1 gap-4 max-w-full justify-center items-center ">

                    {step === 2 &&
                        <motion.button 
                        initial={{scale:0}}
                        animate={{scale:1}}
                        exit={{scale:0}}
                        whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                        whileTap={{scale:0.98}}
                        type={`button`}
                        onClick={() => { setStep(1)}}
                        className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold ">Voltar</motion.button>
                    }

                    {step === 1 &&
                        <motion.button 
                        initial={{scale:0}}
                        animate={{scale:1}}
                        exit={{scale:0}}
                        whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                        whileTap={{scale:0.98}}
                        type={`button`}
                        onClick={() => { router.push("/matricula/endereco_e_comunicacao_aluno")}}
                        className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold ">Voltar</motion.button>
                    }

                    <motion.button 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                    whileTap={{scale:0.98}}
                    type={`${step === 1 ? "button" : "submit" }`}
                    onClick={() => { if (step === 1 ) {setStep(2)}  }}
                    className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold ">Próximo</motion.button>
                    
                    {/* <motion.button 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                    whileTap={{scale:0.98}}
                    transition={{duration: 0.3}}
                    onClick={() => router.push('/matricula/dados_do_responsavel_financeiro')}
                    className="cursor-pointer rounded-[15px] max-w-full w-[230px] py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold ">Nova matrícula</motion.button>

                    <motion.button 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
                    whileTap={{scale:0.98}}
                    transition={{duration: 0.3, }}
                    onClick={() => {if (ultima) {router.push(`/matriculas/${ultima}/dados_do_responsavel_financeiro`)}}}
                    className="cursor-pointer rounded-[15px] max-w-full w-[230px] py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold ">Ver matrículas</motion.button> */}
                </div>
            </div>
        </>


    );
}
