"use client";
import { Suspense } from "react";
import MainContent from "./MainContent";

export default function Home() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <MainContent />
    </Suspense>
  );
}