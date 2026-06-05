import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "PokéNext",
  description: "Pokedex moderna con NextJS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return await ClerkProvider({
    children: (
      <html lang="en">
        <body>{children}</body>
      </html>
    ),
  });
}
