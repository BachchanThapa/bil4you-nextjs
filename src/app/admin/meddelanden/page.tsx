"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.scss";

type Message = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  subject: string | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function markAsRead(messageId: string) {
    const { error } = await supabase
      .from("messages")
      .update({ status: "read" })
      .eq("id", messageId);

    if (error) {
      console.error(error);
      alert("Kunde inte markera meddelandet som läst.");
      return;
    }

    const updatedMessages = messages.map((item) =>
      item.id === messageId ? { ...item, status: "read" } : item,
    );

    setMessages(updatedMessages);

    if (selectedMessage?.id === messageId) {
      setSelectedMessage({ ...selectedMessage, status: "read" });
    }
  }

  async function deleteMessage(messageId: string) {
    const confirmDelete = confirm("Vill du ta bort meddelandet?");

    if (!confirmDelete) {
      return;
    }

    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", messageId);

    if (error) {
      console.error(error);
      alert("Kunde inte ta bort meddelandet.");
      return;
    }

    const remainingMessages = messages.filter((item) => item.id !== messageId);

    setMessages(remainingMessages);
    setSelectedMessage(remainingMessages[0] || null);
  }

  useEffect(() => {
    async function getMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }

      setMessages(data || []);
      setSelectedMessage(data?.[0] || null);
      setIsLoading(false);
    }

    getMessages();
  }, []);

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <aside className={styles.sidebar}>
          <div className={styles.adminBrand}>
            <span className={styles.adminIcon}>🚗</span>
            <span>Bil4You Admin</span>
          </div>

          <nav className={styles.sideNav}>
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/meddelanden" className={styles.activeLink}>
              Meddelanden
            </Link>
          </nav>

          <Link className={styles.backLink} href="/">
            ← Till webbplatsen
          </Link>
        </aside>

        <section className={styles.content}>
          <div className={styles.topBar}>
            <div>
              <p className={styles.kicker}>ADMIN PANEL</p>
              <h1>Meddelanden</h1>
              <p className={styles.messageCount}>
                {messages.length}{" "}
                {messages.length === 1 ? "meddelande" : "meddelanden"}
              </p>
            </div>

            <div className={styles.adminUser}>
              <span className={styles.avatar}>👤</span>
              <div>
                <strong>Admin</strong>
                <small>Kontaktförfrågningar</small>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.emptyState}>
              <h2>Laddar meddelanden...</h2>
            </div>
          ) : messages.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>Inga meddelanden ännu</h2>
              <p>När någon skickar kontaktformuläret visas det här.</p>
            </div>
          ) : (
            <div className={styles.inboxGrid}>
              <div className={styles.messageList}>
                {messages.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.messageItem} ${
                      selectedMessage?.id === item.id ? styles.selectedItem : ""
                    }`}
                    onClick={() => setSelectedMessage(item)}
                    type="button"
                  >
                    <div className={styles.messageItemTop}>
                      <strong>{item.name || "Okänd avsändare"}</strong>
                      <span>{item.status || "new"}</span>
                    </div>

                    <p>{item.subject || "Inget ämne"}</p>

                    <small>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString("sv-SE")
                        : "Okänt datum"}
                    </small>
                  </button>
                ))}
              </div>

              <div className={styles.messageDetail}>
                {selectedMessage ? (
                  <>
                    <div className={styles.detailHeader}>
                      <div>
                        <p className={styles.detailLabel}>Ämne</p>
                        <h2>{selectedMessage.subject || "Inget ämne"}</h2>
                      </div>

                      <span className={styles.statusBadge}>
                        {selectedMessage.status || "new"}
                      </span>
                    </div>

                    <div className={styles.senderBox}>
                      <p>
                        <strong>Namn:</strong>{" "}
                        {selectedMessage.name || "Ej angivet"}
                      </p>
                      <p>
                        <strong>E-post:</strong>{" "}
                        {selectedMessage.email || "Ej angivet"}
                      </p>
                      <p>
                        <strong>Telefon:</strong>{" "}
                        {selectedMessage.phone || "Ej angivet"}
                      </p>
                      <p>
                        <strong>Datum:</strong>{" "}
                        {selectedMessage.created_at
                          ? new Date(selectedMessage.created_at).toLocaleString(
                              "sv-SE",
                            )
                          : "Okänt datum"}
                      </p>
                    </div>

                    <div className={styles.fullMessage}>
                      <p>{selectedMessage.message}</p>
                    </div>
                    
                    <div className={styles.actionRow}>
                      {selectedMessage.status !== "read" && (
                        <button
                          type="button"
                          className={styles.readButton}
                          onClick={() => markAsRead(selectedMessage.id)}
                        >
                          Markera som läst
                        </button>
                      )}

                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => deleteMessage(selectedMessage.id)}
                      >
                        Ta bort
                      </button>
                    </div>
                  </>
                ) : (
                  <p>Välj ett meddelande.</p>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
