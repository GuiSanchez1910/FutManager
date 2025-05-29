"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../../styles/cadastrar.module.css";

interface FormData {
  nome: string;
  historia: string;
  estadio: string;
  cor: string;
  escudo: string;
  hino: string;
  pais: string;
}

export default function CadastrarTime() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    historia: "",
    estadio: "",
    cor: "#6366f1",
    escudo: "",
    hino: "",
    pais: "",
  });

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5043/api/times", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar time");
      }

      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          nome: "",
          historia: "",
          estadio: "",
          cor: "#6366f1",
          escudo: "",
          hino: "",
          pais: "",
        });
        router.push("/times");
      }, 2000);
    } catch (error) {
      console.error("Erro ao cadastrar time:", error);
      alert("Erro ao cadastrar time");
    } finally {
      setIsSubmitting(false);
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
          <label htmlFor="historia" className={styles.required}>
            História
          </label>
          <textarea
            id="historia"
            name="historia"
            value={formData.historia}
            onChange={handleChange}
            required
            className={styles.textarea}
            rows={4}
            placeholder="Conte um pouco sobre a história do time..."
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="estadio" className={styles.required}>
            Estádio
          </label>
          <input
            type="text"
            id="estadio"
            name="estadio"
            value={formData.estadio}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Ex: Old Trafford"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cor" className={styles.required}>
            Cor Principal
          </label>
          <div className={styles.colorPreview}>
            <input
              type="color"
              id="cor"
              name="cor"
              value={formData.cor}
              onChange={handleChange}
              required
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
          <label htmlFor="escudo" className={styles.required}>
            Escudo{" "}
          </label>
          <input
            type="text"
            id="escudo"
            name="escudo"
            value={formData.escudo}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="URL da imagem"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="hino" className={styles.required}>
            Hino
          </label>
          <input
            type="text"
            id="hino"
            name="hino"
            value={formData.hino}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="URL do video no YouTube"
          />
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
