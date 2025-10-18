"use client";

import ErrorModal from "@imports/components/ui/ErrorModal";
import {Loading} from "@imports/components/ui/loading";
import { Celular, CEP } from "@imports/components/ui/selectionboxes";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


type Aluno = {
  nome: string;
  genero: string;
  dataNascimento: string;
  estadoCivil: string;
  cidadeNatal: string;
  nacionalidade: string;
  cpf: string;
  telefone: string;
  celular: string;
  email: string;
  moraComResponsavel: boolean;
  moraComResponsavelNome: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

type DadosAluno = {
  aluno: Aluno;
};

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

export default function Home() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [dados, setDados] = useState<DadosAluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [ message, setMessage ] = useState<string | null>("");

  useEffect(() => {
    const fetchToken = async () => {
      const tok = await fetch('/api/token');
      const data = await tok.json();
      if (!data.token) {return;}
      const token = data.token;
      
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/${id}/detalhe`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const dataRes = await res.json();

      console.log(dataRes)
      setDados(dataRes);
      setLoading(false);

    }; fetchToken();
  },[id])

  const [ update, setUpdate ] = useState<alunosUpdate>({} as alunosUpdate);
  
  useEffect(() => {
      setUpdate(prev => ({...prev, sCEP: dados ? dados.aluno.cep : "" }));
      setUpdate(prev => ({...prev, sEndereco: dados ? dados.aluno.rua : "" }));
      setUpdate(prev => ({...prev, nNumeroEndereco: dados ? dados.aluno.numero : "" }));
      setUpdate(prev => ({...prev, sComplementoEndereco: dados ? dados.aluno.complemento : "" }));
      setUpdate(prev => ({...prev, sCidade: dados ? dados.aluno.cidade : "" }));
      setUpdate(prev => ({...prev, sBairro: dados ? dados.aluno.bairro : "" }));
      setUpdate(prev => ({...prev, sTelefone: dados ? dados.aluno.telefone : "" }));
      setUpdate(prev => ({...prev, sCelular: dados ? dados.aluno.celular : "" }));
      setUpdate(prev => ({...prev, sEmail: dados ? dados.aluno.email : "" }));
        
    },[dados])

  useEffect(() => {
      console.log(update);
    },[update])
  
  const handleUpdate = async () => {
    const tok = await fetch("/api/token", { credentials: "include" });
    const data = await tok.json();
    if (!data.token) return
    const token = data.token;
    
    const AlunoSponteID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integracoes/sponte/matriculas/sponte-id?id=${id}`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
    const Alunoid = await AlunoSponteID.json();
    
    setUpdate(prev => ({...prev, nAlunoID: Alunoid.sponteAlunoId }));
    
    const updatedAluno: alunosUpdate = {
        ...update,
        nAlunoID: Alunoid.sponteAlunoId,
    };

    console.log(updatedAluno, "updatedAluno")

    const Turma = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integracoes/sponte/alunos/update`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, },
      body: JSON.stringify(updatedAluno),
    });
    
    const turmaRes= await Turma.text();
    const wrapped = `<?xml version="1.0" encoding="UTF-8"?><root>${turmaRes}</root>`;
    
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(wrapped, "application/xml");

    // Get all <RetornoOperacao> elements
    const retornoElements = Array.from(xmlDoc.getElementsByTagName("RetornoOperacao"));

    const retornoOperacaoValues = retornoElements.map(el => el.textContent);
    
    console.log(retornoOperacaoValues);

          
  };

  if (loading) return <div className="h-[703px]"><Loading /></div>

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      <div className="flex flex-col mt-5 gap-16 pb-10 w-full">
        <AnimatePresence >
          <div className="flex flex-col justify-between w-full gap-5">

            <motion.h1 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="text-[25px] origin-left">Endereço</motion.h1>

            <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full">
              <motion.label 
              htmlFor="" 
              className="origin-left">C.E.P.</motion.label>
              <CEP disabled={false} onChange={(value) => {setUpdate(prev => ({...prev, sCEP: value}))}} value={dados?.aluno.cep} />
              {/* <motion.input
              type="text" defaultValue={update.sCEP} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/> */}
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
              type="text" 
              onChange={(e) => {setUpdate(prev => ({...prev, sEndereco: e.target.value}))}}
              defaultValue={update.sEndereco} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
              
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">N°</motion.label>
              <motion.input
              type="text" maxLength={3} 
              onChange={(e) => {setUpdate(prev => ({...prev, nNumeroEndereco: e.target.value}))}}
              defaultValue={update.nNumeroEndereco} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
              className="origin-left">Complemento</motion.label>
              <motion.input
              type="text" 
              onChange={(e) => {setUpdate(prev => ({...prev, sComplementoEndereco: e.target.value}))}}
              defaultValue={update.sComplementoEndereco} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Cidade</motion.label>
              <motion.input
              onChange={(e) => {setUpdate(prev => ({...prev, sCidade: e.target.value}))}}
              type="text" defaultValue={update.sCidade} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-[130px]">
                <motion.label 
                htmlFor="" 
                className="origin-left">UF</motion.label>
                <motion.input 
                type="text" 
                disabled
                defaultValue={dados ? dados.aluno.uf : ""}
                className={`w-full rounded-[15px] py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] bg-transparent text-white  text-center`} />
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
              onChange={(e) => {setUpdate(prev => ({...prev, sBairro: e.target.value}))}}
              type="text" defaultValue={update.sBairro} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

            </div>

            <motion.h1 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            className="text-[25px] origin-left">Comunicação</motion.h1>
            
            <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Telefone</motion.label>
              <Celular disabled={false} onChange={(value) => {setUpdate(prev => ({...prev, sTelefone: value}))}} value={dados?.aluno.telefone}/>
              </motion.div>
              
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
              <motion.label 
              htmlFor="" 
              className="origin-left">Celular</motion.label>
              <Celular disabled={false} onChange={(value) => {setUpdate(prev => ({...prev, sCelular: value}))}} value={dados?.aluno.celular}/>
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
              className="origin-left">Email</motion.label>
              <motion.input
              type="email" 
              onChange={(e) => {setUpdate(prev => ({...prev, sEmail: e.target.value}))}}
              defaultValue={update.sEmail} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
              
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full max-w-full">
                <motion.label 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="inline-flex items-center mt-2">

                  <motion.div className={`w-5 h-5 border-2 ${dados?.aluno?.moraComResponsavel ? "bg-yellow-400 border-yellow-400" : "border-gray-400" } rounded-md flex items-center justify-center `}>
                  </motion.div>

                  <span className="ml-2 select-none">Mora junto com algum dos seus responsáveis?</span>

                </motion.label>

                <motion.input
                disabled
                type="email" defaultValue={dados ? dados.aluno.moraComResponsavelNome : ""} className={` w-[380px]  rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>

              </motion.div>

            </div>
              
          </div>

        </AnimatePresence>
      </div>
      <div className=" h-full mt-auto">
        <motion.button 
        initial={{scale:0}}
        animate={{scale:1}}
        exit={{scale:0}}
        whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
        whileTap={{scale:0.98}}
        onClick={handleUpdate}
        className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold mx-auto mt-auto ">Salvar mudanças</motion.button>
      </div>
    </>

  );
}
