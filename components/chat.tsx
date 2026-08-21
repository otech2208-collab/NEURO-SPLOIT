"use client";

import { useAuth } from "@clerk/nextjs";
import { FormEvent, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string; tokensUsed?: number };
const starters = ["Explique ce flux de code", "Revoir un script Python", "Structurer un audit autorisé"];

export function Chat() {
  const { isSignedIn, getToken } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const sendMessage = async (event: FormEvent) => {
    event.preventDefault(); const content = input.trim(); if (!content || !isSignedIn || isSending) return;
    setError(null); setIsSending(true); setMessages((current) => [...current, { role: "user", content }]); setInput("");
    try { const token = await getToken(); const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ message: content, history: messages }) }); const body = await response.json() as { message?: Message; error?: string }; if (!response.ok || !body.message) throw new Error(body.error || "La réponse est indisponible."); setMessages((current) => [...current, body.message!]); } catch (reason) { setMessages((current) => current.slice(0, -1)); setError(reason instanceof Error ? reason.message : "La réponse est indisponible."); } finally { setIsSending(false); composerRef.current?.focus(); }
  };
  const copy = async (content: string) => { await navigator.clipboard.writeText(content); };
  if (!isSignedIn) return <section className="signed-out-panel"><p className="eyebrow">ENVIRONNEMENT SÉCURISÉ</p><h1>L’intelligence technique, dans votre navigateur.</h1><p>Connectez-vous ou créez votre compte Clerk pour démarrer une conversation contextualisée.</p></section>;
  return <section className="chat-shell">{messages.length === 0 ? <div className="chat-empty"><p className="eyebrow">SESSION SÉCURISÉE</p><h1>Que souhaitez-vous explorer&nbsp;?</h1><p>Analysez du code, une architecture ou une démarche de sécurité autorisée.</p><div className="starter-grid">{starters.map((starter) => <button key={starter} onClick={() => { setInput(starter); composerRef.current?.focus(); }}>{starter}<span>›</span></button>)}</div></div> : <div className="message-list">{messages.map((message, index) => <article key={`${message.role}-${index}`} className={`message ${message.role}`}><div className="message-label">{message.role === "assistant" ? "NEURO-SPLOIT" : "VOUS"}</div><div className="message-content">{message.content.split(/(```[\s\S]*?```)/g).filter(Boolean).map((part, partIndex) => part.startsWith("```") ? <pre key={partIndex}><button onClick={() => copy(part.slice(3, -3).replace(/^\w+\n/, ""))}>Copier</button><code>{part.slice(3, -3).replace(/^\w+\n/, "")}</code></pre> : <p key={partIndex}>{part}</p>)}</div></article>)}{isSending ? <div className="typing">NEURO-SPLOIT analyse votre demande…</div> : null}</div>}<form className="composer" onSubmit={sendMessage}><textarea ref={composerRef} value={input} onChange={(event) => setInput(event.target.value)} placeholder="Posez votre question…" maxLength={8000} rows={2} /><button className="send-button" disabled={!input.trim() || isSending} aria-label="Envoyer le message">↑</button></form>{error ? <p className="error-message" role="alert">{error}</p> : null}</section>;
}
