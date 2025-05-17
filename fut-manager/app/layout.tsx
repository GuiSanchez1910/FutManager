import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FutManager - Gerenciamento de Times de Futebol",
  description: "Plataforma para gerenciar times de futebol",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="header">
          <nav className="navbar">
            <div className="logo">FutManager</div>
            <div className="navLinks">
              <Link href="/">Home</Link>
              <Link href="/times">Times</Link>
              <Link href="/cadastrar">Cadastrar Time</Link>
            </div>
          </nav>
        </header>

        {children}

        <footer className="footer">
          <p>© 2025 FutManager - Todos os direitos reservados</p>
        </footer>
      </body>
    </html>
  );
}
