"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { User } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Celular, CEP, Numero, Responsavel } from "@imports/components/ui/selectionboxes";
import Account from "@imports/components/ui/account_icon";

export default function Home() {
  const [pop, setPop] = useState(false);
  const [responsavel, setResponsavel] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 🔹 Define se os campos devem ser desativados
  const [isDisabled, setIsDisabled] = useState(false);

  
  // 🔹 Classe de input com estilo condicional
  const inputClass = `w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 
    border-gray-400 max-w-[480px] 
    ${isDisabled ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed " 
    : "focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"}`;

  return (
    <>
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
                  <CEP disabled={isDisabled} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Rua/Avenida</motion.label>
                  <motion.input disabled={isDisabled} required type="text" placeholder="Digite sua Rua/Avenida" className={inputClass} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>N°</motion.label>
                  <Numero disabled={isDisabled} />
                  {/* <Numero disabled={isDisabled} /> */}
                </motion.div>
              </div>

              {/* Linha 2 */}
              <div className="w-full max-w-full flex gap-4 md:flex-row flex-col">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Complemento</motion.label>
                  <motion.input disabled={isDisabled} required type="text" placeholder="Digite um complemento" className={inputClass} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Cidade</motion.label>
                  <motion.input disabled={isDisabled} required type="text" placeholder="Digite sua cidade" className={inputClass} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-[130px]">
                  <motion.label>UF</motion.label>
                  <motion.input disabled={isDisabled} required type="text" className={`${inputClass} text-center`} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Bairro</motion.label>
                  <motion.input disabled={isDisabled} required type="text" placeholder="Digite seu bairro" className={inputClass} />
                </motion.div>
              </div>

              {/* Comunicação */}
              <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-[35px] origin-left">
                Comunicação
              </motion.h1>

              <div className="w-full max-w-full flex gap-4 md:flex-row flex-col">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Telefone</motion.label>
                  <Celular disabled={false} />
                </motion.div>

                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Celular</motion.label>
                  <Celular disabled={false} />
                </motion.div>
              </div>

              <div className="w-full max-w-full flex gap-4 md:flex-row flex-col">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                  <motion.label>Email</motion.label>
                  <motion.input disabled={false} required type="email" placeholder="Digite seu email" className={
                    "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"} />
                </motion.div>

                <div className="flex w-full gap-4 items-end">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex flex-col gap-2 w-full">
                    <motion.label>Contato Whatsapp</motion.label>
                    <Celular disabled={false} />
                  </motion.div>

                  <motion.button
                    disabled={isDisabled}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileHover={!isDisabled ? { scale: 1.01 } : {}}
                    whileTap={!isDisabled ? { scale: 0.99 } : {}}
                    type="button"
                    className={`${isDisabled ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed": "border border-gray-400 " } px-4 h-[50px] rounded-[15px]  flex gap-2 justify-center items-center transition-all duration-300 cursor-pointer`}
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
