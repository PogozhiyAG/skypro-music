import type { Metadata } from "next";
import {  Montserrat } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { DataContextProvider } from "@/context/DataContext";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skypro",
  description: "Skypro music"  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContextProvider>
      <DataContextProvider>
        <html lang="ru">
          <body className={montserrat.className}>{children}</body>
        </html>
      </DataContextProvider>
    </AuthContextProvider>
  );
}
