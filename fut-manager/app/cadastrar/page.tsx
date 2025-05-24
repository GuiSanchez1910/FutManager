"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import styles from "../styles/cadastrar.module.css";

interface FormData {
  nome: string;
  historia: string;
  estadio: string;
  cor: string;
  escudo: File | null;
  hino: File | null;
  pais: string;
}

export default function CadastrarTime() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    historia: "",
    estadio: "",
    cor: "#6366f1",
    escudo: null,
    hino: null,
    pais: "",
  });

  const [escudoPreview, setEscudoPreview] = useState<string>("");
  const [hinoNome, setHinoNome] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });

      // Criar preview para o escudo
      if (name === "escudo") {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setEscudoPreview(e.target.result as string);
          }
        };
        reader.readAsDataURL(files[0]);
      }

      // Mostrar nome do arquivo de áudio
      if (name === "hino") {
        setHinoNome(files[0].name);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Dados do time:", formData);
      setSubmitSuccess(true);

      // Reset do formulário após 3 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          nome: "",
          historia: "",
          estadio: "",
          cor: "#6366f1",
          escudo: null,
          hino: null,
          pais: "",
        });
        setEscudoPreview("");
        setHinoNome("");
      }, 3000);
    } catch (error) {
      console.error("Erro ao cadastrar time:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFile = (fileType: "escudo" | "hino") => {
    setFormData({
      ...formData,
      [fileType]: null,
    });

    if (fileType === "escudo") {
      setEscudoPreview("");
    } else {
      setHinoNome("");
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Cadastrar Novo Time</h1>

      {submitSuccess && (
        <div className={styles.formSuccess}>Time cadastrado com sucesso!</div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="nome" className={styles.required}>
            Nome do Time
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Ex: Manchester United"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="historia">História</label>
          <textarea
            id="historia"
            name="historia"
            value={formData.historia}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
            placeholder="Conte um pouco sobre a história do time..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="estadio">Estádio</label>
          <input
            type="text"
            id="estadio"
            name="estadio"
            value={formData.estadio}
            onChange={handleChange}
            className={styles.input}
            placeholder="Ex: Old Trafford"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cor">Cor Principal</label>
          <div className={styles.colorPreview}>
            <input
              type="color"
              id="cor"
              name="cor"
              value={formData.cor}
              onChange={handleChange}
              className={styles.colorInput}
            />
            <div
              className={styles.colorBox}
              style={{ backgroundColor: formData.cor }}
            ></div>
            <span className={styles.colorValue}>{formData.cor}</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="escudo">Escudo</label>
          <div className={styles.fileInputWrapper}>
            <input
              type="file"
              id="escudo"
              name="escudo"
              onChange={handleFileChange}
              accept="image/*"
              className={styles.fileInput}
            />
            <div className={styles.fileInputButton}>
              Selecionar imagem do escudo
            </div>
          </div>

          {escudoPreview && (
            <div className={styles.filePreview}>
              <div className={styles.filePreviewIcon}>🖼️</div>
              <div className={styles.filePreviewName}>
                <img
                  src={escudoPreview}
                  alt="Preview do escudo"
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                className={styles.filePreviewRemove}
                onClick={() => removeFile("escudo")}
              >
                ✕
              </div>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="hino">Hino</label>
          <div className={styles.fileInputWrapper}>
            <input
              type="file"
              id="hino"
              name="hino"
              onChange={handleFileChange}
              accept="audio/*"
              className={styles.fileInput}
            />
            <div className={styles.fileInputButton}>
              Selecionar arquivo de áudio
            </div>
          </div>

          {hinoNome && (
            <div className={styles.filePreview}>
              <div className={styles.filePreviewIcon}>🎵</div>
              <div className={styles.filePreviewName}>{hinoNome}</div>
              <div
                className={styles.filePreviewRemove}
                onClick={() => removeFile("hino")}
              >
                ✕
              </div>
            </div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pais" className={styles.required}>
            País
          </label>
          <input
            type="text"
            id="pais"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Ex: Inglaterra"
          />
        </div>

        <hr className={styles.formDivider} />

        <div className={styles.formActions}>
          <Link href="/times" className={styles.cancelButton}>
            Cancelar
          </Link>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar Time"}
          </button>
        </div>
      </form>
    </main>
  );
}
