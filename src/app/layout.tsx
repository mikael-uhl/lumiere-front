import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Lumière",
    default: "Lumière",
  },
  description:
    "Descubra Lumière: sua comunidade online para compartilhar listas de filmes, séries e curtas. Crie grupos, conecte-se e ilumine sua jornada cinematográfica.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <Header session={session} />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
