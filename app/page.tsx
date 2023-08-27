"use client";
import { redirect, useSearchParams } from "next/navigation";

export default function Home() {
  // Forward the url search params as well
  let params = useSearchParams();

  const url = params ? `/armor?${params.toString()}` : "/armor";
  redirect(url);
}
