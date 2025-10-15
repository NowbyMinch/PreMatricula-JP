"use client";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
  const router = useRouter();
  const pathname = usePathname();
  const [ ultima, setUltima ] = useState("");
  const [ token, setToken ] = useState("");
  
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

      if (dataRes.total === 0){
        console.log("Não é!!! kkkkkkkkkkkkkkkkkkkk", dataRes.items.length)
      } else {
        setUltima(dataRes.items[0].id);
      }

    }; fetchToken();
  
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
    }
  };

  return (
    <div className="w-full h-12 flex justify-end pr-4 relative gap-2 text-white">

      { ultima &&
        <motion.div 
        initial={{scale:0}}
        animate={{scale:1}}
        exit={{scale:0}}
        whileHover={{scale:1.02, color: "oklch(90.5% 0.182 98.111)"}}
        whileTap={{scale:0.98}}
        className={`px-4 h-10 my-auto  rounded-[15px] flex flex-col justify-center gap-2 items-center cursor-pointer bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] z-100`}>
          <button
          onClick={() => {if(ultima) {router.push(`/matriculas/${ultima}/dados_do_responsavel`)} }} // logout closes popover
          className="w-full transition-all ease-in-out duration-300 cursor-pointer font-extralight">
            Ver matrículas
          </button>
        </motion.div>
      }

      { token &&
        <motion.div 
        initial={{scale:0}}
        animate={{scale:1}}
        exit={{scale:0}}
        whileHover={{scale:1.02, color: "oklch(90.5% 0.182 98.111)"}}
        whileTap={{scale:0.98}}
        className={`px-4 h-10 my-auto rounded-[15px] flex flex-col justify-center gap-2 items-center cursor-pointer bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] z-100`}>
          <button
          onClick={Logout} // logout closes popover
          className="w-full transition-all ease-in-out duration-300 cursor-pointer font-extralight">
            Sair da conta
          </button>
        </motion.div>
      }

    </div>
    // <motion.div
    //   initial={{ scale: 0 }}
    //   animate={{ scale: 1 }}
    //   exit={{ scale: 0 }}
    //   className={`origin-top-right  ${ultima ? "w-44 h-24": "w-32 h-12"} transition-al ease-in-out duration-300 rounded-[15px] flex flex-col justify-center gap-2 items-center cursor-pointer bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] absolute top-20 right-3 z-100`}>
      
    //   {ultima ? 
    //     <>
    //       <motion.a
    //       whileHover={{ scale: 1.02 }}
    //       whileTap={{ scale: 0.98 }}
    //       href={ultima ? `/matriculas/${ultima}/dados_do_responsavel` : undefined}
    //       className="w-full pl-4 hover:text-yellow-300 transition-all ease-in-out duration-300 text-white cursor-pointer font-extralight">
    //         Ver matrículas
    //       </motion.a>

    //       <hr className="w-[85%] text-white" />

    //       <motion.a
    //       whileHover={{ scale: 1.02 }}
    //       whileTap={{ scale: 0.98 }}
    //       onClick={Logout} // logout closes popover
    //       className="w-full pl-4 hover:text-yellow-300 transition-all ease-in-out duration-300 text-white cursor-pointer font-extralight">
    //         Sair da conta
    //       </motion.a>

    //     </>
    //   :
    //     <motion.a
    //     whileHover={{ scale: 1.02 }}
    //     whileTap={{ scale: 0.98 }}
    //     onClick={Logout} // logout closes popover
    //     className="w-full pl-4 hover:text-yellow-300 transition-all ease-in-out duration-300 text-white cursor-pointer font-extralight">
    //       Sair da conta
    //     </motion.a>
    //   }

    // </motion.div>
  );
}
