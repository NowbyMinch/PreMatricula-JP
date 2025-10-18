"use client";

export const dynamic = "force-dynamic";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ErrorModal from "@imports/components/ui/ErrorModal";
import { Cursos } from "@imports/components/ui/selectionboxes";
import { XMLParser } from "fast-xml-parser";

// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>


type alunosUpdate = {
    nAlunoID: number;
    sNome: string;
    sMidia: string;
    dDataNascimento: string;
    sCidade: string;
    sBairro: string;
    sCEP: string;
    sEndereco: string;
    nNumeroEndereco: string | number;
    sComplementoEndereco: string;
    sCPF: string;
    sRG: string;
    nResponsavelFinanceiroID: string | number;
    nResponsavelDidaticoID: string | number;
    sEmail: string;
    sTelefone: string;
    sCelular: string;
    sObservacao: string;
    sSexo: string;
    sProfissao: string;
    sCidadeNatal: string;
    sRa: string;
    sNumeroMatricula: string;
    sSituacao: string;
    sCursoInteresse: string;
    sInfoBloqueada: string;
    sOrigemNome: string;
}
export default function Finalizar() {
    const router = useRouter();
    // const [ ultima, setUltima ] = useState("");
    const [ message, setMessage ] = useState<string | null>("");
    const [ curso, setCurso ] = useState<string>("");
    const [ cursoID, serCursoID] = useState<string[]>([]);
    const params = useSearchParams();
    const [step, setStep] = useState(Number(params.get("step")) || 1);
    
    const [ update, setUpdate ] = useState<alunosUpdate>({} as alunosUpdate);
    
    // useEffect(() => {
    //     router.replace(`/matricula/finalizar_matricula?step=${step}`);
    // }, [step, router]);
    
    useEffect(() => {
        console.log(update);
    }, [update]);


    // useEffect(() => {
    //     // Bloco completo necessário ------------------------------------------------------------------------------------------------------------------------------------------------------------
    //     const fetchToken = async () => {
    //         const tok = await fetch('/api/token');
    //         const data = await tok.json();
    //         if (!data.token) {return;}
    //         const token = data.token;
            
    //         const usuarioID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario-id`, {
    //             method: 'GET',
    //             headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
    //         });
    //         const usuarioIDRetorno = await usuarioID.json();
    //         const usuarioId = usuarioIDRetorno.usuarioId; 

    //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario/${usuarioId}`, {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
    //         });
    //         const dataRes = await res.json();
    //         console.log(dataRes)
    //         // setUltima(dataRes.items[0].id);
            
    // }; fetchToken();
  
    // // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
    // },[])
    
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload

        const tok = await fetch("/api/token", { credentials: "include" });
        const data = await tok.json();
        if (!data.token) return
        const token = data.token;
        const Matricula = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
        const matricula = await Matricula.json();
        if (matricula?.message === "Unauthorized"){
            setMessage("Erro na matricula. Por favor, logue novamente.")
            return;
        }
        const matriculaID = matricula.id;


        const AlunoSponteID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integracoes/sponte/matriculas/sponte-id?id=${matriculaID}`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
        const Alunoid = await AlunoSponteID.json();
    

        setUpdate(prev => ({...prev, nAlunoID: Alunoid.sponteAlunoId }));

        if (cursoID.length > 1){
            setUpdate(prev => ({...prev, sCursoInteresse:cursoID.join(";") + ";" }));
            
        } else {

            setUpdate(prev => ({...prev, sCursoInteresse:cursoID.join(";")}) );
        }
        
        const updatedAluno: alunosUpdate = {
            ...update,
            nAlunoID: Alunoid.sponteAlunoId,
            sCursoInteresse: cursoID.length > 1 ? cursoID.join(";") + ";" : cursoID.join(";")
        };

        const Turma = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integracoes/sponte/alunos/update`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, },
          body: JSON.stringify(updatedAluno),
        });
        const turmaRes= await Turma.text();
        console.log(turmaRes);
        const wrapped = `<?xml version="1.0" encoding="UTF-8"?><root>${turmaRes}</root>`;
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(wrapped, "application/xml");

        // Get all <RetornoOperacao> elements
        const retornoElements = Array.from(xmlDoc.getElementsByTagName("RetornoOperacao"));

        const retornoOperacaoValues = retornoElements.map(el => el.textContent);

        if (retornoOperacaoValues[0] === "01 - Operação Realizada com Sucesso."){
            router.push(`/matriculas/${matriculaID}/dados_do_responsavel`)
        }

        
    };
    
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
                    className={`text-center text-[20px] mb-6 `}>
                        {step === 1 ?
                            "Matricula quase concluída! Escolha sua turma de interesse"
                        :
                            "Desejas mesmo terminar a matrícula? Nem todos os dados poderão ser alterados após a conclusão"
                        }   
                        
                        </motion.p>
                    
                    <div style={{ display: step === 1 ? "block" : "none", width: "100%", height: "100%" }}>
                        <Cursos
                            value={curso}
                            onChange={(value) => setCurso(value)}
                            onListChangeID={serCursoID}
                        />
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-1 gap-4 max-w-full justify-center items-center ">

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
                    onClick={(e) => { if (step === 1) { e.preventDefault(); setStep(2)} }}
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
                </form>
            </div>
        </>


    );
}
