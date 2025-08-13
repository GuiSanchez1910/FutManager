"use client";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="header">
          <Navbar />
        </header>

        <div className="container">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
