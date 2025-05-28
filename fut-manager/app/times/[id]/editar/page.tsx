"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [time, setTime] = useState<Time | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTime() {
      try {
        const res = await fetch(`http://localhost:5043/api/times/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar time");
        const dados: Time = await res.json();
        setTime(dados);
      } catch (err) {
        setErro("Erro ao carregar os dados.");
      }
    }
    if (id) fetchTime();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!time) return;
    setTime({ ...time, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!time) return;
    try {
      const res = await fetch(`http://localhost:5043/api/times/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(time),
      });

      if (!res.ok) throw new Error("Erro ao atualizar time");
      alert("Time atualizado com sucesso!");
      router.push(`/times/${id}/detalhes`);
    } catch (err) {
      alert("Erro ao atualizar.");
    }
  };

  if (erro) return <p>{erro}</p>;
  if (!time) return <p>Carregando...</p>;

  const textoCor = corClara(time.cor) ? "#000000" : "#ffffff";

  return (
    <form
      onSubmit={handleSubmit}
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
        <input
          name="nome"
          value={time.nome}
          onChange={handleChange}
          style={{
            background: "transparent",
            border: "none",
            borderBottom: `2px solid ${textoCor}`,
            fontSize: "2.75rem",
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            color: textoCor,
          }}
        />
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
        <input
          name="escudo"
          value={time.escudo}
          onChange={handleChange}
          placeholder="URL do escudo"
          style={{
            width: "100%",
            padding: "6px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <img
          src={time.escudo}
          alt={`Escudo do ${time.nome}`}
          style={{
            width: "180px",
            height: "auto",
            objectFit: "contain",
            marginTop: "10px",
          }}
        />

        <input
          name="hino"
          value={time.hino}
          onChange={handleChange}
          placeholder="ID do vídeo do YouTube"
          style={{
            width: "100%",
            padding: "6px",
            borderRadius: "8px",
            border: "1px solid #ccc",
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
        <strong>País:</strong>{" "}
        <input
          name="pais"
          value={time.pais}
          onChange={handleChange}
          style={{
            background: "transparent",
            border: "none",
            borderBottom: `1px solid ${textoCor}`,
            color: textoCor,
          }}
        />
      </p>

      <p style={{ marginBottom: "10px" }}>
        <FontAwesomeIcon icon={faLandmark} style={{ marginRight: "8px", color: textoCor }} />
        <strong>Estádio:</strong>{" "}
        <input
          name="estadio"
          value={time.estadio}
          onChange={handleChange}
          style={{
            background: "transparent",
            border: "none",
            borderBottom: `1px solid ${textoCor}`,
            color: textoCor,
          }}
        />
      </p>

      <p style={{ lineHeight: "1.6" }}>
        <FontAwesomeIcon icon={faBook} style={{ width: "20px", marginRight: "8px", color: textoCor }} />
        <strong>História:</strong>
        <br />
        <textarea
          name="historia"
          value={time.historia}
          onChange={handleChange}
          rows={5}
          style={{
            width: "100%",
            background: "transparent",
            border: `1px solid ${textoCor}`,
            color: textoCor,
            borderRadius: "8px",
            padding: "10px",
          }}
        />
      </p>

      <p style={{ marginBottom: "20px" }}>
        <strong>Cor do time:</strong>{" "}
        <input
          type="color"
          name="cor"
          value={time.cor}
          onChange={handleChange}
          style={{ marginLeft: "10px", verticalAlign: "middle" }}
        />
      </p>

      <button
        type="submit"
        style={{
          padding: "12px 24px",
          backgroundColor: textoCor,
          color: time.cor,
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Salvar Alterações
      </button>
    </form>
  );
}
