"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/times.module.css";
import { Time } from "../types/Time";

export default function Times() {
  const [times, setTimes] = useState<Time[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarTimes() {
      try {
        const times = await fetch("http://localhost:5043/api/times");
        if (!times.ok) throw new Error("Erro ao buscar times");
        const dados: Time[] = await times.json();
        setTimes(dados);
      } catch (err) {
        setErro("Erro ao buscar times");
      }
    }

    carregarTimes();
  }, []);

  async function removerTime(id: number) {
    if (!window.confirm("Tem certeza que deseja excluir este time?")) return;
    try {
      const resposta = await fetch(`http://localhost:5043/api/times/${id}`, {
        method: "DELETE",
      });
      if (!resposta.ok) throw new Error("Erro ao remover time");
      setTimes((prev) => prev.filter((time) => time.id !== id));
    } catch (err) {
      setErro("Erro ao remover time");
    }
  }

  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>Times Cadastrados</h1>

        <div className={styles.timesList} style={{ padding: "20px" }}>
          {times.map((time) => (
            <div
              key={time.id}
              className={styles.timeCard}
              style={{ borderTop: `10px solid ${time.cor}`, padding: "20px  " }}
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
                  <Link href={`/times/${time.id}/editar`}>
                    <button className={styles.viewButton}>Editar</button>
                  </Link>
                  <button
                    className={styles.viewButton}
                    onClick={() => removerTime(time.id)}
                  >
                    Excluir
                  </button>
                  <Link href={`/times/${time.id}/detalhes`}>
                    <button className={styles.viewButton}>Detalhes</button>
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
