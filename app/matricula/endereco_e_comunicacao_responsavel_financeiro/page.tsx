"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Celular,
  CEP,
  Localidade,
  Numero,
} from "@imports/components/ui/selectionboxes";
import ErrorModal from "@imports/components/ui/ErrorModal";
import { Loading } from "@imports/components/ui/loading";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1}
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  const [existe, setExiste] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [segundoResponsavel, setSegundoResponsavel] = useState(true);
  const [cep, setCEP] = useState<string>("");
  const [rua, setRua] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    try {
      const fetchToken = async () => {
        const tok = await fetch("/api/token");
        const data = await tok.json();
        if (!data.token) {
          return;
        }
        const token = data.token;
        console.log(token);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const dataRes = await res.json();

        const idAtualRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matriculas/atual-id`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const IDpreset = await idAtualRes.json();

        const PresetFetch = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matriculas/${IDpreset.matriculaId}/detalhe`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const preset = await PresetFetch.json();
        console.log(preset);

        const etapas = [
          { value: 1, label: "1", pagina: "dados_do_responsavel_financeiro" },
          {
            value: 2,
            label: "2",
            pagina: "endereco_e_comunicacao_responsavel_financeiro",
          },
          { value: 3, label: "1b", pagina: "dados_do_responsavel" },
          {
            value: 4,
            label: "2b",
            pagina: "endereco_e_comunicacao_responsavel",
          },
          { value: 5, label: "3", pagina: "dados_do_aluno" },
          { value: 6, label: "3b", pagina: "endereco_e_comunicacao_aluno" },
        ];

        const AtualValor = etapas.filter(
          (item) =>
            item.pagina === pathname.split("/")[pathname.split("/").length - 1]
        )[0].value;
        const PresetValor = etapas.filter(
          (item) => item.label === preset.etapaAtualLabel
        )[0].value;

        if (!preset.completo && PresetValor > AtualValor) {
          setSegundoResponsavel(preset.temSegundoResponsavel);
          setCEP(preset.responsavelPrincipal.endereco.cep);
          setRua(preset.responsavelPrincipal.endereco.rua);
          setNumero(preset.responsavelPrincipal.endereco.numero);
          setCidade(preset.responsavelPrincipal.endereco.cidade);
          setBairro(preset.responsavelPrincipal.endereco.bairro);
          setComplemento(preset.responsavelPrincipal.endereco.complemento);
          setCelular(preset.responsavelPrincipal.celular);
          setEmail(preset.responsavelPrincipal.email);
        }

        if (dataRes?.message === "Unauthorized") {
          setMessage("Erro na matricula. Por favor, logue novamente.");
        }
        console.log(dataRes);
      };
      fetchToken();
    } catch {
    } finally {
      setLoading(false);
    }
  }, [pathname]);

  useEffect(() => {
    const fetchToken = async () => {
      const tok = await fetch("/api/token");
      const data = await tok.json();
      if (!data.token) {
        return;
      }
      const token = data.token;
      console.log(token);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataRes = await res.json();
      if (dataRes?.message === "Unauthorized") {
        setMessage("Erro na matricula. Por favor, logue novamente.");
      }
      console.log(dataRes);
    };
    fetchToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    if (existe) {
      const tok = await fetch("/api/token", { credentials: "include" });
      const data = await tok.json();
      if (!data.token) return;
      const token = data.token;
      const Matricula = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matriculas/recente`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const matricula = await Matricula.json();
      if (matricula?.message === "Unauthorized") {
        setMessage("Erro na matricula. Por favor, logue novamente.");
        return;
      }

      const matriculaID = matricula.id;

      const endereco = {
        cep: cep,
        rua: rua,
        numero: numero,
        cidade: cidade,
        bairro: bairro,
        celular: celular,
        email: email,
        complemento: complemento,
        temSegundoResponsavel: segundoResponsavel,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cadastro/etapa-2/${matriculaID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(endereco),
        }
      );

      const dataRes = await res.json();
      console.log(dataRes);

      if (dataRes?.error) {
        if (
          dataRes?.error &&
          Array.isArray(dataRes?.message) &&
          dataRes?.message.length > 0
        ) {
          // dataRes.error exists and is a non-empty array
          let errors = "";
          for (let i = 0; i < dataRes.message.length; i++) {
            errors += dataRes.message[i] + "\n";
          }

          setMessage(errors);
        } else if (dataRes?.error && dataRes?.message) {
          setMessage(dataRes.message);
        }
      } else if (dataRes?.message) {
        if (dataRes.message === "Etapa 2 concluída com sucesso.") {
          if (segundoResponsavel) {
            router.push("/matricula/dados_do_responsavel");
          } else {
            router.push("/matricula/dados_do_aluno");
          }
        }
      }
    } else {
      setMessage("Cidade inválida");
    }
  };

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      <div
        className={`  max-h-[95%] max-w-[95%] w-[1150px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}
      >
        <form
          className={`w-full flex flex-col items-center text-white max-w-[90%] h-full min-h-[732px] `}
          onSubmit={handleSubmit}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-[35px] mx-auto mt-10 font-medium text-center"
              >
                Endereço/Comunicação do Responsável Financeiro
              </motion.h1>

              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="mb-4 "
              >
                Preencha os campos com seu endereço e formas de comunicação do
                responsável
              </motion.p>

              <AnimatePresence>
                <div className="flex flex-col justify-between w-full gap-5">
                  <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-[35px] origin-left"
                  >
                    Endereço
                  </motion.h1>

                  <div
                    className={` w-full max-w-full flex md:flex-row flex-col gap-4`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col gap-2 w-full"
                    >
                      <motion.label htmlFor="" className="origin-left">
                        C.E.P.
                      </motion.label>
                      <CEP
                        value={cep}
                        onChange={(value) => setCEP(value)}
                        disabled={false}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col gap-2 w-full "
                    >
                      <motion.label htmlFor="" className="origin-left">
                        Rua/Avenida
                      </motion.label>
                      <motion.input
                        required
                        value={rua}
                        onChange={(e) => setRua(e.target.value)}
                        type="text"
                        placeholder="Digite sua Rua/Avenida"
                        className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col gap-2 w-full "
                    >
                      <motion.label htmlFor="" className="origin-left">
                        N°
                      </motion.label>
                      <Numero
                        value={numero}
                        onChange={(value) => setNumero(value)}
                        disabled={false}
                      />
                    </motion.div>
                  </div>

                  <div
                    className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col gap-2 w-full "
                    >
                      <motion.label htmlFor="" className="origin-left">
                        Cidade
                      </motion.label>
                      <Localidade
                        onChange={(value, exists) => {
                          console.log(
                            "Cidade:",
                            setCidade(value),
                            "Existe?",
                            setExiste(exists)
                          );
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col gap-2 w-full "
                    >
                      <motion.label htmlFor="" className="origin-left">
                        Bairro
                      </motion.label>
                      <motion.input
                        required
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        type="text"
                        placeholder="Digite seu bairro"
                        className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col gap-2 w-full "
                    >
                      <motion.label htmlFor="" className="origin-left">
                        Complemento
                      </motion.label>
                      <motion.input
                        required
                        value={complemento ? complemento : ""}
                        onChange={(e) => setComplemento(e.target.value)}
                        type="text"
                        placeholder="Digite o complemento"
                        className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]`}
                      />
                    </motion.div>
                  </div>

                  <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-[35px] origin-left"
                  >
                    Comunicação
                  </motion.h1>

                  <div
                    className={` w-full max-w-full flex gap-4 md:flex-row flex-col`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col gap-2 w-full "
                    >
                      <motion.label htmlFor="" className="origin-left">
                        Celular
                      </motion.label>
                      <Celular
                        value={celular}
                        onChange={(value) => setCelular(value)}
                        disabled={false}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex flex-col gap-2 w-full "
                    >
                      <motion.label htmlFor="" className="origin-left">
                        Email
                      </motion.label>
                      <motion.input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Digite seu email"
                        className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}
                      />
                    </motion.div>
                  </div>

                  <motion.label
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex items-center cursor-pointer mx-auto"
                  >
                    {/* Hidden native checkbox */}
                    <input
                      onChange={() => {
                        setSegundoResponsavel(!segundoResponsavel);
                        console.log(segundoResponsavel);
                      }}
                      checked={!segundoResponsavel}
                      type="checkbox"
                      className="sr-only peer"
                    />

                    {/* Custom checkbox */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-yellow-400 peer-checked:border-yellow-400"
                    >
                      {/* Checkmark */}
                      <svg
                        className="w-3 h-3 text-white hidden peer-checked:block"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>

                    {/* Label text */}
                    <span className="ml-2 select-none">
                      Não tenho um segundo responsável
                    </span>
                  </motion.label>
                </div>
              </AnimatePresence>

              <div className="flex flex-1 gap-4 max-w-full justify-center items-center">
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  type="button"
                  onClick={() => {
                    router.push("/matricula/dados_do_responsavel_financeiro");
                  }}
                  className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-10"
                >
                  Voltar
                </motion.button>

                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  type="submit"
                  className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-10"
                >
                  Próximo
                </motion.button>
              </div>
            </>
          )}
          {/* <motion.img 
                initial={{scale:0}}
                animate={{scale:1}}
                exit={{scale:0}}
                src="seice.png" alt="Seice Logo" className="w-[50%] h-auto mt-10"/> */}
        </form>
      </div>
    </>
  );
}
