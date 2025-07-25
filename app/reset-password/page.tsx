"use client";
import { Suspense } from "react";
import ResetPasswordContent from "./ResetPasswordContent";

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}