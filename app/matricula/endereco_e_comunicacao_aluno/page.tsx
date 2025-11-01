import { Suspense } from "react";
import EnderecoComunicacaoAluno from "./endereco_e_comunicacao_aluno";
import { Loading } from "@imports/components/ui/loading";

export const dynamic = "force-dynamic";

export default function FinalizarWrapper() {
  return (
    // <div className="text-white text-center mt-10">Carregando...</div>
    <Suspense fallback={<Loading />}>
      <EnderecoComunicacaoAluno />
    </Suspense>
  );
}
