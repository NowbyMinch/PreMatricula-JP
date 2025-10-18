"use client";

import {DataEditar} from "@imports/components/ui/datepicker";
import ErrorModal from "@imports/components/ui/ErrorModal";
import {Loading} from "@imports/components/ui/loading";
import { Genero } from "@imports/components/ui/selectionboxes";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Dados = {
  aluno: {
    nome: string;
    genero: string;
    dataNascimento: string;
    estadoCivil: string;
    cidadeNatal: string;
    nacionalidade: string;
    cpf: string;
  };
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
  const [dados, setDados] = useState<Dados | null>(null);
  const [loading, setLoading] = useState(true);
  const [ message, setMessage ] = useState<string | null>("");
  const [ genero, setGenero ] = useState("");

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
      setGenero(dataRes ? dataRes?.aluno?.genero : "");
      setLoading(false);

    }; fetchToken();
  },[id])
  
  const [ update, setUpdate ] = useState<alunosUpdate>({} as alunosUpdate);
  
  useEffect(() => {
    setUpdate(prev => ({...prev, sNome: dados ? dados.aluno.nome : "" }));
    setUpdate(prev => ({...prev, sSexo: dados ? (dados.aluno.genero.toLowerCase()[0].toUpperCase() + dados.aluno.genero.toLowerCase().slice(1)) : "" }));
    setUpdate(prev => ({...prev, dDataNascimento: dados ? dados.aluno.dataNascimento : "" }));
    setUpdate(prev => ({...prev, sCidadeNatal: dados ? dados.aluno.cidadeNatal : "" }));
    setUpdate(prev => ({...prev, sCPF: dados ? dados.aluno.cpf : "" }));
      
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

      <div className="flex flex-col gap-10 pb-10 pt-12 w-full ">
        <AnimatePresence >
          <div key={0} className="flex flex-col justify-between w-full gap-5">
            <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full">
                <motion.label 
                htmlFor="" 
                className="origin-left">Nome</motion.label>
                <motion.input
                type="text" 
                onChange={(e) => {setUpdate(prev => ({...prev, sNome: e.target.value}))}}
                defaultValue={update.sNome} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Gênero</motion.label>
                  <Genero onChange={(value) => {setGenero(value); setUpdate(prev => ({...prev, sSexo: value }))}} value={genero} />
                </motion.div>
              
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Data de Nascimento</motion.label>
                <DataEditar disabled={false} value={((dados?.aluno.dataNascimento)?.split("/"))?.join(" / ")} onChange={(value) => {setUpdate(prev => ({...prev, dDataNascimento: value}))}} />
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
                className="origin-left">Cidade Natal</motion.label>
                <motion.input
                type="text" 
                disabled
                defaultValue={update.sCidadeNatal} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Nacionalidade</motion.label>
                <motion.input
                disabled
                
                type="text" defaultValue={dados?.aluno?.nacionalidade ? dados?.aluno?.nacionalidade : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">CPF</motion.label>
                <motion.input
                onChange={(e) => {setUpdate(prev => ({...prev, sCPF: e.target.value}))}}
                type="text" defaultValue={update.sCPF} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
