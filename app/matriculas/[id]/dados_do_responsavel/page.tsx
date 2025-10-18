"use client";

import { DataEditar } from "@imports/components/ui/datepicker";
import ErrorModal from "@imports/components/ui/ErrorModal";
import {Loading} from "@imports/components/ui/loading";
import { Genero } from "@imports/components/ui/selectionboxes";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type DadosResponsavel = {
  responsaveis: {
    nome: string;
    genero: string;
    dataNascimento: string;
    estadoCivil: string;
    tipoParentesco: string;
    pessoaJuridica: boolean;
    cpf: string;
    rg: string;
    orgaoExpeditor: string;
    dataExpedicao: string;
  }[];
};

type responsavelUpdate = {
    nResponsavelID: number,
    sNome: string,
    dDataNascimento: string,
    nParentesco: number,
    sCEP: string,
    sEndereco: string,
    nNumeroEndereco: string,
    sRG: string,
    sCPFCNPJ: string,
    sCidade: string,
    sBairro: string,
    sEmail: string,
    sTelefone: string,
    sCelular: string,
    nAlunoID: number,
    lResponsavelFinanceiro: boolean,
    lResponsavelDidatico: boolean,
    sObservacao: string,
    sSexo: string,
    sProfissao: string,
    nTipoPessoa: number,
    sComplementoEndereco: string
}

