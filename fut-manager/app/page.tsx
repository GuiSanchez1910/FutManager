"use client";

import Link from "next/link";
import styles from "./styles/home.module.css";

export default function Home() {
  return (
    <main className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Bem-vindo ao FutManager</h1>
        <p className={styles.subtitle}>
          A plataforma ideal para gerenciar times de futebol de forma simples e
          eficiente
        </p>
        <div className={styles.buttonContainer}>
          <Link href="/times" className={styles.button}>
            Ver Times Cadastrados
          </Link>
          <Link href="/cadastrar" className={styles.button}>
            Cadastrar Novo Time
          </Link>
        </div>
      </div>
    </main>
  );
}
