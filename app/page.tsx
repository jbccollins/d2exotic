"use client";

import MainLayout from "@d2e/components/MainLayout";
import { useIsSsr } from "./hooks/hooks";

export default function Home() {
  // This is such a fucking hack
  const isSsr = useIsSsr();
  if (isSsr) {
    return null;
  }
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <MainLayout />
    </main>
  );
}
