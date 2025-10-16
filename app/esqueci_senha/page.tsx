"use client";

import { Suspense } from "react";
import EsqueciSenhaPage from "./EsqueciSenhaInner";

export const dynamic = "force-dynamic";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Carregando...</div>}>
      <EsqueciSenhaPage />
    </Suspense>
  );
}