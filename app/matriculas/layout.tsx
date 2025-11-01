"use client";

import "../globals.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Dados, Matricula } from "@imports/components/ui/selectionboxes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [bar, setBar] = useState("");
  const id = pathname.split("/")[2];
  const [matricula, setMatricula] = useState(id);
  const [dado, setDado] = useState("");

  // ETAPAS --------------------------------------------------------------------------------------------------------
  const [enderecoResponsavel, setEnderecoResponsavel] = useState(false);
  const [dadosAluno, setDadosAluno] = useState(false);
  const [enderecoAluno, setEnderecoAluno] = useState(false);

  const [finalizado, setFinalizado] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState<string | undefined>("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setEnderecoResponsavel(false);
        setDadosAluno(false);
        setEnderecoAluno(false);
        setFinalizado(false);
        setEtapaAtual(undefined);

        const tok = await fetch("/api/token");
        const data = await tok.json();
        if (!data.token) return;
        const token = data.token;

        const detalheRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matriculas/${matricula}/detalhe`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());

        const idAtualRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matriculas/atual-id`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());

        const detalheResAtual = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/matriculas/${idAtualRes.matriculaId}/detalhe`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());

        if (detalheResAtual.completo) {
          setFinalizado(true);
        }

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

        const etapaPaginaAtual = etapas.find(
          (item) => item.label === detalheResAtual.etapaAtualLabel
        );
        const etapaAtualValor = etapas.find(
          (item) => item.label === detalheRes.etapaAtualLabel
        )?.value;

        setEtapaAtual(etapaPaginaAtual?.pagina);

        if (etapaAtualValor) {
          if (etapaAtualValor > 2) setEnderecoResponsavel(true);
          if (etapaAtualValor > 5) setDadosAluno(true);
        }

        if (detalheRes.completo) {
          setEnderecoResponsavel(true);
          setDadosAluno(true);
          setEnderecoAluno(true);
        }

        if (pathname.endsWith("/dados_do_responsavel")) setBar("1");
        else if (pathname.endsWith("/endereco_e_comunicacao_responsavel"))
          setBar("2");
        else if (pathname.endsWith("/dados_do_aluno")) setBar("3");
        else setBar("4");
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };
    fetchToken();
  }, [matricula, pathname]); // 🔹 removido id — usar apenas matrícula e pathname

  return (
    <>
      <div
        className={` text-white overflow-hidden max-h-[95%] max-w-[95%] w-[1350px] flex items-center min-h-[800px] h-fit pb-5 transition-all ease-in-out duration-300 rounded-[25px] bg-[rgba(12,12,14,0.985)] gap-4 z-20 flex-col shadow-2xl`}
      >
        <div className="w-full">
          <div className="px-2 xl:px-4 h-[60px] mx-auto flex justify-between items-center ">
            <div className="w-full overflow-x-auto overflow-y-hidden  gap-4 h-full items-center xl:flex hidden">
              <motion.a
                whileHover="hover"
                variants={{
                  hover: { scale: 1.02 },
                }}
                whileTap={{ scale: 0.98 }}
                className="hover:text-yellow-300 relative text-center "
                href={`/matriculas/${id}/dados_do_responsavel`}
              >
                Dados do Responsável
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: bar === "1" ? 1 : 0 }}
                  exit={{ scaleX: 0 }}
                  variants={{
                    hover: {
                      scaleX: 1,
                      boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                    },
                  }}
                  className={`w-full origin-center bg-yellow-400 h-[2px] absolute -bottom-2 `}
                ></motion.div>
              </motion.a>

              <motion.a
                whileHover="hover"
                variants={{
                  hover: { scale: 1.02 },
                }}
                whileTap={{ scale: 0.98 }}
                className={`hover:text-yellow-300 relative text-center ${
                  !enderecoResponsavel && "text-gray-500 pointer-events-none"
                } `}
                href={`/matriculas/${id}/endereco_e_comunicacao_responsavel`}
              >
                Endereço/Comunicação do Responsável
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: bar === "2" ? 1 : 0 }}
                  exit={{ scaleX: 0 }}
                  variants={{
                    hover: {
                      scaleX: 1,
                      boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                    },
                  }}
                  className=" w-full origin-center bg-yellow-400 h-[2px] absolute -bottom-2"
                ></motion.div>
              </motion.a>

              <motion.a
                whileHover="hover"
                variants={{
                  hover: { scale: 1.02 },
                }}
                whileTap={{ scale: 0.98 }}
                className={`hover:text-yellow-300 relative text-center ${
                  !dadosAluno && "text-gray-500 pointer-events-none"
                }`}
                href={`/matriculas/${id}/dados_do_aluno`}
              >
                Dados do Aluno
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: bar === "3" ? 1 : 0 }}
                  exit={{ scaleX: 0 }}
                  variants={{
                    hover: {
                      scaleX: 1,
                      boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                    },
                  }}
                  className=" w-full origin-center bg-yellow-400 h-[2px] absolute -bottom-2"
                ></motion.div>
              </motion.a>

              <motion.a
                whileHover="hover"
                variants={{
                  hover: { scale: 1.02 },
                }}
                whileTap={{ scale: 0.98 }}
                className={`hover:text-yellow-300 relative text-center ${
                  !enderecoAluno && "text-gray-500 pointer-events-none"
                }`}
                href={`/matriculas/${id}/endereco_e_comunicacao_aluno`}
              >
                Endereço/Comunicação do Aluno
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: bar === "4" ? 1 : 0 }}
                  exit={{ scaleX: 0 }}
                  variants={{
                    hover: {
                      scaleX: 1,
                      boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                    },
                  }}
                  className=" w-full origin-center bg-yellow-400 h-[2px] absolute -bottom-2"
                ></motion.div>
              </motion.a>
            </div>

            <div className="w-full xl:w-[30%] flex gap-2 sm:justify-end justify-normal overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth  pb-1">
              <Matricula
                value={matricula}
                onChange={(value) => {
                  setMatricula(value);
                  router.push(`/matriculas/${value}/dados_do_responsavel`);
                }}
              />

              <Dados
                value={dado}
                onChange={(value) => {
                  setDado(value);
                  router.push(`/matriculas/${id}/${value}`);
                }}
              />

              <motion.button
                whileHover={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (finalizado) {
                    router.push(`/matricula/dados_do_responsavel_financeiro`);
                  } else {
                    if (etapaAtual) {
                      router.push(`/matricula/${etapaAtual}`);
                    }
                  }
                }}
                className="cursor-pointer rounded-[15px] max-w-full w-fit text-nowrap px-2 text-[15px] bg-gradient-to-r from-yellow-500 to-yellow-400 text-lg text-black font-semibold "
              >
                Nova matrícula
              </motion.button>
            </div>
          </div>
          <hr className="w-full h-[1px] text-[#ffffff33]" />
        </div>
        <div className=" w-full flex justify-center h-full">
          <div
            className={`w-full flex flex-col items-center text-white max-w-[90%] h-full gap-10 `}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
