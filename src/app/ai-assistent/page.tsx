"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.scss";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function AiAssistentPage() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // This stores all chat messages that should be shown in the chat window.
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hej! Jag är Bil4You AI-assistent. Du kan fråga mig om hur du registrerar dig, hur du säljer en bil eller vilka bilar som finns tillgängliga.",
    },
  ]);

  // This function runs when the user sends a question from the chat form.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    // This stops empty questions and prevents double sending while loading.
    if (!trimmedQuestion || isLoading) {
      return;
    }

    // This immediately shows the user's question in the chat window.
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: "user", text: trimmedQuestion },
    ]);

    setQuestion("");
    setIsLoading(true);

    try {
      // This sends the user's question to our Next.js API route.
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: trimmedQuestion }),
      });

      const data = await response.json();

      // This adds the assistant answer from the API route to the chat window.
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          text: data.answer || "Jag kunde inte skapa ett svar just nu.",
        },
      ]);
    } catch {
      // This shows a simple error message if the API request fails.
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          text: "Något gick fel. Försök igen om en stund.",
        },
      ]);
    } finally {
      // This stops the loading state after the request is finished.
      setIsLoading(false);
    }
  }

  // This function makes car detail paths clickable inside assistant messages.
  function renderMessageText(text: string) {
    const parts = text.split(/(\/kop-bilar\/[a-zA-Z0-9-]+)/g);

    return parts.map((part, index) => {
      if (part.startsWith("/kop-bilar/")) {
        return (
          <a key={index} href={part} className={styles.chatLink}>
            {part}
          </a>
        );
      }

      return part;
    });
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.label}>Bil4You AI</p>
        <h1>AI-assistent</h1>
        <p className={styles.description}>
          Här kan du ställa enkla frågor om Bil4You, registrering, köp av bil,
          försäljning av bil, kontaktinformation och tillgängliga bilar.
        </p>
      </section>

      <section className={styles.chatPreview}>
        <div className={styles.chatHeader}>
          <div>
            <h2>Chatta med Bil4You</h2>
            <p>AI-assistenten svarar på svenska eller engelska.</p>
          </div>

          <span className={styles.status}>Local AI</span>
        </div>

        <div className={styles.messageArea}>
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "user" ? styles.userMessage : styles.botMessage
              }
            >
              {renderMessageText(message.text)}
            </div>
          ))}

          {isLoading && (
            <div className={styles.botMessage}>AI-assistenten skriver...</div>
          )}
        </div>

        <form className={styles.chatForm} onSubmit={handleSubmit}>
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Skriv din fråga här..."
            aria-label="Skriv din fråga till AI-assistenten"
            disabled={isLoading}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Skickar..." : "Skicka"}
          </button>
        </form>
      </section>
    </main>
  );
}

/*
  This page:
  1. Shows the AI assistant page and chat interface.
  2. Stores the user's question and all chat messages with useState.
  3. Sends the user's question to the Next.js API route /api/ai-chat.
  4. Shows the assistant answer returned from the API route.
  5. Handles empty input, loading state and simple error messages.
*/
