import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
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
        <Link href="/times/cadastrar" onClick={() => setMobileMenuOpen(false)}>
          Cadastrar Time
        </Link>
      </div>
    </nav>
  );
}
