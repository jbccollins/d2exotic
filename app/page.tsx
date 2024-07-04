"use client";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function Home() {
  // Forward the url search params as well
  let params = useSearchParams();

  const url = params ? `/armor?${params.toString()}` : "/armor";
  redirect(url);
  return null;
}

export default function Page() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
