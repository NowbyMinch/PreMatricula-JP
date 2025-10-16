"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CpfInput, Genero, NumeroRG } from "@imports/components/ui/selectionboxes";
import DatePicker from "@imports/components/ui/datepicker";
import ErrorModal from "@imports/components/ui/ErrorModal";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
  const router = useRouter();
  
  const [ nome, setNome ] = useState("");
  const [ genero, setGenero ] = useState("");
  const [ dataNascimento, setData ] = useState<string>("");
  const [ rg, setRG ] = useState<string>("");
  const [ cpf, setCPF ] = useState<string>("");
  const [ pessoaJuridica, setPessoaJuridica ] = useState(false);
  const [ parentesco, setParentesco ] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchToken = async () => {
      const tok = await fetch('/api/token');
      const data = await tok.json();
      if (!data.token) {return;}
      const token = data.token;
      console.log(token)
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const dataRes = await res.json();
      if (dataRes?.message === "Unauthorized"){
          setMessage("Erro na matricula. Por favor, logue novamente.")
      }
      console.log(dataRes);
    };
    fetchToken();

  },[])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    
    const tok = await fetch('/api/token');
    const data = await tok.json();
    if (!data.token) {return;}
    const token = data.token;
    const Matricula = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
    const matricula = await Matricula.json();
    const matriculaID = matricula.id;
    const Responsavel = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cadastro/responsaveis/${matriculaID}`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
    const responsaveis = await Responsavel.json();
    console.log(responsaveis)

    const iniciar = {
    nome: nome,
    genero: genero,
    dataNascimento: dataNascimento,
    rg: rg,
    cpf: cpf,
    pessoaJuridica: pessoaJuridica,
    parentesco: parentesco
    }

    console.log(iniciar);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cadastro/iniciar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
    body: JSON.stringify(iniciar),
    });
    const dataRes = await res.json();
    console.log(dataRes);
    
    if (dataRes?.error){
      if (dataRes?.error && Array.isArray(dataRes?.message) && dataRes?.message.length > 0) {
          // dataRes.error exists and is a non-empty array
          let errors = "";
          for (let i = 0; i < dataRes.message.length; i++) {
              errors += dataRes.message[i] + "\n";
          }
          setMessage(errors);
      } else {
      setMessage(dataRes.error.message)
      }
    } 
    else if (dataRes?.message){
      if (dataRes.message === "Pré-matrícula iniciada com sucesso."){
          router.push("/matricula/endereco_e_comunicacao_responsavel")
      }
    } 
    
  };
  
  return (
    <>
      {message && (
          <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}


      <div className={` max-h-[95%] max-w-[95%] w-[1150px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}>
        <form className={`w-full flex flex-col items-center text-white max-w-[90%] h-full  `} onSubmit={handleSubmit}>
          
          {/* <motion.img 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
          src="seice.png" alt="Seice Logo" className="w-[50%] h-auto mt-10"/> */}

          <motion.h1 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
          className="text-[35px] mx-auto mt-10 font-medium text-center">Dados do responsável Financeiro</motion.h1>

          <motion.p 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
          className="mb-4 ">Insira os dados do responsável</motion.p>

          <AnimatePresence >
            <div className="flex flex-col justify-between w-full gap-5">
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
                  required
                  onChange={(e) => {setNome(e.target.value)}}
                  type="text" placeholder="Digite seu nome" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Gênero</motion.label>
                  <Genero value={genero} onChange={ value => {setGenero(value);}} />
                  
                </motion.div>
                
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 w-full ">
                  <motion.label 
                  htmlFor="" 
                  className="origin-left">Data de Nascimento</motion.label>
                  <DatePicker onChange={(val) => {setData(val)} } />
                </motion.div>
              </div>

              <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>
                
                <div className="flex gap-5 w-full">
                  <motion.div 
                  initial={{scale:0}}
                  animate={{scale:1}}
                  exit={{scale:0}}
                  className="flex flex-col gap-2 w-full">
                    <motion.label 
                    htmlFor="" 
                    className="origin-left">Parentesco</motion.label>
                    <motion.input
                    required
                    onChange={(e) => {setParentesco(e.target.value)}}
                    type="text" placeholder="Digite seu parentesco. Ex: Mãe" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
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
                        <label className="flex items-center gap-2 cursor-pointer">
                          <motion.input 
                          whileHover={{ scale: 1.04}}
                          whileTap={{ scale: 0.96}}
                          required
                          onChange={(e) => {if (e.target.checked) {setPessoaJuridica(false)}; }}
                          type="radio" name="personType" value="fisica" className="form-radio text-blue-500 cursor-pointer accent-yellow-400"/>
                          Pessoa Física
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <motion.input 
                          whileHover={{ scale: 1.04}}
                          whileTap={{ scale: 0.96}}
                          required
                          onChange={(e) => {setPessoaJuridica(e.target.checked)}}
                          type="radio" name="personType" value="juridica" className="form-radio text-blue-500 cursor-pointer accent-yellow-400"/>
                          Pessoa Jurídica
                        </label>
                      </div>

                      <motion.div 
                      initial={{scale:0}}
                      animate={{scale:1}}
                      exit={{scale:0}}
                      className="flex flex-col gap-2 w-full ">
                        
                        <CpfInput onChange={(value) => {setCPF(value)}} disabled={false}/>
                        
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
                        <NumeroRG onChange={(value) => {setRG(value)}} disabled={false}/>
                        
                      </motion.div>

                    </div>
                      
                  </motion.div>
                </div>

              </div>


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
          className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-10">Próximo</motion.button>
        </form>
      </div>
    </>

  );
}
