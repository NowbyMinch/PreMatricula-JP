"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CpfInput,
  Genero,
  Localidade,
} from "@imports/components/ui/selectionboxes";
import { DatePicker } from "@imports/components/ui/datepicker";
import ErrorModal from "@imports/components/ui/ErrorModal";
// <span className="absolute top-20 right-5 text-white text-7xl md:text-[130px] font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
//   {new Date().getFullYear() + 1}
//   {/* Example: will show 2026 automatically if current year is 2025 */}
// </span>

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");
  const [cidadeNatal, setCidadeNatal] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [segundoResponsavel, setSegundoResponsavel] = useState<
    boolean | undefined
  >(undefined);
  const [existe, setExiste] = useState<boolean>(false);

  const [nacionalidade, setNacionalidade] = useState("brasileiro(a)"); //FALTA DUDA COLOCAR NO BACKEND ----------------------------------------------------------

  useEffect(() => {
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
          console.log(preset.completo);
          // setBack(true);
          setNome(preset.responsavelPrincipal.nome);
          setGenero(preset.responsavelPrincipal.genero);
          setCPF(preset.responsavelPrincipal.cpf);
          setCidadeNatal(preset.aluno.cidadeNatal);
        }
        if (dataRes?.message === "Unauthorized") {
          setMessage("Erro na matricula. Por favor, logue novamente.");
        }
        console.log(dataRes);
      };
      fetchToken();
    } catch {}
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
      console.log(dataRes, "RECENTE AQUI <-");
      setSegundoResponsavel(dataRes.temSegundoResponsavel);

      if (dataRes?.message === "Unauthorized") {
        setMessage("Erro na matricula. Por favor, logue novamente.");
      }
    };
    fetchToken();
  }, [pathname]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    if (existe) {
      const tok = await fetch("/api/token", { credentials: "include" });
      const data = await tok.json();
      console.log(data.token);
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

      const dadosAluno = {
        nome: nome,
        genero: genero,
        dataNascimento: dataNascimento,
        cidadeNatal: cidadeNatal,
        nacionalidade: nacionalidade,
        cpf: cpf,
      };

      console.log(matriculaID);
      console.log(dadosAluno);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cadastro/etapa-3/${matriculaID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dadosAluno),
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
          console.log("hahahaha 1");

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
        if (
          dataRes.message ===
          "Dados do aluno registrados (etapa 3). Endereço do aluno pendente (etapa 3B)."
        ) {
          router.push("/matricula/endereco_e_comunicacao_aluno");
        }
      }
    }
  };

  const [message, setMessage] = useState<string | null>(null);

  return (
    <>
      {message && (
        <ErrorModal message={message} onClose={() => setMessage(null)} />
      )}

      <div
        className={`  max-h-[95%] max-w-[95%] w-[1150px] transition-all ease-in-out duration-300 rounded-[25px] flex justify-center items-center bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}
      >
        <form
          className={`w-full flex flex-col items-center text-white max-w-[90%] h-full `}
          onSubmit={handleSubmit}
        >
          {/* <motion.img 
          initial={{scale:0}}
          animate={{scale:1}}
          exit={{scale:0}}
          src="seice.png" alt="Seice Logo" className="w-[50%] h-auto mt-10"/> */}

          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-[35px] mx-auto mt-10 font-medium text-center"
          >
            Dados do aluno
          </motion.h1>

          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="mb-4 "
          >
            Insira os dados do aluno
          </motion.p>

          <AnimatePresence>
            <div className="flex flex-col justify-between w-full gap-5">
              <div
                className={` w-full max-w-full flex md:flex-row flex-col gap-4`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex flex-col gap-2 w-full "
                >
                  <motion.label htmlFor="" className="origin-left">
                    Nome
                  </motion.label>
                  <motion.input
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    type="text"
                    placeholder="Digite seu nome"
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
                    Gênero
                  </motion.label>
                  <Genero
                    value={genero}
                    onChange={(value) => {
                      setGenero(value);
                    }}
                  />
                  {/* <motion.input
                  required
                  
                  type="text" placeholder="Digite seu email" className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}/> */}
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex flex-col gap-2 w-full  "
                >
                  <motion.label htmlFor="" className="origin-left">
                    Data de Nascimento
                  </motion.label>
                  <DatePicker
                    onChange={(val) => {
                      setDataNascimento(val);
                    }}
                  />
                </motion.div>
              </div>

              <div
                className={` w-full max-w-full flex md:flex-row flex-col gap-4`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex flex-col gap-2 w-full "
                >
                  <motion.label htmlFor="" className="origin-left">
                    Cidade Natal
                  </motion.label>
                  <Localidade
                    onChange={(value, exists) => {
                      console.log(
                        "Cidade:",
                        setCidadeNatal(value),
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
                    Nacionalidade
                  </motion.label>
                  <motion.input
                    required
                    value={nacionalidade ? nacionalidade : "Brasileiro(a)"}
                    onChange={(e) => setNacionalidade(e.target.value)}
                    type="text"
                    placeholder="Digite sua nacionalidade"
                    className={` w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] `}
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex flex-col gap-2 w-full"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex flex-col gap-2 w-full "
                  >
                    <motion.label htmlFor="" className="origin-left">
                      CPF
                    </motion.label>
                    <CpfInput
                      value={cpf}
                      onChange={(value) => {
                        setCPF(value);
                      }}
                      disabled={false}
                    />
                  </motion.div>
                </motion.div>
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
              onClick={() => {
                if (segundoResponsavel) {
                  router.push("/matricula/endereco_e_comunicacao_responsavel");
                } else {
                  router.push(
                    "/matricula/endereco_e_comunicacao_responsavel_financeiro"
                  );
                }
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
        </form>
      </div>
    </>
  );
}
