"use client";

import ExoticWeaponsList from "@d2e/components/ExoticWeaponsList";
import MainLayout from "@d2e/components/MainLayout";
import { getApiProfileRecords } from "@d2e/lib/bungie-api/destiny2";
import { useEffect } from "react";

export default function Page() {
  // // This is such a fucking hack
  // const isSsr = useIsSsr();
  // if (isSsr) {
  //   return null;
  // }
  useEffect(() => {
    (async () => {
      try {
        const records = await getApiProfileRecords();
        console.log(
          ">>>>>>> characterRecords",
          records?.characterRecords
        );
        console.log(">>>>>>> profileRecords", records?.profileRecords);
      } catch (e) {
        console.error("Failed to get catalyst records");
      }
    })();
  }, []);

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <MainLayout>
        <ExoticWeaponsList />
      </MainLayout>
    </main>
  );
}
