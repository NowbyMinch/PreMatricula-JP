"use client";

import { Loading } from "@imports/components/ui/loading";
import { CelularVariation } from "@imports/components/ui/selectionboxes";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type Endereco = {
  cep: string;
  rua: string;
  numero: string;
  cidade: string;
  bairro: string;
};

type Responsavel = {
  endereco: Endereco;
  celular: string;
  email: string;
};

type Dados = {
  responsaveis: Responsavel[];
};

type responsavelUpdate = {
  nResponsavelID: number;
  sNome: string;
  dDataNascimento: string;
  nParentesco: number;
  sCEP: string;
  sEndereco: string;
  nNumeroEndereco: string;
  sRG: string;
  sCPFCNPJ: string;
  sCidade: string;
  sBairro: string;
  sEmail: string;
  sTelefone: string;
  sCelular: string;
  nAlunoID: number;
  lResponsavelFinanceiro: boolean;
  lResponsavelDidatico: boolean;
  sObservacao: string;
  sSexo: string;
  sProfissao: string;
  nTipoPessoa: number;
  sComplementoEndereco: string;
};

export default function Home() {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [dados, setDados] = useState<Dados | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const tok = await fetch("/api/token");
      const data = await tok.json();
      if (!data.token) return;
      const token = data.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matriculas/${id}/detalhe`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const dataRes = await res.json();

      console.log(dataRes);
      setDados(dataRes);
      setLoading(false);
    };
    fetchToken();
  }, [id]);

  const [update, setUpdate] = useState<responsavelUpdate>(
    {} as responsavelUpdate
  );
  const [update2, setUpdate2] = useState<responsavelUpdate>(
    {} as responsavelUpdate
  );

  useEffect(() => {
    setUpdate((prev) => ({
      ...prev,
      sCEP: dados ? dados?.responsaveis[0]?.endereco.cep : "",
    }));
    setUpdate((prev) => ({
      ...prev,
      sEndereco: dados ? dados?.responsaveis[0]?.endereco.rua : "",
    }));
    setUpdate((prev) => ({
      ...prev,
      nNumeroEndereco: dados ? dados?.responsaveis[0]?.endereco.numero : "",
    }));
    setUpdate((prev) => ({
      ...prev,
      sCidade: dados ? dados?.responsaveis[0]?.endereco.cidade : "",
    }));
    setUpdate((prev) => ({
      ...prev,
      sBairro: dados ? dados?.responsaveis[0]?.endereco.bairro : "",
    }));
    // setUpdate(prev => ({...prev, sComplementoEndereco: dados ? dados?.responsaveis[0]?.endereco.complemento : "" }));
    setUpdate((prev) => ({
      ...prev,
      sCelular: dados ? dados?.responsaveis[0]?.celular : "",
    }));
    setUpdate((prev) => ({
      ...prev,
      sEmail: dados ? dados?.responsaveis[0]?.email : "",
    }));

    setUpdate2((prev) => ({
      ...prev,
      sCEP: dados ? dados?.responsaveis[1]?.endereco.cep : "",
    }));
    setUpdate2((prev) => ({
      ...prev,
      sEndereco: dados ? dados?.responsaveis[1]?.endereco.rua : "",
    }));
    setUpdate2((prev) => ({
      ...prev,
      nNumeroEndereco: dados ? dados?.responsaveis[1]?.endereco.numero : "",
    }));
    setUpdate2((prev) => ({
      ...prev,
      sCidade: dados ? dados?.responsaveis[1]?.endereco.cidade : "",
    }));
    setUpdate2((prev) => ({
      ...prev,
      sBairro: dados ? dados?.responsaveis[1]?.endereco.bairro : "",
    }));
    // setUpdate2(prev => ({...prev, sComplementoEndereco: dados ? dados?.responsaveis[1]?.endereco.complemento : "" }));
    setUpdate2((prev) => ({
      ...prev,
      sCelular: dados ? dados?.responsaveis[1]?.celular : "",
    }));
    setUpdate2((prev) => ({
      ...prev,
      sEmail: dados ? dados?.responsaveis[1]?.email : "",
    }));
  }, [dados]);

  useEffect(() => {
    console.log(update, "update");
    console.log(update2, "update2");
  }, [update, update2]);

  if (loading)
    return (
      <div className="h-[703px]">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="flex flex-col mt-5 gap-16 pb-10 w-full">
        <AnimatePresence>
          {/* Responsável Financeiro */}
          <div key={0} className="flex flex-col justify-between w-full gap-5">
            {dados?.responsaveis.map((responsavel, index) => {
              return (
                <React.Fragment key={index}>
                  {responsavel.endereco.cidade !== "PENDENTE" && (
                      <motion.h1
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`${
                          index === 1 && "mt-5"
                        } text-[30px] origin-left`}
                      >
                        {index === 0
                          ? "Responsável Financeiro"
                          : "Segundo Responsável"}
                      </motion.h1>
                    )}

                  {responsavel.endereco.cidade !== "PENDENTE" && (
                    <>
                      <motion.h1
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-[25px] origin-left"
                      >
                        Endereço
                      </motion.h1>

                      {/* Endereço do primeiro responsável */}
                      <div className="w-full max-w-full flex md:flex-row flex-col gap-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label className="origin-left">
                            C.E.P.
                          </motion.label>
                          <motion.input
                            type="text"
                            disabled
                            {...(index === 0
                              ? {
                                  onChange: (e) => {
                                    setUpdate((prev) => ({
                                      ...prev,
                                      sCEP: e.target.value,
                                    }));
                                  },
                                  defaultValue: update.sCEP,
                                }
                              : {
                                  onChange: (e) => {
                                    setUpdate2((prev) => ({
                                      ...prev,
                                      sCEP: e.target.value,
                                    }));
                                  },
                                  defaultValue: update2.sCEP,
                                })}
                            className="w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label className="origin-left">
                            Rua/Avenida
                          </motion.label>
                          <motion.input
                            type="text"
                            disabled
                            {...(index === 0
                              ? {
                                  onChange: (e) => {
                                    setUpdate((prev) => ({
                                      ...prev,
                                      sEndereco: e.target.value,
                                    }));
                                  },
                                  defaultValue: update.sEndereco,
                                }
                              : {
                                  onChange: (e) => {
                                    setUpdate2((prev) => ({
                                      ...prev,
                                      sEndereco: e.target.value,
                                    }));
                                  },
                                  defaultValue: update2.sEndereco,
                                })}
                            className="w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label className="origin-left">
                            N°
                          </motion.label>
                          <motion.input
                            type="text"
                            disabled
                            maxLength={3}
                            {...(index === 0
                              ? {
                                  onChange: (e) => {
                                    setUpdate((prev) => ({
                                      ...prev,
                                      nNumeroEndereco: e.target.value,
                                    }));
                                  },
                                  defaultValue: update.nNumeroEndereco,
                                }
                              : {
                                  onChange: (e) => {
                                    setUpdate2((prev) => ({
                                      ...prev,
                                      nNumeroEndereco: e.target.value,
                                    }));
                                  },
                                  defaultValue: update2.nNumeroEndereco,
                                })}
                            className="w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
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
                          <motion.label className="origin-left">
                            Cidade
                          </motion.label>
                          <motion.input
                            type="text"
                            disabled
                            {...(index === 0
                              ? {
                                  onChange: (e) => {
                                    setUpdate((prev) => ({
                                      ...prev,
                                      sCidade: e.target.value,
                                    }));
                                  },
                                  defaultValue: update.sCidade,
                                }
                              : {
                                  onChange: (e) => {
                                    setUpdate2((prev) => ({
                                      ...prev,
                                      sCidade: e.target.value,
                                    }));
                                  },
                                  defaultValue: update2.sCidade,
                                })}
                            className="w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label className="origin-left">
                            Bairro
                          </motion.label>
                          <motion.input
                            type="text"
                            disabled
                            {...(index === 0
                              ? {
                                  onChange: (e) => {
                                    setUpdate((prev) => ({
                                      ...prev,
                                      sBairro: e.target.value,
                                    }));
                                  },
                                  defaultValue: update.sBairro,
                                }
                              : {
                                  onChange: (e) => {
                                    setUpdate2((prev) => ({
                                      ...prev,
                                      sBairro: e.target.value,
                                    }));
                                  },
                                  defaultValue: update2.sBairro,
                                })}
                            className="w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label className="origin-left">
                            Complemento
                          </motion.label>
                          <motion.input
                            type="text"
                            disabled
                            {...(index === 0
                              ? {
                                  onChange: (e) => {
                                    setUpdate((prev) => ({
                                      ...prev,
                                      sComplementoEndereco: e.target.value,
                                    }));
                                  },
                                  defaultValue: update.sComplementoEndereco,
                                }
                              : {
                                  onChange: (e) => {
                                    setUpdate2((prev) => ({
                                      ...prev,
                                      sComplementoEndereco: e.target.value,
                                    }));
                                  },
                                  defaultValue: update2.sComplementoEndereco,
                                })}
                            className="w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                          />
                        </motion.div>
                      </div>

                      <motion.h1
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="text-[25px] origin-left"
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
                          <motion.label className="origin-left">
                            Celular
                          </motion.label>
                          <CelularVariation
                            disabled={true}
                            {...(index === 0
                              ? {
                                  onChange: (value) => {
                                    setUpdate((prev) => ({
                                      ...prev,
                                      sCelular: value,
                                    }));
                                  },
                                  value: dados?.responsaveis[0].celular,
                                }
                              : {
                                  onChange: (value) => {
                                    setUpdate2((prev) => ({
                                      ...prev,
                                      sCelular: value,
                                    }));
                                  },
                                  value: dados?.responsaveis[1].celular,
                                })}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex flex-col gap-2 w-full"
                        >
                          <motion.label className="origin-left">
                            Email
                          </motion.label>
                          <motion.input
                            type="email"
                            disabled
                            {...(index === 0
                              ? {
                                  onChange: (e) => {
                                    setUpdate((prev) => ({
                                      ...prev,
                                      sEmail: e.target.value,
                                    }));
                                  },
                                  defaultValue: update.sEmail,
                                }
                              : {
                                  onChange: (e) => {
                                    setUpdate2((prev) => ({
                                      ...prev,
                                      sEmail: e.target.value,
                                    }));
                                  },
                                  defaultValue: update2.sEmail,
                                })}
                            className="w-full rounded-[15px] px-4 py-3 border outline-none transition-all ease-in-out duration-300 border-gray-400 max-w-[480px] focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                          />
                        </motion.div>
                      </div>
                    </>
                  )}
                </React.Fragment>
              );
            })}
          </div>
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
