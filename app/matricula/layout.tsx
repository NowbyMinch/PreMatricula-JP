import "../globals.css";

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

export default function RootLayout({children,}: { children: React.ReactNode;}) {

  return (
    <main className="w-screen  flex justify-center items-center overflow-hidden relative py-4 ">
      {children}
    
    </main>
  );
}
