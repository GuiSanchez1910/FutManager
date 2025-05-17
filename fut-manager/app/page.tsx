"use client";

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1>Bem-vindo ao FutManager</h1>
          <p>A plataforma ideal para gerenciar times de futebol</p>
          <Link href="/cadastrar">
            <button className={styles.button}>Cadastrar Novo Time</button>
          </Link>
        </section>

        <section className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>📋</div>
            <h2>Cadastre Times</h2>
            <p>Adicione informações completas sobre seu time favorito</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🏆</div>
            <h2>Gerencie Detalhes</h2>
            <p>Mantenha histórias, cores e símbolos organizados</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🌍</div>
            <h2>Times Globais</h2>
            <p>Cadastre times de qualquer país do mundo</p>
          </div>
        </section>
      </main>
    </div>
  );
}
