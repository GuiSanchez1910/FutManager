"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "../styles/times.module.css";

export default function Times() {
  // Dados de exemplo para mostrar na interface
  const [times, setTimes] = useState([
    {
      id: 1,
      nome: "Flamengo",
      pais: "Brasil",
      cor: "#ff0000",
      estadio: "Maracanã",
      escudo: "https://placehold.co/100x100/ff0000/white?text=FLA",
    },
    {
      id: 2,
      nome: "Barcelona",
      pais: "Espanha",
      cor: "#0000ff",
      estadio: "Camp Nou",
      escudo: "https://placehold.co/100x100/0000ff/white?text=BAR",
    },
    {
      id: 3,
      nome: "Manchester United",
      pais: "Inglaterra",
      cor: "#ff0000",
      estadio: "Old Trafford",
      escudo: "https://placehold.co/100x100/ff0000/white?text=MAN",
    },
  ]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Times Cadastrados</h1>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar times..."
            className={styles.searchInput}
          />
          <button className={styles.searchButton}>Buscar</button>
        </div>

        <div className={styles.timesList}>
          {times.map((time) => (
            <div
              key={time.id}
              className={styles.timeCard}
              style={{ borderLeft: `5px solid ${time.cor}` }}
            >
              <div className={styles.timeEscudo}>
                <img src={time.escudo} alt={`Escudo do ${time.nome}`} />
              </div>
              <div className={styles.timeInfo}>
                <h2>{time.nome}</h2>
                <p>
                  <strong>País:</strong> {time.pais}
                </p>
                <p>
                  <strong>Estádio:</strong> {time.estadio}
                </p>
                <div className={styles.timeActions}>
                  <Link href={`/times/${time.id}`}>
                    <button className={styles.viewButton}>Ver Detalhes</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
