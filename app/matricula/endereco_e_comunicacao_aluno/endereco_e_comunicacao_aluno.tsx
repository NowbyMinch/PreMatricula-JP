"use client";

export const dynamic = "force-dynamic";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CelularNotRequired,
  CEP,
  Localidade,
  Numero,
  Responsavel,
} from "@imports/components/ui/selectionboxes";
import ErrorModal from "@imports/components/ui/ErrorModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loading } from "@imports/components/ui/loading";

export default function EnderecoComunicacaoAluno() {
  const router = useRouter();
  const pathname = usePathname();
  const [responsavel, setResponsavel] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [cep, setCEP] = useState<string>("");
  const [rua, setRua] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [uf, setUF] = useState<string>("");
  const [existe, setExiste] = useState(false);
  const [cidade, setCidade] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [celular, setCelular] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [moraComResponsavel, setMoraComResponsavel] = useState(false);

  const params = useSearchParams();
  const [step, setStep] = useState(Number(params.get("step")) || 1);
  useEffect(() => {
    router.replace(`/matricula/endereco_e_comunicacao_aluno?step=${step}`);
  }, [step, router]);

  // 🔹 Define se os campos devem ser desativados
  const [isDisabled, setIsDisabled] = useState(false);
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
          setCEP(preset.aluno.cep);
          setRua(preset.aluno.rua);
          setNumero(preset.aluno.numero);
          setComplemento(preset.aluno.complemento);
          setCidade(preset.aluno.cidade);
          setUF(preset.aluno.uf);
          setBairro(preset.aluno.bairro);
          setTelefone(preset.aluno.telefone);
          setCelular(preset.aluno.celular);
          setEmail(preset.aluno.email);
          setMoraComResponsavel(preset.aluno.moraComResponsavel);
          setResponsavel(
            preset.aluno.moraComResponsavelNome
              ? preset.aluno.moraComResponsavelNome
              : ""
          );
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
    console.log(moraComResponsavel, "MoraComResponsavel");
  }, [moraComResponsavel, pathname]);

  useEffect(() => {
    setIsDisabled(false);
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
    };
    fetchToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload

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

    const AlunoID = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/matriculas/aluno-id`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const Alunoid = await AlunoID.json();
    const alunoID = Alunoid.alunoId;
    const endereco = isDisabled
      ? {
          telefone,
          celular,
          email,
          moraComResponsavel: true,
          ...(responsavel ? { moraComResponsavelNome: responsavel } : {}),
        }
      : {
          telefone,
          celular,
          email,
          moraComResponsavel,
          cep,
          rua,
          numero,
          ...(complemento ? { complemento } : {}), // 👈 only include if not empty
          bairro,
          cidade,
          uf,
        };
    console.log(endereco, "Endereço");

    if (!isDisabled) {
      if (!existe) {
        setMessage("Cidade inválida");
        return;
      }
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cadastro/etapa-3b/${matriculaID}/${alunoID}`,
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
        return;
      } else if (dataRes?.error && dataRes?.message) {
        setMessage(dataRes.message);
        return;
      }

      console.log("deu certo1");
    }

    const Atual = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/matriculas/atual-id`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const AtualDado = await Atual.json();

    const Sponte = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cadastro/integrar-sponte/${AtualDado.matriculaId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(endereco),
      }
    );
    const IntegrarSponte = await Sponte.json();
    console.log(IntegrarSponte, "Sponte aqui");

    if (IntegrarSponte?.erro) {
      if (
        IntegrarSponte?.detalhe &&
        Array.isArray(IntegrarSponte?.detalhe) &&
        IntegrarSponte?.detalhe.length > 0
      ) {
        // IntegrarSponte.error exists and is a non-empty array
        let errors = "";
        for (let i = 0; i < IntegrarSponte.detalhe.length; i++) {
          errors += IntegrarSponte.detalhe[i] + "\n";
        }

        setMessage(errors);
      } else if (IntegrarSponte?.erro && IntegrarSponte?.detalhe) {
        setMessage(IntegrarSponte.detalhe);
      }

      console.log("deu certo1");
    } else if (IntegrarSponte?.detalhe) {
      if (IntegrarSponte.detalhe === "Operação Realizada com Sucesso.") {
        router.push(`/matriculas/${matriculaID}/dados_do_responsavel`);
      }
    }
  };

  // 🔹 Classe de input com estilo condicional
  const inputClass = `w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 
    border-gray-400 max-w-[480px] 
    ${
      isDisabled
        ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed "
        : "focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"
    }`;

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      <div
        className={` ${
          step === 2 ? "min-h-[270px] w-[600px] px-5 " : "w-[1150px] "
        } max-h-[95%] max-w-[95%] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl overflow-hidden`}
      >
        <form
          className={`w-full flex flex-col items-center gap-4 text-white max-w-[90%] h-full `}
          onSubmit={handleSubmit}
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              {step === 2 ? (
                <>
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`text-center text-[20px] mb-6 min-h-fit`}
                  >
                    Deseja mesmo terminar a matrícula? Nem todos os dados
                    poderão ser alterados após a conclusão
                  </motion.p>
                  <div className="flex w-full gap-5 justify-center max-w-full min-h-fit">
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      type={`button`}
                      onClick={() => {
                        setStep(1);
                      }}
                      className="cursor-pointer rounded-[15px] max-w-full w-[165px] py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold "
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
                      type="submit"
                      className="cursor-pointer rounded-[15px] w-[165px] max-w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold "
                    >
                      Próximo
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <motion.h1
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="text-[35px] mx-auto mt-10 font-medium text-center break-all"
                  >
                    Endereço/Comunicação do aluno
                  </motion.h1>

                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="mb-4 text-center"
                  >
                    Preencha os campos com seu endereço e formas de comunicação
                    do aluno
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

                      {/* Linha 1 */}
                      <div className="w-full max-w-full flex md:flex-row flex-col gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label>C.E.P.</motion.label>
                          <CEP
                            value={cep}
                            onChange={(value) => setCEP(value)}
                            disabled={isDisabled}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label>Rua/Avenida</motion.label>
                          <motion.input
                            value={rua}
                            onChange={(e) => {
                              setRua(e.target.value);
                            }}
                            disabled={isDisabled}
                            required
                            type="text"
                            placeholder="Digite sua Rua/Avenida"
                            className={inputClass}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label>N°</motion.label>
                          <Numero
                            value={numero}
                            onChange={(value) => setNumero(value)}
                            disabled={isDisabled}
                          />
                          {/* <Numero disabled={isDisabled} /> */}
                        </motion.div>
                      </div>

                      {/* Linha 2 */}
                      <div className="w-full max-w-full flex gap-4 md:flex-row flex-col">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label>Complemento</motion.label>
                          <motion.input
                            onChange={(e) => setComplemento(e.target.value)}
                            value={complemento ? complemento : ""}
                            disabled={isDisabled}
                            required
                            type="text"
                            placeholder="Digite um complemento"
                            className={inputClass}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label>Cidade</motion.label>
                          <Localidade
                            disabled={isDisabled}
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
                          className="flex flex-col gap-2 min-w-[45px] w-min "
                        >
                          <motion.label>UF</motion.label>
                          <motion.input
                            onChange={(e) => setUF(e.target.value)}
                            disabled={isDisabled}
                            value={uf ? uf : ""}
                            maxLength={2}
                            required
                            type="text"
                            className={`w-full rounded-[15px] py-3 border outline-none transition-all ease-in-out duration-300 
                  border-gray-400 max-w-[480px] 
                  ${
                    isDisabled
                      ? "bg-gray-700 opacity-[0.15] text-gray-400 cursor-not-allowed "
                      : "focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"
                  } text-center`}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label>Bairro</motion.label>
                          <motion.input
                            onChange={(e) => setBairro(e.target.value)}
                            disabled={isDisabled}
                            value={bairro}
                            required
                            type="text"
                            placeholder="Digite seu bairro"
                            className={inputClass}
                          />
                        </motion.div>
                      </div>

                      {/* Comunicação */}
                      <motion.h1
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-[35px] origin-left"
                      >
                        Comunicação
                      </motion.h1>

                      <div className="w-full max-w-full flex gap-4 md:flex-row flex-col">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label>Telefone (opcional)</motion.label>
                          <CelularNotRequired
                            value={telefone}
                            onChange={(value) => setTelefone(value)}
                            disabled={false}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label>Celular (opcional)</motion.label>
                          <CelularNotRequired
                            value={celular}
                            onChange={(value) => setCelular(value)}
                            disabled={false}
                          />
                        </motion.div>
                      </div>

                      <div className="w-full max-w-full flex gap-4 md:flex-row flex-col">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label>Email (opcional)</motion.label>
                          <motion.input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={false}
                            type="email"
                            placeholder="Digite seu email"
                            className={
                              "w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] bg-transparent text-white"
                            }
                          />
                        </motion.div>

                        <div className="flex w-full gap-4 items-end">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="flex flex-col gap-2 w-full max-w-full "
                          >
                            <Responsavel
                              checked={moraComResponsavel}
                              enabled={setIsDisabled}
                              value={responsavel ?? ""}
                              onChange={(value) => {
                                setResponsavel(value);
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
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
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/matricula/dados_do_aluno");
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
                      onClick={(e) => {
                        e.preventDefault();
                        setStep(2);
                      }}
                      type="button"
                      className="cursor-pointer rounded-[15px] w-fit max-w-full px-14 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold my-10"
                    >
                      Próximo
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </form>
      </div>
    </>
  );
}
