"use client";

import { useIsSsr } from "@d2e/app/hooks/hooks";
import ExoticArmorList from "@d2e/components/ExoticArmorList";
import MainLayout from "@d2e/components/MainLayout";

export default function Page() {
  // This is such a fucking hack
  const isSsr = useIsSsr();
  if (isSsr) {
    return null;
  }
  return (
    <main className="flex min-h-screen flex-col justify-between">
      <MainLayout>
        <ExoticArmorList />
      </MainLayout>
    </main>
  );
}
