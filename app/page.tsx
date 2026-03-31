import { Suspense } from "react";
import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <MainContent />
    </Suspense>
  );
}