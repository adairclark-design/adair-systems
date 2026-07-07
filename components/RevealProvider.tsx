"use client";
import { useEffect } from "react";
import useReveal from "@/lib/useReveal";
import { signature } from "@/lib/signature";

export default function RevealProvider({ children }: { children: React.ReactNode }) {
  useReveal();
  useEffect(() => { signature(); }, []);
  return <>{children}</>;
}
