"use client";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="header">
          <nav className="navbar">
            <div className="logo">FutManager</div>
            <button className="mobileMenuButton" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
            <div className={`navLinks ${mobileMenuOpen ? "active" : ""}`}>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/times" onClick={() => setMobileMenuOpen(false)}>
                Times
              </Link>
              <Link href="/cadastrar" onClick={() => setMobileMenuOpen(false)}>
                Cadastrar Time
              </Link>
            </div>
          </nav>
        </header>

        <div className="container">{children}</div>

        <footer className="footer">
          <p>© 2025 FutManager - Todos os direitos reservados</p>
        </footer>
      </body>
    </html>
  );
}
