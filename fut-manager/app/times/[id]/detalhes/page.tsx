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

export default async function Page({ params }: { params: { id: string } }) {
  const dados = await fetch(`http://localhost:5043/api/times/${params.id}`);

  if (!dados.ok) {
    return <p>Erro ao carregar dados do time</p>;
  }

  const time: Time = await dados.json();

  const textoCor = corClara(time.cor) ? "#000000" : "#ffffff";

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "40px auto",
        padding: "32px",
        backgroundColor: `${time.cor}`,
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
          color: textoCor,
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
