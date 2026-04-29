"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type UploadImage = {
  id: string;
  file: File;
  url: string;
};

export default function SaljBilPage() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<UploadImage[]>([]);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/login");
        return;
      }

      setIsCheckingAuth(false);
    }

    checkAuth();
  }, [router]);

  if (isCheckingAuth) {
    return <main className={styles.page}>Kontrollerar inloggning...</main>;
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const MAX_IMAGES = 10;

    const imageFiles = files.filter((f) => f.type.startsWith("image/"));

    const remaining = MAX_IMAGES - images.length;
    const filesToAdd = imageFiles.slice(0, Math.max(0, remaining));

    const newItems: UploadImage[] = filesToAdd.map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newItems]);

    e.target.value = "";
  }
  
  function removeImage(id: string) {
    setImages((prev) => {
      const target = prev.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.url); // clean memory
      return prev.filter((x) => x.id !== id);
    });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // For now: just frontend UI (no backend yet).
    // Later you can send as FormData to an API route.
    alert("Annons skickad! (Demo – ingen backend kopplad ännu)");
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Sälj bil</h1>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.formBox}>
            <div className={styles.columns}>
              {/* LEFT COLUMN */}
              <section className={styles.col}>
                <h2 className={styles.sectionTitle}>INFO OM BILEN</h2>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="marke">
                    Märke:
                  </label>
                  <select className={styles.input} id="marke" name="marke" defaultValue="">
                    <option value="" disabled>
                      Volvo / BMW ...
                    </option>
                    <option value="volvo">Volvo</option>
                    <option value="bmw">BMW</option>
                    <option value="audi">Audi</option>
                    <option value="vw">Volkswagen</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="modell">
                    Modell:
                  </label>
                  <input
                    className={styles.input}
                    id="modell"
                    name="modell"
                    type="text"
                    placeholder="t.ex. V60 / A4 / 320d"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="arsmodell">
                    Årsmodell:
                  </label>
                  <select className={styles.input} id="arsmodell" name="arsmodell" defaultValue="">
                    <option value="" disabled>
                      2020
                    </option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="miltal">
                    Miltal:
                  </label>
                  <input className={styles.input} id="miltal" name="miltal" type="text" placeholder="t.ex. 12 500" />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pris">
                    Pris (kr):
                  </label>
                  <input className={styles.input} id="pris" name="pris" type="text" placeholder="t.ex. 149 000" />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bransle">
                    Bränsle:
                  </label>
                  <select className={styles.input} id="bransle" name="bransle" defaultValue="">
                    <option value="" disabled>
                      Bensin / Diesel / El
                    </option>
                    <option value="bensin">Bensin</option>
                    <option value="diesel">Diesel</option>
                    <option value="el">El</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </section>

              {/* RIGHT COLUMN */}
              <section className={styles.col}>
                <h2 className={styles.sectionTitle}>KONTAKTUPPGIFTER</h2>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="namn">
                    Namn
                  </label>
                  <input className={styles.input} id="namn" name="namn" type="text" placeholder="Ditt namn..." />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="telefon">
                    Telefon
                  </label>
                  <input
                    className={styles.input}
                    id="telefon"
                    name="telefon"
                    type="tel"
                    placeholder="070-123 45 67"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="epost">
                    E-post
                  </label>
                  <input
                    className={styles.input}
                    id="epost"
                    name="epost"
                    type="email"
                    placeholder="dinmail@exempel.se"
                  />
                </div>
              </section>
            </div>
          </div>

            {/* IMAGES */}
            <section className={styles.imagesSection}>
            <h2 className={styles.imagesTitle}>BILDER</h2>

            {/* Hidden input */}
            <input
                ref={fileInputRef}
                className={styles.hiddenInput}
                type="file"
                accept="image/*"
                multiple
                onChange={onFilesSelected}
            />

            {/* If NO images yet -> show the big upload box */}
            {images.length === 0 && (
                <button
                type="button"
                className={styles.uploadBox}
                onClick={openFilePicker}
                aria-label="Lägg till bilder"
                >
                <div className={styles.uploadInner}>
                    <p className={styles.uploadMain}>+ Lägg till bilder</p>
                    <p className={styles.uploadSub}>PNG, JPG • Max 10 bilder</p>
                </div>
                </button>
            )}

            {/* If images exist -> show small add button + grid */}
            {images.length > 0 && (
                <>
                <button
                    type="button"
                    className={styles.addMoreBtn}
                    onClick={openFilePicker}
                    aria-label="Lägg till fler bilder"
                >
                    + Lägg till fler bilder
                </button>

                <div className={styles.thumbGrid}>
                    {images.map((img) => (
                    <div key={img.id} className={styles.thumbItem}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className={styles.thumbImg} src={img.url} alt={img.file.name} />

                        <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeImage(img.id)}
                        aria-label={`Ta bort bild ${img.file.name}`}
                        >
                        ✕
                        </button>
                    </div>
                    ))}
                </div>
                </>
            )}

            <button type="submit" className={styles.submitBtn}>
                Skicka annons
            </button>

  


            <p className={styles.afterText}>Vi återkommer inom 24 timmar</p>
          </section>
        </form>
      </div>
    </main>
  );
}
