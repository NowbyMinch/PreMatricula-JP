import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],   // charset usado
  weight: ["400", "500", "600", "700"], // pesos que você quer carregar
  variable: "--font-poppins" // opcional se quiser usar em var()
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Pré Matricula - SEICE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html className={`bg-[#141416] ${poppins.variable} font-sans`}>
      <body className="w-screen h-screen flex justify-center object-bottom items-center overflow-y-auto overflow-x-hidden">
        <div className="bg-black w-full h-full opacity-[0.55] absolute"></div>
        <video 
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-[100%] h-[100%] object-cover object-bottom -z-10">
          <div className="bg-black w-full h-full "></div>
          <source src="file.mp4" type="video/mp4" />
        </video>

        
        {children}
      
      </body>
    </html>
  );
}
