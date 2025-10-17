"use client";

import { Suspense } from "react";
import Finalizar from "./finalizarMatricularInner";
import { Loading } from "@imports/components/ui/loading";

export const dynamic = "force-dynamic";

export default function FinalizarWrapper() {
  return (
    // <div className="text-white text-center mt-10">Carregando...</div>
    <Suspense fallback={<Loading />}>
        <Finalizar />
    </Suspense>
  );
}