import { Providers } from "@d2e/redux/provider";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "D2 Exotic",
  description: "Information about Exotic Armor decryption in Destiny 2",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "D2 Exotic",
    description: "Information about Exotic Armor decryption in Destiny 2",
    images: ["/icon.png"],
  },
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
