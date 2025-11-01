"use client";

import { usePathname } from "next/navigation";
import "../globals.css";
import { useEffect } from "react";

// const poppins = Poppins({
//   subsets: ["latin"],   // charset usado
//   weight: ["400", "500", "600", "700"], // pesos que você quer carregar
//   variable: "--font-poppins" // opcional se quiser usar em var()
// });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  useEffect(() => {
    const fetchToken = async () => {
      const tok = await fetch("/api/token");
      const data = await tok.json();
      if (!data.token) {
        return;
      }
      const token = data.token;

      const MatriculaAtual = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matriculas/atual-id`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const matriculaAtual = await MatriculaAtual.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/matriculas/${matriculaAtual.matriculaId}/detalhe`,
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
    };
    fetchToken();
  }, [id, pathname]);

  return (
    <main className="w-screen  flex justify-center items-center  relative py-4 ">
      {children}
    </main>
  );
}
