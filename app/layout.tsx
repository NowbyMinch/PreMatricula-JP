import Account from "@imports/components/ui/account_icon";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],   // charset usado
  weight: ["400", "500", "600", "700"], // pesos que você quer carregar
  variable: "--font-poppins" // opcional se quiser usar em var()
});

export const metadata = {
  title: "Pré Matrícula - SEICE"
}
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {

  return (
    <html className={`bg-[#141416] ${poppins.variable} font-sans`}>
      <body className="w-screen min-h-screen flex items-center overflow-x-hidden relative flex-col">
        <video 
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover object-bottom -z-10"
      >
        <source src="/file.mov" type="video/mp4" />
        </video>


      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-55 z-[-5] "></div>

        <Account />

        <div className="my-auto py-2 h-full flex justify-center items-center w-full overflow-y-auto">
          {children}
        </div>
      
      </body>
    </html>
  );
}