export default function Home() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [dados, setDados] = useState<DadosResponsavel | null>(null);
  const [loading, setLoading] = useState(true);
  const [ message, setMessage ] = useState<string | null>("");
  const [ genero, setGenero ] = useState<string>("");
  const [ genero2, setGenero2 ] = useState<string>("");


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

      setDados(dataRes);
      setGenero(dataRes ? dataRes?.responsaveis[0]?.genero : "");
      setGenero2(dataRes ? dataRes?.responsaveis[1]?.genero : "");
      setLoading(false);
    }; fetchToken();
    
  },[id])

 
   const [ update, setUpdate ] = useState<responsavelUpdate>({} as responsavelUpdate);
   const [ update2, setUpdate2 ] = useState<responsavelUpdate>({} as responsavelUpdate);
   
   useEffect(() => {
     setUpdate(prev => ({...prev, sNome: dados ? dados?.responsaveis[0]?.nome : "" }));
     setUpdate(prev => ({...prev, sSexo: dados ? (dados?.responsaveis[0]?.genero.toLowerCase()[0].toUpperCase() + dados?.responsaveis[0]?.genero.toLowerCase().slice(1)) : "" }));
     setUpdate(prev => ({...prev, dDataNascimento: dados ? dados?.responsaveis[0]?.dataNascimento : "" }));
     setUpdate(prev => ({...prev, nTipoPessoa: dados?.responsaveis[0]?.pessoaJuridica ? 2 : 1 }));

    //  PARENTESCO?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????

     setUpdate(prev => ({...prev, sCPFCNPJ: dados ? dados?.responsaveis[0]?.cpf : "" }));
     setUpdate(prev => ({...prev, sRG: dados ? dados?.responsaveis[0]?.rg : "" }));
     

     


     
     setUpdate2(prev => ({...prev, sNome: dados ? dados?.responsaveis[1]?.nome : "" }));
     setUpdate2(prev => ({...prev, sSexo: dados ? (dados?.responsaveis[1]?.genero.toLowerCase()[0].toUpperCase() + dados?.responsaveis[1]?.genero.toLowerCase().slice(1)) : "" }));
     setUpdate2(prev => ({...prev, dDataNascimento: dados ? dados?.responsaveis[1]?.dataNascimento : "" }));
     setUpdate2(prev => ({...prev, nTipoPessoa: dados?.responsaveis[1]?.pessoaJuridica ? 2 : 1 }));

    //  JURIDICO?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    //  PARENTESCO?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????


     setUpdate2(prev => ({...prev, sCPFCNPJ: dados ? dados?.responsaveis[1]?.cpf : "" }));
     setUpdate2(prev => ({...prev, sRG: dados ? dados?.responsaveis[1]?.rg : "" }));


     //  setUpdate(prev => ({...prev, dDataNascimento: dados ? dados.aluno.dataNascimento : "" }));
    //  setUpdate(prev => ({...prev, sCidadeNatal: dados ? dados.aluno.cidadeNatal : "" }));
    //  setUpdate(prev => ({...prev, sCPF: dados ? dados.aluno.cpf : "" }));
       
   },[dados])
 
   useEffect(() => {
     console.log(update, "update");
     console.log(update2, "update2");
   },[update, update2])
   
   const handleUpdate = async () => {
     const tok = await fetch("/api/token", { credentials: "include" });
     const data = await tok.json();
     if (!data.token) return
     const token = data.token;
     
     const AlunoSponteID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integracoes/sponte/matriculas/sponte-id?id=${id}`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
     const Alunoid = await AlunoSponteID.json();
    
     
     const ResponsavelSponteID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integracoes/sponte/alunos/responsaveis?id=${Alunoid.sponteAlunoId}`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
     const Responsavelid = await ResponsavelSponteID.json();
     
     console.log(Responsavelid?.responsavelIds[0]);
     setUpdate(prev => ({...prev, nResponsavelID: Responsavelid?.responsavelIds[0] }));
     setUpdate2(prev => ({...prev, nResponsavelID: Responsavelid?.responsavelIds[1] }));
    

     const updatedResponsavel1: responsavelUpdate = {
      ...update,
      nResponsavelID: Responsavelid?.responsavelIds[0],
      nAlunoID: Alunoid.sponteAlunoId
     };
     
     const updatedResponsavel2: responsavelUpdate = {
      ...update2,
      nResponsavelID: Responsavelid?.responsavelIds[1],
      nAlunoID: Alunoid.sponteAlunoId

     };
     
     console.log(updatedResponsavel1, "updatedResponsavel1 ---")
    //  console.log(updatedResponsavel2, "updatedResponsavel2 ---")
 
     const Turma = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integracoes/sponte/responsaveis/update-v1`, {
       method: 'POST',
       headers: { 
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`, },
       body: JSON.stringify(updatedResponsavel1),
     });
     
     const turmaRes= await Turma.text();
     const wrapped = `<?xml version="1.0" encoding="UTF-8"?><root>${turmaRes}</root>`;
     
     const parser = new DOMParser();
     const xmlDoc = parser.parseFromString(wrapped, "application/xml");
 
     // Get all <RetornoOperacao> elements
     const retornoElements = Array.from(xmlDoc.getElementsByTagName("RetornoOperacao"));
 
     const retornoOperacaoValues = retornoElements.map(el => el.textContent);
     
     console.log(retornoOperacaoValues);
     console.log(turmaRes);


    //  const Turma2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/integracoes/sponte/responsaveis/update`, {
    //    method: 'POST',
    //    headers: { 
    //      'Content-Type': 'application/json',
    //      Authorization: `Bearer ${token}`, },
    //    body: JSON.stringify(updatedResponsavel2),
    //  });
     
    //  const turmaRes2= await Turma2.text();
    //  const wrapped2 = `<?xml version="1.0" encoding="UTF-8"?><root>${turmaRes2}</root>`;
     
    //  const parser2 = new DOMParser();
    //  const xmlDoc2 = parser2.parseFromString(wrapped2, "application/xml");
 
    //  // Get all <RetornoOperacao> elements
    //  const retornoElements2 = Array.from(xmlDoc2.getElementsByTagName("RetornoOperacao"));
 
    //  const retornoOperacaoValues2 = retornoElements2.map(el => el.textContent);
     
    //  console.log(retornoOperacaoValues2);
           
   };



  if (loading) return <div className="h-[703px]"><Loading /></div>

  return (
    <>

      {message && (
          <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      
      <div className="flex flex-col gap-10 pb-10 w-full">
        <AnimatePresence >
          
          <div key={0} className="flex flex-col justify-between w-full gap-5">
            { dados?.responsaveis[0] && 
              <motion.h1 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="text-[30px] w-full mt-5 font-medium ">
                Responsavel Financeiro
              </motion.h1>
            }
            
            <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Nome</motion.label>
                <motion.input
                type="text" 
                disabled
                onChange={(e) => {setUpdate(prev => ({...prev, sNome: e.target.value}))}}
                defaultValue={update.sNome} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Gênero</motion.label>
                <motion.input
                type="text" 
                disabled
                defaultValue={update.sSexo} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>
              
              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">Data de Nascimento</motion.label>
                <DataEditar disabled={true} value={((dados?.responsaveis[0].dataNascimento)?.split("/"))?.join(" / ")} onChange={(value) => {setUpdate(prev => ({...prev, dDataNascimento: value}))}} />
                
              </motion.div>
              
            </div>
            <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
              
              <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Parentesco</motion.label>
                  <motion.input
                  type="text" 
                  disabled
                  // onChange={(e) => {setUpdate(prev => ({...prev, sNome: e.target.value}))}} PARENTESCO????????????????????????????????????????????????????????????????????????????????????????????
                  defaultValue={dados ? (((dados.responsaveis[0].tipoParentesco).toLowerCase())[0].toUpperCase()) + (dados.responsaveis[0].tipoParentesco).toLowerCase().slice(1): ""} 
                  className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full">
                <motion.label 
                htmlFor="" 
                className="origin-left">CPF / CNPJ</motion.label>
                <div className="w-full flex flex-col justify-center items-center gap-4 rounded-[15px] border border-gray-400 min-h-[150px] p-3">

                  <div className="flex w-full gap-4">
                    <label className="flex items-center gap-2 ">
                      <motion.input
                      whileHover={{ scale: 1.04}}
                      whileTap={{ scale: 0.96}}
                      checked={update.nTipoPessoa === 1}
                      name="tipoPessoa"
                      onChange={() =>{}}
                      type="radio"  className="form-radio   accent-yellow-400 "/>
                      Pessoa Física
                    </label>
                    <label className="flex items-center gap-2">
                      <motion.input
                      whileHover={{ scale: 1.04}}
                      whileTap={{ scale: 0.96}}
                      checked={update.nTipoPessoa === 2}
                      name="tipoPessoa"
                      onChange={() =>{}}
                      type="radio"  className="form-radio  accent-yellow-400 "/>
                      Pessoa Jurídica
                    </label>
                  </div>

                  <motion.div 
                  initial={{scale:0}}
                  animate={{scale:1}}
                  exit={{scale:0}}
                  className="flex flex-col gap-2 w-full ">
                    
                    <motion.input
                    disabled
                    onChange={(e) => {setUpdate(prev => ({...prev, sCPFCNPJ: e.target.value}))}}
                    type="text" defaultValue={update.sCPFCNPJ} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                    
                  </motion.div>
                </div>
              </motion.div>

              <motion.div 
              initial={{scale:0}}
              animate={{scale:1}}
              exit={{scale:0}}
              className="flex flex-col gap-2 w-full ">
                <motion.label 
                htmlFor="" 
                className="origin-left">RG</motion.label>

                <div className="w-full flex sm:flex-row flex-col justify-center items-center gap-4 rounded-[15px] border border-gray-400 min-h-[150px] p-3">
                  <motion.div 
                  initial={{scale:0}}
                  animate={{scale:1}}
                  exit={{scale:0}}
                  className="flex flex-col gap-2 w-full ">
                    <motion.label 
                    htmlFor="" 
                    className="origin-left">N°</motion.label>
                    <motion.input
                    disabled
                    onChange={(e) => {setUpdate(prev => ({...prev, sRG: e.target.value}))}}
                    type="text" defaultValue={update.sRG} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                    
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          { dados?.responsaveis[1] &&
            <div key={1} className="flex flex-col justify-between w-full gap-5">
              { dados?.responsaveis[1] && 
                <motion.h1 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="text-[30px] w-full mt-5 font-medium ">
                  Segundo responsável
                </motion.h1>
              }
              
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
                  disabled
                  onChange={(e) => {setUpdate2(prev => ({...prev, sNome: e.target.value}))}}
                  defaultValue={update2.sNome} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>

                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Gênero</motion.label>
                  <motion.input
                  type="text" 
                  disabled
                  defaultValue={update2.sSexo} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                  
                </motion.div>
                
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Data de Nascimento</motion.label>
                  <DataEditar disabled={true} value={((dados?.responsaveis[1].dataNascimento)?.split("/"))?.join(" / ")} onChange={(value) => {setUpdate2(prev => ({...prev, dDataNascimento: value}))}} />
                </motion.div>
                
              </div>
              <div className={` w-full max-w-full flex md:flex-row flex-col gap-4`}>
                
                <motion.div 
                  initial={{scale:0}}
                  animate={{scale:1}}
                  exit={{scale:0}}
                  className="flex flex-col gap-2 w-full">
                    <motion.label 
                    htmlFor="" 
                    className="origin-left">Parentesco</motion.label>
                    <motion.input
                    type="text" 
                    disabled
                    // onChange={(e) => {setUpdate(prev => ({...prev, sNome: e.target.value}))}} PARENTESCO????????????????????????????????????????????????????????????????????????????????????????????
                    defaultValue={dados ? (((dados.responsaveis[1].tipoParentesco).toLowerCase())[0].toUpperCase()) + (dados.responsaveis[1].tipoParentesco).toLowerCase().slice(1): ""} 
                    className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>

                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">CPF / CNPJ</motion.label>
                  <div className="w-full flex flex-col justify-center items-center gap-4 rounded-[15px] border border-gray-400 min-h-[150px] p-3">

                    <div className="flex w-full gap-4">
                      <label className="flex items-center gap-2 ">
                        <motion.input
                        whileHover={{ scale: 1.04}}
                        whileTap={{ scale: 0.96}}
                        checked={ dados ? !dados.responsaveis[1]?.pessoaJuridica : false}
                        onChange={() => {}}
                        type="radio"  className="form-radio cursor-none  accent-yellow-400 pointer-events-none"/>
                        Pessoa Física
                      </label>
                      <label className="flex items-center gap-2">
                        <motion.input
                        whileHover={{ scale: 1.04}}
                        whileTap={{ scale: 0.96}}
                        checked={ dados ? dados.responsaveis[1]?.pessoaJuridica : false}
                        onChange={() => {}}
                        type="radio"  className="form-radio poicursor-non accent-yellow-400 pointer-events-none"/>
                        Pessoa Jurídica
                      </label>
                    </div>

                    <motion.div 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className="flex flex-col gap-2 w-full ">
                      
                      <motion.input
                      onChange={(e) => {setUpdate2(prev => ({...prev, sCPFCNPJ: e.target.value}))}}                      
                      type="text" 
                      disabled
                      defaultValue={update2.sCPFCNPJ} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                      
                    </motion.div>

                  </div>
                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">RG</motion.label>


                  <div className="w-full flex sm:flex-row flex-col justify-center items-center gap-4 rounded-[15px] border border-gray-400 min-h-[150px] p-3">
                    
                    <motion.div 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className="flex flex-col gap-2 w-full ">
                      <motion.label 
                      htmlFor="" 
                      className="origin-left">N°</motion.label>
                      <motion.input
                      type="text" 
                      disabled
                      onChange={(e) => {setUpdate2(prev => ({...prev, nNumeroEndereco: e.target.value}))}}
                      defaultValue={dados ? dados.responsaveis[1].rg : ""} className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[420px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                      
                    </motion.div>

                  </div>
                </motion.div>

              </div>

            </div>
            
          }
          
        </AnimatePresence>

      </div>
      {/* <div className=" h-full mt-auto">
        <motion.button 
        initial={{scale:0}}
        animate={{scale:1}}
        exit={{scale:0}}
        whileHover={{scale:1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)"}}
        whileTap={{scale:0.98}}
        onClick={handleUpdate}
        className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold mx-auto mt-auto ">Salvar mudanças</motion.button>
      </div> */}
    </>

  );
}
