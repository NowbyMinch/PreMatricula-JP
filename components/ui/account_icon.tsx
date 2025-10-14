"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AccountProps {
  onClose: () => void; // callback to close popover
}

export default function Account({ onClose }: AccountProps) {
  const router = useRouter();
  const [ ultima, setUltima ] = useState("");

  
  useEffect(() => {

    // Bloco completo necessário ------------------------------------------------------------------------------------------------------------------------------------------------------------
    const fetchToken = async () => {
      const tok = await fetch('/api/token');
      const data = await tok.json();
      if (!data.token) {return;}
      const token = data.token;
      
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
      
      setUltima(dataRes.items[0].id);
    };
    fetchToken();
  
    // ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  
  },[])
  
  const Logout = async () => {
    try {
      const res = await fetch(`/api/logout`, { method: 'POST', credentials: "include" });
      const data = await res.json();
      console.log(data);

      // Close popover
      onClose?.();

      // Redirect
      router.push("/cadastro");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Erro ao sair da conta.");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="origin-top-right w-44 h-24 rounded-[15px] flex flex-col justify-center gap-2 items-center cursor-pointer bg-[rgba(12,12,14,0.9)] backdrop-blur-[20px] absolute top-20 right-3 z-100"
    >
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={`/matriculas/${ultima}/dados_do_responsavel`}
        className="w-full pl-4 hover:text-yellow-300 transition-all ease-in-out duration-300 text-white cursor-pointer font-extralight"
      >
        Ver matrículas
      </motion.a>

      <hr className="w-[85%] text-white" />

      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={Logout} // logout closes popover
        className="w-full pl-4 hover:text-yellow-300 transition-all ease-in-out duration-300 text-white cursor-pointer font-extralight"
      >
        Sair da conta
      </motion.a>
    </motion.div>
  );
}
