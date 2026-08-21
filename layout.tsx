import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = { title: "NEURO-SPLOIT", description: "Assistant technique IA pour la programmation et la sécurité autorisée.", icons: { icon: "/icon.png" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body><ClerkProvider>{children}</ClerkProvider></body></html>;
}
