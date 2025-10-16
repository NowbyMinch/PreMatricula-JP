"use client";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
  const router = useRouter();
  const pathname = usePathname();
  const [ ultima, setUltima ] = useState("");
  const [ token, setToken ] = useState("");
  
  const [ etapaAtual, setEtapaAtual ] = useState("");
  const [ finalizado, setFinalizado ] = useState(false);
  
  const [ pop, setPop ] = useState(false);
  const [ continuar, setContinuar ] = useState(false);

  
  useEffect(() => {
    // Bloco completo necessário ------------------------------------------------------------------------------------------------------------------------------------------------------------
    const fetchToken = async () => {
      const tok = await fetch('/api/token');
      const data = await tok.json();
      if (!data.token) {return;}
      const token = data.token;
      setToken(token);

      const usuarioID = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario-id`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const usuarioIDRetorno = await usuarioID.json();
      const usuarioId = usuarioIDRetorno.usuarioId; 
    
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/usuario/${usuarioId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const dataRes = await res.json();


      const MatriculaAtual = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/atual-id`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
        });
      const matriculaAtual = await MatriculaAtual.json();
      
      const detalhe = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matriculas/${matriculaAtual.matriculaId}/detalhe`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, },
      });
      const detalheRes = await detalhe.json();
      console.log(detalheRes, "detalhe novo atual");

      if (detalheRes.status !== "PENDENTE"){
        console.log(detalheRes.status)
        setFinalizado(true);
      } 

      setEtapaAtual(detalheRes.etapaAtualLabel);
      
      if (dataRes.total !== 0){
        setUltima(dataRes.items[0].id);
      }
      
      setPop(false);
    }; fetchToken();
    
    if (!finalizado && pathname.split("/")[1] !== "matricula") {
      setContinuar(true);
    } else {
      setContinuar(false);
    }
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    
  },[pathname])
  
  const Logout = async () => {
    try {
      const res = await fetch(`/api/logout`, { method: 'POST', credentials: "include" });
      const data = await res.json();
      console.log(data);


    } catch (err) {
      console.error("Logout failed:", err);
      alert("Erro ao sair da conta.");
    } finally{
      router.push("/cadastro");
      setToken("");
      setUltima("");
      setPop(false);
    }
  };

  const Continuar = async () => {
    if (!finalizado){
      console.log("Não finalizado!");
      
      console.log(etapaAtual);

      if (etapaAtual === "2"){
        router.push (`/matricula/endereco_e_comunicacao_responsavel_financeiro`)
      }
      else if (etapaAtual === "1b"){
        router.push (`/matricula/dados_do_responsavel_dois`)
      }
      else if (etapaAtual === "2b"){
        router.push (`/matricula/endereco_e_comunicacao_responsavel`)
      }
      else if (etapaAtual === "3"){
        router.push (`/matricula/dados_do_aluno`)
      }
      else if (etapaAtual === "3b"){
        router.push (`/matricula/endereco_e_comunicacao_aluno`)
      }
    }
    
    setPop(false);
  };

  return (
    <div className="w-full h-13 flex justify-end pr-4 relative gap-2 text-white">
      {token &&
        <motion.button 
        initial={{scale:0}}
        animate={{scale:1}}
        exit={{scale:0}}
        whileHover={{scale:1.02, color: "oklch(90.5% 0.182 98.111)"}}
        whileTap={{scale:0.98}}
        onClick={() => {setPop(!pop)}}
        className={`w-12 h-12 mt-auto rounded-full flex flex-col justify-center items-center gap-2 cursor-pointer bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] z-100`}>
          <Menu className="size-6" />
        </motion.button>
      }

      {pop &&
        <motion.div 
        initial={{scale:0}}
        animate={{scale:1}}
        exit={{scale:0}}
        className="origin-top-right bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] absolute top-14 rounded-[14px] w-fit px-4 z-1000">
          { continuar &&
            <motion.button 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            whileHover={{scale:1.02, color: "oklch(90.5% 0.182 98.111)"}}
            whileTap={{scale:0.98}}
            onClick={Continuar}
            className={`w-fit h-10 my-auto  rounded-[15px] flex flex-col justify-center gap-2 items-center cursor-pointer z-100`}>
              Continuar matrícula 
            </motion.button>
          }

          { ultima && etapaAtual !== "1" &&
            <motion.button 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            whileHover={{scale:1.02, color: "oklch(90.5% 0.182 98.111)"}}
            whileTap={{scale:0.98}}
            onClick={() => { if(ultima) {router.push(`/matriculas/${ultima}/dados_do_responsavel`)} }} // logout closes popover
            className={`w-fit h-10 my-auto  rounded-[15px] flex flex-col justify-center gap-2 items-center cursor-pointer z-100`}>
              Matrículas
            </motion.button>
          }

          { token &&
            <motion.div 
            initial={{scale:0}}
            animate={{scale:1}}
            exit={{scale:0}}
            whileHover={{scale:1.02, color: "oklch(90.5% 0.182 98.111)"}}
            whileTap={{scale:0.98}}
            onClick={Logout} // logout closes popover
            className={`w-fit h-10 my-auto rounded-[15px] flex flex-col justify-center gap-2 items-center cursor-pointer z-100`}>
              Sair
            </motion.div>
          }
        </motion.div>
      }

    </div>
  );
}
