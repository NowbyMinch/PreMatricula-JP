"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Civil, CpfInput, Genero, NumeroRG } from "@imports/components/ui/selectionboxes";
import DatePicker from "@imports/components/ui/datepicker";
import Account from "@imports/components/ui/account_icon";
import ErrorModal from "@imports/components/ui/ErrorModal";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1} 
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
  const router = useRouter();
  const [ pop, setPop ] = useState(false);
  
  const [ nome, setNome ] = useState("");
  const [ genero, setGenero ] = useState("");
  const [ dataNascimento, setData ] = useState<string>("");
  const [ orgaoExpeditor, setOrgaoExpeditor ] = useState<string>("");
  const [ dataExpedicao, setDataExpedicao ] = useState<string>("");
  const [ estado_civil, setEstado_civil ] = useState<string>("");
  const [ rg, setRG ] = useState<string>("");
  const [ cpf, setCPF ] = useState<string>("");
  const [ pessoaJuridica, setPessoaJuridica ] = useState(false);
  const [ parentesco, setParentesco ] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  
  const [matriculaID, setMatriculaID] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    
    const tok = await fetch('/api/token');
    const data = await tok.json();
    if (!data.token) {return;}
    const token = data.token;
    const Matricula = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
    const matricula = await Matricula.json();
    const matriculaID = matricula.id;

    const dadosResponsavelDois = {
      nome: nome,
      genero: genero,
      dataNascimento: dataNascimento,
      orgaoExpeditor: orgaoExpeditor,
      dataExpedicao: dataExpedicao,
      estadoCivil: estado_civil,
      rg: rg,
      cpf: cpf,
      pessoaJuridica: pessoaJuridica,
      parentesco: parentesco
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cadastro/etapa-1b/${matriculaID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
    body: JSON.stringify(dadosResponsavelDois),
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
    } else if (dataRes?.message){
        if (dataRes.message === "Etapa 1B (segundo responsável) concluída com sucesso."){
            router.push("/matricula/endereco_e_comunicacao_responsavel")
        }
    }
  };
  
  return (
    <>
      {message && (
          <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      {pop && (
        <>
          <Account onClose={() => setPop(!pop)} /> 
        </>
      )}

      <motion.div 
      whileHover={{scale:1.02}}
      whileTap={{scale:0.98}}
      onClick={() => setPop(!pop)} className="cursor-pointer bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] rounded-full w-16 h-16 absolute z-100 right-3 top-3 flex justify-center items-center ">

        <button className="cursor-pointer w-[36px] h-[36px]">
          <User className="cursor-pointer w-full h-full text-white stroke-1 hover:text-yellow-300 transition-all ease-in-out duration-300" />
        </button>

      </motion.div>

      <div className={`  max-h-[95%] max-w-[95%] w-[1150px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}>
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
          className="text-[35px] mx-auto mt-10 font-medium text-center">Dados do segundo responsável </motion.h1>

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
                
                <div className="flex gap-5 w-[66%]">

                  <motion.div 
                  initial={{scale:0}}
                  animate={{scale:1}}
                  exit={{scale:0}}
                  className="flex flex-col gap-2 w-full ">
                    <motion.label 
                    htmlFor="" 
                    className="origin-left">Estado Civil</motion.label>
                    <Civil value={estado_civil} onChange={(val) => {setEstado_civil(val)}} />
                  </motion.div>


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
                  

                </div>

              </div>

              <div className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}>
                
                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 ">
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
                      <motion.label 
                      htmlFor="" 
                      className="origin-left">CPF</motion.label>
                      <CpfInput onChange={(value) => {setCPF(value)}} disabled={false}/>
                      
                    </motion.div>

                  </div>
              </motion.div>

                <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                className="flex flex-col gap-2 min-w-[66%] ">
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

                    <motion.div 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className="flex flex-col gap-2 w-full ">
                      <motion.label 
                      htmlFor="" 
                      className="origin-left">Órgão Exp.</motion.label>
                      <motion.input
                      required
                      onChange={(e) => {setOrgaoExpeditor(e.target.value)}}
                      type="text" placeholder="Digite o órgão expedidor" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/>
                      
                    </motion.div>

                    <motion.div 
                    initial={{scale:0}}
                    animate={{scale:1}}
                    exit={{scale:0}}
                    className="flex flex-col gap-2 w-full ">
                      <motion.label 
                      htmlFor="" 
                      className="origin-left">Data de Exp.</motion.label>
                      <DatePicker onChange={(val) => {setDataExpedicao(val)}} />
                      
                    </motion.div>

                  </div>
                  
                </motion.div>
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
