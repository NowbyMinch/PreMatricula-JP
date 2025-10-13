"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Celular, CEP, Numero, Responsavel } from "@imports/components/ui/selectionboxes";
import Account from "@imports/components/ui/account_icon";
import ErrorModal from "@imports/components/ui/ErrorModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [ pop, setPop] = useState(false);
  const [ responsavel, setResponsavel] = useState<string>("");
  const [ message, setMessage] = useState<string | null>(null);
  const [ cep, setCEP] = useState<string | null>(null);
  const [ rua, setRua] = useState<string | null>(null);
  const [ telefone, setTelefone] = useState<string | null>(null);
  const [ whatsApp, setWhatsApp] = useState<string | null>(null);
  const [ numero, setNumero] = useState<string | null>(null);
  const [ complemento, setComplemento] = useState<string | null>(null);
  const [ uf, setUF] = useState<string | null>(null);
  const [ cidade, setCidade] = useState<string | null>(null);
  const [ bairro, setBairro] = useState<string | null>(null);
  const [ celular, setCelular] = useState<string | null>(null);
  const [ email, setEmail] = useState<string | null>(null);

  // 🔹 Define se os campos devem ser desativados
  const [isDisabled, setIsDisabled] = useState(false);

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
    };
    fetchToken();
  },[])
  
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

      const AlunoID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/aluno-id`, {method: 'GET', headers: {'Content-Type': 'application/json', Authorization: `Bearer ${token}`, } });
      const Alunoid = await AlunoID.json();
      const alunoID = Alunoid.alunoId;
      const endereco = isDisabled
      ? {
          telefone,
          celular,
          email,
          whatsapp: whatsApp,
          moraComResponsavel: true,
          ...(responsavel ? { moraComResponsavelNome: responsavel } : {}),
        }
      : {
          telefone,
          celular,
          email,
          whatsapp: whatsApp,
          moraComResponsavel: false,
          cep,
          rua,
          numero,
          ...(complemento ? { complemento } : {}), // 👈 only include if not empty
          bairro,
          cidade,
          uf,
        };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cadastro/etapa-3b/${matriculaID}/${alunoID}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, },
        body: JSON.stringify(endereco),
      });
      const dataRes = await res.json();

      console.log(dataRes)
      console.log(matricula)

      if (dataRes?.error){
        if (dataRes?.error && Array.isArray(dataRes?.message) && dataRes?.message.length > 0) {

          // dataRes.error exists and is a non-empty array
          let errors = "";
          for (let i = 0; i < dataRes.message.length; i++) {
              errors += dataRes.message[i] + "\n";
          }

          setMessage(errors);
        } else if (dataRes?.error && dataRes?.message){
            setMessage(dataRes.message)
        }
        
        console.log("deu certo1")
      } 
      else if (dataRes?.message){
        if (dataRes.message === "Endereço do aluno (etapa 3B) concluído com sucesso."){
          router.push("/matricula/matricula_finalizada");
        }
      }
      
  };
  
  // 🔹 Classe de input com estilo condicional
  const inputClass = `w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 
    border-gray-400 max-w-[480px] 
    ${isDisabled ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed " 
    : "focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"}`;

  return (
    <>
      {message && (
          <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}
      {pop && <Account onClose={() => setPop(!pop)} />}

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setPop(!pop)}
        className="cursor-pointer bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] rounded-full w-16 h-16 absolute z-100 right-3 top-3 flex justify-center items-center"
      >
        <button className="cursor-pointer w-[36px] h-[36px]">
          <User className="cursor-pointer w-full h-full text-white stroke-1 hover:text-yellow-300 transition-all ease-in-out duration-300" />
        </button>
      </motion.div>

      <div className="max-h-[95%] max-w-[95%] w-[1150px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl">
        <form
          className="w-full flex flex-col items-center text-white max-w-[90%] h-full"
          onSubmit={handleSubmit}
        >
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-[35px] mx-auto mt-10 font-medium text-center"
          >
            Endereço/Comunicação do aluno
          </motion.h1>

          <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="mb-4">
            Preencha os campos com seu endereço e formas de comunicação do aluno
          </motion.p>

          <AnimatePresence>
            <div className="flex flex-col justify-between w-full gap-5">
              <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-[35px] origin-left">
                Endereço
              </motion.h1>

              {/* Linha 1 */}
              <div className="w-full max-w-full flex md:flex-row flex-col gap-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>C.E.P.</motion.label>
                  <CEP onChange={(value) => (setCEP(value))} disabled={isDisabled} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Rua/Avenida</motion.label>
                  <motion.input onChange={(e) => {setRua(e.target.value)}} disabled={isDisabled} required type="text" placeholder="Digite sua Rua/Avenida" className={inputClass} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>N°</motion.label>
                  <Numero onChange={(value) => (setNumero(value))} disabled={isDisabled} />
                  {/* <Numero disabled={isDisabled} /> */}
                </motion.div>
              </div>

              {/* Linha 2 */}
              <div className="w-full max-w-full flex gap-4 md:flex-row flex-col">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Complemento</motion.label>
                  <motion.input onChange={(e) => (setComplemento(e.target.value))} disabled={isDisabled} required type="text" placeholder="Digite um complemento" className={inputClass} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Cidade</motion.label>
                  <motion.input onChange={(e) => (setCidade(e.target.value))} disabled={isDisabled} required type="text" placeholder="Digite sua cidade" className={inputClass} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-[130px]">
                  <motion.label>UF</motion.label>
                  <motion.input onChange={(e) => (setUF(e.target.value))} disabled={isDisabled} maxLength={2} required type="text" className={`w-full rounded-[15px] py-3 border outline-none transition-all ease-in-out duration-300 
                  border-gray-400 max-w-[480px] 
                  ${isDisabled ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed " 
                  : "focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"} text-center`} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Bairro</motion.label>
                  <motion.input onChange={(e) => (setBairro(e.target.value))} disabled={isDisabled} required type="text" placeholder="Digite seu bairro" className={inputClass} />
                </motion.div>
              </div>

              {/* Comunicação */}
              <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-[35px] origin-left">
                Comunicação
              </motion.h1>

              <div className="w-full max-w-full flex gap-4 md:flex-row flex-col">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Telefone</motion.label>
                  <Celular onChange={(value) => (setTelefone(value))} disabled={false} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Celular</motion.label>
                  <Celular onChange={(value) => (setCelular(value))} disabled={false} />
                </motion.div>
              </div>

              <div className="w-full max-w-full flex gap-4 md:flex-row flex-col">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Email</motion.label>
                  <motion.input onChange={(e) => (setEmail(e.target.value))} disabled={false} required type="email" placeholder="Digite seu email" className={
                    "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"} />
                </motion.div>

                <div className="flex w-full gap-4 items-end">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                    <motion.label>Contato Whatsapp</motion.label>
                    <Celular onChange={(value) => {setWhatsApp(value)}} disabled={false} />
                  </motion.div>

                  <motion.button
                    disabled={isDisabled}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileHover={!isDisabled ? { scale: 1.01 } : {}}
                    whileTap={!isDisabled ? { scale: 0.99 } : {}}
                    type="button"
                    className={`border border-gray-400 px-4 h-[50px] rounded-[15px]  flex gap-2 justify-center items-center transition-all duration-300 cursor-pointer`}
                  >
                    <FaWhatsapp className="text-green-600 size-6" aria-hidden="true" /> WhatsApp
                  </motion.button>
                </div>
              </div>
{/* 
              <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="mt-2">
                Mora junto com algum dos seus responsáveis?
              </motion.p> */}

              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-[380px] max-w-full">
                <Responsavel disabled={(value) => setIsDisabled(value)} value={responsavel} onChange={(value) => setResponsavel(value)} />
              </motion.div>
            </div>
          </AnimatePresence>

          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            type="submit"
            className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-10"
          >
            Próximo
          </motion.button>
        </form>
      </div>
    </>
  );
}
