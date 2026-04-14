"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700&display=swap');

        :root {
          --bg: #080b12;
          --surface: #0e1420;
          --surface2: #151c2e;
          --border: rgba(0,255,224,0.12);
          --accent: #00ffe0;
          --accent2: #7f5af0;
          --text: #e2e8f8;
          --muted: #5a6580;
          --user-bg: linear-gradient(135deg, #7f5af0, #00ffe0);
          --bot-bg: #151c2e;
          --radius: 18px;
        }

        .cw-wrap * {
          box-sizing: border-box;
          font-family: 'DM Mono', monospace;
        }

        /* ── FAB ── */
        .cw-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          background: var(--accent);
          box-shadow: 0 0 0 0 rgba(0,255,224,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s cubic-bezier(.34,1.56,.64,1),
                      box-shadow 0.25s ease;
          z-index: 9999;
          animation: fabPulse 2.8s ease-in-out infinite;
        }
        .cw-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 0 0 10px rgba(0,255,224,0.15), 0 8px 32px rgba(0,255,224,0.35);
          animation: none;
        }
        .cw-fab-icon {
          width: 26px;
          height: 26px;
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), opacity 0.2s;
        }
        .cw-fab-icon--chat { color: #080b12; }
        .cw-fab-icon--close { color: #080b12; }
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,224,0.45); }
          50%       { box-shadow: 0 0 0 12px rgba(0,255,224,0); }
        }

        /* ── PANEL ── */
        .cw-panel {
          position: fixed;
          bottom: 96px;
          right: 24px;
          width: 360px;
          height: 520px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 9998;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,255,224,0.06);
          transform-origin: bottom right;
          animation: panelIn 0.35s cubic-bezier(.34,1.4,.64,1) forwards;
        }
        .cw-panel--closing {
          animation: panelOut 0.25s cubic-bezier(.4,0,.6,1) forwards;
        }
        @keyframes panelIn {
          from { opacity:0; transform: scale(0.82) translateY(24px); }
          to   { opacity:1; transform: scale(1)    translateY(0);    }
        }
        @keyframes panelOut {
          from { opacity:1; transform: scale(1)    translateY(0);    }
          to   { opacity:0; transform: scale(0.82) translateY(24px); }
        }

        /* ── HEADER ── */
        .cw-header {
          padding: 14px 18px;
          background: var(--surface);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .cw-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent2), var(--accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
          position: relative;
        }
        .cw-avatar::after {
          content: '';
          position: absolute;
          bottom: 1px; right: 1px;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: #00e676;
          border: 2px solid var(--surface);
        }
        .cw-header-info { flex: 1; }
        .cw-header-name {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          line-height: 1;
        }
        .cw-header-status {
          font-size: 10px;
          color: #00e676;
          margin-top: 3px;
          letter-spacing: 0.05em;
        }

        /* ── MESSAGES ── */
        .cw-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: var(--surface2) transparent;
        }
        .cw-messages::-webkit-scrollbar { width: 4px; }
        .cw-messages::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 4px; }

        /* empty state */
        .cw-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: var(--muted);
          font-size: 12px;
          text-align: center;
          padding: 24px;
          animation: fadeUp 0.4s ease forwards;
        }
        .cw-empty-icon {
          font-size: 32px;
          opacity: 0.6;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }

        /* bubble wrapper */
        .cw-bubble-row {
          display: flex;
          opacity: 0;
          animation: fadeUp 0.3s ease forwards;
        }
        .cw-bubble-row--user { justify-content: flex-end; }
        .cw-bubble-row--bot  { justify-content: flex-start; }

        @keyframes fadeUp {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }

        .cw-bubble {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.55;
          word-break: break-word;
        }
        .cw-bubble--user {
          background: var(--user-bg);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .cw-bubble--bot {
          background: var(--bot-bg);
          color: var(--text);
          border: 1px solid var(--border);
          border-bottom-left-radius: 4px;
        }

        /* typing indicator */
        .cw-typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 16px;
          background: var(--bot-bg);
          border: 1px solid var(--border);
          border-radius: 14px;
          border-bottom-left-radius: 4px;
          width: fit-content;
          opacity: 0;
          animation: fadeUp 0.3s ease forwards;
        }
        .cw-typing span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          display: block;
          animation: bounce 1.1s ease-in-out infinite;
        }
        .cw-typing span:nth-child(2) { animation-delay: 0.15s; background: var(--accent2); }
        .cw-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce {
          0%,60%,100% { transform: translateY(0); }
          30%          { transform: translateY(-5px); }
        }

        /* ── INPUT AREA ── */
        .cw-input-area {
          padding: 12px 14px;
          background: var(--surface);
          border-top: 1px solid var(--border);
          display: flex;
          gap: 8px;
          align-items: center;
          flex-shrink: 0;
        }
        .cw-input {
          flex: 1;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 9px 13px;
          color: var(--text);
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cw-input::placeholder { color: var(--muted); }
        .cw-input:focus {
          border-color: rgba(0,255,224,0.4);
          box-shadow: 0 0 0 3px rgba(0,255,224,0.08);
        }
        .cw-send {
          width: 38px; height: 38px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.18s cubic-bezier(.34,1.56,.64,1),
                      background 0.18s, opacity 0.18s;
        }
        .cw-send:hover:not(:disabled) {
          transform: scale(1.1);
          background: #2ffff0;
        }
        .cw-send:active:not(:disabled) { transform: scale(0.94); }
        .cw-send:disabled { opacity: 0.4; cursor: not-allowed; }
        .cw-send svg { color: #080b12; }

        /* ── GRID BACKGROUND ── */
        .cw-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.03;
          background-image:
            linear-gradient(var(--accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        @media (max-width: 400px) {
          .cw-panel { width: calc(100vw - 32px); right: 16px; }
        }
      `}</style>

      <div className="cw-wrap">
        {/* FAB */}
        <button
          className="cw-fab"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? (
            <svg className="cw-fab-icon cw-fab-icon--close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg className="cw-fab-icon cw-fab-icon--chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
          )}
        </button>

        {/* PANEL */}
        {open && (
          <div className="cw-panel">
            <div className="cw-grid" />

            {/* Header */}
            <div className="cw-header">
              <div className="cw-avatar">🤖</div>
              <div className="cw-header-info">
                <div className="cw-header-name">Kuntal's Assistant</div>
                <div className="cw-header-status">● online</div>
              </div>
            </div>

            {/* Messages */}
            <div className="cw-messages">
              {messages.length === 0 && !loading && (
                <div className="cw-empty">
                  <div className="cw-empty-icon">✦</div>
                  <div>Ask me anything about<br /><strong style={{ color: "#c4b5fd" }}>Kuntal Das</strong></div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`cw-bubble-row cw-bubble-row--${m.role}`}
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <div className={`cw-bubble cw-bubble--${m.role}`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="cw-bubble-row cw-bubble-row--bot">
                  <div className="cw-typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="cw-input-area">
              <input
                ref={inputRef}
                className="cw-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask something…"
                disabled={loading}
              />
              <button
                className="cw-send"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}