import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Pré-Matrícula - SEICE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} font-sans bg-[#141416]`}>
      <body className="relative w-screen min-h-screen flex justify-center items-center overflow-hidden">
        
        {/* 🎥 Vídeo de fundo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover object-bottom -z-20"
        >
          <source src="file.mp4" type="video/mp4" />
        </video>

        {/* 🖤 Camada escura sobre o vídeo */}
        <div className="fixed top-0 left-0 w-full h-full bg-black opacity-55 -z-10"></div>

        {/* Conteúdo */}
        <main className="relative z-10 w-full flex justify-center items-center">
          {children}
        </main>

      </body>
    </html>
  );
}

        {/* Conteúdo */}
        <main className="relative z-10 w-full flex justify-center items-center">
          {children}
        </main>

      </body>
    </html>
  );
}

        {/* 🧱 Conteúdo principal */}
        <main className="relative z-10 w-full flex justify-center items-center">
          {children}
        </main>

      </body>
    </html>
  );
}
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
