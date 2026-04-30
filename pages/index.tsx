import { useState, useEffect, useRef } from "react";

interface Message {
  id: number;
  user: string;
  text: string;
  ts: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: "System", text: "Welcome to Dogfood Chat", ts: new Date().toISOString() },
  ]);
  const [input, setInput] = useState("");
  const [username] = useState("User" + Math.floor(Math.random() * 1000));
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), user: username, text: input, ts: new Date().toISOString() },
    ]);
    setInput("");
  }

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1 style={{ borderBottom: "1px solid #eee", paddingBottom: 12 }}>Dogfood Chat</h1>
      <div
        style={{
          height: 400,
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 16,
          marginBottom: 12,
          background: "#fafafa",
        }}
      >
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 8 }}>
            <strong>{m.user}:</strong> {m.text}
            <span style={{ fontSize: 11, color: "#999", marginLeft: 8 }}>
              {new Date(m.ts).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1, padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message..."
        />
        <button
          style={{ padding: "8px 20px", background: "#0070f3", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}
          onClick={send}
        >
          Send
        </button>
      </div>
      <p style={{ fontSize: 12, color: "#999", marginTop: 8 }}>Connected as {username}</p>
    </main>
  );
}
