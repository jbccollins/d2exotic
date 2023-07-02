import { Providers } from "@d2e/redux/provider";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "D2 Exotic",
  description:
    'Super simple website to show you which exotic armor pieces can be decrypted from the various "Advanced" decryption engrams at Rahool.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
