"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Time } from "../../../types/Time";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faLandmark, faGlobe } from "@fortawesome/free-solid-svg-icons";

function corClara(hexColor: string): boolean {
  const color = hexColor.replace("#", "");
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 180;
}

export default function DetalhesTime() {
  const params = useParams();
  const id = params?.id as string;

  const [time, setTime] = useState<Time | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregarTime() {
      try {
        const resposta = await fetch(`http://localhost:5043/api/times/${id}`);
        if (!resposta.ok) throw new Error("Erro ao carregar dados");
        const dados: Time = await resposta.json();
        setTime(dados);
      } catch (error) {
        setErro("Erro ao carregar dados do time");
      }
    }

    if (id) carregarTime();
  }, [id]);

  if (erro) return <p>{erro}</p>;
  if (!time) return <p>Carregando...</p>;

  const textoCor = corClara(time.cor) ? "#000000" : "#ffffff";

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "40px auto",
        padding: "32px",
        backgroundColor: time.cor,
        borderRadius: "16px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
        fontFamily: "Segoe UI, sans-serif",
        color: textoCor,
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "2.75rem",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {time.nome}
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px",
          marginBottom: "30px",
        }}
      >
        <img
          src={time.escudo}
          alt={`Escudo do ${time.nome}`}
          style={{
            width: "180px",
            height: "auto",
            objectFit: "contain",
          }}
        />

        <iframe
          width="320"
          height="180"
          src={`https://www.youtube.com/embed/${time.hino}`}
          title={`Hino do ${time.nome}`}
          allowFullScreen
          style={{
            borderRadius: "10px",
            border: "2px solid #ccc",
          }}
        ></iframe>
      </div>

      <p style={{ marginBottom: "10px" }}>
        <FontAwesomeIcon icon={faGlobe} style={{ marginRight: "8px", color: textoCor }} />
        <strong style={{ color: textoCor }}>País:</strong> {time.pais}
      </p>

      <p style={{ marginBottom: "10px" }}>
        <FontAwesomeIcon icon={faLandmark} style={{ marginRight: "8px", color: textoCor }} />
        <strong style={{ color: textoCor }}>Estádio:</strong> {time.estadio}
      </p>

      <p style={{ lineHeight: "1.6" }}>
        <FontAwesomeIcon icon={faBook} style={{ width: "20px", marginRight: "8px", color: textoCor }} />
        <strong style={{ color: textoCor }}>História:</strong><br />
        {time.historia}
      </p>
    </div>
  );
}
