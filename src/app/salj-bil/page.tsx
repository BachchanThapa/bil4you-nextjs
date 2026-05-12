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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);

      const brand = String(formData.get("marke") || "").trim();
      const model = String(formData.get("modell") || "");
      const year = Number(formData.get("arsmodell"));
      const mileage = Number(
        String(formData.get("miltal") || "").replace(/\s/g, ""),
      );
      const price = Number(
        String(formData.get("pris") || "").replace(/\s/g, ""),
      );
      const fuelType = String(formData.get("bransle") || "");
      const transmission = String(formData.get("vaxellada") || "");
      const version = String(formData.get("version") || "");
      const color = String(formData.get("color") || "");
      const bodyType = String(formData.get("bodyType") || "");
      const registrationNumber = String(
        formData.get("registrationNumber") || "",
      );
      const fuelConsumption = String(formData.get("fuelConsumption") || "");
      const drivetrain = String(formData.get("drivetrain") || "");
      const taxYearly = String(formData.get("taxYearly") || "");

      const sellerName = String(formData.get("namn") || "");
      const sellerPhone = String(formData.get("telefon") || "");
      const sellerAddress = String(formData.get("sellerAddress") || "");
      const sellerDescription = String(formData.get("sellerDescription") || "");
      const title = `${brand.toUpperCase()} ${model}`;

      const { data: carData, error: carError } = await supabase
        .from("cars")
        .insert({
          user_id: user.id,
          title,
          brand,
          model,
          year,
          mileage,
          fuel_type: fuelType,
          transmission,
          price,
          version,
          color,
          body_type: bodyType,
          registration_number: registrationNumber,
          fuel_consumption: fuelConsumption,
          drivetrain,
          tax_yearly: taxYearly,

          seller_name: sellerName,
          seller_phone: sellerPhone,
          seller_address: sellerAddress,
          seller_description: sellerDescription,

          description: sellerDescription,
          location: sellerAddress,
        })
        .select("id")
        .single();

      if (carError) {
        console.error(carError);
        alert("Något gick fel när bilen skulle sparas.");
        return;
      }

      if (images.length > 0) {
        const imageRows = [];

        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const fileExt = image.file.name.split(".").pop();
          const filePath = `${user.id}/${carData.id}/${crypto.randomUUID()}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("car-images")
            .upload(filePath, image.file);

          if (uploadError) {
            console.error(uploadError);
            alert("Bilen sparades, men en bild kunde inte laddas upp.");
            return;
          }

          const { data: publicUrlData } = supabase.storage
            .from("car-images")
            .getPublicUrl(filePath);

          imageRows.push({
            car_id: carData.id,
            image_url: publicUrlData.publicUrl,
            sort_order: i,
          });
        }

        const { error: imageDbError } = await supabase
          .from("car_images")
          .insert(imageRows);

        if (imageDbError) {
          console.error(imageDbError);
          alert("Bilen sparades, men bildlänkarna kunde inte sparas.");
          return;
        }
      }

      alert("Annons skickad och sparad i Supabase!");
      router.push("/kop-bilar");
    } finally {
      setIsSubmitting(false);
    }
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
                  <input
                    className={styles.input}
                    id="marke"
                    name="marke"
                    type="text"
                    placeholder="t.ex. Volvo / BMW / Toyota / Kia"
                    required
                  />
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
                  <select
                    className={styles.input}
                    id="arsmodell"
                    name="arsmodell"
                    defaultValue=""
                  >
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
                  <input
                    className={styles.input}
                    id="miltal"
                    name="miltal"
                    type="text"
                    placeholder="t.ex. 12 500"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="pris">
                    Pris (kr):
                  </label>
                  <input
                    className={styles.input}
                    id="pris"
                    name="pris"
                    type="text"
                    placeholder="t.ex. 149 000"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bransle">
                    Bränsle:
                  </label>
                  <select
                    className={styles.input}
                    id="bransle"
                    name="bransle"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Bensin / Diesel / El
                    </option>
                    <option value="bensin">Bensin</option>
                    <option value="diesel">Diesel</option>
                    <option value="el">El</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="vaxellada">
                    Växellåda:
                  </label>
                  <select
                    className={styles.input}
                    id="vaxellada"
                    name="vaxellada"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Automat / Manuell
                    </option>
                    <option value="automat">Automat</option>
                    <option value="manuell">Manuell</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="version">
                    Version:
                  </label>
                  <input
                    className={styles.input}
                    id="version"
                    name="version"
                    type="text"
                    placeholder="t.ex. D3 R-Design"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="color">
                    Färg:
                  </label>
                  <input
                    className={styles.input}
                    id="color"
                    name="color"
                    type="text"
                    placeholder="t.ex. Vit"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bodyType">
                    Karosstyp:
                  </label>
                  <input
                    className={styles.input}
                    id="bodyType"
                    name="bodyType"
                    type="text"
                    placeholder="t.ex. Kombi / SUV"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="registrationNumber">
                    Regnummer:
                  </label>
                  <input
                    className={styles.input}
                    id="registrationNumber"
                    name="registrationNumber"
                    type="text"
                    placeholder="t.ex. ABC123"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="fuelConsumption">
                    Förbrukning:
                  </label>
                  <input
                    className={styles.input}
                    id="fuelConsumption"
                    name="fuelConsumption"
                    type="text"
                    placeholder="t.ex. 4,8 l/100km"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="drivetrain">
                    Drivhjul:
                  </label>
                  <input
                    className={styles.input}
                    id="drivetrain"
                    name="drivetrain"
                    type="text"
                    placeholder="t.ex. Framhjulsdrift"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="taxYearly">
                    Årlig skatt:
                  </label>
                  <input
                    className={styles.input}
                    id="taxYearly"
                    name="taxYearly"
                    type="text"
                    placeholder="t.ex. 3353 kr"
                  />
                </div>
              </section>

              {/* RIGHT COLUMN */}
              <section className={styles.col}>
                <h2 className={styles.sectionTitle}>KONTAKTUPPGIFTER</h2>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="namn">
                    Namn
                  </label>
                  <input
                    className={styles.input}
                    id="namn"
                    name="namn"
                    type="text"
                    placeholder="Ditt namn..."
                  />
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

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="sellerAddress">
                    Adress
                  </label>
                  <input
                    className={styles.input}
                    id="sellerAddress"
                    name="sellerAddress"
                    type="text"
                    placeholder="t.ex. Hejdalsvägen 2, Karlstad"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="sellerDescription">
                    Beskrivning
                  </label>

                  <textarea
                    className={styles.textarea}
                    id="sellerDescription"
                    name="sellerDescription"
                    placeholder="Skriv kort information om bilen eller säljaren..."
                    rows={5}
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
                      <img
                        className={styles.thumbImg}
                        src={img.url}
                        alt={img.file.name}
                      />

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

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Skickar..." : "Skicka annons"}
            </button>

            <p className={styles.afterText}>Vi återkommer inom 24 timmar</p>
          </section>
        </form>
      </div>
    </main>
  );
}
